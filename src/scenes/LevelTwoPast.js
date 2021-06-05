class LevelTwoPast extends Phaser.Scene {
    constructor()
    {
        super('levelTwoPast');
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
        this.load.image("background1", "assets/towerpast.png");
        this.load.image("switch", "assets/switch.png");
        this.load.spritesheet("enemy", "assets/testenemy.png", {frameWidth: 24, frameHeight: 72, startingFrame: 0, endFrame: 1});
        this.load.spritesheet("timeTravelVFX", "assets/timeTravelVFX.png", {frameWidth: 960, frameHeight: 720, startingFrame: 0, endFrame: 11});
        this.load.spritesheet("doorAnim", "assets/doorAnimation.png", {frameWidth: 126, frameHeight: 168, startingFrame: 0, endFrame: 7});
    }

    create()
    {
        //set keyboard combo
        this.input.keyboard.createCombo('ECDLXXVI');
        this.input.keyboard.on('keycombomatch', function (event) {
            password = true;
        });
        //add background
        this.background = new Background(this, 0, 0, 960, 720, "background1", 0, false, true);
        //add audio
        this.timeTravel = this.sound.add("timeTravel", {volume: volume});
        this.hurt = this.sound.add("hurt", {volume: volume});
        this.pickupSeed = this.sound.add("pickupSeed", {volume: volume});
        this.pickupKey = this.sound.add("pickupKey", {volume: volume});
        this.doorUnlock = this.sound.add("doorUnlock", {volume: volume});
        //text config
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#000000'
        }
        let hintConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#FFFFFF'
        }
        //add gravity
        this.physics.world.gravity.y = 1000;

        //Add password text
        this.hint1 = this.add.text(game.config.width/2, game.config.height/2 - 25, "X", hintConfig).setOrigin(0);
        this.hint2 = this.add.text(140, 50, "CDL", hintConfig).setOrigin(0);
        this.passwordError = this.add.text(200 , 0, "Please Enter 3 Digit Password, use 'E' to enter again/confirm!", infoConfig).setOrigin(0);
        this.passwordError.alpha = 0;
        //add door animation
        this.leftDoorAnim = new VFX(this, 102, 20, "doorAnim", 0);
        this.RightDoorAnim = new VFX(this, game.config.width - 240, 20, "doorAnim", 0);
        if(!switch1On)
        {
            this.leftDoorAnim.alpha = 1;
        }
        else
        {
            this.leftDoorAnim.alpha = 0;
        }

        //add plain
        this.plain1_1 = new Background(this, 250, 100, game.config.width - 232, 50, "plain", 0, false, true);
        this.plain1_2 = new Background(this, 0, 100, 200, 50, "plain", 0, false, true);
        this.plain1_3 = new Background(this, 200, 100, 50, 50, "plain", 3, false, true);
        this.plain2_1 = new Background(this, 0, 250, game.config.width - 182, 50, "plain", 0, false, true);
        this.plain2_2 = new Background(this, game.config.width - 150, 250, 150, 50, "plain", 0, false, true);
        this.plain3_1 = new Background(this, 132, 400, game.config.width - 32, 50, "plain", 0, false, true);
        this.plain3_2 = new Background(this, 0, 400, 100, 50, "plain", 0, false, true);
        this.plain4 = new Background(this, 0, 550, game.config.width, 50, "plain", 0, false, true);

        //add ladder
        this.ladder1 = new Background(this, 100, 400, 32, 150, "ladder", 0, false, true);
        this.ladder2 = new Background(this, game.config.width - 182, 250, 32, 150, "ladder", 0, false, true);
        this.ladder3 = new Background(this, ladderX, ladderStartY, 32, 150, "ladder", 0, false, true);

        //add interactive item/background
        this.switch1 = new Background(this, game.config.width - 100, 488, 64, 64, "switch", 0, false, true);
        this.switch2 = new Background(this, game.config.width - 270, 336, 64, 64, "switch", 0, false, true);
        this.door = new Background(this, game.config.width - 100, 25, 32, 75, "door", 0, false, true);
        this.key = new Item(this, 100, 220, "key", 0, "key", false, true);
        this.ikey = new Item(this, game.config.width / 2 - 90, game.config.height - 70, "key", 0, "ikey", false);
        

        //add enemy
        this.enemy1 = new Enemy(this, 140, 365, "enemy", 0);
        this.enemy1.setPartrol(140, 950);

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
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNames('doorAnim', {start: 0, end: 7}),
            frameRate: 10,
            repeat: 0
        });
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
        this.physics.add.collider(this.player, [this.plain1_1, this.plain1_2, this.plain1_3, this.plain2_1, this.plain2_2, this.plain3_1, this.plain3_2, this.plain4]);
    }

    update()
    {
        this.player.update();
        this.enemy1.update();
        this.ladder3.update();
        //change Time
        if(Phaser.Input.Keyboard.JustDown(switchTimeKey))
        {
            this.enemy1.Stop();
            this.timeTravelVFX.anims.playReverse('travel', true);
            this.timeTravelVFX.alpha = 1;
            this.timeTravel.play();
            this.time.delayedCall(1300, () => {
                this.changeTime();
            }, null, this); 
        }
        //switch logic
        if(switch1On)
        {
            this.enemy1.Stop();
            this.switch1.setFrame(0);
        }
        else
        {
            this.enemy1.start();
            this.switch1.setFrame(1);
        }
        if(switch2On)
        {
            this.switch2.setFrame(0);
        }
        else
        {
            this.switch2.setFrame(1);
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
        if(this.physics.overlap(this.player, [this.ladder1, this.ladder2]) && climbKey.isDown)
        {
            this.player.climb();
            this.player.body.setAllowGravity(false);
            //play climbing animation
            isClimbing = true;
        }
        //special logic with ladder 3
        else if(this.physics.overlap(this.player, [this.ladder3]) && climbKey.isDown)
        {
            if(this.ladder3.x >= 200  && this.ladder3.x < 219)
            {
                this.player.climb();
                this.player.body.setAllowGravity(false);
                //play climbing animation
                isClimbing = true;
            }    
        }
        else
        {
            this.player.body.setAllowGravity(true);
            if(isClimbing)
            {
                isClimbing = false;
            }
        }
        //check enemy collision
        if(this.physics.overlap(this.player, this.enemy1))
        {
            this.hurt.play();
            this.Restart();
            this.player.x = L0StartX;
            this.player.y = L0StartY;
        }
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
            if(password)
            {
                this.doorUnlock.play();
                inventory.Clear();
                this.scene.start("endScene");
            }
            else
            {
                this.passwordError.alpha = 1;
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
        //Switch Logic
        if(this.physics.overlap(this.player, this.switch1) && Phaser.Input.Keyboard.JustDown(interactKey))
        {
            this.doorUnlock.play();
            switch1On = !switch1On;
            //Play pickup animations
            isPicking = true;
            this.time.delayedCall(500, () => {
                isPicking = false
            }, null, this);
            if(switch1On)
            {
                this.leftDoorAnim.play('open');
            }
            else
            {
                this.leftDoorAnim.alpha = 1;
                this.leftDoorAnim.playReverse('open');
            }
            this.leftDoorAnim.on('animationcomplete', () => {    
                if(switch1On)
                {
                    this.leftDoorAnim.alpha = 0;
                }
                else
                {
                    this.leftDoorAnim.setFrame(0);
                }
            });
            
        }
        if(this.physics.overlap(this.player, this.switch2) && Phaser.Input.Keyboard.JustDown(interactKey))
        {
            this.doorUnlock.play();
            switch2On = !switch2On;
            //Play pickup animations
            isPicking = true;
            this.time.delayedCall(500, () => {
                isPicking = false
            }, null, this);
            if(switch2On)
            {
                this.RightDoorAnim.play('open');
            }
            else
            {
                this.RightDoorAnim.alpha = 1;
                this.RightDoorAnim.playReverse('open');
            }
            this.RightDoorAnim.on('animationcomplete', () => {    
                if(switch2On)
                {
                    this.RightDoorAnim.alpha = 0;
                }
                else
                {
                    this.RightDoorAnim.setFrame(0);
                }
            });
        }

        //Ladder 3 Moving
        if(this.physics.overlap(this.player, this.ladder3) && this.ladder3.isMoving)
        {
            this.hurt.play();
            this.Restart();
            this.player.x = L0StartX;
            this.player.y = L0StartY;
        }
        if(switch2On)
        {
            this.ladder3.isMoving = true;  
        }   
        else
        {
            this.ladder3.isMoving = false;
        }
    }

    changeTime()
    {
        playerX = this.player.x;
        playerY = this.player.y;
        ladderX = this.ladder3.x;
        this.scene.start("levelTwo");
    }

    Restart()
    {
        inventory.Clear();
        this.ikey.alpha = 0;
        this.key.alpha = 1;
    }
}