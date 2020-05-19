// Player prefab
class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y-10, plat); 
        // set up physics sprite
        this.picture = scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.blink = false;
        this.blinked = false;
        this.alpha =0;
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
        //taken from phaser example
            

    }

    update() {
        if(this.blink ==true)
        {
            this.fadePicture();
        }
        if(this.blink == false && this.blinked ==true )
        {
            this.unfadePicture();
        }
    }
 fadePicture() {
    console.log("did we go here");
    if(this.fadeout.isPlaying())
    {

    }
    else
    {
        this.fadein.play();
    }

    this.blinked = true; 
    this.blink = false;
}
unfadePicture() {
    if(this.fadein.isPlaying())
    {

    }
    else
    {
        this.fadeout.play();
    }
    this.blinked = false;
}
    
}