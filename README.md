
## Sobre Mim
Olá! Eu sou Highlander, um desenvolvedor apaixonado por tecnologias de backend, especialmente com NestJS. Neste projeto, busquei construir uma aplicação robusta utilizando as melhores práticas de desenvolvimento e containerização.

Se você tiver alguma dúvida ou quiser trocar ideias sobre tecnologia, fique à vontade para me contatar. Estou sempre aberto a aprender mais e colaborar em novos projetos!

Este projeto é um sistema para gerenciar ativos financeiros e ordens de compra/venda de ações. Utiliza NestJS e MongoDB, com integração em tempo real através de WebSockets. Abaixo está uma explicação detalhada sobre cada arquivo e serviço presente no código.

![HOME BROKER](https://github.com/user-attachments/assets/10462822-93b4-49be-b644-ca89b4164d34)
![swagger](https://github.com/user-attachments/assets/bd133905-284a-48a1-bd75-8960d624527b)

---

### README.md: Explicação dos Arquivos e Serviços

## Arquivos e Serviços:

### 1. **`AssetDailiesService`**
- **Responsabilidade**: Gerencia as operações relacionadas aos dados diários dos ativos financeiros (preços diários). 
  - **`findAll(symbol: string)`**: Retorna todos os preços diários de um ativo específico.
  - **`create(dto)`**: Cria um novo registro de preço diário para um ativo.
  - **`subscribeCreatedEvents()`**: Observa e emite eventos de criação de novos registros diários de ativos, permitindo que outras partes do sistema escutem essas atualizações em tempo real.

### 2. **`AssetDailyPresenter`**
- **Responsabilidade**: Apresenta um formato estruturado dos dados do `AssetDaily`, incluindo dados do ativo associado (representado pelo `AssetPresenter`).
  - **`toJSON()`**: Converte os dados de `AssetDaily` e `Asset` para um formato legível em JSON, facilitando a apresentação na interface.

### 3. **`AssetsGateway`**
- **Responsabilidade**: Lida com as conexões WebSocket para o frontend, permitindo interações em tempo real com os ativos financeiros.
  - **Eventos WebSocket**:
    - `joinAssets`: Permite que o cliente se inscreva em múltiplos ativos e receba atualizações sobre seus preços.
    - `joinAsset`: Permite que o cliente se inscreva em um único ativo para receber atualizações.
    - `leaveAssets`: Permite que o cliente deixe a lista de ativos a ser notificado.
    - `leaveAsset`: Permite que o cliente deixe de ser notificado sobre um ativo específico.

### 4. **`AssetsService`**
- **Responsabilidade**: Gerencia as operações CRUD (Create, Read, Update, Delete) para os ativos financeiros.
  - **`create(createAssetDto)`**: Cria um novo ativo.
  - **`findAll()`**: Retorna todos os ativos financeiros cadastrados.
  - **`findOne(symbol: string)`**: Encontra um ativo específico pelo seu símbolo.
  - **`subscribeNewPriceChangedEvents()`**: Observa as mudanças nos preços dos ativos e emite eventos sobre essas atualizações em tempo real.

### 5. **`OrdersGateway`**
- **Responsabilidade**: Gerencia as operações de WebSocket relacionadas às ordens de compra e venda de ativos.
  - **`orders/create`**: Permite que o cliente envie um pedido de compra ou venda de ações. O gateway lida com a criação dessas ordens e retorna o status da transação.

### 6. **`OrdersService`**
- **Responsabilidade**: Gerencia as operações CRUD para ordens de compra/venda de ativos.
  - **`create(createOrderDto)`**: Cria uma nova ordem de compra ou venda.
  - **`findAll(filter)`**: Retorna todas as ordens associadas a uma carteira (wallet).
  - **`findOne(id)`**: Retorna uma ordem específica pelo seu ID.

### 7. **`WalletsService`**
- **Responsabilidade**: Gerencia as operações relacionadas às carteiras de ativos dos usuários.
  - **`create(createWalletDto)`**: Cria uma nova carteira para o usuário.
  - **`findAll()`**: Retorna todas as carteiras cadastradas.
  - **`findOne(id)`**: Encontra uma carteira específica, incluindo os ativos nela presentes.
  - **`createWalletAsset(data)`**: Adiciona um ativo à carteira de um usuário, registrando a quantidade de ações associadas.

---

## Estrutura do Projeto:

### 1. **Entidades (Entities)**:
   - **`Asset`**: Representa um ativo financeiro (como uma ação).
   - **`AssetDaily`**: Representa os preços diários dos ativos.
   - **`Order`**: Representa uma ordem de compra ou venda.
   - **`Wallet`**: Representa uma carteira de ativos de um usuário.
   - **`WalletAsset`**: Representa a relação entre um ativo e uma carteira (com a quantidade de ações possuídas).

### 2. **DTOs (Data Transfer Objects)**:
   - **`CreateAssetDto`**: Definição dos dados necessários para criar um novo ativo.
   - **`CreateOrderDto`**: Definição dos dados necessários para criar uma nova ordem.
   - **`CreateWalletAssetDto`**: Definição dos dados necessários para associar um ativo a uma carteira.

### 3. **WebSocket**:
   - WebSockets são usados para permitir que o sistema envie atualizações em tempo real para os clientes (frontend). Isso inclui atualizações de preços de ativos (`AssetsGateway`) e notificações de criação de ordens ou transações de ativos.

---

## Fluxo de Operações:

1. **Criação de Ativo**: Um ativo é criado através do serviço `AssetsService`. O ativo pode ser um item financeiro como uma ação ou título.
2. **Registro de Preços Diários**: O serviço `AssetDailiesService` permite o registro dos preços diários dos ativos.
3. **Execução de Ordens**: O serviço `OrdersService` lida com a criação de ordens de compra e venda de ativos.
4. **WebSocket**: A comunicação em tempo real é facilitada pelos gateways WebSocket, permitindo que o frontend receba atualizações sobre ativos e ordens em tempo real.

---

## Tecnologias Utilizadas:
- **NestJS**: Framework para construção de APIs e microservices.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar informações sobre ativos, ordens e carteiras.
- **WebSockets**: Tecnologia utilizada para atualizações em tempo real entre o backend e o frontend.

---

### Dependências:
- **`@nestjs/websockets`**: Utilizado para a criação de gateways WebSocket.
- **`@nestjs/mongoose`**: Integrado com o MongoDB para gerenciar os dados persistidos.
- **`rxjs`**: Usado para criar e gerenciar observáveis, principalmente para eventos em tempo real.

---


## **Passos para Executar a API com Docker Compose**

### 1. **Clone o Repositório**

Primeiro, clone o repositório para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. **Configuração do Docker Compose**

O arquivo `docker-compose.yml` configura os containers necessários para a aplicação. Aqui está um exemplo básico de como ele deve se parecer para rodar um aplicativo NestJS com MongoDB:

```yaml
services:
  mongo:
    # image: mongo:8.0.3
    build: ./.docker/mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
    ports:
      - 27017:27017
```

### 4. **Construção e Execução dos Containers**

Com o arquivo `docker-compose.yml` configurado, você pode agora construir e iniciar os containers utilizando o Docker Compose. No terminal, execute o seguinte comando:

```bash
docker-compose up --build
```

Esse comando irá:
- Construir a imagem para a API NestJS (se necessário).
- Criar o container do MongoDB.
- Iniciar a aplicação NestJS.

### 5. **Acessando a API**

Agora que os containers estão em execução, você pode acessar sua API NestJS no seguinte endereço:

```
http://localhost:3000
```

### 5.1 **Acessando a Documentação da API**

Agora que os containers estão em execução, você pode acessar sua API NestJS no seguinte endereço:

```
http://localhost:3000/api
```

Se tudo foi configurado corretamente, você verá a aplicação NestJS rodando e pronta para aceitar requisições.

### 6. **Verificando Logs**

Caso você queira visualizar os logs da API, use o seguinte comando:

```bash
docker-compose logs -f api
```

Isso mostrará as saídas do console da API, o que pode ser útil para depuração.

### 7. **Parando a Aplicação**

Quando terminar de trabalhar com a aplicação, você pode parar os containers com:

```bash
docker-compose down
```

Este comando irá parar e remover os containers, redes e volumes definidos no arquivo `docker-compose.yml`.

### 8. **Comandos Comuns do Docker Compose**

Aqui estão alguns comandos úteis para gerenciar sua aplicação com Docker Compose:

- **Ver status dos containers**:  
  ```bash
  docker-compose ps
  ```

- **Recriar os containers**:  
  ```bash
  docker-compose up --build
  ```

- **Parar os containers**:  
  ```bash
  docker-compose stop
  ```

- **Remover containers, redes e volumes**:  
  ```bash
  docker-compose down
  ```

---

## **Estrutura de Diretórios**

Aqui está uma visão geral da estrutura do projeto:

```
/seu-repositorio
  ├── docker-compose.yml       # Arquivo de configuração do Docker Compose
  ├── src/                     # Código fonte da API NestJS
  ├── package.json             # Dependências e scripts npm
  ├── .env                     # Arquivo de variáveis de ambiente (caso necessário)
  └── README.md                # Este arquivo
```

---

 
