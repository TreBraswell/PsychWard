// Player prefab
class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,layer,bool) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y-10, plat); 
        // set up physics sprite
        this.picture = scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.blink = false;
        this.blinked = false;
        this.alpha =0;
        this.blinkwait = false;
        this.layer = layer;
        if(bool)
        {
            this.fadeout = scene.tweens.add({
                targets: [this, this.layer ],
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 6000
            });
            this.fadein = scene.tweens.add({
                targets:[ this,this.layer],
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 6000
            });
        }
        else
        {
            this.fadeout = scene.tweens.add({
                targets: this,
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 6000
            });
            this.fadein = scene.tweens.add({
                targets: this,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 6000
            });
        }
        
        //taken from phaser example
            

    }

    update() {
        if(this.blink ==true)
        {
            this.fadePicture();
        }
        else if(this.blink == false && this.blinked ==true&&this.blinkwait==true )
        {
            this.unfadePicture();
        }
    }
 fadePicture() {
    if(this.fadein.isPlaying())
    {

    }
    else
    {
        this.alpha = 0;
        this.fadeout.play();
        this.blinked = true; 
        this.blink = false;
    }


}
unfadePicture() {
    if(this.fadeout.isPlaying())
    {

    }
    else
    {
        this.fadein.play();
        this.blinked = false;
        this.blinkwait = false;
    }
    
}
    
}