// Player prefab
class Scenery extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,grow1,speed,sizex,sizey) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        this.picture = scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
       this.growth = grow1;
        this.sizex = sizex;
        this.sizey = sizey;
        this.speed = speed;
        if(grow1 == 1)
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
        else if(grow1 == 2)
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
        else if(grow1==3)
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
            this.grow =  scene.tweens.add({
                targets     : [ this ],
                scaleX: 10,
                ease        : 'Linear',
                duration    :1000,
                yoyo        : true,
                repeat      : -1,
                callbackScope   : this
              });
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