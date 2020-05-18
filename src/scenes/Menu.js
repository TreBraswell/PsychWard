
class Menu extends Phaser.Scene {
  
    constructor() {
      super("menuScene");
          
      }
      preload() {
        this.load.image('titleScreen', './assets/title.png');
      }
      create() {
        this.add.tileSprite(0, 0, 1000, 1000, 'titleScreen').setOrigin(0,0)
        this.cursors = this.input.keyboard.createCursorKeys();
    
  }
  

    update() {
      if(this.cursors.left.isDown) {
        this.scene.start("Level1Scene"); 

    }
      
  }

}


