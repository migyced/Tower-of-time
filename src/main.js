let config = {
    type: Phaser.CANVAS,
    width: 960,
    height:720,
    scene: [Menu, Tutorial, Tutorial1, LevelOne, LevelOnePast, LevelTwo, LevelTwoPast, End],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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
let L1StartX = 200;//add location
let L1StartY = 450;
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
let seedIsPlanted = false;

//level 2 - control variable
let switch1On = false;
let switch2On = false;
let ladderStartX = 432
let ladderStartY = 100
let ladderX = ladderStartX;
let password = false;

//animation control
let isWalking = false;
let isClimbing = false;
let isPicking = false;

