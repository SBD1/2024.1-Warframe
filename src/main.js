import { question } from "readline-sync";
import readlineSync from 'readline-sync';
import Api from "./api.js";

function askAndReturn(texto) {
  return question(texto);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

function separador() {
  console.log("===================================================================================================================\n")
}

async function primeiraTela() {
  try {
    console.clear();

    console.log(`
        ██     ██  █████  ██████  ██████  ███████ ███████ ███    ███ ███████ 
        ██     ██ ██   ██ ██   ██ ██   ██ ██      ██      ████  ████ ██      
        ██  █  ██ ███████ ██████  ██   ██ █████   █████   ██ ████ ██ █████   
        ██ ███ ██ ██   ██ ██      ██   ██ ██      ██      ██  ██  ██ ██      
         ███ ███  ██   ██ ██      ██████  ███████ ███████ ██      ██ ███████ 
                                                                  
     `);
        

    separador();
    console.log("Bem-vindo ao Warframe - MUD!\n");
    separador();

    const api = new Api();

    let r = askAndReturn(
      "1- Jogar\n2- Sair\n3- Criar e Popular Tabelas\n"
    );

    if (r == 3) {
      try {
        let table = await api.createTables();
        let popu = await api.populateTables();
        await sleep(1);
        console.clear();
        if (table && popu) {
          console.log("\n\nTabelas criadas e populadas com sucesso");
          separador();
          await sleep(1);
        }
      } catch (error) {
        console.log(error);
      }
      r = askAndReturn("1- Jogar\n2- Sair\n");
    }

    if (r == 2) {
      console.log("Banco desconectado com sucesso!");
      process.exit();
    }

    await segundaTela();

    async function segundaTela(){
      if (r == 1) {
        const infoJogador = await api.client.query('SELECT nomePersonagem, estado, vidaAtual, xp FROM PC');
        if (infoJogador.rows.length > 0) {
          const jogador = infoJogador.rows[0];
          console.log(`Seu Warframe é: ${jogador.nomepersonagem}, Estado: ${jogador.estado}\nVida Atual: ${jogador.vidaatual}, Experiência: ${jogador.xp}`);
        }

        const planetaAtual = await api.client.query(`
              SELECT p.nomePlaneta, p.descricaoPlaneta
              FROM Planeta p 
              JOIN Missao m ON m.idPlaneta = p.idPlaneta 
              JOIN PC c ON c.missao = m.idMissao
              `);

        if (planetaAtual.rows.length > 0) {
          const planeta = planetaAtual.rows[0];
          console.log(`\nVocê está no planeta: ${planeta.nomePlaneta}`);
          console.log(`Descrição: ${planeta.descricaoPlaneta}\n`);

          const missoesDoPlaneta = await api.client.query(`
                  SELECT idMissao FROM Missao WHERE idPlaneta = 1;
                  `);
          if (missoesDoPlaneta.rows.length > 0) {
            console.log("Missões disponíveis neste planeta:");
            missoesDoPlaneta.rows.forEach((missao, index) => {
              console.log(`${index + 1}. Missão ${missao.idMissao}`);
            });

            let escolhaMissaoOuCraft;
            do {
              escolhaMissaoOuCraft = askAndReturn("\nEscolha uma missão para iniciar ou pressione 'C' para Craft: ");
            } while (!['1', '2', 'C', 'c'].includes(escolhaMissaoOuCraft));

            if (escolhaMissaoOuCraft.toLowerCase() === 'c') {
              await mostrarReceitas();
            }

            async function mostrarReceitas() {
              console.log("\nReceitas de Crafting disponíveis:\n");
            
              const receitas = await api.client.query('SELECT * FROM Receita');
            
              if (receitas.rows.length > 0) {
                receitas.rows.forEach((receita, index) => {
                  console.log(`${index + 1}. Receita: ${receita.nomeReceita}, Descrição: ${receita.descricaoReceita}, Ingredientes: ${receita.idItem}`);
                });
            
                let escolhaReceita;
                do {
                  escolhaReceita = askAndReturn("\nEscolha o número da receita para realizá-la ou pressione 'V' para voltar: ");
                  
                  if (escolhaReceita.toLowerCase() === 'v') {
                    console.log("\n\n");
                    return segundaTela(); 
                  }
            
                  if (!isNaN(escolhaReceita) && escolhaReceita >= 1 && escolhaReceita <= receitas.rows.length) {
                    const receitaEscolhida = receitas.rows[parseInt(escolhaReceita) - 1];
                    console.log(`Você escolheu a receita: ${receitaEscolhida.nomeReceita}`);
            
                    await realizarReceita(receitaEscolhida);
            
                  } else {
                    console.log("Escolha inválida, tente novamente.");
                  }
                } while (true); 
              } else {
                console.log("Nenhuma receita de crafting disponível.");
              }
            }

            async function realizarReceita(receita) {
              try {
                console.log(`Realizando a receita: ${receita.nomeReceita}`);
                
                // Lógica de crafting no Warframe, como criação de armas, equipamentos etc.
                
              } catch (error) {
                console.error("Erro ao realizar a receita:", error.message || error);
              }
            }

            const query = 'UPDATE PC SET Missao = $1 WHERE IdPersonagem = $2';
            const values = [escolhaMissaoOuCraft, 1]; // Para o ID do personagem sendo 1

            await api.client.query(query, values);

            if (escolhaMissaoOuCraft == 1) {
              await api.mostrarInimigosDaMissao(escolhaMissaoOuCraft);
              const DialogoInicio = 1;
              const DialogoFim = 6;
              await api.mostrarDialogo(DialogoInicio, DialogoFim);
              await api.evento(escolhaMissaoOuCraft);
              await api.mostrarItensDaMissao(escolhaMissaoOuCraft);

              console.log("\nVocê encontrou alguns itens! Deseja pegá-los?");
              let choose = askAndReturn("S/N\n");

              if (choose.toLowerCase() == 's') {
                // Código para adicionar itens ao inventário
                console.log("\nItens adicionados ao inventário com sucesso!\n");
              } else {
                console.log("\nVocê não quis os itens.\n");
              }

              let escolha = askAndReturn("Deseja ver seu inventário?\nS/N\n");
              if (escolha.toLowerCase() == 's') {
                console.log("Seu inventário atual é:");
                await api.mostrarInventario();
              }
              console.log("\n\nVocê irá agora para a próxima missão, aguarde...");

              escolhaMissaoOuCraft = 2;
              await sleep(4);
              console.clear();
            }

            if (escolhaMissaoOuCraft == 2) {
              const DialogoInicio = 7;
              const DialogoFim = 8;
              await api.mostrarDialogo(DialogoInicio, DialogoFim);

              await api.missaoExploracao(escolhaMissaoOuCraft);

              var mis = askAndReturn("\nVocê aceita essa missão?\nS/N\n");

              if (mis.toLowerCase() == 's') {
                console.log("Missão aceita!");
                console.log("Você está saindo em exploração");

              } else {
                console.log("Missão recusada!");
              }
            }
        } else {
            console.log("Não há missões disponíveis neste planeta.");
          }
        } else {
          console.log("Não foi possível encontrar o planeta atual.");
        }
      } else {
        console.log("Erro: Opção inválida.");
      }
    }

    async function terceiraTela() {
      const escolhaMissao = await api.client.query('SELECT * FROM Missao WHERE idMissao = $1', [escolhaMissaoOuCraft]);
      if (escolhaMissao.rows.length > 0) {
        const missao = escolhaMissao.rows[0];

        console.log(`Você está em uma missão no planeta ${missao.nomeplaneta}.`);
        console.log(`Objetivo: ${missao.descricao}`);

        const inimigos = await api.mostrarInimigosDaMissao(escolhaMissaoOuCraft);
        if (inimigos.rows.length > 0) {
          console.log("Inimigos encontrados na missão:");
          inimigos.rows.forEach((inimigo, index) => {
            console.log(`${index + 1}. ${inimigo.nomeInimigo}`);
          });
        } else {
          console.log("Nenhum inimigo encontrado nesta missão.");
        }

        await api.missaoExploracao(escolhaMissaoOuCraft);

        let escolhaMissaoOuFim;
        do {
          escolhaMissaoOuFim = askAndReturn("\nPressione 'M' para voltar ao menu de missões ou 'F' para finalizar a missão: ");
        } while (!['M', 'm', 'F', 'f'].includes(escolhaMissaoOuFim));

        if (escolhaMissaoOuFim.toLowerCase() === 'm') {
          return segundaTela();
        } else if (escolhaMissaoOuFim.toLowerCase() === 'f') {
          console.log("Você completou a missão!");
          await api.finalizarMissao(escolhaMissaoOuCraft);

          const itens = await api.mostrarItensDaMissao(escolhaMissaoOuCraft);
          if (itens.rows.length > 0) {
            console.log("Itens encontrados na missão:");
            itens.rows.forEach((item, index) => {
              console.log(`${index + 1}. ${item.nomeItem}`);
            });

            let escolhaItens;
            do {
              escolhaItens = askAndReturn("\nPressione 'I' para adicionar itens ao inventário ou 'V' para voltar: ");
            } while (!['I', 'i', 'V', 'v'].includes(escolhaItens));

            if (escolhaItens.toLowerCase() === 'i') {
              await api.adicionarItensAoInventario(itens.rows);
              console.log("Itens adicionados ao inventário com sucesso!");
            } else if (escolhaItens.toLowerCase() === 'v') {
              console.log("Voltando...");
            }
          } else {
            console.log("Nenhum item encontrado nesta missão.");
          }

          let escolhaVerInventario;
          do {
            escolhaVerInventario = askAndReturn("\nDeseja ver seu inventário? (S/N): ");
          } while (!['S', 's', 'N', 'n'].includes(escolhaVerInventario));

          if (escolhaVerInventario.toLowerCase() === 's') {
            await api.mostrarInventario();
          } else {
            console.log("Inventário não visualizado.");
          }
        }

        console.log("Voltando ao menu principal...");
        await sleep(2);
        return segundaTela();
      } else {
        console.log("Missão não encontrada.");
      }
    }

    terceiraTela();
  } catch (error) {
    console.error("Erro:", error.message || error);
  }
}

primeiraTela();

