# 👾 Warframe

## Sobre o Projeto

![Warframe](./docs/assets/capa.png)

Este repositório é dedicada ao desenvolvimento do Jogo inspirado no universo do jogo Warframe, da turma de sistema de banco de dados 1 da Faculdade do Gama - Universidade de Brasília (FGA-UnB) durante o 1º semestre de 2024.

## 🎮 Sobre o Jogo

Warframe é um jogo de tiro em terceira pessoa online, com elementos de ação e RPG, desenvolvido pela Digital Extremes. O jogo é ambientado em um universo de ficção científica futurista, onde os jogadores assumem o papel de Tenno, uma raça de guerreiros antigos equipados com exo-armaduras chamadas Warframes. Esses Warframes possuem habilidades únicas e poderes especiais, permitindo aos jogadores personalizar suas estratégias de combate.

Os jogadores embarcam em missões em diversos planetas e luas do sistema solar, enfrentando diferentes facções inimigas, como os Grineer, Corpus, e Infested, entre outras. As missões incluem objetivos variados, como resgatar reféns, defender áreas, coletar recursos ou eliminar alvos específicos.

O jogo é conhecido por sua ênfase na mobilidade e nos combates ágeis. Os jogadores podem correr, saltar, escalar paredes, deslizar, e usar movimentos acrobáticos para se movimentar pelo ambiente de jogo.

Além das missões PvE, Warframe também possui modos de jogo PvP (jogador contra jogador) em arenas, onde os jogadores podem competir entre si. O jogo é gratuito para jogar, com transações dentro do jogo para comprar itens cosméticos e outros itens opcionais.

Warframe também tem um forte componente de coleta e personalização, com uma grande variedade de armas, mods (modificações) e itens para descobrir e aprimorar ao longo do jogo.

## :interrobang: Como jogar?

# Passo a passo para rodar o código MUD com PostgreSQL

Este guia mostra como configurar e rodar o código Python que se conecta a um banco de dados PostgreSQL para gerenciar um jogo MUD com criação de contas, login e exploração.

## Pré-requisitos

1. **Python 3.x**: Verifique se você tem o Python 3.x instalado.
   - Para instalar: 
     ```bash
     sudo apt install python3
     ```

2. **PostgreSQL**: Instale o PostgreSQL e crie um banco de dados.
   - Para instalar o PostgreSQL:
     ```bash
     sudo apt install postgresql postgresql-contrib
     ```
   - Para acessar o PostgreSQL:
     ```bash
     sudo -u postgres psql
     ```
   - Modifique esse parte do codigo para os dados referentes ao seu banco de dados
     ```sql
      def connect_db():
        try:
            connection = psycopg2.connect(
            dbname="Mud_data",
            user="postgres",
            password="sua_senha_aqui",  # Substitua por sua senha
            host="localhost"
        )
     ```

3. **psycopg2**: O módulo `psycopg2` é necessário para a comunicação entre Python e PostgreSQL.
   - Para instalar:
     ```bash
     pip install psycopg2
     ```

4.  **Estrutura do Banco de Dados**:

  Antes de rodar o código, é necessário garantir que o banco de dados PostgreSQL esteja configurado corretamente com as tabelas e colunas necessárias, Use o [DDL.sql](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_02/DDL.sql) junto do [INSERT.sql
  ](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_02/INSERT.sql) para criar o banco apropriadamente.

5. **Execute o script Python**:
  ```bash   
    python3 main.py
  ```



## :handshake: Colaboradores

| <img src="https://avatars.githubusercontent.com/u/78980856?s=400&u=921d277b9f43db9a1f09325391b30bb23e2f6c1e&v=4" width="100px" style="border-radius: 50%;"> | <img src="https://avatars.githubusercontent.com/u/98053876?v=4" width="100px" style="border-radius: 50%;"> | <img src="https://avatars.githubusercontent.com/u/78981008?v=4" width="100px" style="border-radius: 50%;"> | <img src="https://avatars.githubusercontent.com/u/54339291?v=4" width="100px" style="border-radius: 50%;"> |
|:----------------------------------------------------------:|:------------------------------------------------:|:-------------------------------------------------------------:|:----------------------------------------------------:|
|[Hian Praxedes](https://github.com/HianPraxedes)      | [Algusto Caldas](https://github.com/Algusto-RC)     | [Silas Neres](https://github.com/Silas-neres)      | [Taynara Marcellos](https://github.com/TaynaraCris)      |
|200019520     | 202017521   | 200043536     | 211031833      |

## :paperclip: Apresentações

| Módulo | Link da gravação                                                                                    | Data       |
| ------ | --------------------------------------------------------------------------------------------------- | ---------- |
| 1      | [Apresentação Módulo 1](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/assets/videos/Apresentacao%20modulo%2001.mp4)   | 22/04/2024|
| 2      | [Apresentação Módulo 2](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/assets/videos/Apresentacao%20modulo%2002.mp4)                                 | 19/08/2024|
| 3      | [Apresentação Módulo 3](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/assets/videos/Apresentacao%20modulo%2003.mp4)                                 | 09/09/2024|

## :file_folder: Entregas

- Módulo 1

  - [Diagrama Entidade-Relacionamento](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_01/Diagrama%20Entidade%20Relacionamento.md)
  - [Dicionário de Dados](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_01/Dicion%C3%A1rio%20de%20Dados.md)
  - [Modelo Entidade-Relacionamento](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_01/modelo%20entidade%20relacionamento.md)
  - [Modelo Relacional](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_01/Modelo%20Relacional.md)

- Módulo 2

  - [Álgebra Relacional](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_02/%C3%81lgebra_Relacional.pdf)
  - [DML](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_02/DML.sql)
  - [DDL](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_02/DDL.sql)

- Módulo 3

  - [Triggers](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_03/Triggers.md)
  - [Views e PROCEDURES](https://github.com/SBD1/2024.1-Warframe/blob/main/docs/Entrega_03/viewProcedure.md)