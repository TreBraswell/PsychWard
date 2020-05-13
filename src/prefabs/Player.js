// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,cursor) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y-10, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.cursors = cursor;
        //taken from phaser example
            

    }

    update() {
        
        if(this.cursors.left.isDown) {
            this.x-= 2;

        } else if(this.cursors.right.isDown) {
            this.x+= 2;

    } if(this.cursors.up.isDown) {
           this.y-= 2;
            
        }
        else if(this.cursors.down.isDown) {
            this.y+= 2; 
        }
        
    }

    
}