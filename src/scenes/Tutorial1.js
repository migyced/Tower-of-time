class Tutorial1 extends Phaser.Scene {
    constructor()
    {
        super('tutorialLevelOld');
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
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.audio("doorUnlock", "assets/doorUnlock.mp3");
        this.load.image("background1", "assets/towerpast.png");
    }

    create()
    {
        console.log("Past!");
        //add background
        this.background = new Background(this, 0, 0, 960, 720, "background1", 0, false, true);
        //add audio
        this.timeTravel = this.sound.add("timeTravel");
        this.hurt = this.sound.add("hurt");
        this.doorUnlock = this.sound.add("doorUnlock");
        //text config
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#000000',
            color: '#FFFFFF'
        }

        //add instrunction text
        this.add.text(game.config.width / 2 - 225, 50, "Your inventory can travel through time!", infoConfig).setOrigin(0);
        this.add.text(game.config.width / 2 - 150, game.config.height - 470, "Time will affect environment!", infoConfig).setOrigin(0);

        //add inventory
        this.inventory = this.add.sprite(game.config.width / 2 - 100, game.config.height - 70, "inventory");
        //add Key
        this.ikey = new Item(this, game.config.width / 2 - 90, game.config.height - 70, "key", 0, "ikey", false);
        if(inventory.checkItem("key"))
        {
            this.ikey.Reset();
        }
        else
        {
            this.ikey.pickup();
        }

        //add plain
        this.plain1 = new Background(this, 0, 530, game.config.width, 50, "plain", 0, false, true);
        this.plain2 = new Background(this, 32, 330, game.config.width, 50, "plain", 0, false, true);
        this.plain3 = new Background(this, 0, 130, game.config.width - 32, 50, "plain", 0, false, true);

        //add ladder
        this.ladder1 = new Background(this, 0, 330, 32, 200, "ladder", 0, false, true);
        this.ladder2 = new Background(this, game.config.width - 32, 130, 32, 200, "ladder", 0, false, true);

        //add door
        this.door = new Background(this, 0, 55, 32, 75, "door", 0,  false, true);

        //add enemy
        this.enemy1 = new Enemy(this, enemy1X, enemy1Y, "enemy");
        this.enemy1.alpha = 0;
        this.enemy1.setPartrol(50, 700);

        //add gravity
        this.physics.world.gravity.y = 1000;
        //add player
        this.player = new Player(this, playerX, playerY, "player", 0);

        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //add collider
        this.physics.add.collider(this.player, [this.plain1, this.plain2, this.plain3]);
    }

    update()
    {
        this.player.update();
        this.enemy1.update();
        //walking animation
        if(isWalking)
        {
            this.player.anims.play('walk', true);
        }
        else
        {
            this.player.anims.stop();
            this.player.setFrame(0);
        }
        //change Time
        if(Phaser.Input.Keyboard.JustDown(switchTimeKey))
        {
            this.timeTravel.play();
            this.changeTime();
        }
        if(this.physics.overlap(this.player, [this.ladder1, this.ladder2]) && climbKey.isDown)
        {
            console.log("overlap");
            this.player.climb();
            this.player.body.setAllowGravity(false);
            //TODO:play climbing animation
            isClimbing = true;
        }
        else
        {
            this.player.body.setAllowGravity(true);
            if(isClimbing)
            {
                isClimbing = false;
                this.player.anims.stop();
                this.player.setFrame(0);
            }
        }
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
            this.doorUnlock.play();
            inventory.Clear();
            playerX = L1StartX;
            playerY = L1StartY;
            this.scene.start("levelOne");
        }
    }

    changeTime()
    {
        //update player & enemy location
        playerX = this.player.x;
        playerY = this.player.y;
        enemy1X = this.enemy1.x;
        enemy1Y = this.enemy1.y;
        if(this.enemy1.walkSpeed > 0)
        {
            direction = true;
        }
        else
        {
            direction = false;
        }
        this.scene.start("tutorialLevelNew");
    }
}