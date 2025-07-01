const personagens = require('./personagens');
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

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random= Math.random();
    let result;

    switch(true){
        case (random < 0.33):
            result= "RETA";
        break;

        case (random < 0.66):
            result = "CURVA";
        break;

        default:
            result = "CONFRONTO";
        break;
    
    }
    return result;
}
async function getRandomEfeitoN(){
    let random = Math.random();
    let result;

    switch(true){
        case (random < 0.50):
            result = "SHELL";
        break;

        case (random < 0.90):
            result = "BOMB";
        break;

        default:
            result = "ESQUIVO";
        break;
    }
    
    return result;
}
async function getRandomEfeitoS(){
    let random = Math.random();
    let result;
    switch(true){
        case (random < 0.50):
            result = "TURBO";
        break;
        default:
            result = "NDA";
        break;
    }
    return result;
}
async function logRollResult(character, diceResult, skillType, Attribute) {
    console.log
    (`🏁 ${character.NAME} 🎲 rolou um dado de ${skillType}: ${diceResult} + ${Attribute} = ${diceResult+Attribute}`);
    }
async function declareWinner(character1, character2) {
    console.log(`🏁🏎️  Resultado Final:`);
    console.log(`🏁 ${character1.NAME} - Ponto(s): ${character1.PONTOS}`);
    console.log(`🏁 ${character2.NAME} - Ponto(s): ${character2.PONTOS}`);
    if (character1.PONTOS > character2.PONTOS) 
        console.log(`🏁 ${character1.NAME} é o grande vencedor com ${character1.PONTOS} pontos! 🏆 `);
     else if (character2.PONTOS > character1.PONTOS) 
        console.log(`🏁 ${character2.NAME} é o grande vencedor com ${character2.PONTOS} pontos! 🏆`);
     else 
        console.log("🏁 A corrida terminou em empate!");
    
}
async function playerRaceEngine(character1, character2){
    for(let round=1;round <= 5; round++){
        console.log(`\n🏁 Rodada ${round} iniciada`)

        // sortear um bloco
        let block = await getRandomBlock();
        console.log(`🏁 A pista é ${block}`);

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalSkill1=0;
        let totalSkill2=0;
        let powerResult1=0;
        let powerResult2=0;

        if(block === "RETA"){
            totalSkill1 = character1.VELOCIDADE + diceResult1;
            totalSkill2 = character2.VELOCIDADE + diceResult2;
            await logRollResult(character1, diceResult1, "VELOCIDADE", character1.VELOCIDADE);
            await logRollResult(character2, diceResult2, "VELOCIDADE", character2.VELOCIDADE);

        } else if(block === "CURVA"){
            totalSkill1 = character1.MANOBRABILIDADE + diceResult1;
            totalSkill2 = character2.MANOBRABILIDADE + diceResult2;
            await logRollResult(character1, diceResult1, "MANOBRABILIDADE", character1.MANOBRABILIDADE);
            await logRollResult(character2, diceResult2, "MANOBRABILIDADE", character2.MANOBRABILIDADE);

        }else{
            powerResult1 = character1.PODER + diceResult1;
            powerResult2 = character2.PODER + diceResult2;
            await logRollResult(character1, diceResult1, "PODER", character1.PODER);
            await logRollResult(character2, diceResult2, "PODER", character2.PODER);
        }

        //verificar quem venceu
        if(block == "RETA" || block == "CURVA"){
            if(totalSkill1 > totalSkill2){
                console.log(`🏁 ${character1.NAME} venceu a rodada!`);
                character1.PONTOS += 1;
            } else if(totalSkill2 > totalSkill1){
                console.log(`🏁 ${character2.NAME} venceu a rodada!`);
                character2.PONTOS += 1;
            } else {
                console.log("🏁 Empate na rodada!");
            }
        }
        // confronto
        if(block === "CONFRONTO"){
            let efeito = await getRandomEfeitoN();
            let efeitoS = await getRandomEfeitoS();
            console.log(`🏁 Efeito: ${efeitoS}`);

            if(powerResult1 > powerResult2 && character2.PONTOS > 0 ){
                if( efeito === "SHELL"){
                    console.log(` 🐢🏎️  ${character1.NAME} usou uma casca de tartaruga\n 🏁 ${character2.NAME} Perdeu 1 ponto 🐢!`);
                    character2.PONTOS--;
                }else if(efeito === "BOMB" && character2.PONTOS > 1){
                    console.log(`💣🏎️  ${character1.NAME} usou uma bomba\n 🏁 ${character2.NAME} Perdeu 2 pontos 💣!`);
                    character2.PONTOS -= 2; 
                } else {
                    console.log(`🏁 ${character2.NAME} desviou do ataque de ${character1.NAME} 🏎️!`);
                }
                if(efeitoS === "TURBO"){
                    console.log(`🏁 ${character1.NAME} usou um turbo e ganhou 1 ponto extra!`);
                    character1.PONTOS++;
                }

            }
            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                if( efeito === "SHELL"){
                    console.log(` 🐢🏎️  ${character2.NAME} usou uma casca de tartaruga\n🏁 ${character1.NAME} Perdeu 1 ponto 🐢!`);
                    character1.PONTOS--;
                }else if(efeito === "BOMB"  && character1.PONTOS > 1){
                    console.log(`💣🏎️  ${character2.NAME} usou uma bomba\n🏁 ${character1.NAME} Perdeu 2 pontos 💣!`);
                    character1.PONTOS -= 2; 
                } else {
                    console.log(`🏁 ${character1.NAME} desviou do ataque de ${character2.NAME} 🏎️!`);
                }

                if(efeitoS === "TURBO"){
                    console.log(`🏁 ${character2.NAME} usou um turbo ⚡ e ganhou 1 ponto extra!`);
                    character2.PONTOS++;
                }
            }
            console.log(powerResult1===powerResult2 ? "🏁 Empate na rodada!":"");
        }
        console.log("----------------------------------------------------------------\n");
    }
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
                    const player02 = escolherPersonagem(2);
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