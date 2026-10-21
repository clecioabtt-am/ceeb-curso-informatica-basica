# CEEB ACADEMY — Informática Básica

Projeto web independente de ensino, em português, com 12 módulos, conteúdo didático, missões, quizzes, laboratórios de simulação, avaliação final, PWA e painel administrativo.

## Iniciar localmente

1. Instale Node.js 20+.
2. Execute `npm install`.
3. Execute `npm run dev` e abra o endereço exibido pelo Wrangler.
4. Acesse o ícone 🚪 no alto à direita. **Senha inicial de testes: `Clecio40`**.
5. O acesso de aluno está **liberado sem pagamento ou matrícula** durante esta fase.

## Publicar na Cloudflare

1. Crie um repositório GitHub com estes arquivos (o pacote contém menos de 100 arquivos).
2. No terminal, autentique com `npx wrangler login`.
3. **Antes de publicar**, configure uma senha administrativa diferente usando `npx wrangler secret put ADMIN_PASSWORD`.
4. Execute `npm run deploy`. O endereço final será informado pelo Wrangler.
5. Se desejar personalizar a marca, substitua o ícone SVG genérico pela logo oficial da escola (não foi disponibilizada neste pedido).

## D1 opcional — alterações administrativas compartilhadas

O curso funciona sem banco de dados. Por padrão, o conteúdo original vem de `public/course.js`; alterações do administrador são salvas no navegador. Para sincronizar edições em todos os aparelhos:

1. Execute `npx wrangler d1 create ceeb-curso-basico-db`.
2. Adicione ao `wrangler.toml`:
   ```toml
   [[d1_databases]]
   binding = "COURSE_DB"
   database_name = "ceeb-curso-basico-db"
   database_id = "ID_RETORNADO_PELO_COMANDO"
   ```
3. Execute `npx wrangler d1 execute ceeb-curso-basico-db --remote --file=./schema.sql`.
4. Faça novo deploy. A página usa D1 para publicar sobreposições de título, descrição e vídeo dos módulos. Progresso continua no navegador de testes.

## Integração futura com o sistema principal

A fase de testes **não tem cobrança, login de aluno, validação de matrícula ou emissão oficial de certificados**. Para produção, desenvolver API de matrícula/autenticação integrada ao painel CEEB Academy, webhooks autenticados do Asaas, autorização por aluno, progresso por matrícula em D1, certificados auditáveis e arquivos de aula em R2.

## Limites importantes

- As atividades são demonstrativas e não representam emulação integral dos softwares Microsoft.
- Não existem videoaulas produzidas ou aulas gravadas neste pacote. O painel aceita links HTTPS complementares.
- A credencial inicial de teste é intencionalmente simples; **troque a senha antes de publicação pública**. Sessões administrativas são mantidas em memória do Worker, portanto podem expirar após uma reinicialização e não oferecem proteção contra tentativas repetidas. Adote Cloudflare Access/rate limiting antes de uso real.
- O progresso local é individual a cada navegador e pode ser perdido ao limpar dados do site.
- O comprovante gerado é identificado como teste, não certificado oficial.
