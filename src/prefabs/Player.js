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
        
        scene.anims.create({
            key: 'd',
            frames: [ { key: 'down', frame: 0 } ],
            frameRate: 20
        });
    
    
        scene.anims.create({
            key: 'r',
            frames: [ { key: 'right', frame: 0 } ],
            frameRate: 20
        });
        scene.anims.create({
            key: 'l',
            frames: [ { key: 'left', frame: 0 } ],
            frameRate: 20
        });
        scene.anims.create({
            key: 'u',
            frames: [ { key: 'up', frame: 0 } ],

        });

    }
    preload() {

        
    }
    update() {
        if (this.cursors.up.isDown)
        {
            this.anims.play('u', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.anims.play('d', true);
        }
    
        if (this.cursors.left.isDown)
        {
            this.anims.play('l', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.anims.play('r', true);
        }
        
    }

    
}