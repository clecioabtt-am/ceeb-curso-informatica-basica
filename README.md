# CEEB ACADEMY — Informática Básica (versão 2)

Projeto Cloudflare Worker + assets estáticos. Acesso do aluno liberado para testes.

## Publicação

1. Crie o repositório `ceeb-curso-informatica-basica` e envie o conteúdo desta pasta (não o ZIP fechado).
2. No Cloudflare, conecte o repositório em Workers & Pages e publique usando `npx wrangler deploy`.
3. Configure o secret `ADMIN_PASSWORD` no Worker. A senha de testes solicitada é `Clecio40`; troque antes do lançamento.
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
