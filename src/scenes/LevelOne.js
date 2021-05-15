class LevelOne extends Phaser.Scene {
    constructor()
    {
        super('levelOne');
        seedIsPlanted = false;
    }

    preload()
    {
        this.load.audio("hurt", "assets/hurt.wav");
        this.load.audio("pickupKey", "assets/pickupKey.wav");
        this.load.audio("pickupSeed", "assets/pickupSeed.wav");
        this.load.audio("timeTravel", "assets/timeTravelSFX.wav");
        this.load.audio("doorUnlock", "assets/doorUnlock.mp3");
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 24, frameHeight: 72, startFrame: 0, endFrame: 7});
        this.load.spritesheet("plain", "assets/testplain.png", {frameWidth: 32, frameHeight: 100, startFrame: 0, endFrame: 2});
        this.load.image("ladder", "assets/testladder.png");
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.image("seed", "assets/testseed.png");
        this.load.image("tree", "assets/testtree.png");
    }

    create()
    {
        console.log("Present! LV1");
        this.hexColor = new Phaser.Display.Color(25, 50, 180);
        //add audio
        this.timeTravel = this.sound.add("timeTravel");
        this.hurt = this.sound.add("hurt");
        this.pickupKey = this.sound.add("pickupKey");
        this.doorUnlock = this.sound.add("doorUnlock");
        //text config
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF'
        }
        //add gravity
        this.physics.world.gravity.y = 1000;
        
        //tree
        this.tree = new Background(this, 180, 20, 300, 520, "tree", 0, false, true);
        this.tree.alpha = 0;
        //add platforms
            //bottom left
        this.platform1 = new Background(this, 0, 400, 80, 50, "plain", 1, false, true);
        this.platform1_1 = new Background(this, 112, 400, 138, 50, "plain", 1, false, true);
            //bottom right
        this.platform2 = new Background(this, 510, 400, 140, 50, "plain", 1, false, true);
        this.platform2_1 = new Background(this, 682, 400, 278, 50, "plain", 1, false, true);
            //middle left
        this.platform3 = new Background(this, 0, 250, 10, 50, "plain", 1, false, true);
        this.platform3_1 = new Background(this, 42, 250, 208, 50, "plain", 1, false, true);
            //middle right
        this.platform4 = new Background(this, 610, 250, 190, 50, "plain", 1, false, true);
        this.platform4_1 = new Background(this, 832, 250, 128, 50, "plain", 1, false, true);
            //upper left
        this.platform5 = new Background(this, 0, 100, 50, 50, "plain", 1, false, true);
        this.platform5_1 = new Background(this, 82, 100, 100, 50, "plain", 1, false, true);
            //upper right
        this.platform6 = new Background(this, 710, 100, 190, 50, "plain", 1, false, true);
        this.platform6_1 = new Background(this, 932, 100, 28, 50, "plain", 1, false, true);
        //add ladders
            //bottom left
        this.ladder1 = new Background(this, 80, 400, 32, 70, "ladder", 0, false, true);
            //bottom right
        this.ladder2 = new Background(this, 650, 400, 32, 140, "ladder", 0, false, true);
            //middle left
        this.ladder3 = new Background(this, 10, 250, 32, 150, "ladder", 0, false, true);
            //middle right
        this.ladder4 = new Background(this, 800, 250, 32, 150, "ladder", 0, false, true);
            //top left
        this.ladder5 = new Background(this, 50, 100, 32, 70, "ladder", 0, false, true);
            //top right
        this.ladder6 = new Background(this, 900, 100, 32, 150, "ladder", 0, false, true);
        //add plains
        this.plain1 = new Background(this, 0, 540, 960, 100, "plain", 1, false, true);
        //add door
        this.door = this.physics.add.sprite(750, 25, "door").setOrigin(0);
        this.door.body.setAllowGravity(false);
        //add key
        this.ikey = new Item(this, game.config.width / 2 - 90, game.config.height - 70, "key", 0, "ikey", false);
        this.key = new Item(this, 50, 60, "key", 0, "key", false);
        this.key.body.setAllowGravity(false);
        //add seed
        this.iseed = new Item(this, game.config.width / 2 - 15, game.config.height - 70, "seed", 0, "iseed", false);
        //add player
        this.player = new Player(this, playerX, playerY, "player", 0);
        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //add collider
        this.physics.add.collider(this.player, [this.plain1, this.platform1, this.platform1_1, this.platform2, this.platform2_1, this.platform3, this.platform3_1, this.platform4, this.platform4_1, this.platform5, this.platform5_1,this.platform6, this.platform6_1]);
        //add inventory
        this.inventory = this.add.sprite(game.config.width / 2 - 100, game.config.height - 70, "inventory");
        if(inventory.checkItem("key"))
        {
            this.ikey.Reset();
            this.key.pickup();
        }
        else
        {
            this.key.Reset();
            this.ikey.pickup();
        }
        if(inventory.checkItem("seed"))
        {
            this.iseed.Reset();
        }
        else
        {
            this.iseed.pickup();
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
        this.cameras.main.setBackgroundColor(this.hexColor);
        //climb check
        if(this.physics.overlap(this.player, [this.ladder2, this.ladder3, this.ladder4, this.ladder6]) && climbKey.isDown)
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
            this.key.alpha = 0;
        }
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
            this.doorUnlock.play();
            inventory.Clear();
            seedIsPlanted = false;
            this.scene.start("endScene");
        }
        if(seedIsPlanted)
        {
            this.tree.alpha = 1;
            if(this.physics.overlap(this.player, this.tree) && climbKey.isDown)
            {
                console.log("overlap");
                this.player.climb();
                this.player.body.setAllowGravity(false);
            }
            else
            {
                this.player.body.setAllowGravity(true);
            }
        }
    }

    changeTime()
    {
        playerX = this.player.x;
        playerY = this.player.y;
        this.scene.start("levelOnePast");
    }

    Restart()
    {
        inventory.Clear();
        this.ikey.alpha = 0;
        this.key.alpha = 1;
    }
}