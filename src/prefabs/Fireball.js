// Player prefab
class Fireball extends Phaser.Physics.Arcade.Sprite {
    
    
    constructor(scene, x,y,plat,diff,side,speed) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.goup =true;
        this.godown = false; 
        this.ogposy = y;
        this.ogposx = x;
        this.speed = speed;
        this.diff = diff;
        this.collected = false;
        this.sideways = side;

        this.playOnce = true;

        this.nowui = false;
        //taken from phaser example
      
        

    }

    update() {
        
        if(this.goup&&this.sideways)
        {
           this.setAngle( 90);
            this.x-=this.speed;
                if(this.x<this.ogposx-this.diff)
                {
                    
                    this.goup = false; 
                    this.godown = true; 
                }
        }
        if(this.godown&&this.sideways)
        {  
            this.setAngle( -90);
            this.x+=this.speed;
                if(this.x>this.ogposx+this.diff)
                {
                    
                    this.godown = false; 
                    this.goup = true; 
                }
        }

        //makes the letter bob
        if(this.goup&&this.sideways == false)
        {
            this.setAngle( 180);
            this.y-=this.speed;
                if(this.y<this.ogposy-this.diff)
                {
                    
                    this.goup = false; 
                    this.godown = true; 
                }
        }
        if(this.godown&&this.sideways==false)
        {  
            this.setAngle( 0);
            this.y+=this.speed;
                if(this.y>this.ogposy+this.diff)
                {
                    
                    this.godown = false; 
                    this.goup = true; 
                }
        }

         
}

    
}