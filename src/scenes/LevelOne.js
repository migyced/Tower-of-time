class LevelOne extends Phaser.Scene {
    constructor()
    {
        super('levelOne');
        seedIsPlanted = false;
    }

    preload()
    {
        this.load.image("player", "assets/testplayer.png");
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
        //text config
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF'
        }
        //add gravity
        this.physics.world.gravity.y = 1000;
        
        //tree
        this.tree = this.add.tileSprite(180, 20, 300, 520, "tree").setOrigin(0);
        this.physics.add.existing(this.tree);
        this.tree.body.setAllowGravity(false);
        this.tree.body.immovable = true;
        this.tree.alpha = 0;
        //add platforms
            //bottom left
        this.platform1 = this.add.tileSprite(0, 400, 80, 50, "plain", 1).setOrigin(0);
        this.platform1_1 = this.add.tileSprite(112, 400, 138, 50, "plain", 1).setOrigin(0);
        this.physics.add.existing(this.platform1);
        this.physics.add.existing(this.platform1_1);
        this.platform1.body.setAllowGravity(false);
        this.platform1_1.body.setAllowGravity(false);
        this.platform1.body.immovable = true;
        this.platform1_1.body.immovable = true;
            //bottom right
        this.platform2 = this.add.tileSprite(510, 400, 140, 50, "plain", 1).setOrigin(0);
        this.platform2_1 = this.add.tileSprite(682, 400, 278, 50, "plain", 1).setOrigin(0);
        this.physics.add.existing(this.platform2);
        this.physics.add.existing(this.platform2_1);
        this.platform2.body.setAllowGravity(false);
        this.platform2_1.body.setAllowGravity(false);
        this.platform2.body.immovable = true;
        this.platform2_1.body.immovable = true;
            //middle left
        this.platform3 = this.add.tileSprite(0, 250, 10, 50, "plain", 1).setOrigin(0);
        this.platform3_1 = this.add.tileSprite(42, 250, 208, 50, "plain", 1).setOrigin(0);
        this.physics.add.existing(this.platform3);
        this.physics.add.existing(this.platform3_1);
        this.platform3.body.setAllowGravity(false);
        this.platform3_1.body.setAllowGravity(false);
        this.platform3.body.immovable = true;
        this.platform3_1.body.immovable = true;
            //middle right
        this.platform4 = this.add.tileSprite(610, 250, 190, 50, "plain", 1).setOrigin(0);
        this.platform4_1 = this.add.tileSprite(832, 250, 128, 50, "plain", 1).setOrigin(0);
        this.physics.add.existing(this.platform4);
        this.physics.add.existing(this.platform4_1);
        this.platform4.body.setAllowGravity(false);
        this.platform4_1.body.setAllowGravity(false);
        this.platform4.body.immovable = true;
        this.platform4_1.body.immovable = true;
            //upper left
        this.platform5 = this.add.tileSprite(0, 100, 50, 50, "plain", 1).setOrigin(0);
        this.platform5_1 = this.add.tileSprite(82, 100, 100, 50, "plain", 1).setOrigin(0);
        this.physics.add.existing(this.platform5);
        this.physics.add.existing(this.platform5_1);
        this.platform5.body.setAllowGravity(false);
        this.platform5_1.body.setAllowGravity(false);
        this.platform5.body.immovable = true;
        this.platform5_1.body.immovable = true;
            //upper right
        this.platform6 = this.add.tileSprite(710, 100, 190, 50, "plain", 1).setOrigin(0);
        this.platform6_1 = this.add.tileSprite(932, 100, 28, 50, "plain", 1).setOrigin(0);
        this.physics.add.existing(this.platform6);
        this.physics.add.existing(this.platform6_1);
        this.platform6.body.setAllowGravity(false);
        this.platform6_1.body.setAllowGravity(false);
        this.platform6.body.immovable = true;
        this.platform6_1.body.immovable = true;
        //add ladders
            //bottom left
        this.ladder1 = this.add.tileSprite(80, 400, 32, 70, "ladder").setOrigin(0);
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
        this.ladder5 = this.add.tileSprite(50, 100, 32, 70, "ladder").setOrigin(0);
        this.physics.add.existing(this.ladder5);
        this.ladder5.body.setAllowGravity(false);
        this.ladder5.body.immovable = true;
            //top right
        this.ladder6 = this.add.tileSprite(900, 100, 32, 150, "ladder").setOrigin(0);
        this.physics.add.existing(this.ladder6);
        this.ladder6.body.setAllowGravity(false);
        this.ladder6.body.immovable = true;
        //add plains
        this.plain1 = this.add.tileSprite(0, 540, 960, 100, "plain", 1).setOrigin(0);
        this.physics.add.existing(this.plain1);
        this.plain1.body.setAllowGravity(false);
        this.plain1.body.immovable = true;

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
        this.player = new Player(this, playerX, playerY, "player");

        //Handle Input
        switchTimeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        climbKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        
        
        //add collider
        this.physics.add.collider(this.player, [this.plain1, this.platform1, this.platform1_1, this.platform2, this.platform2_1, this.platform3, this.platform3_1, this.platform4, this.platform4_1, this.platform5, this.platform5_1,this.platform6, this.platform6_1]);
        //camera effect
        //this.cameras.main.startFollow(this.player);
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
        
        //this.seed = new Item(this, 200, 210, "key", 0, "seed", false);
        //this.seed.body.setAllowGravity(false);

        if(inventory.checkItem("seed"))
        {
            this.iseed.Reset();
            //this.seed.pickup();
        }
        else
        {
            this.iseed.pickup();
            //this.seed.Reset();
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
            inventory.addItem("key");
            this.ikey.alpha = 1;
            this.key.alpha = 0;
        }
        //Open door
        if(this.physics.overlap(this.player, this.door) && Phaser.Input.Keyboard.JustDown(interactKey) && inventory.checkItem("key"))
        {
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