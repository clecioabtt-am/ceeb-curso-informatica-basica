# CEEB ACADEMY — V17

- Tela inicial de acesso com logotipo original, matrícula opcional e botão **Acessar meu curso**.
- **Acesso de teste**: matrícula não é validada e não representa autenticação real. A matrícula é guardada somente na sessão do navegador; o registro do progresso no D1 continua vinculado ao identificador anônimo já existente.
- 44 perguntas (4 por módulo), uma por tópico, quatro alternativas A–D.
- Aprovação de quizzes permanece em 60%, junto às missões do laboratório.
- Avaliação final preservada: 10 questões, 2 pontos cada, mínimo 10/20.
- O editor administrativo suporta quatro alternativas.

**Atenção a dados anteriores no D1:** se o banco contiver `course_overrides` com quizzes antigos de 3 questões, a V17 utiliza os quizzes novos por padrão, sem apagar os textos, imagens, vídeos e demais personalizações. Para editar os quizzes novos no painel, abra cada módulo e salve-o.

**Publicação:** substitua os arquivos do repositório e faça deploy. Limpe o cache/PWA se necessário. Não é necessário executar SQL novo.

**Segurança:** o acesso livre é apenas para demonstração, não é um login autenticado nem separa progressos por matrícula. Para uso real com alunos, implementar autenticação e progresso por matrícula no servidor.
