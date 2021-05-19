class LevelOnePast extends Phaser.Scene {
    constructor()
    {
        super('levelOnePast');
    }

    preload()
    {
        this.load.audio("hurt", "assets/hurt.wav");
        this.load.audio("pickupKey", "assets/pickupKey.wav");
        this.load.audio("pickupSeed", "assets/pickupSeed.wav");
        this.load.audio("timeTravel", "assets/timeTravelSFX.wav");
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 24, frameHeight: 72, startFrame: 0, endFrame: 11});
        //walking animation - frames: [0-7]
        //pickup animation - frames: [8 -11]
        this.load.spritesheet("plain", "assets/testplain.png", {frameWidth: 32, frameHeight: 100, startFrame: 0, endFrame: 2});
        this.load.image("ladder", "assets/testladder.png");
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.image("seed", "assets/testseed.png");
        this.load.audio("doorUnlock", "assets/doorUnlock.mp3");
        this.load.image("background1", "assets/towerpast.png");
    }

    create()
    {
        console.log("Past! LV1");
        //add background
        this.background = new Background(this, 0, 0, 960, 720, "background1", 0, false, true);
        //add inventory
        this.inventory = this.add.sprite(game.config.width / 2 - 100, game.config.height - 70, "inventory");
        //add audio
        this.timeTravel = this.sound.add("timeTravel");
        this.hurt = this.sound.add("hurt");
        this.pickupSeed = this.sound.add("pickupSeed");
        this.pickupKey = this.sound.add("pickupKey");
        this.doorUnlock = this.sound.add("doorUnlock");
        //text config
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#000000',
            color: '#FFFFFF'
        }
        //add gravity
        this.physics.world.gravity.y = 1000;
        
        //add platforms
            //bottom left
            this.platform1 = new Background(this, 0, 400, 80, 50, "plain", 0, false, true);
            this.platform1_1 = new Background(this, 112, 400, 138, 50, "plain", 0, false, true);
                //bottom right
            this.platform2 = new Background(this, 510, 400, 140, 50, "plain", 0, false, true);
            this.platform2_1 = new Background(this, 682, 400, 278, 50, "plain", 0, false, true);
                //middle left
            this.platform3 = new Background(this, 0, 250, 10, 50, "plain", 0, false, true);
            this.platform3_1 = new Background(this, 42, 250, 208, 50, "plain", 0, false, true);
                //middle right
            this.platform4 = new Background(this, 610, 250, 190, 50, "plain", 0, false, true);
            this.platform4_1 = new Background(this, 832, 250, 128, 50, "plain", 0, false, true);
                //upper left
            this.platform5 = new Background(this, 0, 100, 182, 50, "plain", 0, false, true);
                //upper right
            this.platform6 = new Background(this, 710, 100, 190, 50, "plain", 0, false, true);
            this.platform6_1 = new Background(this, 932, 100, 28, 50, "plain", 0, false, true);
            //add ladders
                //bottom left
            this.ladder1 = new Background(this, 80, 400, 32, 140, "ladder", 0, false, true);
                //bottom right
            this.ladder2 = new Background(this, 650, 400, 32, 140, "ladder", 0, false, true);
                //middle left
            this.ladder3 = new Background(this, 10, 250, 32, 150, "ladder", 0, false, true);
                //middle right
            this.ladder4 = new Background(this, 800, 250, 32, 150, "ladder", 0, false, true);
                //top left
            this.ladder5 = new Background(this, 50, 200, 32, 50, "ladder", 0, false, true);
                //top right
            this.ladder6 = new Background(this, 900, 100, 32, 150, "ladder", 0, false, true);
            //add plains
            this.plain1 = new Background(this, 0, 540, 960, 100, "plain", 0, false, true);
            //special plain
            this.plain2 = new Background(this, 180, 540, 290, 100, "plain", 2, false, true);
    
            //Handle Input
            switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

            //add seed
            this.iseed = new Item(this, game.config.width / 2 - 15, game.config.height - 70, "seed", 0, "iseed", false);
            this.seed = new Item(this, 200, 210, "seed", 0, "seed", false);

            //add door
            this.door = this.physics.add.sprite(750, 25, "door").setOrigin(0);
            this.door.body.setAllowGravity(false);

            //add key
            this.ikey = new Item(this, game.config.width / 2 - 90, game.config.height - 70, "key", 0, "ikey", false);

            //add player
            this.player = new Player(this, playerX, playerY, "player", 0);

            //add collider
            this.physics.add.collider(this.player, [this.plain1, this.platform1, this.platform1_1, this.platform2, this.platform2_1, this.platform3, this.platform3_1, this.platform4, this.platform4_1, this.platform5,this.platform6, this.platform6_1]);
        
        if(inventory.checkItem("key"))
        {
            this.ikey.Reset();
        }
        else
        {
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
            this.timeTravel.play();
            this.changeTime();
        }
        
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
            this.pickupKey.play();
            inventory.addItem("key");
            this.ikey.alpha = 1;
        }
        //pickup seed
        if(this.physics.overlap(this.player, this.seed) && Phaser.Input.Keyboard.JustDown(interactKey))
        {
            this.pickupSeed.play();
            inventory.addItem("seed");
            this.seed.alpha = 0;
            this.iseed.alpha = 1;
        }
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
            this.doorUnlock.play();
            inventory.Clear();
            this.scene.start("endScene");
        }
        //plant seed
        if(this.player.x > 180 && this.player.x < 480 && this.player.y > 500 && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("seed"))
        {
            this.pickupSeed.play();
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