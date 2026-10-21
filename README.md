# CEEB ACADEMY — Informática Básica (versão 2)

Projeto Cloudflare Worker + assets estáticos. Acesso do aluno liberado para testes.

## Publicação

1. Crie o repositório `ceeb-curso-informatica-basica` e envie o conteúdo desta pasta (não o ZIP fechado).
2. No Cloudflare, conecte o repositório em Workers & Pages e publique usando `npx wrangler deploy`.
3. Configure o secret `ADMIN_PASSWORD` no Worker. O secret `ADMIN_PASSWORD` é obrigatório; não há senha padrão no código.
4. Para alterações de conteúdo compartilhadas, crie D1 `ceeb-curso-basico-db`, execute o `schema.sql` no console e adicione ao `wrangler.toml`:

```toml
[[d1_databases]]
binding = "COURSE_DB"
database_name = "ceeb-curso-basico-db"
database_id = "ID_REAL_DO_SEU_D1"
```

5. Para upload direto de vídeo, crie bucket R2 `ceeb-curso-basico-files` e adicione:

```toml
[[r2_buckets]]
binding = "COURSE_FILES"
bucket_name = "ceeb-curso-basico-files"
```

6. Publique novamente. No canto superior direito, use 🚪 para administrar. Em cada módulo pode editar: título, introdução, ícone, duração, textos dos tópicos, links ou upload de vídeos individuais, práticas, quiz, alternativas, gabaritos e explicações.

## Limites e próximos passos

- Upload de vídeo MP4/WebM de até 100 MB; para arquivos maiores, hospede externamente e informe a URL HTTPS. Recomenda-se compactar vídeos antes do upload.
- A gamificação salva XP e conclusão no navegador (localStorage), sem identificação persistente do aluno. Não é validação antifraude nem registro oficial de horas.
- As práticas originais ainda usam marcação manual; os simuladores de Windows, digitação, Excel e pastas seguem didáticos e básicos. Para validação automática de cada missão, desenvolver exercícios especializados por tópico.
- Videoaulas não estão pré-carregadas: o administrador deverá adicioná-las. A aba de vídeo foi criada para todos os tópicos.
- A plataforma principal CEEB ACADEMY e o Asaas não foram alterados.

## Correção de autenticação dos uploads

As sessões agora usam tokens assinados com HMAC-SHA256, válidos entre instâncias do Cloudflare Worker por 8 horas. Configure `ADMIN_PASSWORD` como secret no Worker. Opcionalmente, configure também `ADMIN_SESSION_SECRET` com uma chave aleatória longa e independente. Depois do deploy, saia do painel administrativo e entre novamente para receber um token novo.

**Observação:** o logout remove o token do navegador, mas não revoga imediatamente um token já copiado; ele expira em até 8 horas. Alterar `ADMIN_SESSION_SECRET` invalida todas as sessões. O endpoint de upload continua limitado a 100 MB, mas limites efetivos da plataforma Cloudflare podem ser menores conforme o plano.


## V4 — diagnóstico de login
- Login exibe mensagens reais da API em vez de uma mensagem genérica.
- GET `/api/health` informa se os bindings R2, D1 e o secret de senha estão presentes (sem expor valores).
- Binding R2 `COURSE_FILES` configurado para `ceeb-curso-basico-files`.
- Secret `ADMIN_PASSWORD` deve ser definido no ambiente de produção do Worker.
- D1 `COURSE_DB` ainda precisa ser vinculado separadamente para publicar edições para todos os alunos.


## V5 — diagnóstico e deploy

- A rota `/api/health` retorna apenas indicadores booleanos (não revela segredos).
- Erros inesperados retornam `WORKER_INTERNAL_ERROR` e ficam registrados em Observability > Logs.
- O login devolve `ADMIN_SESSION_SIGNING_FAILED` caso a assinatura da sessão falhe.
- Bucket R2: `ceeb-curso-basico-files` com binding `COURSE_FILES`.
- Defina `ADMIN_PASSWORD` em Settings > Variables and Secrets no ambiente de produção.
- A persistência das alterações do curso exige configurar o binding D1 `COURSE_DB` com o ID real do banco e aplicar `schema.sql`.
- O deploy automático depende de a integração Cloudflare Builds/GitHub receber os eventos de push. O ZIP não consegue reparar uma integração externa que não esteja acionando builds.
- Faça upload dos arquivos extraídos na raiz da branch `main`, preservando as pastas `src` e `public`. Verifique em Cloudflare > Deployments se o commit novo aparece.


## V6 — correção de login administrativo

Corrigida a importação da chave Web Crypto para HMAC-SHA-256 em `src/worker.js`.
O algoritmo de hash é obrigatório em `crypto.subtle.importKey` para chaves HMAC; sua ausência causava falha HTTP 500 após a senha correta.

No Cloudflare Production mantenha os Secrets `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET`.
Para usar D1, mantenha no `wrangler.toml` o binding `COURSE_DB` com o `database_id` real do banco.
O pacote preserva a configuração original do wrangler.toml para evitar inserir UUID desconhecido; caso já tenha um `wrangler.toml` funcional com D1, preserve sua seção `[[d1_databases]]` ao atualizar.


## Editor ilustrado e múltiplos vídeos
No ADM, selecione um módulo e cole texto formatado no editor de cada tópico. Envie imagens JPG/PNG/WebP ao R2 (até 8 MB por arquivo). Cada vídeo enviado é adicionado à lista do tópico; também é possível colocar links HTTPS, um por linha. Na visão do aluno, use as setas para alternar entre vídeos. Clique em Salvar alterações para publicar no D1.

Atenção: imagens coladas de sites externos podem não ser transportadas pelo navegador; nesse caso, envie os arquivos pelo botão Inserir imagens. Elementos interativos do ChatGPT não são transferidos automaticamente. O editor preserva HTML básico, tabelas, listas, títulos e imagens HTTPS; scripts e embeds são removidos por segurança.

Para ativar o D1, descomente [[d1_databases]] em wrangler.toml e substitua database_id pelo ID real. Execute schema.sql no banco remoto ou no SQL Editor do painel Cloudflare. O schema usa CREATE TABLE IF NOT EXISTS e preserva dados existentes.
