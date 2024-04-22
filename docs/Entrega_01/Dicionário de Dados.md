## Histórico de versões

| Versão |    Data    | Descrição               | Autor                                                                                                                 |
| :----: | :--------: | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `1.0`  | 19/04/2024 | Criação do documento DD | [Hian Praxedes](https://github.com/HianPraxedes)
| `1.1`  | 20/04/2024 | Descrição das entidades | [Hian Praxedes](https://github.com/HianPraxedes)                                                                 |

# DD - Dicionário de Dados

> "Um dicionário de dados é uma coleção de nomes, atributos e definições sobre elementos de dados que estão sendo usados ​​em seu estudo. [...] O objetivo de um dicionário de dados é explicar o que todos os nomes e valores de variáveis ​​em sua planilha realmente significam. Em um dicionário de dados podem ser encontrados dados sobre os nomes das variáveis ​​exatamente como aparecem na planilha, nomes de variáveis ​​curtos (mas legíveis por humanos), o intervalo de valores ou valores aceitos para a variável, descrição da variável e outras informções pertinentes."(Dados Científicos: como construir metadados, descrição, readme, dicionário-de-dados e mais; Agência de Bibliotecas e Coleções Digitais da Universidade de São Paulo)

### **Jogadores**

A entidade "Jogadores" armazena informações sobre cada jogador no jogo, incluindo seus dados de conta, progresso de nível, atributos, e warframe associado. Ela também armazena a localização atual do jogador no mapa do jogo.

| Nome Variável      | Tipo         | Descrição                                       | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições   |
|-------------------|--------------|-------------------------------------------------|---------------------|------------------------|----------|---------------------|
| id                | INT          | Identificador único do jogador e do Warframe    | Inteiro positivo    | Não                    | Sim      | Autoincremental     |
| nome              | VARCHAR(50)  | Nome do jogador e do Warframe                   | Texto               | Não                    | Não      | Único               |
| senha             | VARCHAR(255) | Senha do jogador (armazenada com hash seguro)    | Texto               | Não                    | Não      |                     |
| nivel             | INT          | Nível atual do jogador                           | Inteiro positivo    | Não                    | Não      |                     |
| experiencia       | INT          | Experiência acumulada pelo jogador              | Inteiro positivo    | Não                    | Não      |                     |
| saude             | INT          | Quantidade de saúde do jogador                  | Inteiro positivo    | Não                    | Não      |                     |
| dano              | INT          | Quantidade de dano que o jogador pode causar     | Inteiro positivo    | Não                    | Não      |                     |
| nivel_id          | INT          | Identificador do nível atual do jogador         | Inteiro positivo    | Não                    | Não      | Chave estrangeira para tabela Níveis |
| warframe_descricao | TEXT        | Descrição do Warframe                           | Texto               | Sim                    | Não      |                     |
| warframe_habilidades | TEXT     | Lista de habilidades do Warframe                | Texto               | Sim                    | Não      |                     |
| local_atual_id    | INT          | Identificador da área ou ambiente do mapa onde o jogador se encontra atualmente | Inteiro positivo | Não       | Não      | Chave estrangeira para tabela Mapa |

### **Mapa**

A entidade "Mapa" armazena informações sobre as áreas ou ambientes no jogo, incluindo detalhes sobre o tipo de área, nível de dificuldade, recursos disponíveis e áreas adjacentes conectadas.

| Nome Variável     | Tipo         | Descrição                                       | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições    |
|-------------------|--------------|-------------------------------------------------|---------------------|------------------------|----------|----------------------|
| id                | INT          | Identificador único da área ou ambiente no mapa | Inteiro positivo    | Não                    | Sim      | Autoincremental      |
| nome              | VARCHAR(50)  | Nome da área ou ambiente                         | Texto               | Não                    | Não      |                      |
| descricao         | TEXT         | Descrição da área ou ambiente                   | Texto               | Não                    | Não      |                      |
| tipo              | VARCHAR(50)  | Tipo de área (cidade, floresta, deserto, espaço, etc.) | Texto           | Não | Não |                      |
| nivel_dificuldade | INT          | Nível de dificuldade da área para o jogador     | Inteiro positivo    | Não                    | Não      |                      |
| conexoes          | TEXT         | Lista de áreas adjacentes conectadas a essa área | Texto               | Sim                    | Não      |                      |
| recursos          | TEXT         | Lista de recursos disponíveis na área           | Texto               | Sim                    | Não      |                      |

### **Equipamentos**

A entidade "Armas" armazena informações sobre as armas disponíveis no jogo, incluindo detalhes sobre seu tipo, dano causado e identificação do jogador que as possui.

| Nome Variável     | Tipo         | Descrição                                      | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições |
|-------------------|--------------|-----------------------------------------------|---------------------|------------------------|----------|-------------------|
| id                | INT          | Identificador único da arma                  | Inteiro positivo    | Não                    | Sim      | Autoincremental  |
| nome              | VARCHAR(50)  | Nome da arma                                 | Texto               | Não                    | Não      |                  |
| descricao         | TEXT         | Descrição da arma                           | Texto               | Não                    | Não      |                  |
| tipo              | VARCHAR(50)  | Tipo de arma (rifle, pistola, etc.)          | Texto               | Não                    | Não      |                  |
| dano              | INT          | Quantidade de dano que a arma causa          | Inteiro positivo    | Não                    | Não      |                  |
| jogador_id        | INT          | Identificador do jogador proprietário da arma | Inteiro positivo   | Não                    | Não      | Chave estrangeira para tabela Jogadores |

### **Missoes**

A entidade "Missoes" armazena informações sobre as missões disponíveis no jogo, incluindo seu nome, descrição, nível de dificuldade e recompensa. Também contém detalhes sobre o local da missão e o jogador que a aceitou.

| Nome Variável     | Tipo         | Descrição                                      | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições  |
|-------------------|--------------|-----------------------------------------------|---------------------|------------------------|----------|--------------------|
| id                | INT          | Identificador único da missão                 | Inteiro positivo    | Não                    | Sim      | Autoincremental   |
| nome              | VARCHAR(50)  | Nome da missão                                | Texto               | Não                    | Não      |                  |
| descricao         | TEXT         | Descrição da missão                          | Texto               | Não                    | Não      |                  |
| dificuldade       | INT          | Nível de dificuldade da missão               | Inteiro positivo    | Não                    | Não      |                  |
| recompensa        | TEXT         | Recompensa da missão                         | Texto               | Sim                    | Não      |                  |
| local_id          | INT          | Identificador da área ou ambiente do mapa onde a missão acontece | Inteiro positivo | Não | Não | Chave estrangeira para tabela Mapa |
| jogador_id        | INT          | Identificador do jogador que aceitou a missão | Inteiro positivo    | Não                    | Não      | Chave estrangeira para tabela Jogadores |

### **Itens**

A entidade "Itens" armazena informações sobre os itens no jogo, incluindo seus nomes, descrições e quantidades. Ela também armazena informações sobre o jogador que possui o item e o local onde o item pode ser encontrado.

| Nome Variável     | Tipo         | Descrição                                       | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições   |
|-------------------|--------------|-------------------------------------------------|---------------------|------------------------|----------|---------------------|
| id                | INT          | Identificador único do item                    | Inteiro positivo    | Não                    | Sim      | Autoincremental     |
| nome              | VARCHAR(50)  | Nome do item                                   | Texto               | Não                    | Não      |                     |
| descricao         | TEXT         | Descrição do item                             | Texto               | Não                    | Não      |                     |
| quantidade        | INT          | Quantidade do item no inventário do jogador   | Inteiro positivo    | Não                    | Não      |                     |
| jogador_id        | INT          | Identificador do jogador que possui o item    | Inteiro positivo    | Não                    | Não      | Chave estrangeira para tabela Jogadores |
| local_id          | INT          | Identificador da área ou ambiente do mapa onde o item pode ser encontrado | Inteiro positivo | Não | Não | Chave estrangeira para tabela Mapa |

### **Aliados**

A entidade "Aliados" armazena informações sobre aliados que podem acompanhar os jogadores, incluindo detalhes sobre seus níveis, habilidades e o relacionamento com o jogador.

| Nome Variável     | Tipo         | Descrição                                      | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições   |
|-------------------|--------------|-----------------------------------------------|---------------------|------------------------|----------|--------------------|
| id                | INT          | Identificador único do aliado                | Inteiro positivo    | Não                    | Sim      | Autoincremental  |
| nome              | VARCHAR(50)  | Nome do aliado                               | Texto               | Não                    | Não      |                  |
| descricao         | TEXT         | Descrição do aliado                         | Texto               | Não                    | Não      |                  |
| nivel             | INT          | Nível do aliado                              | Inteiro positivo    | Não                    | Não      |                  |
| habilidades       | TEXT         | Lista de habilidades do aliado              | Texto               | Não                    | Não      |                  |
| jogador_id        | INT          | Identificador do jogador relacionado ao aliado | Inteiro positivo  | Não                    | Não      | Chave estrangeira para tabela Jogadores |
| relacao           | VARCHAR(50)  | Tipo de relação entre o jogador e o aliado   | Texto               | Não                    | Não      |                  |

### **Monstros**

A entidade "Monstros" armazena informações sobre os monstros que os jogadores podem encontrar e enfrentar no jogo, incluindo detalhes sobre seus níveis de poder, dano causado e vida.

| Nome Variável     | Tipo         | Descrição                                      | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições   |
|-------------------|--------------|-------------------------------------------------|---------------------|------------------------|----------|---------------------|
| id                | INT          | Identificador único do monstro                 | Inteiro positivo    | Não                    | Sim      | Autoincremental     |
| nome              | VARCHAR(50)  | Nome do monstro                                | Texto               | Não                    | Não      |                     |
| descricao         | TEXT         | Descrição do monstro                          | Texto               | Não                    | Não      |                     |
| nivel             | INT          | Nível de poder ou dificuldade do monstro      | Inteiro positivo    | Não                    | Não      |                     |
| tipo              | VARCHAR(50)  | Tipo ou categoria do monstro (besta, mecânico, alienígena, etc.) | Texto | Não | Não | |
| dano              | INT          | Quantidade de dano que o monstro pode causar  | Inteiro positivo    | Não                    | Não      |                     |
| vida              | INT          | Quantidade de vida ou pontos de vida que o monstro possui | Inteiro positivo | Não | Não |                     |
| habilidades       | TEXT         | Lista de habilidades especiais do monstro     | Texto               | Sim                    | Não      |                     |
| local_id          | INT          | Identificador da área ou ambiente do mapa onde o monstro pode ser encontrado | Inteiro positivo | Não | Não | Chave estrangeira para tabela Mapa |

### **Níveis**

A entidade "Níveis" armazena informações sobre os níveis de progressão dos jogadores, incluindo a quantidade de experiência necessária para subir de nível e os atributos ganhos a cada nível.

| Nome Variável     | Tipo         | Descrição                                       | Valores Permitidos | Permite Valores Nulos? | É Chave? | Outras Restrições   |
|-------------------|--------------|-------------------------------------------------|---------------------|------------------------|----------|---------------------|
| nivel             | INT          | Nível do jogador                               | Inteiro positivo    | Não                    | Sim      |                     |
| exp_para_subir    | INT          | Quantidade de experiência necessária para subir de nível | Inteiro positivo | Não | Não |                  |
| aumento_saude     | INT          | Aumento de saúde ao atingir este nível        | Inteiro positivo    | Não                    | Não      |                     |
| aumento_dano      | INT          | Aumento de dano ao atingir este nível         | Inteiro positivo    | Não                    | Não      |                     |
| aumento_outros    | TEXT         | Lista de outros atributos ganhos ao atingir este nível (por exemplo, energia, velocidade, etc.) | Texto | Não | Não | |

