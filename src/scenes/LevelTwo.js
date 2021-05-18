class LevelTwo extends Phaser.Scene {
    constructor()
    {
        super('levelTwo');
    }

    preload()
    {
        this.load.audio("hurt", "assets/hurt.wav");
        this.load.audio("pickupKey", "assets/pickupKey.wav");
        this.load.audio("pickupSeed", "assets/pickupSeed.wav");
        this.load.audio("timeTravel", "assets/timeTravelSFX.wav");
        this.load.audio("doorUnlock", "assets/doorUnlock.mp3");
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 24, frameHeight: 72, startFrame: 0, endFrame: 11});
        //walking animation - frames: [0-7]
        //pickup animation - frames: [8 -11]
        this.load.spritesheet("plain", "assets/testplain.png", {frameWidth: 32, frameHeight: 100, startFrame: 0, endFrame: 2});
        this.load.image("ladder", "assets/testladder.png");
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.image("seed", "assets/testseed.png");
        this.load.image("tree", "assets/testtree.png");
        this.load.image("background", "assets/towerpresent.png");
        this.load.image("switch", "assets/switch.png");
        this.load.spritesheet("enemy", "assets/testenemy.png", {frameWidth: 24, frameHeight: 72, startingFrame: 0, endFrame: 1});
    }

    create()
    {
        console.log("Present! LV2");
        //add background
        this.background = new Background(this, 0, 0, 960, 720, "background", 0, false, true);
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

        //add plain
        this.plain1_1 = new Background(this, 250, 100, game.config.width - 232, 50, "plain", 1, false, true);
        this.plain1_2 = new Background(this, 0, 100, 200, 50, "plain", 1, false, true);
        this.plain2_1 = new Background(this, 0, 250, game.config.width - 182, 50, "plain", 1, false, true);
        this.plain2_2 = new Background(this, game.config.width - 150, 250, 150, 50, "plain", 1, false, true);
        this.plain3_1 = new Background(this, 132, 400, game.config.width - 32, 50, "plain", 1, false, true);
        this.plain3_2 = new Background(this, 0, 400, 100, 50, "plain", 1, false, true);
        this.plain4 = new Background(this, 0, 550, game.config.width, 50, "plain", 1, false, true);

        //add ladder
        this.ladder1 = new Background(this, 100, 400, 32, 150, "ladder", 0, false, true);
        this.ladder2 = new Background(this, game.config.width - 182, 250, 32, 150, "ladder", 0, false, true);
        this.ladder3 = new Background(this, 432, 100, 32, 150, "ladder", 0, false, true);

        //add interactive item/background
        this.switch1 = new Background(this, game.config.width - 100, 488, 64, 64, "switch", 0, false, true);
        this.switch2 = new Background(this, game.config.width - 270, 336, 64, 64, "switch", 0, false, true); //the broken switch one
        this.door = new Background(this, game.config.width - 100, 25, 32, 75, "door", 0, false, true);
        this.key = new Item(this, 100, 220, "key", 0, "key", false, true);
        this.ikey = new Item(this, game.config.width / 2 - 90, game.config.height - 70, "key", 0, "ikey", false);

        //add enemy
        this.enemy1 = new Enemy(this, 140, 365, "enemy", 1);
        this.enemy1.setPartrol(140, game.config.width);

        //add player
        this.player = new Player(this, playerX, playerY, "player", 0);
        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

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

        //add collider
        this.physics.add.collider(this.player, [this.plain1_1, this.plain1_2, this.plain2_1, this.plain2_2, this.plain3_1, this.plain3_2, this.plain4]);
    }

    update()
    {
        this.player.update();
        this.enemy1.update();
        //change Time
        if(Phaser.Input.Keyboard.JustDown(switchTimeKey))
        {
            this.timeTravel.play();
            this.changeTime();
        }
        //climb check
        if(this.physics.overlap(this.player, [this.ladder1, this.ladder2, this.ladder3]) && climbKey.isDown)
        {
            console.log("overlap");
            this.player.climb();
            this.player.body.setAllowGravity(false);
        }
        else
        {
            this.player.body.setAllowGravity(true);
        }
        //check enemy collision
        if(this.physics.overlap(this.player, this.enemy1))
        {
            this.hurt.play();
            this.Restart();
            this.player.x = L0StartX;
            this.player.y = L0StartY;
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
            this.scene.start("endScene");
        }

        //TODO:Switch Logic
    }

    changeTime()
    {
        playerX = this.player.x;
        playerY = this.player.y;
        this.scene.start("levelTwoPast");
    }

    Restart()
    {
        inventory.Clear();
        this.ikey.alpha = 0;
        this.key.alpha = 1;
    }
}