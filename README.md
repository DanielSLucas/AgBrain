# Projeto API de Gestão Agrícola

Este projeto é uma API desenvolvida para gerenciar produtores, fazendas, colheitas e culturas agrícolas.


## Ambiente de Desenvolvimento

### Pré-requisitos:
- **Node.js** instalado.
- **PostgreSQL** rodando.
- Arquivo `.env` na raiz do projeto com a variável `DATABASE_URL` configurada para a URL do banco de dados.

Exemplo de `.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### Passos para configurar o ambiente de desenvolvimento:
1. **Instalar as dependências**:
   ```bash
   npm ci
   ```

2. **Gerar o cliente Prisma e as tipagens de acordo com o schema**:
   ```bash
   npx prisma generate
   ```

3. **Rodar as migrações e criar as tabelas no banco**:
   ```bash
   npx prisma migrate dev
   ```

4. **Iniciar a aplicação em ambiente de desenvolvimento**:
   ```bash
   npm run start:dev
   ```

### Rodando PostgreSQL em um container Docker:
Caso prefira rodar o banco de dados em um container antes de executar os comandos acima, utilize o seguinte comando:
```bash
docker run -d \
  --name postgres \
  -p 5432:5432 \
  -e POSTGRESQL_USERNAME=docker \
  -e POSTGRESQL_PASSWORD=docker \
  -e POSTGRESQL_DATABASE=brain-ag-db \
  bitnami/postgresql
```

## Ambiente de Produção

Para rodar a aplicação em um ambiente semelhante ao de produção, execute:
```bash
docker-compose up -d
```

## Documentação da API

Os seguintes recursos estão disponíveis:
- **/producers** - Gerenciamento de produtores.
- **/farms** - Gerenciamento de fazendas.
- **/harvests** - Gerenciamento de colheitas.
- **/crops** - Gerenciamento de culturas agrícolas.

Além de todos métodos do CRUD, esses recursos também possuem algumas rotas com métricas, para possibilitar a construção de um dashboard.

Mais detalhes sobre os endpoints no swagger.

### Swagger
A API disponibiliza uma interface Swagger para facilitar a exploração dos endpoints:

- **Interface web**: [http://localhost:3000/api](http://localhost:3000/api)
- **JSON OpenAPI**: [http://localhost:3000/api](http://localhost:3000/api)


## Testes

Essa aplicação inclui testes unitários e de integração para validar o comportamento da API.

Para executar os testes unitários, utilize o comando:
```bash
npm run test
```

Para executar os testes unitários, utilize o comando:
```bash
npm run test:e2e
```