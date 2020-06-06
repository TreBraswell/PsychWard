class Cleared extends Phaser.Scene {
    constructor() {
        super("clearedScene");
    }
    preload() {

        this.load.image('cleared', './assets/successscreen.png')

  
    }


    create()
    {
       
            this.clearScreen = this.add.tileSprite(0, 0, 1000, 1000, 'cleared').setOrigin(0,0)

            this.fadein = this.tweens.add({
                targets: this.clearScreen,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 600
            });

            this.cursors = this.input.keyboard.createCursorKeys();
            this.playOnce = false
            this.click = game.sound.add('flip');

    }



    update()
    {
        if(this.cursors.space.isDown) {
            if(!this.playOnce)
            {
                this.click.play()
                this.playOnce = true;
            }
            this.fadein = this.tweens.add({
                targets: this.clearScreen,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 600
            });
            this.scene.start("menuScene"); 
        }
    }

}