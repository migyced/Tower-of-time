let config = {
    type: Phaser.CANVAS,
    width: 960,
    height:640,
    scene: [LevelOne, LevelOnePast],
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
let playerX = 200;
let playerY = 400;

//control input
let leftKey, rightKey, climbKey;

