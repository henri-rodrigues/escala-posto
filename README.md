# Escala do Posto

Sistema web simples para montar a escala mensal de trabalho e folgas da equipe do posto de saúde.
É uma página única (HTML + JavaScript), sem servidor: funciona no GitHub Pages ou abrindo o `index.html`.

## O que faz

- **Escala do mês**: grade com os funcionários nas linhas e os dias nas colunas (nomes fixos ao rolar).
  Clique num dia para trocar entre **T** (trabalhando) e **F** (folga). A última linha mostra quantos trabalham no dia.
- **Gerar escala**: distribui as folgas automaticamente seguindo as regras abaixo.
- **Férias**: cadastre o período de férias de cada pessoa. Os dias aparecem como **V** e contam como ausência em
  todas as regras, então o sistema não dá folga a mais ninguém se isso deixar o dia abaixo do mínimo.
  Quem está de férias continua tendo folgas, proporcionais aos dias a trabalhar no mês
  (folgas do mês inteiro × dias a trabalhar ÷ dias do mês, arredondado, até 5). Ex.: dezembro com 15 dias de
  férias → 16 de 31 dias a trabalhar → 5 × 16 ÷ 31 = 2,6 → **3 folgas**. Férias que passam de um mês para o
  outro são contadas em cada mês separadamente.
- **Agenda**: dias em que o posto não funciona. Por padrão abre de segunda a sexta. Feriados nacionais, de SP e de
  Ribeirão Preto já vêm calculados para cada ano e marcados como fechados (pontos facultativos vêm abertos; tudo pode ser
  trocado). Também dá para marcar outros dias fechados (ponte, dedetização…). Nos dias fechados ninguém trabalha nem folga.
- **Conferência**: alertas em vermelho para falta de cobertura e observações em amarelo (folga pendente, sem segunda/sexta,
  quarta com menos gente).
- **PDF**: relatório do mês com a grade completa, as datas de folga e férias de cada pessoa e a conferência das regras.
- **Backup**: exportar e importar os dados em `.json` (aba Regras).

## Regras aplicadas

- Mínimo de 8 trabalhando por dia, nos dias com o posto aberto.
- Segunda a sexta: pelo menos 4 no turno 07H00 às 16H00 e 3 no turno 08H00 às 17H00.
- 5 folgas por mês por funcionário, sorteadas e espalhadas, só em dias com o posto aberto.
- Férias contam em dias corridos (inclusive fins de semana e feriados).
- Quando não cabem todas as folgas sem ficar abaixo do mínimo, as **quartas** ficam com menos gente; nos outros dias o
  mínimo é mantido. Se nem assim couber, a folga fica pendente.
- Pelo menos uma folga em segunda ou sexta, quando possível.
- Duplas que nunca folgam no mesmo dia (editáveis na aba Regras).
- Funcionário com 0 folgas não folga (ex.: Elisabete).

Os mínimos, os turnos, as folgas por mês e as duplas podem ser alterados no próprio site.

## Onde ficam os dados

Os dados ficam num banco de dados **Firebase (Firestore)**, compartilhado: todos que abrem o site veem e editam a mesma escala,
e as mudanças aparecem na hora nos outros computadores. Não há login: **qualquer pessoa com o link pode alterar**, então use
**Exportar dados** (aba Regras) de vez em quando para guardar um backup.

O arquivo `dados-iniciais.js` traz a equipe e a escala de novembro/2026. Ele é gravado no banco automaticamente na primeira vez
que o site abre com o banco vazio.

Enquanto o `firebase-config.js` não estiver preenchido, o site salva os dados só no navegador de quem usa (localStorage).

### Configurar o Firebase (uma vez)

1. Em https://console.firebase.google.com, clique em **Criar um projeto** (o Google Analytics pode ficar desligado).
2. No menu **Criação > Firestore Database**, clique em **Criar banco de dados**: escolha o local `southamerica-east1 (São Paulo)`
   e o **modo de produção**.
3. Na aba **Regras** do Firestore, apague o conteúdo, cole o do arquivo [`firestore.rules`](firestore.rules) e clique em **Publicar**.
4. Em **Configurações do projeto** (engrenagem) > **Seus apps**, clique no ícone **Web** (`</>`), dê um nome (ex.: `escala`) e
   registre o app. Copie o objeto `firebaseConfig` que aparece.
5. Cole os valores em [`firebase-config.js`](firebase-config.js), no lugar de `null`, e envie para o GitHub.

O plano gratuito (Spark) é mais que suficiente para este uso.

## Rodar localmente

```bash
python -m http.server 8000
```

Depois abra http://localhost:8000.
