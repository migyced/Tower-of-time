class Player extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.allowGravity = true;
        this.climbing = false;

        //physics settings
        this.DRAG = 500;
        //this.acceleration = 500;
    }

    update()
    {
        if(rightKey.isDown)
        {
            this.setVelocityX(MAX_WALK_SPEED);
        }
        else if(leftKey.isDown)
        {
            this.setVelocityX(-MAX_WALK_SPEED);
        }
        else
        {
            this.setVelocityX(0);
            //this.setDragX(this.DRAG);
        }
    }

    climb()
    {
        this.setVelocityY(-MAX_WALK_SPEED);
    }
}