| Versão |    Data    | Descrição               | Autor                                                                                                                 |
| :----: | :--------: | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `1.0`  | 22/04/2024 | Criação do documento MER | [Taynara Cristina](https://github.com/TaynaraCris)|
| `1.1` | 22 /04/2024 | Atualização relacionamentos| [Taynara Cristina](https://github.com/TaynaraCris)

# MER - Modelo Entidade Relacionamento

> O Modelo Entidade Relacionamento (MER) é uma ferramenta que descreve entidades, seus atributos e relacionamentos em um domínio de negócios, fornecendo uma visão abstrata da estrutura do banco de dados. Ele ajuda a identificar entidades e seus relacionamentos.

## 1. Entidades
- Níveis;
- Aliados;
- Equipamento;
- Jogadores;
- Missões;
- Mapa;
- Itens;
- Monstros;

## 2. Atributos

- Níveis: nivel, exp_para_subir, aumento_saude, aumento_dano, aumento_outros;
- Aliados: id, nome, descricao, nivel, habilidades, jogador_id, relacao;
- Equipamento: id, nome, descricao, tipo, dano, jogador_id;
- Jogadores: warframe_descricao, id, warframe_habilidades, nome, local_atual_id, senha, nivel, experiencia, saude, dano, nivel_id;
- Missões: id, nome, descricao, dificuldade, recompensa, local_id, jogador_id;
- Mapa: id, nome, descricao, tipo, nivel_dificuldade, conexoes, recursos;
- Itens: id, nome, descricao, quantidade, jogadir_id, local_id;
- Monstros: local_id, id, nome, descricao, nivel, tipo, dano, vida, habilidades;

## 3. Relacionamentos

### Níveis *classifica* jogadores
- Cada nível pode classificar um ou vários jogadores (1, N);
- Um jogador pode ser classificado em nenhum ou vários níveis (0, N);

### Aliados *acompanha* joagores
- Cada jogador pode ser acompanhado por nenhum ou vários aliados (0, N);
- Um aliado pode acompanhar nenhum ou um jogador jogadores (0, 1);

### Jogadores *usa* equipamento
- Cada jogador pode usar nenhum ou vários equipamentos (0, N);
- Um equipamento pode ser usado por pelo menos um jogador(1,n);

### Jogadores *aceita* missões
- Cada jogador pode aceitar nenhuma ou várias missões (0, N);
- Uma missão pode ser aceita por nenhum ou vários jogadores (0,N);

### Jogadores *executa* monstros
- Cada jogador pode executar nenhum ou vários monstros (0, N);
- Um monstro pode ser executado por nenhum ou vários jogadores (0, N);

### Jogadores *coleta* itens
- Cada jogador pode coletar nenhum ou vários itens (0, N);
- Um item pode ser coletado por nenhum ou vários jogadores (0, N);

### Mapa *define* missões
- Cada mapa define uma única missão (1, 1);
- Cada missão é definida por um único mapa (1, 1);

### Mapa *abriga* monstros
- Cada mapa pode abrigar nenhum ou vários monstros (1, N);
- Um monstro pode ser abrigado por nenhum ou vários mapas (0,N);

### Monstros *entrega* itens
- Cada monstro pode entregar um ou vários itens (1, N);
- Cada item pode ser entregue por um monstro ou por possivelmente vários (1, N);