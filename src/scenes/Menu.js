
class Menu extends Phaser.Scene {
  
    constructor() {
      super("menuScene");
          this.playOnce = false
      }
      preload() {
        this.load.image('titleScreen', './assets/thenewnew.png');
        this.load.image('psych', './assets/psych.png');
        //level 1
        this.load.tilemapTiledJSON('map', './assets/psychward..json');
        this.load.image('tiles1', './assets/lvl1.png');
        this.load.tilemapTiledJSON('map2', './assets/psychward2.json');
        this.load.image('tiles2', './assets/lvl2.png');
        
        this.load.tilemapTiledJSON('map3', './assets/psychward3.json');
        this.load.image('tiles3', './assets/lvl3.png');
        this.load.image('p12','./assets/p3.png');
        this.load.script('threejs', './assets/three.js');
        this.load.json('fonttest', './assets/Myfont_Regular1.json');
        
        this.load.json('introDialog', './assets/introDialog.json');
        this.load.json('intro2Dialog', './assets/intro2Dialog.json');
        this.load.json('intro3Dialog', './assets/intro3Dialog.json');
        
        this.load.audio('backsound', './assets/psych2.wav');
        
        this.load.image('monster', './assets/monster.png');
        this.load.image('door', './assets/door.png');
        this.load.image('player','./assets/p3.png');
        this.load.image('down', './assets/psychdown.png');
        this.load.image('left', './assets/psychleft.png');
        this.load.image('right', './assets/psychright.png');
        this.load.image('up', './assets/psychup.png');

        this.load.image('heart','./assets/heart.png')
  
        this.load.image('credits', './assets/credits.png')
        this.load.image('thankyou', './assets/thankyou.png')

        this.load.audio('clearedSound','./assets/cleared.wav')
  
        this.load.image('A', './assets/A.png');
        this.load.image('G', './assets/g.png');
        this.load.image('O', './assets/o.png');
        this.load.image('R', './assets/r.png');
        //  this.load.image('A', './assets/smalla.png');
        this.load.image('P', './assets/p.png');
        this.load.image('H', './assets/h.png');
        //this.load.image('O', './assets/o.png');
        this.load.image('B', './assets/b.png');
        this.load.image('I', './assets/i.png');
        //this.load.image('A', './assets/smalla.png');

       // this.load.image('P', './assets/p.png')
        this.load.image('Y', './assets/y.png')
       //this.load.image('R', './assets/r.png')
        //this.load.image('O', './assets/o.png')
        this.load.image('M', './assets/m.png')
       // this.load.image('A', './assets/a.png')
        this.load.image('N', './assets/n.png')
        //this.load.image('I', './assets/i.png')
        //this.load.image('A', './assets/a.png')


        this.load.image('D', './assets/D.png');
        this.load.image('Y', './assets/y.png');
        this.load.image('S', './assets/s.png');
        //this.load.image('M', './assets/r.png');
        this.load.image('E', './assets/e.png');
        this.load.image('T', './assets/t.png');
        //this.load.image('R', './assets/h.png');
        //this.load.image('O', './assets/o.png');
        this.load.image('P', './assets/p.png');
        this.load.image('S', './assets/s.png');
        //this.load.image('I', './assets/i.png');
        //this.load.image('A', './assets/smalla.png');


        this.load.audio('clearedSound','./assets/cleared.wav')

        this.load.audio('lvl2', './assets/lvl2.wav')



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

        this.load.audio('hit', './assets/hit.wav')
        this.load.audio('gameoversfx', './assets/gm.wav')



        this.load.audio('flip', './assets/menu_click.wav');

        this.load.image('files', './assets/files1.png');
        this.load.image('case1','./assets/agoraphobia.png')
        this.load.image('case2','./assets/pyronetic.png')
        this.load.image('case3','./assets/dysmetropsia.png')
        this.load.image('success','./assets/successscreen.png')
        this.load.image('fail','./assets/deadscreen.png')


        this.load.image('dialogbox', './assets/grad.png');
        this.load.image('patient','./assets/patient.png')
        this.load.spritesheet('movements', './assets/testsprites.png', { frameWidth: 141, frameHeight: 141 });

        this.load.audio('clearedSound','./assets/cleared.wav')
        this.load.audio('lvl3', './assets/lvl3.wav')
        this.load.image('lvl2door', './assets/lvl2door.png');
        this.load.audio('pickup','./assets/pickup.wav')
        this.load.image('notes', './assets/papers.png');
        this.load.image('firedown', './assets/fireball.png');
        this.load.audio('typing', './assets/typing.mp3')
        

 
        this.load.image('lvl3door', './assets/lvl3door.png');


        this.load.image('campfire', './assets/campfire.png');
        this.load.image('cabin', './assets/cabin.png');
        this.load.image('bush', './assets/shrub.png');
        this.load.image('cabin', './assets/cabin.png');
        this.load.image('lightpost', './assets/lightpost.png');
        this.load.image('bench', './assets/bench2.png');
        this.load.image('chair', './assets/ben.png');
      }
      create() {
        this.playOnce= false;
        this.click = game.sound.add('flip');

        this.title = this.add.tileSprite(0, 0, 1000, 1000, 'titleScreen').setOrigin(0,0)
        this.title.setScale(1.03);
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
  /*if(this.cursors.left.isDown) {
    this.scene.start("Level2Scene"); 

}
if(this.cursors.up.isDown) {
  this.scene.start("Level1Scene"); 

}*/
      
  }

}


