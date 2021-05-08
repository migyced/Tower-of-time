class Tutorial1 extends Phaser.Scene {
    constructor()
    {
        super('tutorialLevelOld');
    }

    preload()
    {
        this.load.image("player", "assets/testplayer.png");
    }

    create()
    {
        this.player = new Player(this, playerX, playerY, "player");
        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update()
    {
        this.player.update();
        //change Time
        if(Phaser.Input.Keyboard.JustDown(switchTimeKey))
        {
            this.changeTime()
        }
    }

    changeTime()
    {
        playerX = this.player.x;
        playerY = this.player.y;
        this.scene.start("tutorialLevelNew")
    }
}