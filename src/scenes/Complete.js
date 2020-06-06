class Complete extends Phaser.Scene {
    constructor() {
        super("completeScene");
    }
    preload() {

        this.load.image('credits', './assets/credits.png')
        this.load.image('thankyou', './assets/thankyou.png')

  
    }


    create()
    {
       

            this.credits = this.add.tileSprite(0, 0, 1000, 1000, 'credit').setOrigin(0,0)
            this.fadein = this.tweens.add({
                targets: this.credits,
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
                targets: this.credits,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 600
            });
            this.scene.start("thankyouScene"); 
        }
    }

}