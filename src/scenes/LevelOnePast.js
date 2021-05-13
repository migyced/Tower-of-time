class LevelOnePast extends Phaser.Scene {
    constructor()
    {
        super('levelOnePast');
    }

    preload()
    {
        this.load.image("player", "assets/testplayer.png");
        this.load.image("plain", "assets/testplain.png");
        this.load.image("ladder", "assets/testladder.png");
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.image("seed", "assets/testseed.png");

    }

    create()
    {
        console.log("Past! LV1");
        this.hexColor = new Phaser.Display.Color(255, 85, 0);
        //text config
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF'
        }
        //add gravity
        this.physics.world.gravity.y = 1000;
        
        //add platforms
            //bottom left
            this.platform1 = this.add.tileSprite(0, 400, 80, 50, "plain").setOrigin(0);
            this.platform1_1 = this.add.tileSprite(112, 400, 138, 50, "plain").setOrigin(0);
            this.physics.add.existing(this.platform1);
            this.physics.add.existing(this.platform1_1);
            this.platform1.body.setAllowGravity(false);
            this.platform1_1.body.setAllowGravity(false);
            this.platform1.body.immovable = true;
            this.platform1_1.body.immovable = true;
                //bottom right
            this.platform2 = this.add.tileSprite(510, 400, 140, 50, "plain").setOrigin(0);
            this.platform2_1 = this.add.tileSprite(682, 400, 278, 50, "plain").setOrigin(0);
            this.physics.add.existing(this.platform2);
            this.physics.add.existing(this.platform2_1);
            this.platform2.body.setAllowGravity(false);
            this.platform2_1.body.setAllowGravity(false);
            this.platform2.body.immovable = true;
            this.platform2_1.body.immovable = true;
                //middle left
            this.platform3 = this.add.tileSprite(0, 250, 10, 50, "plain").setOrigin(0);
            this.platform3_1 = this.add.tileSprite(42, 250, 208, 50, "plain").setOrigin(0);
            this.physics.add.existing(this.platform3);
            this.physics.add.existing(this.platform3_1);
            this.platform3.body.setAllowGravity(false);
            this.platform3_1.body.setAllowGravity(false);
            this.platform3.body.immovable = true;
            this.platform3_1.body.immovable = true;
                //middle right
            this.platform4 = this.add.tileSprite(610, 250, 190, 50, "plain").setOrigin(0);
            this.platform4_1 = this.add.tileSprite(832, 250, 128, 50, "plain").setOrigin(0);
            this.physics.add.existing(this.platform4);
            this.physics.add.existing(this.platform4_1);
            this.platform4.body.setAllowGravity(false);
            this.platform4_1.body.setAllowGravity(false);
            this.platform4.body.immovable = true;
            this.platform4_1.body.immovable = true;
                //upper left
            this.platform5 = this.add.tileSprite(0, 100, 83, 50, "plain").setOrigin(0);
            this.platform5_1 = this.add.tileSprite(82, 100, 100, 50, "plain").setOrigin(0);
            this.physics.add.existing(this.platform5);
            this.physics.add.existing(this.platform5_1);
            this.platform5.body.setAllowGravity(false);
            this.platform5_1.body.setAllowGravity(false);
            this.platform5.body.immovable = true;
            this.platform5_1.body.immovable = true;
                //upper right
            this.platform6 = this.add.tileSprite(710, 100, 190, 50, "plain").setOrigin(0);
            this.platform6_1 = this.add.tileSprite(932, 100, 28, 50, "plain").setOrigin(0);
            this.physics.add.existing(this.platform6);
            this.physics.add.existing(this.platform6_1);
            this.platform6.body.setAllowGravity(false);
            this.platform6_1.body.setAllowGravity(false);
            this.platform6.body.immovable = true;
            this.platform6_1.body.immovable = true;
            //add ladders
                //bottom left
            this.ladder1 = this.add.tileSprite(80, 400, 32, 140, "ladder").setOrigin(0);
            this.physics.add.existing(this.ladder1);
            this.ladder1.body.setAllowGravity(false);
            this.ladder1.body.immovable = true;
                //bottom right
            this.ladder2 = this.add.tileSprite(650, 400, 32, 140, "ladder").setOrigin(0);
            this.physics.add.existing(this.ladder2);
            this.ladder2.body.setAllowGravity(false);
            this.ladder2.body.immovable = true;
                //middle left
            this.ladder3 = this.add.tileSprite(10, 250, 32, 150, "ladder").setOrigin(0);
            this.physics.add.existing(this.ladder3);
            this.ladder3.body.setAllowGravity(false);
            this.ladder3.body.immovable = true;
                //middle right
            this.ladder4 = this.add.tileSprite(800, 250, 32, 150, "ladder").setOrigin(0);
            this.physics.add.existing(this.ladder4);
            this.ladder4.body.setAllowGravity(false);
            this.ladder4.body.immovable = true;
                //top left
            this.ladder5 = this.add.tileSprite(50, 200, 32, 50, "ladder").setOrigin(0);
            this.physics.add.existing(this.ladder5);
            this.ladder5.body.setAllowGravity(false);
            this.ladder5.body.immovable = true;
                //top right
            this.ladder6 = this.add.tileSprite(900, 100, 32, 150, "ladder").setOrigin(0);
            this.physics.add.existing(this.ladder6);
            this.ladder6.body.setAllowGravity(false);
            this.ladder6.body.immovable = true;
            //add plains
            this.plain1 = this.add.tileSprite(0, 540, 960, 100, "plain").setOrigin(0);
            this.physics.add.existing(this.plain1);
            this.plain1.body.setAllowGravity(false);
            this.plain1.body.immovable = true;
    
            //Handle Input
            switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

            //add seed
            this.iseed = new Item(this, game.config.width / 2 - 15, game.config.height - 70, "seed", 0, "iseed", false);
            this.seed = new Item(this, 200, 210, "seed", 0, "seed", false);
            this.seed.body.setAllowGravity(false);

            //add door
            this.door = this.physics.add.sprite(750, 25, "door").setOrigin(0);
            this.door.body.setAllowGravity(false);

            //add key
            this.ikey = new Item(this, game.config.width / 2 - 90, game.config.height - 70, "key", 0, "ikey", false);

            //add player
            this.player = new Player(this, playerX, playerY, "player");

            //add collider
            this.physics.add.collider(this.player, [this.plain1, this.platform1, this.platform1_1, this.platform2, this.platform2_1, this.platform3, this.platform3_1, this.platform4, this.platform4_1, this.platform5, this.platform5_1,this.platform6, this.platform6_1]);
        //
        //this.cameras.main.startFollow(this.player);
        
        //add inventory
        this.inventory = this.add.sprite(game.config.width / 2 - 100, game.config.height - 70, "inventory");
        
        if(inventory.checkItem("key"))
        {
            this.ikey.Reset();
            //this.key.pickup();
        }
        else
        {
            //this.key.Reset();
            this.ikey.pickup();
        }
        

        if(inventory.checkItem("seed"))
        {
            this.iseed.Reset();
            this.seed.pickup();
        }
        else
        {
            this.iseed.pickup();
            this.seed.Reset();
        }
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
        //climb check
        if(this.physics.overlap(this.player, [this.ladder1, this.ladder2, this.ladder3, this.ladder4,this.ladder5, this.ladder6]) && climbKey.isDown)
        {
            console.log("overlap");
            this.player.climb();
            this.player.body.setAllowGravity(false);
        }
        else
        {
            this.player.body.setAllowGravity(true);
        }
        //pickup key
        if(this.physics.overlap(this.player, this.key) && Phaser.Input.Keyboard.JustDown(interactKey))
        {
            inventory.addItem("key");
            this.ikey.alpha = 1;
        }
        //pickup seed
        if(this.physics.overlap(this.player, this.seed) && Phaser.Input.Keyboard.JustDown(interactKey))
        {
            inventory.addItem("seed");
            this.seed.alpha = 0;
            this.iseed.alpha = 1;
        }
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
            inventory.Clear();
            this.scene.start("endScene");
        }
        //plant seed
        if(this.player.x > 180 && this.player.x < 480 && this.player.y > 500 && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("seed"))
        {
            inventory.removeItem("seed");
            this.iseed.alpha = 0;
            seedIsPlanted = true;
        }
    }

    changeTime()
    {
        playerX = this.player.x;
        playerY = this.player.y;
        this.scene.start("levelOne");
    }

    Restart()
    {
        inventory.Clear();
        this.ikey.alpha = 0;
        this.key.alpha = 1;
    }
}