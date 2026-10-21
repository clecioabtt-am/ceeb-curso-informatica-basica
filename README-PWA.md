# CEEB Academy — PWA responsivo

- Instalação Android: Chrome > menu > Instalar aplicativo. iOS: Safari > Compartilhar > Adicionar à Tela de Início.
- O app tem ícones, manifest, service worker e modo standalone.
- O menu de módulos é recolhível no celular, sem substituir a aula por resumos.
- Conteúdo editado, imagens e vídeos dependem de D1/R2 online. Não há modo offline completo das aulas.
- O cache da PWA não armazena respostas de /api; atualizações de aulas dependem do D1.
- **Obrigatório**: configurar `COURSE_DB` em Cloudflare Worker Bindings ou ativar D1 no wrangler.toml com os valores reais. Sem D1, conteúdo editado pode existir apenas no computador de origem.
- Tabela mínima: `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, data TEXT NOT NULL);`
- Teste: abra `/api/health` e confirme `d1Configured:true` e `r2Configured:true`; depois salve uma aula, acesse em aba anônima e em outro celular.
- Antes de publicar, faça backup do banco e mantenha o projeto anterior.
