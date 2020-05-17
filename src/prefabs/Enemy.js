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
   this.scene.add.tweens(this.picture).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    this.blinked = true; 
    this.blink = false;
}
unfadePicture() {

    //this.scene.add.tween(this.picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    this.blinked = false;
}
    
}