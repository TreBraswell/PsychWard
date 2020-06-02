
class Instructions extends Phaser.Scene {
  
    constructor() {
      super("instructionsScene");
      this.inst = null
      this.playOnce= false;
      }
      preload() {
        this.load.image('instructions', './assets/instructions.png');
       
      }
      create() {
        this.transition = false
        this.inst = this.add.tileSprite(0, 0, 1000, 1000, 'instructions').setOrigin(0,0)
        this.inst.alpha = 0;
        this.playOnce= false;

        this.fadein = this.tweens.add({
            targets: this.inst,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 600
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.click = game.sound.add('flip');
  }
  

    update() {
      if(this.cursors.space.isDown) {
        this.scene.start("Level1Scene"); 

    }
    if(this.cursors.right.isDown && !this.transition) {
        if(!this.playOnce)
        {
            this.click.play()
            this.playOnce = true;
        }
        this.fadeout1 = this.tweens.add({
            targets: this.inst,
            alpha: {
                from: 1,
                to: 0
            },
            duration: 600
        });
        this.time.delayedCall(600, () => { this.scene.start('casefileScene'); }); 
        this.transition = true

  }
  if(this.cursors.left.isDown && !this.transition) {
    if(!this.playOnce)
    {
        this.click.play()
        this.playOnce = true;
    }
    this.fadeout1 = this.tweens.add({
        targets: this.inst,
        alpha: {
            from: 1,
            to: 0
        },
        duration: 600
    });
    this.time.delayedCall(600, () => { this.scene.start('menuScene'); }); 
    this.transition = true
}
      
  }

}


