class Item extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame, name, allowGravity, active)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this);

        if(active)
        {
            this.alpha = 1;
        }
        else
        {
            this.alpha = 0;
        }
        
        //item info
        this.name = name;
        this.body.setAllowGravity(allowGravity);
    }

    pickup()
    {
        this.alpha = 0;
    }

    Reset()
    {
        this.alpha = 1;
    }

    update()
    {

    }
}