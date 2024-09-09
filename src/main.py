import psycopg2
import sys
import random

# Conexão com o banco de dados
def connect_db():
    try:
        connection = psycopg2.connect(
        dbname="Mud_data",
        user="postgres",
        password="sua_senha_aqui",  # Substitua por sua senha
        host="localhost"
    )

        return connection
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        sys.exit(1)

def create_account(cursor, connection):
    nome = input("Digite o nome de usuário: ")
    senha = input("Digite a senha: ")
    nivel_id = 1  # Definindo nível inicial
    experiencia = 0
    saude = 100
    dano = 10
    warframe_descricao = "Descrição padrão"
    warframe_habilidades = "Habilidades padrão"
    local_atual_id = 1  # Definindo local inicial
    
    try:
        cursor.execute("""
            INSERT INTO Jogadores (nome, senha, nivel, experiencia, saude, dano, nivel_id, warframe_descricao, warframe_habilidades, local_atual_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (nome, senha, nivel_id, experiencia, saude, dano, nivel_id, warframe_descricao, warframe_habilidades, local_atual_id))
        connection.commit()  # Confirma a transação
        print("Conta criada com sucesso!")
    except Exception as e:
        print(f"Erro ao criar conta: {e}")


# Autenticação do jogador
def login(cursor):
    nome = input("Digite o nome de usuário: ")
    senha = input("Digite a senha: ")
    cursor.execute("SELECT * FROM Jogadores WHERE nome = %s AND senha = %s", (nome, senha))
    jogador = cursor.fetchone()
    if jogador:
        return jogador
    else:
        print("Nome de usuário ou senha incorretos.")
        return None

# Mostrar o status do jogador
def show_status(jogador):
    print(f"Nome: {jogador[1]}")
    print(f"Nível: {jogador[3]}")
    print(f"Experiência: {jogador[4]}")
    print(f"Saúde: {jogador[5]}")
    print(f"Dano: {jogador[6]}")

# Inventário temporário na memória
inventario_temporario = []

# Função para encontrar um item aleatório
def find_random_item(cursor):
    cursor.execute("SELECT * FROM Itens ORDER BY RANDOM() LIMIT 1")
    item = cursor.fetchone()
    return item

# Função para usar um item
def use_item(jogador):
    if not inventario_temporario:
        print("Você não tem itens no inventário temporário.")
        return
    
    print("Itens disponíveis no inventário temporário:")
    for i, item in enumerate(inventario_temporario):
        print(f"{i + 1}. {item[1]}")  # item[1] é o nome do item

    escolha = int(input("Escolha o número do item que deseja usar: ")) - 1
    if 0 <= escolha < len(inventario_temporario):
        item_selecionado = inventario_temporario[escolha]
        if item_selecionado[1] == "Poção de Saúde":
            curar = min(50, 100 - jogador[5])  # Cura 50 pontos, mas não ultrapassa a vida máxima
            nova_saude = jogador[5] + curar
            jogador[5] = nova_saude  # Atualiza saúde do jogador
            print(f"Você usou uma Poção de Saúde e curou {curar} pontos de saúde!")
        elif item_selecionado[1] == "Comida":
            curar = min(10, 100 - jogador[5])  # Cura 10 pontos, mas não ultrapassa a vida máxima
            nova_saude = jogador[5] + curar
            jogador[5] = nova_saude  # Atualiza saúde do jogador
            print(f"Você usou Comida e curou {curar} pontos de saúde!")
        
        inventario_temporario.pop(escolha)  # Remove o item do inventário temporário
    else:
        print("Escolha inválida.")

# Função de combate
def combat(cursor, jogador, monstro_id):
    # Recuperar informações do monstro
    cursor.execute("SELECT * FROM Monstros WHERE id = %s", (monstro_id,))
    monstro = cursor.fetchone()
    
    if not monstro:
        print("Monstro não encontrado.")
        return False
    
    vida_original = monstro[6]  # Vida original do monstro
    vida_monstro = vida_original  # Vida do monstro durante o combate
    saude_original = jogador[5]  # Saúde original do jogador
    saude_jogador = saude_original  # Saúde do jogador durante o combate
    
    print(f"\nVocê está enfrentando: {monstro[1]} (Vida: {vida_monstro})")
    
    while vida_monstro > 0:
        print("\nAções disponíveis:")
        print("1. Atacar")
        print("2. Fugir")
        acao = input("Escolha uma ação: ")
        
        if acao == "1":
            # Atacar o monstro
            dano_inimigo = jogador[6]  # Dano do jogador
            vida_monstro -= dano_inimigo
            if vida_monstro <= 0:
                print(f"\nVocê derrotou o monstro {monstro[1]}!")
                # Chance de encontrar um item
                if random.random() < 0.5:  # 50% de chance
                    item = find_random_item(cursor)
                    if item:
                        print(f"Você encontrou um item: {item[1]}!")
                        inventario_temporario.append(item)
                        print(f"Item {item[1]} adicionado ao inventário temporário.")
                return True  # Combate concluído
            else:
                print(f"Você causou {dano_inimigo} de dano. Vida do monstro: {vida_monstro}")
        
        elif acao == "2":
            # Fugir do combate
            print("Você fugiu do combate.")
            return False
        
        else:
            print("Ação inválida.")
        
        # O monstro ataca o jogador
        dano_monstro = monstro[5]  # Dano do monstro
        saude_jogador -= dano_monstro  # Atualiza saúde do jogador
        if saude_jogador <= 0:
            saude_jogador = 0
            print(f"O monstro {monstro[1]} te derrotou!")
            return False
        
        # Atualizar e mostrar a saúde do jogador
        print(f"Saúde do jogador: {saude_jogador}")

    # Restaurar a saúde original do jogador após o combate
    jogador[5] = saude_original

# Navegar entre mundos e regiões
def explore(cursor, jogador):
    # Escolher o mundo
    print("Escolha um mundo para explorar:")
    print("1. Terra")
    print("2. Marte")
    print("3. Vênus")
    escolha_mundo = input("Escolha o número do mundo: ")

    if escolha_mundo == "1":
        id_inicio = 1
        id_fim = 3
    elif escolha_mundo == "2":
        id_inicio = 4
        id_fim = 6
    elif escolha_mundo == "3":
        id_inicio = 7
        id_fim = 9
    else:
        print("Mundo inválido.")
        return

    # Exibir regiões do mundo escolhido
    cursor.execute("SELECT * FROM Mapa WHERE id BETWEEN %s AND %s", (id_inicio, id_fim))
    regioes = cursor.fetchall()

    print("\nRegiões disponíveis:")
    for i, regiao in enumerate(regioes):
        print(f"{i + 1}. {regiao[1]} - ID: {regiao[0]}")

    escolha_regiao = int(input("Escolha a região que deseja explorar: ")) - 1

    if 0 <= escolha_regiao < len(regioes):
        regiao_selecionada = regioes[escolha_regiao]
        print(f"\nVocê está na região: {regiao_selecionada[1]}")
        print(f"Descrição: {regiao_selecionada[2]}")
        conexoes = regiao_selecionada[5].split(", ")
        print("Você pode ir para: ", ", ".join(conexoes))

        # Mostrar monstros na região
        nivel_regiao = regiao_selecionada[0]
        cursor.execute("SELECT * FROM Monstros WHERE nivel = %s", (nivel_regiao,))
        monstros = cursor.fetchall()
        
        if monstros:
            print("Monstros na região:")
            for monstro in monstros:
                print(f"- {monstro[1]} (Nível: {monstro[3]})")
            
            escolha_monstro = int(input("Escolha o número do monstro para enfrentar: ")) - 1
            if 0 <= escolha_monstro < len(monstros):
                monstro_selecionado = monstros[escolha_monstro]
                combat(cursor, jogador, monstro_selecionado[0])
            else:
                print("Monstro inválido.")
        else:
            print("Não há monstros nesta região.")
    else:
        print("Região inválida.")

def main():
    connection = connect_db()
    cursor = connection.cursor()

    while True:
        print("Menu:")
        print("1. Criar conta")
        print("2. Login")
        print("3. Sair")
        escolha = input("Escolha uma opção: ")

        if escolha == "1":
            create_account(cursor, connection)
        elif escolha == "2":
            jogador = login(cursor)
            if jogador:
                while True:
                    print("\nMenu do Jogador:")
                    print("1. Mostrar status")
                    print("2. Explorar")
                    print("3. Usar item")
                    print("4. Sair")
                    opcao = input("Escolha uma opção: ")
                    
                    if opcao == "1":
                        show_status(jogador)
                    elif opcao == "2":
                        explore(cursor, jogador)
                    elif opcao == "3":
                        use_item(jogador)
                    elif opcao == "4":
                        break
                    else:
                        print("Opção inválida.")
        elif escolha == "3":
            print("Saindo...")
            break
        else:
            print("Opção inválida.")

    cursor.close()
    connection.close()

if __name__ == "__main__":
    main()
