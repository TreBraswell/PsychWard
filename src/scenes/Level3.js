
class Level3 extends Phaser.Scene {
  
    constructor() {
          super("Level3Scene");
          
      }
      preload() {


      }
      create() {
        //debug stuff
        this.zoomin = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.zoomout = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.follow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.following = false;
        this.zoomdiff = .01;
        //text
        this.prevscroll =0;
        this.tilediff = 32;
       this.cursors =  this.input.keyboard.createCursorKeys();
       this.scrollfac = 10;
        /*
        this.bgm = game.sound.add('backsound');
        this.bgm.loop = true;
        this.bgm.play();*/


        this.map = this.make.tilemap({ key: 'map3' });
        this.tileset = this.map.addTilesetImage('level3', 'tiles3');
        this.tileobj = this.map.addTilesetImage('tilesobj', 'tiles3');
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
        this.sceneryGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
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
      // 0 = does nothing, 1 = expand horiz, 2 = expand vert, 3 = expand both ways
      //campfires
      this.addScenery(327,593,'campfire',0);
      this.addScenery(966,1016,'campfire',0);
      this.addScenery(2047,1670,'campfire',0);
      this.addScenery(99,2658,'campfire',0);
      //bushes
      this.addScenery(72,1113,'bush',0);
      this.addScenery(256,1274,'bush',0);
      this.addScenery(100,1465,'bush',0);
      this.addScenery(1276,1212,'bush',0);
      this.addScenery(1276,1156,'bush',0);
      //lightposts
      this.addScenery(551,753,'lightpost',0);
      this.addScenery(551,1318,'lightpost',0);
      this.addScenery(1429,753,'lightpost',0);
      this.addScenery(1429,1318,'lightpost',0);
      this.addScenery(2057,36,'lightpost',0);
      this.addScenery(1982,2223,'lightpost',0);
      this.addScenery(194,2376,'lightpost',0);
      this.addScenery(552,2705,'lightpost',0);
      //cabin
      this.addScenery(1923,1694,'cabin',0);
      this.addScenery(570,2323,'cabin',0);
      this.addScenery(111,2364,'cabin',0);
      this.addScenery(247,2705,'cabin',0);
      //bench
      this.addScenery(979,941,'bench',0);
      this.addScenery(979,1070,'bench',0);
      this.addScenery(862,1020,'bench',1,1000,10,10);
      this.addScenery(1079,1020,'bench',2,1000,10,10);
      this.addScenery(1158,887,'bench',3,1000,10,10);
    
      //chairs
      this.addScenery(1417,152,'chair');
      this.addScenery(1988,611,'chair');
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.physics.add.collider(this.playerGroup,this.sceneryGroup, null, this.checkcollision);
      
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
  addScenery(x,y,plat,grow,speed,sizex,sizey)
  {
    let back = new Scenery(this,x,y,plat,grow,speed,sizex,sizey);
    back.enableBody =true;
    this.sceneryGroup.add(back);
  }
  addGoal(){
    this.goal = new Goal(this,1573,1095,'lvl3door');
    this.goalGroup.add(this.goal);
  }
    update() {

     // this.cameras.main.setZoom(.3);
    //checks if we are in debug
    this.physics.add.overlap( this.sceneryGroup,this.playerGroup,function(s, player){
      //console.log(player.x+" "+player.y+s.x+" "+s.y)
      

  });
    if(config.physics.arcade.debug)
    {
     if(this.follow.isDown ||this.following)
     {var point =  this.cameras.main.getWorldPoint(this.input.mousePointer.x,this.input.mousePointer.y)
      console.log( "this is cursor position : ("+point.x+","+point.y+")");
       this.following = true;
      this.cameras.main.stopFollow();
      if (this.cursors.up.isDown)
      {
        this.cameras.main.scrollY -= this.scrollfac;
      }
      else if (this.cursors.down.isDown)
      {
        this.cameras.main.scrollY += this.scrollfac;
      }
  
      if (this.cursors.left.isDown)
      {
        this.cameras.main.scrollX -= this.scrollfac;
      }
      else if (this.cursors.right.isDown)
      {
        this.cameras.main.scrollX += this.scrollfac;
      }
     }
      if(this.zoomin.isDown)
      {
        this.cameras.main.setZoom(this.cameras.main.zoom +this.zoomdiff);
      }
      else if(this.zoomout.isDown)
      {
        this.cameras.main.setZoom(this.cameras.main.zoom -this.zoomdiff);
      }
    }
    
      if(this.cursors.left.isDown && !this.following) {
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

    } else if(this.cursors.right.isDown&& !this.following) {
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

} if(this.cursors.up.isDown&& !this.following) {
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
    else if(this.cursors.down.isDown&& !this.following) {
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







checkcollision(fire,player){
  console.log("test");
}

  timerBump()
{
  this.timers++;
}




}


