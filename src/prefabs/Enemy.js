// Player prefab
class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y-10, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        //taken from phaser example
            

    }

    update() {
    }

    
}