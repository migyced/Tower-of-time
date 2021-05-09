class LevelOnePast extends Phaser.Scene {
    constructor()
    {
        super('levelOnePast');
    }

    preload()
    {
        this.load.image("player", "assets/testplayer.png");
        this.load.image("plain", "assets/testplain.png");
        
    }

    create()
    {
        console.log("Past! LV1");
        this.hexColor = new Phaser.Display.Color(255, 85, 0);
        //add gravity
        this.physics.world.gravity.y = 1000;
        //add player
        this.player = new Player(this, playerX, playerY, "player");
        //add platforms
            //bottom left
        this.platform1 = this.add.tileSprite(0, 400, 250, 50, "plain").setOrigin(0);
        this.physics.add.existing(this.platform1);
        this.platform1.body.setAllowGravity(false);
        this.platform1.body.immovable = true;
            //bottom right
        this.platform2 = this.add.tileSprite(510, 400, 450, 50, "plain").setOrigin(0);
        this.physics.add.existing(this.platform2);
        this.platform2.body.setAllowGravity(false);
        this.platform2.body.immovable = true;
            //middle left
        this.platform3 = this.add.tileSprite(0, 250, 250, 50, "plain").setOrigin(0);
        this.physics.add.existing(this.platform3);
        this.platform3.body.setAllowGravity(false);
        this.platform3.body.immovable = true;
            //middle right
        this.platform4 = this.add.tileSprite(610, 250, 350, 50, "plain").setOrigin(0);
        this.physics.add.existing(this.platform4);
        this.platform4.body.setAllowGravity(false);
        this.platform4.body.immovable = true;
            //upper left
        this.platform5 = this.add.tileSprite(0, 100, 200, 50, "plain").setOrigin(0);
        this.physics.add.existing(this.platform5);
        this.platform5.body.setAllowGravity(false);
        this.platform5.body.immovable = true;
            //upper right
        this.platform6 = this.add.tileSprite(710, 100, 250, 50, "plain").setOrigin(0);
        this.physics.add.existing(this.platform6);
        this.platform6.body.setAllowGravity(false);
        this.platform6.body.immovable = true;
        //add stairs - needs function for climbing
        this.stair1 = this.add.tileSprite(50, 400, 20, 150, "player").setOrigin(0);
        this.physics.add.existing(this.stair1);
        this.stair1.body.setAllowGravity(false);
        this.stair1.body.immovable = true;
        //add plains
        this.plain1 = this.add.tileSprite(0, 540, 960, 100, "plain").setOrigin(0);
        this.physics.add.existing(this.plain1);
        this.plain1.body.setAllowGravity(false);
        this.plain1.body.immovable = true;

        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add collider
        this.physics.add.collider(this.player, this.plain1);
        this.physics.add.collider(this.player, this.platform1);
        this.physics.add.collider(this.player, this.platform2);
        this.physics.add.collider(this.player, this.platform3);
        this.physics.add.collider(this.player, this.platform4);
        this.physics.add.collider(this.player, this.platform5);
        this.physics.add.collider(this.player, this.platform6);
        //
        this.cameras.main.startFollow(this.player);
    }

    update()
    {
        this.player.update();
        //change Time
        if(Phaser.Input.Keyboard.JustDown(switchTimeKey))
        {
            this.changeTime();
        }
        this.cameras.main.setBackgroundColor(this.hexColor);

    }

    changeTime()
    {
        playerX = this.player.x;
        playerY = this.player.y;
        this.scene.start("levelOne");
    }
}