# 📌 DT Money Backend

## Como Executar

1. **Instale as dependências:**

```bash
pnpm install
```

2. **Configure o banco de dados:**

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL="file:./prisma/dev.db"
```
3. **Execute as migrações:**

```bash
pnpm prisma migrate dev
```

4. **Compile and run the project**

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🔍 Rotas da API

| Método | Rota                | Descrição                     | Status HTTP      |
| ------ | ------------------- | ----------------------------- | ---------------- |
| POST   | `/transactions`     | Cria uma nova transação       | `201 Created`    |
| GET    | `/transactions`     | Lista todas as transações     | `200 OK`         |
| GET    | `/transactions/:id` | Busca uma transação por ID    | `200 OK`         |
| PATCH  | `/transactions/:id` | Atualiza uma transação por ID | `200 OK`         |
| DELETE | `/transactions/:id` | Remove uma transação por ID   | `204 No Content` |

---

## 📝 Exemplos de Uso

### Criar Transação (POST)

**Request:**

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{"title":"Salário","price":3000,"category":"Trabalho","type":"INCOME"}'
```

**Response (201):**

```json
{
  "id": "d94f1c4a-...",
  "title": "Salário",
  "price": 3000,
  "category": "Trabalho",
  "type": "INCOME",
  "createdAt": "2025-06-15T00:00:00.000Z"
}
```

---

### Listar Transações (GET)

**Request:**

```bash
curl -X GET http://localhost:3000/transactions
```

**Response (200):**

```json
[
  {
    "id": "d94f1c4a-...",
    "title": "Salário",
    "price": 3000,
    "type": "INCOME",
    "category": "Trabalho",
    "createdAt": "2025-06-15T00:00:00.000Z"
  }
]
```

---

### Buscar Transação por ID (GET)

**Request:**

```bash
curl -X GET http://localhost:3000/transactions/{id}
```

Substitua `{id}` pelo ID da transação.

**Response (200):**

```json
{
  "id": "d94f1c4a-...",
  "title": "Salário",
  "price": 3000,
  "category": "Trabalho",
  "type": "INCOME",
  "createdAt": "2025-06-15T00:00:00.000Z"
}
```

---

### Atualizar Transação por ID (PATCH)

**Request:**

```bash
curl -X PATCH http://localhost:3000/transactions/{id} \
  -H "Content-Type: application/json" \
  -d '{"title":"Salário Atualizado","price":3500}'
```

Substitua `{id}` pelo ID da transação.

**Response (200):**

```json
{
  "id": "d94f1c4a-...",
  "title": "Salário Atualizado",
  "price": 3500,
  "category": "Trabalho",
  "type": "INCOME",
  "createdAt": "2025-06-15T00:00:00.000Z"
}
```

---

### Remover Transação por ID (DELETE)

**Request:**

```bash
curl -X DELETE http://localhost:3000/transactions/{id}
```

Substitua `{id}` pelo ID da transação.

**Response (204):**

Sem conteúdo.

---


## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
