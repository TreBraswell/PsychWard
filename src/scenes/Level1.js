
class Level1 extends Phaser.Scene {
  
    constructor() {
          super("playScene");
          
      }
      preload() {
        this.load.image('char', './assets/or.jpg');
        this.load.image('spritemain', './assets/level1.png');
        this.load.tilemapTiledJSON("map1", './assets/psychward.json');    // Tiled JSON file

      }
      create() {
        // add a tilemap
         this.map = this.make.tilemap("map1");
        // add a tileset to the map
         this.tileset = this.map.addTilesetImage('level1','spritemain',212,212,0,0);
        // create tilemap layers
        this.backgroundLayer = this.map.createStaticLayer("Background", this.tileset, 0, 0);
      this.groundLayer = this.map.createStaticLayer("Maze", this.tileset, 0, 0);
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
      this.addEnemy();/*
      //setting collision
      this.groundLayer.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.player,this.groundLayer);*/
    
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


