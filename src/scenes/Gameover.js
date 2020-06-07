class Gameover extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    preload() {

        this.load.image('gameover', './assets/deadscreen.png')
  
    }


    create()
    {
       
        this.gameoverScreen = this.add.tileSprite(0, 0, 1000, 1000, 'gameover').setOrigin(0,0)
        this.fadein = this.tweens.add({
            targets: this.gameOverScreen,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 600
        });




        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    }



    update()
    {

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.fadeout = this.tweens.add({
                targets: this.gameOverScreen,
                alpha: {
                    from: 1,
                    to: 0
                },
                duration: 600
            });
            if(game.gameOver.currentLevel = 1)
            {
                this.time.delayedCall(600, () => { this.scene.start('Level1Scene'); }); 
            }
            else if(game.gameOver.currentLevel = 2)
            {

                this.time.delayedCall(600, () => { this.scene.start('Level2Scene'); });  
            }
            else 
            {

                this.time.delayedCall(600, () => { this.scene.start('Level3Scene'); });   
            }
          }  
      
          if(Phaser.Input.Keyboard.JustDown(keyM))
          {
            this.scene.start("transmenuScene");   
      
      
          }

    }

}