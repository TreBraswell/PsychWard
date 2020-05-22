
class Menu extends Phaser.Scene {
  
    constructor() {
      super("menuScene");
          
      }
      preload() {
        this.load.image('titleScreen', './assets/main2.png');
        this.load.image('psych', './assets/psych.png');

        this.load.json('introDialog', './assets/introDialog.json');
        this.load.bitmapFont('basic_font', './assets/font.png', './assets/font.xml')
      }
      create() {
        this.add.tileSprite(0, 0, 1000, 1000, 'titleScreen').setOrigin(0,0)
        this.cursors = this.input.keyboard.createCursorKeys();
    
  }
  

    update() {
      if(this.cursors.space.isDown) {
        this.scene.start("Level1Scene"); 

    }
      
  }

}


