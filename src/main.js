let config = {
    type: Phaser.CANVAS,
    width: 960,
    height:720,
    scene: [Tutorial, Tutorial1, LevelOne, LevelOnePast],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    }
};

let game = new Phaser.Game(config);
//Some Macros
let MAX_WALK_SPEED = 150;


//Switch Time Mechanics global variable
let switchTimeKey;
let isPast = false;

//Save player location
let L0StartX = 200;
let L0StartY = 450;
let playerX = 200;
let playerY = 450;

//Save enemy location
let direction = true;
let L0StartX1 = 50;
let L0StartY1 = 95;
let enemy1X = 50;
let enemy1Y = 95;

//control input
let leftKey, rightKey, climbKey, interactKey;

//Inventory variable
let inventory = new Inventory();

//level 1 - seed is planted variable
var seedIsPlanted = false;

