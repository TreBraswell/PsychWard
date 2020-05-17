
class Level1 extends Phaser.Scene {
  
    constructor() {
          super("playScene");
          
      }
      preload() {
        this.load.audio('backsound', './assets/psych2.wav');
        this.load.image('player', './assets/psych.png');
        this.load.image('monster', './assets/monster.png');
        this.load.tilemapTiledJSON('map', './assets/psychward..json');
        this.load.image('tiles1', './assets/level1.png');
      }
      create() {
        this.bgm = game.sound.add('backsound');
        this.bgm.loop = true;
        this.bgm.play();
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('level1', 'tiles1');
        this.layer = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        this.layer2 = this.map.createStaticLayer('Maze', this.tileset, 0, 0);
        //this.layer2 = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        //  Un-comment this on to see the collision tiles
        // layer.debug = true;
    
        this.enemies = 1;
        this.prevtime= -1;
        this.timers = 0;
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
      this.addEnemy();
      //setting collision
      this.layer.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.player,this.layer);
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    
  }
  addPlayer(){
    this.player = new Player(this,320, 240, 'player',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
  }
  addEnemy(){

    let Ene = new Enemy(this,320, 240, 'monster');
    this.enemyGroup.add(Ene);
    this.enemies++;
  }

    update() {
      if(this.timers%5==0&&this.timers!=this.prevtime)
      {
        this.prevtime = this.timers;
        this.enemyGroup.getChildren().forEach(element => {
          element.blink = true;   
        })
      
      }
      else
      {
        this.enemyGroup.getChildren().forEach(element => {
          element.blink = false;                
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


