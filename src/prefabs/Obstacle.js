// Spaceship prefab
class Obstacle extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, velocity,plat) {
        super(scene,  tempx, tempy , plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(-velocity);            // make it go!
        this.setImmovable();                    
        this.newPlatform = true;                 // custom property to control barrier spawning
        this.body.setAllowGravity(false);
        this.scene = scene;
        this.text = plat;
        this.velocity = velocity;
    }

    update() {
    }
}