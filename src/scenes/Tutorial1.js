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
        this.load.image("inventory", "assets/testInventory.png");
        this.load.image("key", "assets/testKey.png");
        this.load.image("door", "assets/testdoor.png");
    }

    create()
    {
        console.log("Past!");
        //text config
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
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
        this.door = new Background(this, 0, 55, 32, 75, "door", false, true);

        //add enemy
        this.enemy1 = new Enemy(this, enemy1X, enemy1Y, "enemy");
        this.enemy1.alpha = 0;
        this.enemy1.setPartrol(50, 700);

        //add gravity
        this.physics.world.gravity.y = 1000;
        //add player
        this.player = new Player(this, playerX, playerY, "player");

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
        //change Time
        if(Phaser.Input.Keyboard.JustDown(switchTimeKey))
        {
            this.changeTime();
        }
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
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
            inventory.Clear();
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