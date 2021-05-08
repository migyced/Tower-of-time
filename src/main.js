let config = {
    type: Phaser.CANVAS,
    width: 960,
    height:640,
    scene: [Tutorial],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
};

let game = new Phaser.Game(config);