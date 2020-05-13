
class Level1 extends Phaser.Scene {
  
    constructor() {
          super("playScene");
          
      }
      preload() {
        this.load.image('char', './assets/or.jpg')
        this.enemies = 10;
      }
      create() {
        this.prevtime= -1;
        this.difficultyTimer = this.time.addEvent({
          delay: 1000,
          callback: this.timerBump,
          callbackScope: this,
          loop: true
    
    
        });
        this.playerGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.enemyGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
      this.addPlayer();
      for(var i = 0; i< this.enemies; i++)
      {
        this.addEnemy();
      }

    
  }
  addPlayer(){
    this.player = new Player(this,320, 240, 'char',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
  }
  addEnemy(){

    let Ene = new Enemy(this,320, 240, 'char');
    this.enemyGroup.add(Ene);
    this.enemies++;
  }

    update() {
      if(this.timers%5==0&&this.timers!=this.prevtime)
      {
        this.prevtime = this.timers;
        this.enemyGroup.getChildren().forEach(element => {
          element.disableBody( false, true);                  
        })
      
      }
      else
      {
        this.enemyGroup.getChildren().forEach(element => {
          element.disableBody( false, false);                  
        })
      }
      var i ;
      //disableBody( [disableGameObject] [, hideGameObject])
      this.enemyGroup.getChildren().forEach(element => {

        if(element.x>this.player.x)
        {
          element.x--;
        }
        else
        {
          element.x++;
        }
        if(element.y>this.player.y)
        {
          element.y--;
        }
        else
        {
          element.y++;
        }
        // do something with element
    })
      
  }
  timerBump()
{
  this.timers++;
}
}


