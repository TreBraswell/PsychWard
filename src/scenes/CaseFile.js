
class CaseFile extends Phaser.Scene {
  
    constructor() {
      super("casefileScene");

      this.case1Selected = false
      this.case2Selected = false
      this.case3Selected = false
      this.caseSelected = false
    

          
      }
      preload()
      {
          this.load.image('done1', './assets/files_onec.png')
          this.load.image('done2', './assets/files_twoc.png')
          this.load.image('done3', './assets/files_threec.png')
      }


      create() {
        this.zoomin = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.zoomout = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.follow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.following = false;
        this.zoomdiff = .01;
        this.cursors =  this.input.keyboard.createCursorKeys();
        this.scrollfac = 10; 
        
        this.transition = false
        this.playOnce = false
        one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        three  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        this.click = game.sound.add('flip');
       




        this.files = this.add.tileSprite(0, 0, 1000, 1000, 'files').setOrigin(0,0)
        this.fadein = this.tweens.add({
            targets: this.files,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 600
        });
        
        if(game.cleared.L1)
        {
            this.d1 = this.add.tileSprite(0, 0, 1000, 1000, 'done1').setOrigin(0,0)
            this.fadein = this.tweens.add({
                targets: this.d1,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 600
            });
        }
        if(game.cleared.L2)
        {
            this.d2 = this.add.tileSprite(0, 0, 1000, 1000, 'done2').setOrigin(0,0)
            this.fadein = this.tweens.add({
                targets: this.d2,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 600
            });
        }
        if(game.cleared.L3)
        {
            this.d3 = this.add.tileSprite(0, 0, 1000, 1000, 'done3').setOrigin(0,0)
            this.fadein = this.tweens.add({
                targets: this.d3,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 600
            });
        }


        this.cursors = this.input.keyboard.createCursorKeys();

        this.case1Screen = this.add.tileSprite(-5, -5, 1000, 1000, 'case1').setOrigin(0,0)
        this.case1Screen.alpha = 0

        this.case2Screen = this.add.tileSprite(-27, 25, 1000, 1000, 'case2').setOrigin(0,0)
        this.case2Screen.alpha = 0

        this.case3Screen = this.add.tileSprite(-5, -5, 1000, 1000, 'case3').setOrigin(0,0)
        this.case3Screen.alpha = 0
        this.click = game.sound.add('flip');
         //casefile 1
         this.casea1 = this.add.bitmapText(94, 116, 'basic_font', 'dislikes open spaces');this.casea1.alpha=0;
         this.casea2 = this.add.bitmapText(94, 152, 'basic_font', 'panic,trapped,helpless');this.casea2.alpha=0;
         this.casea3 = this.add.bitmapText(94, 193, 'basic_font', "doesn't feel safe alone \nor in a crowd");this.casea3.alpha=0;
         this.casea4 = this.add.bitmapText(94, 255, 'basic_font', '"it"  pushes me to move');this.casea4.alpha=0;
         this.casea5 = this.add.bitmapText(112, 299, 'basic_font', '"something is telling\n me to move, to take\n myself out of every\n place or situation"');this.casea5.alpha=0;
         this.casea6 = this.add.bitmapText(473, 268, 'basic_font', 'something in their way\n of moving forward');this.casea6.alpha=0;
         this.casea7 = this.add.bitmapText(478, 300, 'basic_font', 'occurence of panic attacks');this.casea7.alpha=0;
         //casefile 2
 
         this.caseb1 = this.add.bitmapText(92, 113, 'basic_font', 'dazzled, in awe of fire'); this.caseb1.alpha=0;
         this.caseb2 = this.add.bitmapText(92, 152, 'basic_font', 'feels need to carry\n matches or lighters');this.caseb2.alpha=0;
         this.caseb3 = this.add.bitmapText(92, 187, 'basic_font', 'leaves burnt holes on\n house rugs');this.caseb3.alpha=0;
         this.caseb4 = this.add.bitmapText(92, 235, 'basic_font', 'needs sense of relief from\n tension or anxiety');this.caseb4.alpha=0;
         this.caseb5 = this.add.bitmapText(92, 304, 'basic_font', 'needs to see physical fire\n everywhere');this.caseb5.alpha=0;
         this.caseb6 = this.add.bitmapText(517, 62, 'basic_font', 'as a child would burn\n ants with magnfying glass,\n then smallbirds');this.caseb6.alpha=0;
         this.caseb7 = this.add.bitmapText(517, 140, 'basic_font', '"there for me when\n no one else was"');this.caseb7.alpha=0;
         //casefile 3
         this.casec1 = this.add.bitmapText(104, 113, 'basic_font', 'See things altering in size'); this.casec1.alpha=0;
         this.casec2 = this.add.bitmapText(104, 152, 'basic_font', 'when variable to concentrate on an object gains migraines and dizziness');this.casec2.alpha=0;
         this.casec3 = this.add.bitmapText(104, 187, 'basic_font', 'objects also apearing to be closer or farther than they actually are');this.casec3.alpha=0;
         this.casec4 = this.add.bitmapText(104, 235, 'basic_font', 'too many changes or distortions for the eyes to handle');this.casec4.alpha=0;
         this.casec5 = this.add.bitmapText(478, 238, 'basic_font', '"To me, an orange can seem tall as a building"');this.casec5.alpha=0;
         this.casec6 = this.add.bitmapText(478, 310, 'basic_font', '"Everything seems to be changing everywhere"');this.casec6.alpha=0;

    
  }
  

