# CEEB ACADEMY V14

Atualização a partir da V13. O módulo 1 continua respeitando os conteúdos personalizados publicados no D1. Os módulos 2 a 12 receberam exemplos e quadros visuais em português diretamente no material da aula. O módulo 12 foi renomeado para Revisão integrada de informática; a avaliação final permanece separada, liberada apenas quando os 12 módulos estiverem concluídos.

## SQL obrigatório
Execute **somente a nova instrução CREATE TABLE quiz_records** do schema.sql no Console do D1 `ceeb-curso-basico-db` antes de testar o histórico. `CREATE TABLE IF NOT EXISTS` não apaga registros existentes.

## Registro de quiz
As respostas são armazenadas neste navegador (para exibição imediata) e enviadas para D1 (um registro por módulo e identificador anônimo do navegador). Ao refazer um quiz, somente o registro daquele módulo é atualizado. O Worker calcula a nota no servidor. **Aviso**: sem login individual do aluno, este registro anônimo não comprova identidade acadêmica; a atribuição oficial exigirá autenticação. O avanço local ainda permanece neste navegador, sem sincronização entre dispositivos.

## Conteúdos
Os blocos didáticos são inclusões padronizadas em português e não reescrevem conteúdos salvos no D1. Foram criados 44 diagramas SVG didáticos com texto em português, além de quadros de exemplos responsivos. Não são fotografias ou capturas reais do Windows. Para incluir screenshots reais, use o editor administrativo e o R2.

## Implantação
Atualize o repositório e execute o deploy do Worker. Secrets e bindings do wrangler.toml são preservados.
