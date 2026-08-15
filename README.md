# CRUD Node + Express

CRUD básico **sem persistência** — os dados ficam em um array na memória e se perdem quando o servidor reinicia.

## Como rodar

```bash
npm install
npm start        # ou: npm run dev  (reinicia sozinho ao salvar o arquivo)
```

Servidor sobe em `http://localhost:3000`.

## Rotas

| Método | Rota            | O que faz              | Status de sucesso |
| ------ | --------------- | ---------------------- | ----------------- |
| GET    | `/usuarios`     | Lista todos            | 200               |
| POST   | `/usuarios`     | Cria um usuário        | 201               |
| PUT    | `/usuarios/:id` | Atualiza nome/email    | 200               |
| DELETE | `/usuarios/:id` | Remove um usuário      | 204 (sem corpo)   |

Erros: `400` quando falta `nome` ou `email` no POST, `404` quando o `id` não existe.

## Testando pelo terminal

```bash
# Listar
curl http://localhost:3000/usuarios

# Criar
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carla","email":"carla@email.com"}'

# Atualizar
curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Paula"}'

# Deletar
curl -X DELETE http://localhost:3000/usuarios/2
```

> No PowerShell, `curl` é um alias de `Invoke-WebRequest` e não aceita essas flags.
> Use `curl.exe` no lugar de `curl`, ou teste pelo Insomnia/Postman/Thunder Client.

## Conceitos que aparecem no código

- `express.json()` — middleware que transforma o corpo da requisição em objeto JS
- `req.params` — parâmetros da URL (`/usuarios/:id`)
- `req.body` — corpo enviado pelo cliente
- `res.status(...).json(...)` — código HTTP + resposta
- `find` / `findIndex` / `splice` — manipulação do array em memória
