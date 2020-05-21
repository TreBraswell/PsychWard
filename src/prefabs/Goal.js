// Player prefab
class Goal extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y-10, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.fadein = false;
        //taken from phaser example
        this.alpha = 0;
        this.fadeintween = scene.tweens.add({
            targets:[ this,this.layer],
            alpha: {
                from: 0,
                to: 1
            },
            duration: 6000
        });    

    }

    update() {
        if(this.fadeintween.isPlaying() || this.fadein == false)
    {

    }
    else
    {
        this.fadein.play();
    }

}
}