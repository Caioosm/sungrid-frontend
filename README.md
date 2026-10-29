# SunGrid Front-end

Aplicação React com Vite para as telas de autenticação do SunGrid.

## Executar localmente

```bash
npm install
npm run dev
```

Rotas disponíveis:

- `/login` — entrar
- `/cadastro` — criar conta
- `/recuperar-senha` — solicitar redefinição de senha

## Integração com a API

Copie `.env.example` para `.env` e informe a URL base do backend:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

As chamadas ficam centralizadas em `src/services/apiClient.js` e
`src/services/authService.js`. A implementação espera estes endpoints:

- `POST /auth/login` com `{ "email": "...", "password": "..." }`
- `POST /auth/register` com `{ "name": "...", "email": "...", "password": "..." }`
- `POST /auth/forgot-password` com `{ "email": "..." }`

O backend pode retornar JSON com uma propriedade `message` para mensagens de
erro. Ajuste os caminhos e os contratos em `src/services/authService.js` quando
a API estiver definida. Sem `VITE_API_BASE_URL`, os formulários mostram uma
mensagem explícita de configuração pendente em vez de simular sucesso.

## Verificações

```bash
npm run lint
npm run build
```
