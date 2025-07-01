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

module.exports = {
    rollDice,
    getRandomBlock,
    getRandomEfeitoN,
    getRandomEfeitoS,
};