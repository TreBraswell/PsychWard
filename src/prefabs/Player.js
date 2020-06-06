// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,cursor,layer) {
        
        // call Phaser Physics Sprite constructor
        super(scene,x, y-10, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.cursors = cursor;
        //taken from phaser example
        this.layer2 = layer;
        this.prev = 0;

    }
    preload() {

        
    }
    update() {
       
        
    }

    
}