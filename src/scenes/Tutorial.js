class Tutorial extends Phaser.Scene {
    constructor()
    {
        super('tutorialLevelNew');
    }

    preload()
    {
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 24, frameHeight: 72, startFrame: 0, endFrame: 7});
        //walking animation - frames: [0-7]
        //pickup animation - frames: [8 -11]
        this.load.spritesheet("plain", "assets/testplain.png", {frameWidth: 32, frameHeight: 100, startFrame: 0, endFrame: 2});
        this.load.image("ladder", "assets/testladder.png");
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
        this.load.spritesheet("enemy", "assets/testenemy.png", {frameWidth: 24, frameHeight: 72, startingFrame: 0, endFrame: 1});
        this.load.spritesheet("blocker", "assets/testblocker.png", {frameWidth: 32, frameHeight: 100, startingFrame: 0, endFrame: 1});
        this.load.audio("doorUnlock", "assets/doorUnlock.mp3");
    }

    create()
    {
        console.log("Present!");
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

        //add inventory
        this.inventory = this.add.sprite(game.config.width / 2 - 100, game.config.height - 70, "inventory");

        //add Key
        this.ikey = new Item(this, game.config.width / 2 - 90, game.config.height - 70, "key", 0, "ikey", false);
        this.key = new Item(this, 100, 100, "key", 0, "key", false);

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

        

        //add plain
        this.plain1 = new Background(this, 0, 530, game.config.width, 50, "plain", 1, false, true);
        this.plain2 = new Background(this, 32, 330, game.config.width, 50, "plain", 1, false, true);
        this.plain3 = new Background(this, 0, 130, game.config.width - 32, 50, "plain", 1, false, true);

        //add ladder
        this.ladder1 = new Background(this, 0, 330, 32, 200, "ladder", 0, false, true);
        this.ladder2 = new Background(this, game.config.width - 32, 130, 32, 200, "ladder", 0, false, true);

        //add blocker
        this.blocker1 = new Background(this, 700, 170, 32, 180, "blocker", 1, false, true);

        //add instrunction text
        this.add.text(game.config.width / 2 - 150, game.config.height - 250, "Use LEFT & RIGHT Key to Move", infoConfig).setOrigin(0);
        this.add.text(50, game.config.height - 300, "Use Up Key to Climb", infoConfig).setOrigin(0);
        this.add.text(game.config.width / 2 - 150, game.config.height - 470, "Press S to Change Time", infoConfig).setOrigin(0);
        
        //add gravity
        this.physics.world.gravity.y = 1000;
        //add player
        this.player = new Player(this, playerX, playerY, "player", 0);
        //add player animation configuaration - needs to be fixed
        /*this.anims.create({
            key: 'walk',
            frames: this.generateFrameNames('player', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });*/
        //add enemy
        this.enemy1 = new Enemy(this, enemy1X, enemy1Y, "enemy", 1);
        this.enemy1.setPartrol(50, 700);

        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //add collider
        this.physics.add.collider(this.player, [this.plain1, this.plain2, this.plain3, this.blocker1]);
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
        if(this.physics.overlap(this.player, [this.ladder1, this.ladder2]) && climbKey.isDown)
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
        //walking animation - needs to be checked after this.anims.generateNumbers is fixed
        //walkingAnimation(this.player); 
    }

    walkingAnimation(player){
        if(Phaser.Input.Keyboard.JustDown(leftKey) || Phaser.Input.Keyboard.JustDown(rightKey)){//plays animation while moving sideways
            player.anims.play('walk', true);
        }else{//pause animation when the player isn't moving
            player.anims.pauseAll();
        }
    }

    changeTime()
    {
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
        this.scene.start("tutorialLevelOld");
    }

    Restart()
    {
        inventory.Clear();
        this.ikey.alpha = 0;
        this.key.alpha = 1;
    }
}