class Enemy extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        if(direction)
        {
            this.walkSpeed = 3;
        }
        else
        {
            this.walkSpeed = -3;
        }
        
        this.maxX = 0;
        this.minX = 0;
    }

    setPartrol(min, max)
    {
        this.maxX = max;
        this.minX = min;
    }


    update()
    {
        if(this.x < this.minX)
        {
            this.walkSpeed = -this.walkSpeed;
        }
        else if(this.x > this.maxX)
        {
            this.walkSpeed = -this.walkSpeed;
        }
        this.x += this.walkSpeed;
    }
}