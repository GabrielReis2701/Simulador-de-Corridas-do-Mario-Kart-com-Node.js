const personagens = require('./personagens');
// Importando as funções de regras e logs do arquivo rulesAndLogs.js
const { declareWinner, playerRaceEngine } = require('./services/rulesAndLogs');
// Importando os personagens do arquivo personagens.js
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function escolherPersonagem(numero) {
    // Retorna uma cópia do personagem para evitar modificar o original
    return { ...personagens[numero - 1] };
}

function exibirPersonagens() {
    console.log("\nLista de personagens:");
    personagens.forEach((p, i) => {
        console.log(`${i + 1} - ${p.NAME} | Velocidade: ${p.VELOCIDADE} | Manobrabilidade: ${p.MANOBRABILIDADE} | Poder: ${p.PODER}`);
    });
    console.log("");
}

(async function mainMenu() {
    readline.question(
        "Escolha uma opção:" +
        "\n1 - Exibir lista de personagens\n2 - Iniciar o jogo\n3 - Sair\nOpção: ",
        async (opcao) => {
            if (opcao === "1") {
                exibirPersonagens();
                await mainMenu();
            } else if (opcao === "2") {
                readline.question('Escolha o número do primeiro personagem (1 a 6): ', async (num1) => {
                    const player01 = escolherPersonagem(Number(num1));
                    const player02 = escolherPersonagem(Math.floor(Math.random() * 6) + 1);
                    if(player01.NAME === player02.NAME) {
                        if (!player01.NAME.includes("(Player 1)")) {
                            player01.NAME = player01.NAME + " (Player 1)";
                        }
                        if (!player02.NAME.includes("(Player 2)")) {
                            player02.NAME = player02.NAME + " (Player 2)";
                        }
                    }
                    console.log(`🏁🏎️  Corrida entre ${player01.NAME} e ${player02.NAME} começando...\n`);
                    await playerRaceEngine(player01, player02);
                    await declareWinner(player01, player02);
                    readline.close();
                });
            } else if (opcao === "3") {
                console.log("Saindo...");
                readline.close();
            } else {
                console.log("Opção inválida!\n");
                await mainMenu();
            }
        }
    );
})();