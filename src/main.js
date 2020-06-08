let config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    width: 840,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
            
        }
    },
    scene: [Menu, Instructions, CaseFile ,Intro, Intro2, Intro3, Level1,Level2,Level3,transition1s,transition2s,transition3s,transition1e,transition2e,transition3e, Gameover, Cleared,Complete,Thankyou,transmenu],
};

let game = new Phaser.Game(config);
function create()
{
    game.input.mouse.capture = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
}
game.settings = {
    gameTimer: 60000,    
}


// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT,keyPrev,keyNext,keyB, keySPACE;
let timer;
let keyR, keyM
let dialog_cursor = null

let one, two, three
game.state = {
    gameOver: false,
    played_death: false,
    collectedButton: false,
    hitPin: false,
    health: 3
    
}

game.persist = {
    highScore: 0,
    currScore: 0,
    buttonScore: 0,

    isNew: false    // this is handled in the Play.js, so we need info carried over from Play to GameOver Scene

}

game.gameOver =
{

    currentLevel : null
}



game.wordIndex = 
{
    i0: false,
    i1: false,
    i2: false,
    i3: false,
    i4: false,
    i5: false,
    i6: false,
    i7: false,
    i8: false,
    i9: false,
    i10: false,


    collected: false
}


game.level2 = 
{
    currentDialog: null
}

game.playerCoord = 
{
    x:0,
    y:0
}

var controlpage
function update()
{
    game.mousedown = game.input.activePointer.leftButton.isDown;
    console.log(game.mousedown);
}



game.cleared = 
{
    L1 : false,
    L2 : false,
    L3 : false,
}