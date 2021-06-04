class LevelOne extends Phaser.Scene {
    constructor()
    {
        super('levelOne');
        seedIsPlanted = false;
    }

    preload()
    {
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 24, frameHeight: 72, startFrame: 0, endFrame: 27});
        //walking right animation - frames: [0-7]
        //walking left animation - frames: [8 - 15]
        //pickup right animation - frames: [16 -19]
        //pickup left animation - frames: [20 - 23]
        //climbing animation - frames: [24 - 27]
        this.load.spritesheet("plain", "assets/testplain.png", {frameWidth: 32, frameHeight: 100, startFrame: 0, endFrame: 3});
        this.load.spritesheet("ladder", "assets/testladder.png", {frameWidth: 32, frameHeight: 120, startFrame: 0, endFrame: 1});
        this.load.spritesheet("timeTravelVFX", "assets/timeTravelVFX.png", {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 11});
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.image("seed", "assets/testseed.png");
        this.load.image("tree", "assets/testtree.png");
        this.load.image("background", "assets/towerpresent.png");
        this.load.spritesheet("timeTravelVFX", "assets/timeTravelVFX.png", {frameWidth: 960, frameHeight: 720, startingFrame: 0, endFrame: 11});
    }

    create()
    {
        //add background
        this.background = new Background(this, 0, 0, 960, 720, "background", 0, false, true);
        //add inventory
        this.inventory = this.add.sprite(game.config.width / 2 - 100, game.config.height - 70, "inventory");
        //add audio
        this.timeTravel = this.sound.add("timeTravel", {volume: volume});
        this.hurt = this.sound.add("hurt", {volume: volume});
        this.pickupKey = this.sound.add("pickupKey", {volume: volume});
        this.doorUnlock = this.sound.add("doorUnlock", {volume: volume});
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
        this.ladder1 = new Background(this, 80, 400, 32, 70, "ladder", 1, false, true);
            //bottom right
        this.ladder2 = new Background(this, 650, 400, 32, 140, "ladder", 1, false, true);
            //middle left
        this.ladder3 = new Background(this, 10, 250, 32, 150, "ladder", 1, false, true);
            //middle right
        this.ladder4 = new Background(this, 800, 250, 32, 150, "ladder", 1, false, true);
            //top left
        this.ladder5 = new Background(this, 50, 100, 32, 70, "ladder", 1, false, true);
            //top right
        this.ladder6 = new Background(this, 900, 100, 32, 150, "ladder", 1, false, true);
        //add plains
        this.plain1 = new Background(this, 0, 540, 960, 50, "plain", 1, false, true);
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
        //add VFX
        this.timeTravelVFX = new VFX(this, 0, 0, "timeTravelVFX", 0);
        this.timeTravelVFX.alpha = 0;
        //add player animation configuaration
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'pickup',
            frames: this.anims.generateFrameNames('player', {start: 16, end: 19}),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'climb',
            frames: this.anims.generateFrameNames('player', {start: 24, end: 27}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'travel',
            frames: this.anims.generateFrameNames('timeTravelVFX', {start: 0, end: 11}),
            frameRate: 10,
            repeat: 0
        });
        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //add collider
        this.physics.add.collider(this.player, [this.plain1, this.platform1, this.platform1_1, this.platform2, this.platform2_1, this.platform3, this.platform3_1, this.platform4, this.platform4_1, this.platform5, this.platform5_1,this.platform6, this.platform6_1]);
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
            this.timeTravelVFX.anims.play('travel', true);
            this.timeTravelVFX.alpha = 1;
            this.timeTravel.play();
            this.time.delayedCall(1300, () => {
                this.changeTime();
            }, null, this); 
        }
        //update animation
        if(isWalking)
        {
            this.player.anims.play('walk', true);
        }
        else if(isClimbing)
        {
            this.player.anims.play('climb', true);
        }
        else if(isPicking)
        {
            this.player.anims.play('pickup', true);
        }
        else
        {
            this.player.anims.stop();
            this.player.setFrame(0);
        }
        //climb check
        if(this.physics.overlap(this.player, [this.ladder2, this.ladder3, this.ladder4, this.ladder6]) && climbKey.isDown)
        {
            this.player.climb();
            this.player.body.setAllowGravity(false);
            //play climbing animation
            isClimbing = true;
        }
        else
        {
            this.player.body.setAllowGravity(true);
            if(isClimbing && !this.physics.overlap(this.player, this.tree))
            {
                isClimbing = false;
            }
        }
        //pickup key
        if(this.physics.overlap(this.player, this.key) && Phaser.Input.Keyboard.JustDown(interactKey))
        {
            this.pickupKey.play();
            inventory.addItem("key");
            this.ikey.alpha = 1;
            this.key.alpha = 0;
            //Play pickup animations
            isPicking = true;
            this.time.delayedCall(500, () => {
                isPicking = false
            }, null, this);
        }
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
            this.doorUnlock.play();
            inventory.Clear();
            seedIsPlanted = false;
            this.scene.start("levelTwo");
        }
        if(seedIsPlanted)
        {
            this.tree.alpha = 1;
            if(this.physics.overlap(this.player, this.tree) && climbKey.isDown)
            {
                this.player.climb();
                this.player.body.setAllowGravity(false);
                //play climbing animation
                isClimbing = true;
            }
            else
            {
                this.player.body.setAllowGravity(true);
                if(isClimbing && !this.physics.overlap(this.player, [this.ladder2, this.ladder3, this.ladder4, this.ladder6]))
                {
                    isClimbing = false;
                }
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