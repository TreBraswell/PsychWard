// Player prefab
class Letter extends Phaser.Physics.Arcade.Sprite {
    
    
    constructor(scene, x,y,plat,im,camera,endx,endy) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.goup =true;
        this.im = im;
        this.godown = false; 
        this.ogposy = y;
        this.diff = 20;
        this.collected = false;


        this.playOnce = true;

        this.nowui = false;
        //taken from phaser example
      
        

    }

    update() {

        if(this.collected)
        {
            if(this.playOnce)
            {
                this.fadein = this.scene.tweens.add({
                    targets: this.im,
                    alpha: {
                        from: 0,
                        to: 1
                    },
                    duration: 6000
                });
               
                this.playOnce = false;
            }
            console.log("in collected")

        }
else{


        //makes the letter bob
        if(this.goup)
        {
            this.y--;
                if(this.y<this.ogposy-this.diff)
                {
                    
                    this.goup = false; 
                    this.godown = true; 
                }
        }
        if(this.godown)
        {
            this.y++;
                if(this.y>this.ogposy+this.diff)
                {
                    
                    this.godown = false; 
                    this.goup = true; 
                }
        }

         
    }
}

    
}