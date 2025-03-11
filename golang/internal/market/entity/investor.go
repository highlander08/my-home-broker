package entity

// Investor represents a person who invests in the market.
type Investor struct {
	ID            string
	Name          string
	AssetPosition []*InvestorAssetPosition
}

// NewInvestor creates a new Investor.
func NewInvestor(id string) *Investor {
	return &Investor{
		ID:            id,
		AssetPosition: []*InvestorAssetPosition{},
	}
}

// AddAssetPosition adds an asset position to the investor.
func (i *Investor) AddAssetPosition(assetPosition *InvestorAssetPosition) {
	i.AssetPosition = append(i.AssetPosition, assetPosition)
}

// AdjustAssetPosition adjusts the asset position of the investor.
func (i *Investor) AdjustAssetPosition(assetID string, qtdShares int) {
	assetPosition := i.GetAssetPosition(assetID)
	if assetPosition == nil {
		i.AssetPosition = append(i.AssetPosition, NewInvestorAssetPosition(assetID, qtdShares))
	} else {
		assetPosition.AddShares(qtdShares)
	}
}

// GetAssetPosition returns the asset position of the investor.
func (i *Investor) GetAssetPosition(assetID string) *InvestorAssetPosition {
	for _, assetPosition := range i.AssetPosition {
		if assetPosition.AssetID == assetID {
			return assetPosition
		}
	}
	return nil
}

// NewInvestor creates a new Investor.
type InvestorAssetPosition struct {
	AssetID string
	Shares  int
}

// NewInvestorAssetPosition creates a new InvestorAssetPosition.
func NewInvestorAssetPosition(assetID string, shares int) *InvestorAssetPosition {
	return &InvestorAssetPosition{
		AssetID: assetID,
		Shares:  shares,
	}
}

// AddShares adds shares to the investor asset position.
func (iap *InvestorAssetPosition) AddShares(qtd int) {
	iap.Shares += qtd
}
