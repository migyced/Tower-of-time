class Background extends Phaser.GameObjects.TileSprite
{
    constructor(scene, x, y, width, height, texture, frame, allowGravity, immovable)
    {
        super(scene, x, y, width, height, texture, frame);
        this.setOrigin(0);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        if(allowGravity)
        {
            this.body.setAllowGravity(true);
        }
        else
        {
            this.body.setAllowGravity(false);
        }
        if(immovable)
        {
            this.body.immovable = true;
        }
        else
        {
            this.body.immovable = false;
        }
    }
}