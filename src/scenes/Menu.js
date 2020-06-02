
class Menu extends Phaser.Scene {
  
    constructor() {
      super("menuScene");
          
      }
      preload() {
        this.load.image('titleScreen', './assets/main2.png');
        this.load.image('psych', './assets/psych.png');

        this.load.json('introDialog', './assets/introDialog.json');
        this.load.json('level2-1Dialog', './assets/level2-1Dialog.json');
        this.load.json('level2-2Dialog', './assets/level2-2Dialog.json');
        this.load.json('level2-3Dialog', './assets/level2-3Dialog.json');
        this.load.json('level2-4Dialog', './assets/level2-4Dialog.json');
        this.load.json('level2-5Dialog', './assets/level2-5Dialog.json');
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
    if(this.cursors.right.isDown) {
      this.scene.start("Level2Scene"); 

  }
  if(this.cursors.left.isDown) {
    this.scene.start("Level1Scene"); 

}
if(this.cursors.up.isDown) {
  this.scene.start("Level3Scene"); 

}
      
  }

}


