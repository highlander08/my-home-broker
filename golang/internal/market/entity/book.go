package entity

import "sync"

// Order represents a buy or sell order
type Book struct {
	Orders         []*Order
	Transactions   []*Transaction
	IncomingOrders chan *Order
	ProcessOrders  chan *Order
	Wg             *sync.WaitGroup
}

// NewBook creates a new Book instance
func NewBook(incomingOrders chan *Order, processOrders chan *Order, wg *sync.WaitGroup) *Book {
	return &Book{
		Orders:         []*Order{},
		Transactions:   []*Transaction{},
		IncomingOrders: incomingOrders,
		ProcessOrders:  processOrders,
		Wg:             wg,
	}
}

type orderQueue []*Order

func (oq *orderQueue) Add(order *Order) {
	// Add the order to the end of the queue
	*oq = append(*oq, order)
}

// GetNextOrder returns the next order in the queue
func (oq *orderQueue) GetNextOrder() *Order {
	// If there are no orders in the queue, return nil
	if len(*oq) == 0 {
		return nil
	}
	// Get the first order in the queue
	order := (*oq)[0]
	// Remove the first order from the queue
	*oq = (*oq)[1:]
	// Return the order
	return order
}

// Trade matches incoming orders with existing orders
func (b *Book) Trade() {
	// Create a map of order queues for each asset
	buyOrders := make(map[string]*orderQueue)
	sellOrders := make(map[string]*orderQueue)

	// Loop over incoming orders
	for order := range b.IncomingOrders {
		asset := order.Asset.ID
		if buyOrders[asset] == nil {
			buyOrders[asset] = &orderQueue{}
		}
		if sellOrders[asset] == nil {
			sellOrders[asset] = &orderQueue{}
		}
		if order.OrderType == "BUY" {
			b.tryMatch(order, sellOrders[asset], buyOrders[asset])
		} else {
			b.tryMatch(order, buyOrders[asset], sellOrders[asset])
		}
	}
}

// tryMatch attempts to match an incoming order with existing orders
func (b *Book) tryMatch(newOrder *Order, availableOrders, pendingOrders *orderQueue) {
	// Loop over opposite orders
	for {
		potentialMatch := availableOrders.GetNextOrder()
		if potentialMatch == nil {
			break
		}
		if !b.pricesMatch(newOrder, potentialMatch) {
			availableOrders.Add(potentialMatch)
			break
		}
		if potentialMatch.PendingShares > 0 {
			matchedTransaction := b.createTransaction(newOrder, potentialMatch)
			b.processTransaction(matchedTransaction)

			if potentialMatch.PendingShares > 0 {
				availableOrders.Add(potentialMatch)
			}
			if newOrder.PendingShares == 0 {
				break
			}
		}
	}
	if newOrder.PendingShares > 0 {
		pendingOrders.Add(newOrder)
	}
}

// pricesMatch checks if the prices of two orders match
func (b *Book) pricesMatch(order, matchOrder *Order) bool {
	if order.OrderType == "BUY" {
		return matchOrder.Price <= order.Price
	}
	return matchOrder.Price >= order.Price
}

// createTransaction creates a new transaction
func (b *Book) createTransaction(incomingOrders, matchedOrder *Order) *Transaction {
	var buyOrder, sellOrder *Order

	if incomingOrders.OrderType == "BUY" {
		buyOrder, sellOrder = incomingOrders, matchedOrder
	} else {
		buyOrder, sellOrder = matchedOrder, incomingOrders
	}
	shares := incomingOrders.PendingShares
	if matchedOrder.PendingShares < shares {
		shares = matchedOrder.PendingShares
	}
	return NewTransaction(sellOrder, buyOrder, shares, matchedOrder.Price)
}

func (b *Book) recordTransaction(transaction *Transaction) {
	b.Transactions = append(b.Transactions, transaction)
	transaction.BuyingOrder.Transactions = append(transaction.BuyingOrder.Transactions, transaction)
	transaction.SellingOrder.Transactions = append(transaction.SellingOrder.Transactions, transaction)
}

// processTransaction processes a transaction
func (b *Book) processTransaction(transaction *Transaction) {
	defer b.Wg.Done()
	transaction.Process()
	b.recordTransaction(transaction)
	b.ProcessOrders <- transaction.BuyingOrder
	b.ProcessOrders <- transaction.SellingOrder
}
