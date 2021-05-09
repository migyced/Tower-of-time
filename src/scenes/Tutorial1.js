class Tutorial1 extends Phaser.Scene {
    constructor()
    {
        super('tutorialLevelOld');
    }

    preload()
    {
        this.load.image("player", "assets/testplayer.png");
        this.load.image("plain", "assets/testplain.png");
        this.load.image("ladder", "assets/testladder.png");
    }

    create()
    {
        console.log("Past!");

        //add plain
        this.plain1 = this.add.tileSprite(0, 540, 960, 100, "plain").setOrigin(0);
        this.physics.add.existing(this.plain1);
        this.plain1.body.setAllowGravity(false);
        this.plain1.body.immovable = true;

        this.plain2 = this.add.tileSprite(32, 300, 960, 100, "plain").setOrigin(0);
        this.physics.add.existing(this.plain2);
        this.plain2.body.setAllowGravity(false);
        this.plain2.body.immovable = true;

        //add ladder
        this.ladder1 = this.add.tileSprite(0, 300, 32, 240, "ladder").setOrigin(0);
        this.physics.add.existing(this.ladder1);
        this.ladder1.body.setAllowGravity(false);
        this.ladder1.body.immovable = true;

        //add gravity
        this.physics.world.gravity.y = 1000;
        //add player
        this.player = new Player(this, playerX, playerY, "player");

        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //add collider
        this.physics.add.collider(this.player, this.plain1);
        this.physics.add.collider(this.player, this.plain2);
    }

    update()
    {
        this.player.update();
        //change Time
        if(Phaser.Input.Keyboard.JustDown(switchTimeKey))
        {
            this.changeTime();
<<<<<<< HEAD
=======
        }
        if(this.physics.overlap(this.player, this.ladder1) && climbKey.isDown)
        {
            console.log("overlap");
            this.player.climb();
            this.player.body.setAllowGravity(false);
        }
        else
        {
            this.player.body.setAllowGravity(true);
>>>>>>> 2c68f4bd32a9a9af636a66524eed0dec6dcc00f3
        }
    }

    changeTime()
    {
        playerX = this.player.x;
        playerY = this.player.y;
        this.scene.start("tutorialLevelNew");
    }
}