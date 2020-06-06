
class Menu extends Phaser.Scene {
  
    constructor() {
      super("menuScene");
          this.playOnce = false
      }
      preload() {
        this.load.image('titleScreen', './assets/main2.png');
        this.load.image('psych', './assets/psych.png');
https://www.youtube.com/watch?v=tG35R8F2j8k
        this.load.json('introDialog', './assets/introDialog.json');
        this.load.json('intro2Dialog', './assets/intro2Dialog.json');
        this.load.json('intro3Dialog', './assets/intro3Dialog.json');


        this.load.json('level2-1Dialog', './assets/level2-1Dialog.json');
        this.load.json('level2-2Dialog', './assets/level2-2Dialog.json');
        this.load.json('level2-3Dialog', './assets/level2-3Dialog.json');
        this.load.json('level2-4Dialog', './assets/level2-4Dialog.json');
        this.load.json('level2-5Dialog', './assets/level2-5Dialog.json');
        this.load.json('level2-6Dialog', './assets/level2-6Dialog.json');
        this.load.json('level2-7Dialog', './assets/level2-7Dialog.json');
        this.load.json('level2-8Dialog', './assets/level2-8Dialog.json');
        this.load.json('level2-9Dialog', './assets/level2-9Dialog.json');
        this.load.bitmapFont('basic_font', './assets/final_0.png', './assets/final.fnt')



        this.load.audio('flip', './assets/menu_click.wav');

        this.load.image('files', './assets/filess.png');
        this.load.image('case1','./assets/agoraphobia.png')
        this.load.image('case2','./assets/pyronetic.png')
        this.load.image('case3','./assets/dysmetropsia.png')
        this.load.image('success','./assets/successscreen.png')
        this.load.image('fail','./assets/deadscreen.png')


        this.load.image('dialogbox', './assets/grad.png');
        this.load.image('patient','./assets/patient.png')



        this.load.audio('pickup','./assets/pickup.wav')
      }
      create() {
        this.playOnce= false;
        this.click = game.sound.add('flip');

        this.title = this.add.tileSprite(0, 0, 1000, 1000, 'titleScreen').setOrigin(0,0)
        this.fadein = this.tweens.add({
          targets: this.title,
          alpha: {
              from: 0,
              to: 1
          },
          duration: 600
      });

        this.cursors = this.input.keyboard.createCursorKeys();
    
  }
  

    update() {
      if(this.cursors.space.isDown) {
        this.scene.start("Level3Scene"); 

    }
    if(this.cursors.right.isDown) {
      this.scene.start("instructionsScene"); 
      if(!this.playOnce)
      {
          this.click.play()
          this.playOnce = true;
      }
      
      this.fadeout1 = this.tweens.add({
        targets: this.title,
        alpha: {
            from: 1,
            to: 0
        },
        duration: 600
    });
    this.time.delayedCall(600, () => { this.scene.start('instructionsScene'); }); 

  }
  if(this.cursors.left.isDown) {
    this.scene.start("Level1Scene"); 

}
if(this.cursors.up.isDown) {
  this.scene.start("transition1sScene"); 

}
      
  }

}


