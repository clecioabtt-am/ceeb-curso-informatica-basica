# CEEB ACADEMY — Laboratório Interativo + D1 + Gemini

## Cloudflare
Projeto: `ceeb-curso-informatica-basica`; D1 binding `COURSE_DB` aponta para `ceeb-curso-basico-db` (ID recuperado de versão anterior do projeto); R2 `COURSE_FILES` aponta para `ceeb-curso-basico-files`.

### 1. Preparar tabelas do banco existente
`npx wrangler d1 execute ceeb-curso-basico-db --remote --file=./schema.sql`

O SQL utiliza `CREATE TABLE IF NOT EXISTS` e preserva a tabela de configurações existente. **Não exclua nem recrie o D1.**

### 2. Cadastrar Secrets
`npx wrangler secret put ADMIN_PASSWORD`
`npx wrangler secret put ADMIN_SESSION_SECRET`
`npx wrangler secret put GEMINI_API_KEY`

`GEMINI_API_KEY` é opcional: sem ela, o laboratório e os quizzes funcionam normalmente. Os limites e a disponibilidade do plano gratuito variam conforme o Google. O sistema utiliza o modelo gemini-2.5-flash; ajuste o modelo no Worker se sua chave não tiver acesso.

### 3. Publicação
`npm install`
`npx wrangler deploy`

### 4. Verificação
Acesse `/api/health` e confira `d1Configured: true`. Abra o painel ADM e confirme a publicação das alterações no D1. O campo de progresso do estudante ainda é salvo **localmente no navegador**, pois o projeto original não possui autenticação individual dos alunos.

### Novo laboratório
A aba Prática foi removida. Há três missões dentro do Laboratório para cada módulo. O primeiro módulo inclui identificação de dispositivos, classificação e dados/informação. Nos outros módulos, existem registros escritos das atividades e simuladores complementares preservados. O quiz exige nota mínima de 60% e conclusão das três missões. O Gemini é um tutor opcional, não é usado para aprovar respostas.

### Observações
- A chave da IA fica exclusivamente como Secret do Worker.
- Limite didático inicial: 5 perguntas por dia por identificador anônimo de IP (aproximado; dispositivos compartilhando IP dividem a cota).
- Não enviar dados pessoais ao tutor.
- Este pacote não instala nem configura recursos na sua conta Cloudflare automaticamente; as ligações são declaradas no wrangler e só entram em operação após o deploy na sua conta.
