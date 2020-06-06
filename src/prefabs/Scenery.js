// Player prefab
class Scenery extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,grow1,speed,sizex,sizey) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
        scene.sys.arcadePhysics.world.enableBody(this, 0);
       this.growth = grow1;
        this.sizex = sizex;
        this.sizey = sizey;
        this.speed = speed;
        this.grow1 = grow1;
        if(this.grow1 == 1)
        {
            this.grow =  scene.tweens.add({
                targets     : [ this ],
                scaleX: this.sizex,
                ease        : 'Linear',
                duration    :this.speed,
                yoyo        : true,
                repeat      : -1,
                callbackScope   : this
              });
        }
        else if(this.grow1 == 2)
        {
            this.grow =  scene.tweens.add({
                targets     : [ this ],
                scaleY: this.sizey,
                ease        : 'Linear',
                duration    : this.speed,
                yoyo        : true,
                repeat      : -1,
                callbackScope   : this
              });
        }
        else if(this.grow1==3)
        {
            this.grow =  scene.tweens.add({
                targets     : [ this ],
                scaleX: this.sizex,
                scaleY: this.sizey,
                ease        : 'Linear',
                duration    : this.speed,
                yoyo        : true,
                repeat      : -1,
                callbackScope   : this
              });
        } 
        else
        {
            
        }
        
        //taken from phaser example
            

    }

    update() {
        if(this.growth!=0)
        {
            /*if(!this.grow.isPlaying())
            {
                this.grow.play();
            }*/
        }
        
}
    
}