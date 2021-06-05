class Menu extends Phaser.Scene {
    constructor()
    {
        super('menuScene');
    }

    preload()
    {
        this.load.audio("hurt", "assets/hurt.wav");
        this.load.audio("pickupKey", "assets/pickupKey.wav");
        this.load.audio("pickupSeed", "assets/pickupSeed.wav");
        this.load.audio("timeTravel", "assets/timeTravelSFX.wav");
        this.load.audio("doorUnlock", "assets/doorUnlock.mp3");
        this.load.spritesheet("backgroundPic", "assets/background.png", {frameWidth: 960, frameHeight: 720, startingFrame: 0, endFrame: 7});
        //The background music is from Royalty free music https://www.epidemicsound.com/track/D4dvkLSAYV/
        this.load.audio("backgroundMusic", "assets/BackgroundMusic.mp3")
    }

    create()
    {
        this.background = new VFX(this, 0, 0, "backgroundPic", 0);
        //animation config
        this.anims.create({
            key: 'animate',
            frames: this.anims.generateFrameNames('backgroundPic', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        if(!addBackgroundMusic)
        {
            addBackgroundMusic = true
            backgroundMusic = this.sound.add("backgroundMusic", {volume: 0.3});
            backgroundMusic.loop = true;
            backgroundMusic.play();
        }
        this.background.anims.play('animate', true);
        //Handle scene transition
        startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update()
    {
        if(startKey.isDown)
        {
            //DEBUG ONLY
            //this.scene.start("levelTwo");

            playerX = L0StartX;
            playerY = L0StartY;
            password = false;
            this.scene.start("tutorialLevelNew");
        }
    }
}