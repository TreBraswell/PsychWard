// Player prefab
class Letter extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x,y,plat,num) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.goup =true;
        this.num = num;
        this.godown = false; 
        this.ogposy = y;
        this.diff = 20;
        //taken from phaser example
            

    }

    update() {
        //makes the letter bob
        if(this.goup)
        {
            this.y--;
            console.log("we here");
                if(this.y<this.ogposy-this.diff)
                {
                    console.log("switch");
                    this.goup = false; 
                    this.godown = true; 
                }
        }
        if(this.godown)
        {
            this.y++;
                if(this.y>this.ogposy+this.diff)
                {
                    console.log("switch2");
                    this.godown = false; 
                    this.goup = true; 
                }
        }

         
    }

    
}