    update() {
        if(config.physics.arcade.debug)
        {
         
         if(this.follow.isDown ||this.following)
         {var point =  this.cameras.main.getWorldPoint(this.input.mousePointer.x,this.input.mousePointer.y)
          console.log( "this is cursor position : ("+point.x+","+point.y+")");
           this.following = true;
          this.cameras.main.stopFollow();
          if (this.cursors.up.isDown)
          {
            this.cameras.main.scrollY -= this.scrollfac;
          }
          else if (this.cursors.down.isDown)
          {
            this.cameras.main.scrollY += this.scrollfac;
          }
      
          if (this.cursors.left.isDown)
          {
            this.cameras.main.scrollX -= this.scrollfac;
          }
          else if (this.cursors.right.isDown)
          {
            this.cameras.main.scrollX += this.scrollfac;
          }
         }
          if(this.zoomin.isDown)
          {
            this.cameras.main.setZoom(this.cameras.main.zoom +this.zoomdiff);
          }
          else if(this.zoomout.isDown)
          {
            this.cameras.main.setZoom(this.cameras.main.zoom -this.zoomdiff);
          }
        }
        if(!this.caseSelected)
        {
            
      if(Phaser.Input.Keyboard.JustDown(one)) {
          this.click.play()

          this.case1Selected = true;
          this.caseSelected = true;
          this.playOnce = false
        this.fadein1 = this.tweens.add({
            targets: [this.case1Screen,        
                this.casea1,
                this.casea2, 
                this.casea3, 
                this.casea4, 
                this.casea5, 
                this.casea6], 
            alpha: {
                from: 0,
                to: 1
            },
            duration: 600
        });

    }
    if(Phaser.Input.Keyboard.JustDown(two)) {
        this.click.play()
        this.case2Selected = true;
        this.caseSelected = true;
        this.playOnce = false
        this.fadein2 = this.tweens.add({
            targets: [this.case2Screen,
                this.caseb1,
                this.caseb2, 
                this.caseb3, 
                this.caseb4, 
                this.caseb5, 
                this.caseb6,
                this.caseb7,], 
            alpha: {
                from: 0,
                to: 1
            },
            duration: 600
        });

  }
  if(Phaser.Input.Keyboard.JustDown(three)) {
    this.click.play()
    this.case3Selected = true;
    this.caseSelected = true;
    this.playOnce = false
    this.fadein3 = this.tweens.add({
        targets: [this.case3Screen,
            this.casea1,
                this.casec2, 
                this.casec3, 
                this.casec4, 
                this.casec5, 
                this.casec6,
                this.casec7,], 
        alpha: {
            from: 0,
            to: 1
        },
        duration: 600
    });


}


}
else{

    if(this.cursors.left.isDown)
    {
        this.files.alpha = 1
        if(!this.playOnce)
        {
            this.click.play()
            this.playOnce = true
        }
    

        if(this.case1Selected)
        {

            this.fadeout1 = this.tweens.add({
                targets: [this.case1Screen,        
                    this.casea1,
                    this.casea2, 
                    this.casea3, 
                    this.casea4, 
                    this.casea5, 
                    this.casea6], 
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 600
            });
    
        }
        else if(this.case2Selected)
        {
            this.fadeout2 = this.tweens.add({
                targets: [this.case2Screen,
                    this.caseb1,
                    this.caseb2, 
                    this.caseb3, 
                    this.caseb4, 
                    this.caseb5, 
                    this.caseb6,
                    this.caseb7,], 
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 600
            });
        }
        else
        {

            this.fadeout3 = this.tweens.add({
                targets: [this.case3Screen,
                    this.casea1,
                        this.casec2, 
                        this.casec3, 
                        this.casec4, 
                        this.casec5, 
                        this.casec6,
                        this.casec7,], 
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 600
            });
        }
        this.case1Selected = false;
        this.case2Selected = false;
        this.case3Selected = false;
        this.caseSelected = false;
    }
    else if(this.cursors.right.isDown)
    {
        if(!this.playOnce)
        {
            this.click.play()
        }
        this.files.alpha = 0;
        
        if(this.case1Selected)
        {
            this.fadeout1 = this.tweens.add({
                targets: this.case1Screen,
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 600
            });
            this.time.delayedCall(600, () => { this.scene.start('intro1Scene'); }); 
        }
        if(this.case2Selected)
        {
            this.fadeout2 = this.tweens.add({
                targets: this.case2Screen,
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 600
            });
            this.time.delayedCall(600, () => { this.scene.start('intro2Scene'); });
        }
        if(this.case3Selected)        {
        this.fadeout3 = this.tweens.add({
            targets: this.case3Screen,
            alpha: {
                from: 1,
                to: 0
            },
            duration: 600
        });

        this.time.delayedCall(600, () => { this.scene.start('intro3Scene'); });
        }
        this.playOnce = true
    }

}
      
  }

}


