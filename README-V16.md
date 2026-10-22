# CEEB Academy V16 — Avaliação final

- Aba de avaliação final após os 12 módulos, com 10 questões e quatro alternativas em português.
- Cada acerto vale 1,0 ponto. Aprovação com 5,0/10,0 (50%).
- A interface bloqueia até que os 12 módulos estejam concluídos no navegador.
- O endpoint /api/final/submit confere no D1 os registros aprovados dos quizzes dos 12 módulos e grava/resubstitui o resultado em final_assessments.
- Execute schema.sql no banco D1 antes da publicação. CREATE TABLE IF NOT EXISTS não apaga dados existentes.
- Esta versão ainda utiliza identificação anônima do navegador, NÃO é comprovação oficial de identidade. O controle de missões do laboratório permanece local e o servidor confere os quizzes no D1; para bloqueio acadêmico robusto entre aparelhos, será necessária autenticação do aluno e persistência das missões.
