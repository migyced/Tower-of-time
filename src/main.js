let config = {
    type: Phaser.CANVAS,
    width: 960,
    height:720,
    scene: [/*Menu, Tutorial, Tutorial1,*/ LevelOne, LevelOnePast, End],
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
let L1StartX;//add location
let L1StartY;
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
let startKey, menuKey;
//Inventory variable
let inventory = new Inventory();

//level 1 - seed is planted variable
var seedIsPlanted = false;

