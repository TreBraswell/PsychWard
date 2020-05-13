
class Level1 extends Phaser.Scene {
  
    constructor() {
          super("playScene");
          
      }
      preload() {
        this.load.image('char', './assets/or.png')
        this.enemies = 0;
      }
      create() {
        this.playerGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.enemyGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
      this.addPlayer();
      this.addEnemy();
    
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
      var i ;
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
}


