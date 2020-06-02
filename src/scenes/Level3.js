
class Level3 extends Phaser.Scene {
  
    constructor() {
          super("Level3Scene");
          
      }
      preload() {
        this.load.audio('backsound', './assets/psych2.wav');
        this.load.image('player', './assets/psychright.png');
        this.load.image('monster', './assets/monster.png');
        this.load.image('door', './assets/door.png');
        this.load.tilemapTiledJSON('map', './assets/psychward3.json');
        this.load.image('tiles1', './assets/lvl3.png');
        this.load.tilemapTiledJSON('mapobj', './assets/lvl3objects.json');
        this.load.image('tilesobj', './assets/lvl3objects.png');
      }
      create() {
        //text
        this.tilediff = 32;
       this.cursors =  this.input.keyboard.createCursorKeys();
        this.keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /*
        this.bgm = game.sound.add('backsound');
        this.bgm.loop = true;
        this.bgm.play();*/


        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('level3', 'tiles1');
        this.tileobj = this.map.addTilesetImage('tilesobj', 'tiles1');
        //this.map.ObjectLayer = new ('objects', this.tileobj, 0, 0);
        this.layer = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        this.layer2 = this.map.createDynamicLayer('Forest', this.tileset, 0, 0);
        //https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Ctilemap%5Cstatic%5Ccreate%20from%20objects.js
        //this.map.createFromObjects
        //another reference https://phaser.io/tutorials/making-your-first-phaser-3-game/part8
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
        this.noteGroup = this.add.group({
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
      this.addPlayer();
     // this.addEnemy();
      this.addGoal();

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

  }
  addPlayer(){
    this.player = new Player(this,380, 480, 'player',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
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
        //console.log(tile.index);
        //||tile.index == -1||tile.index == 11||tile.index==4||tile.index==2
        if(tile == null ||tile.index == 6||tile.index == 8||tile.index==5||tile.index==7||tile.index==3 )
        {

        }
        else
        { 
        //  console.log(tile.index);
        this.player.x-= 2;
       }

    } else if(this.cursors.right.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
      //console.log(tile.index);
      if(tile == null||tile.index == 6||tile.index == 8||tile.index==5||tile.index==7||tile.index==3  )
        {

        }
        else
        {
          //console.log(tile.index);
        this.player.x+= 2;
        }

} if(this.cursors.up.isDown) {
  var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
  //console.log(tile.index);
  if(tile == null ||tile.index == 6||tile.index == 8||tile.index==5||tile.index==7||tile.index==3 )
    {

    }
    else
    {
      //console.log(tile.index);
       this.player.y-= 2;
    }
        
    }
    else if(this.cursors.down.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x , this.player.y+this.tilediff, true);
      //console.log(tile.index);
      if(tile == null||tile.index == 6||tile.index == 8||tile.index==5||tile.index==7||tile.index==3 )
        {

        }
        else
        {
        //  console.log(tile.index);
        this.player.y+= 2;
        } 
    }


      


 
  }









  timerBump()
{
  this.timers++;
}




}


