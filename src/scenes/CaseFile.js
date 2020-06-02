
class CaseFile extends Phaser.Scene {
  
    constructor() {
      super("casefileScene");

      this.case1Selected = false
      this.case2Selected = false
      this.case3Selected = false
      this.caseSelected = false
    

          
      }


      create() {
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
        this.cursors = this.input.keyboard.createCursorKeys();

        this.case1Screen = this.add.tileSprite(0, 0, 1000, 1000, 'case1').setOrigin(0,0)
        this.case1Screen.alpha = 0

        this.case2Screen = this.add.tileSprite(0, 0, 1000, 1000, 'case2').setOrigin(0,0)
        this.case2Screen.alpha = 0

        this.case3Screen = this.add.tileSprite(0, 0, 1000, 1000, 'case3').setOrigin(0,0)
        this.case3Screen.alpha = 0
        this.click = game.sound.add('flip');


    
  }
  

    update() {

        if(!this.caseSelected)
        {
            
      if(Phaser.Input.Keyboard.JustDown(one)) {
          this.click.play()

          this.case1Selected = true;
          this.caseSelected = true;
          this.playOnce = false
        this.fadein1 = this.tweens.add({
            targets: this.case1Screen,
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
            targets: this.case2Screen,
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
        targets: this.case3Screen,
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
                targets: this.case1Screen,
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
                targets: this.case2Screen,
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
                targets: this.case3Screen,
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


