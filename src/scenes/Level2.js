
class Level2 extends Phaser.Scene {
  
    constructor() {
          super("Level2Scene");
          
      }
      preload() {
        this.load.audio('backsound', './assets/psych2.wav');
        this.load.image('player', './assets/psychright.png');
        this.load.image('monster', './assets/monster.png');
        this.load.image('door', './assets/door.png');
        this.load.tilemapTiledJSON('map', './assets/psychward..json');
        this.load.image('tiles1', './assets/lvl1.png');
        this.load.image('A', './assets/A.png');
      }
      create() {
        //text
       this.cursors =  this.input.keyboard.createCursorKeys();
        this.keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /*
        this.bgm = game.sound.add('backsound');
        this.bgm.loop = true;
        this.bgm.play();*/


        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('level1', 'tiles1');
        this.layer = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        this.layer2 = this.map.createDynamicLayer('Maze', this.tileset, 0, 0);
        //this.layer2 = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        //  Un-comment this on to see the collision tiles
        // layer.debug = true;
    
       this.difficultyTimer = this.time.addEvent({
          delay: 1000,
          callback: this.timerBump,
          callbackScope: this,
          loop: true
    
    
        });
        //groups
        this.letterGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.goalGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
       this.playerGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.enemyGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
    this.layer2.setCollisionByProperty({ collide: true });
      this.addPlayer();
     // this.addEnemy();
      this.addLetter('A',1);
      this.addGoal();
      //setting collision
     
      //

      this.physics.add.collider(this.player, this.layer2);

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }
  addPlayer(){
    this.player = new Player(this,380, 280, 'player',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
  }
  addLetter(string, num){
    let letter = new Letter(this,400, 480, string,num);
    this.letterGroup.add(letter);
  }
  addEnemy(){
    var Ene;
    if(this.enemies == 1)
    {
      Ene = new Enemy(this,320, 240, 'monster',this.layer2,true);
      
    }
    else
    {
      Ene = new Enemy(this,320, 240, 'monster',this.layer2,false);
    }
    
    this.enemyGroup.add(Ene);
    this.enemies++;
  }
  addGoal(){
    this.goal = new Goal(this,400,480,'door');
    this.goalGroup.add(this.goal);
  }
    update() {
     
      if(this.cursors.left.isDown) {
        var tile = this.layer2.getTileAtWorldXY(this.player.x -this.tilediff, this.player.y, true);
        if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
        {

        }
        else
        { 
        this.player.x-= 2;
        }

    } else if(this.cursors.right.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
      if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
        {

        }
        else
        {
        this.player.x+= 2;
        }

} if(this.cursors.up.isDown) {
  var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
  if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
    {

    }
    else
    {
       this.player.y-= 2;
    }
        
    }
    else if(this.cursors.down.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x , this.player.y+this.tilediff, true);
      if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
        {

        }
        else
        {
        this.player.y+= 2;
        } 
    }
      
  }
  timerBump()
{
  this.timers++;
}
}


