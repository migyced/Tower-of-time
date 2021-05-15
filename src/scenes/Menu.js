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
    }

    create()
    {
        //temp title design
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#FFFFFF'
        }
        this.add.text(game.config.width/2 - 175, game.config.height/2 - 200, "Tower of Time", titleConfig);
        this.add.text(game.config.width/2 - 150, game.config.height/2, "Press Enter to start game!").setOrigin(0);

        //Handle scene transition
        startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update()
    {
        if(startKey.isDown)
        {
            this.scene.start("tutorialLevelNew");
        }
    }
}