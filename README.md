
# Store API

Este é o backend de um aplicativo de loja e funciona como um CRUD, utilizando tecnologias como o NestJS, Joi e Mongoose. O projeto conta com validações, documentação com Swagger, Docker e testes unitários com Jest. Para mais detalhes, confira o [repositório principal](https://github.com/dev-luizf/store-app).

O deploy está disponível em: [https://product-manager.up.railway.app/](https://product-manager.up.railway.app/)

## Tecnologias utilizadas

-   Node.js
-   NestJS
-   Joi
-   Mongoose
-  Docker
- Swagger


## Como rodar a API

Para rodar a API, você precisará ter o  [Docker](https://www.docker.com/)  instalado na sua máquina. Se preferir, também é possível rodar a aplicação sem ele, basta seguir as instruções na seção "Rodando sem Docker" e possuir o Node e MongoDB instalados na sua máquina.

1.  Clone o repositório:

`git clone https://github.com/dev-luizf/store-api.git`

2.  Entre na pasta do projeto:

`cd store-api`

3.  Crie um arquivo  `.env`  na raiz do projeto com url de conexão do mongo, exemplo:

`MONGO_URI="mongodb://localhost:27017/product-manager"`

5.  Rode o Docker Compose:

`npm run compose:up`

4.  Acesse a API em  `http://localhost:3001`.

## [](https://github.com/dev-luizf/cpf-control#rodando-sem-docker)Rodando sem Docker

Se você preferir não utilizar o Docker, siga as instruções abaixo.

1.  Clone o repositório:

`git clone https://github.com/dev-luizf/store-api.git`

2.  Entre na pasta do projeto:

`cd store-api`

3.  Instale as dependências:

`npm install`

4.  Crie um arquivo  `.env`  na raiz do projeto com as seguintes variáveis:

`MONGO_URI="mongodb://localhost:27017/product-manager"`

6.  Inicie o servidor:

`npm run start:dev`

7.  Acesse a API em  `http://localhost:3001`.

## [](https://github.com/dev-luizf/cpf-control#testes)Testes

A API conta com testes unitários escritos com a biblioteca Jest (arquivos .spec.ts em "src/products")  que mockam a camada do banco de dados permitindo que os testes sejam executados de forma mais rápida e eficiente, sem a necessidade de interagir com um banco de dados real. Para roda-los, execute os seguinte comando:

`npm run test`
`npm run test:cov`

## Documentação

A documentação foi desenvolvida com Swagger e a patir do momento em que o projeto estiver rodando, é possível acessa-la em http://localhost:3001/api.
