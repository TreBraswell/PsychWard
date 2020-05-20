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
            

    }

    update() {
/*        var tile = this.layer2.getTileAtWorldXY(this.x - 32, this.y, true);

        if(this.cursors.left.isDown) {
            if(tile.index == 4 || tile.index == 5)
            {

            }
            else
            { 
            this.x-= 2;
            }

        } else if(this.cursors.right.isDown) {
            if(tile.index == 4 || tile.index == 5)
            {

            }
            else
            {
            this.x+= 2;
            }

    } if(this.cursors.up.isDown) {
        if(tile.index == 4 || tile.index == 5)
        {

        }
        else
        {
           this.y-= 2;
        }
            
        }
        else if(this.cursors.down.isDown) {
            if(tile.index == 4 || tile.index == 5)
            {

            }
            else
            {
            this.y+= 2;
            } 
        }*/
        
    }

    
}