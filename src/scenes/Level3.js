
class Level3 extends Phaser.Scene {
  
    constructor() {
          super("Level3Scene");
          
      }
      preload() {

      }
      create() {
        this.pickup = game.sound.add('pickup');

        this.collectedCounter = 12

        this.bgm = game.sound.add('lvl3');
      this.bgm.loop = true;
      this.bgm.play();
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
    
      this.temp =false;





      this.d = this.add.sprite( 130, 100, 'D')
      this.d.alpha = 0;
  
  
      this.y = this.add.sprite(180, 100, 'Y')
      this.y.alpha = 0;
  
      this.s1 = this.add.sprite(230, 100, 'S')
      this.s1.alpha = 0;

      this.m = this.add.sprite(280, 100, 'M')
      this.m.alpha = 0;
  
      this.e = this.add.sprite(330, 100, 'E')
      this.e.alpha = 0;
  
      this.t = this.add.sprite(380, 100, 'T')
      this.t.alpha = 0;
  
      this.r = this.add.sprite(430, 100, 'R')
      this.r.alpha = 0;
  
      this.o = this.add.sprite(480, 100, 'O')
      this.o.alpha = 0;
  
      this.p = this.add.sprite(530, 100, 'P')
      this.p.alpha = 0;

      this.s2 = this.add.sprite(580, 100, 'S')
      this.s2.alpha = 0;
  
  
      this.i = this.add.sprite(630, 100, 'I')
      this.i.alpha = 0;
  
      this.a = this.add.sprite(680, 100, 'A')
      this.a.alpha = 0;
  
  
      this.addLetter('D', 178,2702,this.d);
      this.addLetter('Y', 1748,2693,this.y);
      this.addLetter('S', 616,2072,this.s1);
      this.addLetter('M', 1639,1946,this.m);
      this.addLetter('E', 692,606,this.e);
      this.addLetter('T', 1004,1130,this.t);
      this.addLetter('R', 383,1413,this.r);
      this.addLetter('O', 841,142,this.o);
      this.addLetter('P', 1123,1453,this.p);
      this.addLetter('S', 100,1453,this.s2);
      this.addLetter('I', 1445,1068,this.i);
      this.addLetter('A', 1070,1982,this.a);







      


      
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
  addLetter(string, x, y, i){

    let letter = new Letter(this,x, y, string,i);
    this.letterGroup.add(letter);
  }
    update() {



      this.d.setScrollFactor(0);
      this.y.setScrollFactor(0);
      this.s1.setScrollFactor(0);
      this.m.setScrollFactor(0);
      this.e.setScrollFactor(0);
      this.t.setScrollFactor(0);
      this.r.setScrollFactor(0);
      this.o.setScrollFactor(0);
      this.p.setScrollFactor(0);
      this.s2.setScrollFactor(0);
      this.i.setScrollFactor(0);
      this.a.setScrollFactor(0);

     // this.cameras.main.setZoom(.3);
    //checks if we are in debug

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

          this.player.x-= 5;
          if(this.physics.overlap( this.sceneryGroup,this.playerGroup))
          {
            this.player.x+=10;
   
          }
       }

    } else if(this.cursors.right.isDown&& !this.following) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
      //console.log(tile.index);
      if(tile == null||tile.index == 6||tile.index == 8||tile.index==5||tile.index==7||tile.index==3  )
        {

        }
        else
        {

           this.player.x+= 5;
           if(this.physics.overlap( this.sceneryGroup,this.playerGroup))
           {
             this.player.x-=10;
    
           }
        }

} if(this.cursors.up.isDown&& !this.following) {
  var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
  //console.log(tile.index);
  if(tile == null ||tile.index == 6||tile.index == 8||tile.index==5||tile.index==7||tile.index==3 )
    {

    }
    else
    {

       this.player.y-= 5;
       if(this.physics.overlap( this.sceneryGroup,this.playerGroup))
       {
         this.player.y+=10;

       }
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
          var tempbefore = this.player.y;
        this.player.y+= 5;
          this.temp = false;
        if(this.physics.overlap( this.sceneryGroup,this.playerGroup))
        {
          this.player.y-=10;

        }
          
        } 
    }
    if(this.physics.overlap( this.sceneryGroup,this.playerGroup))
           {
            this.physics.overlap( this.sceneryGroup,this.playerGroup,function(s, player){
              if(s.grow1==1||s.grow1==3)
              {
                if(s.x>player.x)
                {
                  player.x-=10;
                }
                else
                {
                  player.x+=10;
                }
              }
              if(s.grow1==2||s.grow1==3)
              {
                if(s.y>player.y)
                {
                  player.y-=10;
                }
                else
                {
                  player.y+=10;
                }
              }
              
        
          });
           }

           this.physics.add.overlap( this.goalGroup,this.playerGroup,function(goal, player){

            if(goal.scene.collectedCounter <= 0)
            {
              if(!goal.scene.done)
              {
        
              game.cleared.L3 = true;
              if(game.cleared.L1 && game.cleared.L2 && game.cleared.L3 )
              {
                goal.scene.time.delayedCall(600, () => { goal.scene.scene.start('completeScene'); }); 
              }
              else{
               goal.scene.time.delayedCall(600, () => { goal.scene.scene.start('clearedScene'); }); 
              }
        
              goal.scene.done = true;
              this.clearedSFX = game.sound.add('clearedSound')
              this.clearedSFX.play()
              goal.scene.bgm.stop();
              player.destroy();
            }
              goal.scene.letterGroup.runChildUpdate = false;
              goal.scene.playerGroup.runChildUpdate = false;
              goal.scene.enemyGroup.runChildUpdate = false;
              goal.scene.goalGroup.runChildUpdate = false;
        
            }
        
        });
        this.physics.add.overlap( this.letterGroup,this.playerGroup,function(letter, player){
          if(!letter.collected)
          {
            letter.scene.pickup.play()
            letter.collected = true
            letter.alpha = 0
            letter.scene.collectedCounter--;
          }
    
    
      });
    


 
  }









  timerBump()
{
  this.timers++;
}

checkthis()
{
  console.log("ckeck");
  this.temp = true;
}


}


