class End extends Phaser.Scene {
    constructor()
    {
        super('endScene');
    }

    preload()
    {

    }

    create()
    {
        //temp title design
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#FFFFFF'
        }
        this.add.text(game.config.width/2 - 175, game.config.height/2 - 200, "Congratulations!", titleConfig);
        this.add.text(game.config.width/2 - 150, game.config.height/2, "Press M to main menu!").setOrigin(0);

        //Handle scene transition
        menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update()
    {
        if(menuKey.isDown)
        {
            this.scene.start("levelOne");
        }
    }
}
