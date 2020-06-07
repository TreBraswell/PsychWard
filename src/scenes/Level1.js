class Level1 extends Phaser.Scene {
  
  constructor() {
        super("Level1Scene");
        
    }
    preload() {
 
      //note to future self use a spritesheet to make up down left right
      this.load.audio('clearedSound','./assets/cleared.wav')
    }
    create() {
      this.canHit = true;
      this.hp = 3
      this.gameOver = false;

      this.pickup = game.sound.add('pickup');
        
    

      this.done = true
      this.collectedCounter = 11
    


      //debug stuff
      this.zoomin = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      this.zoomout = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.follow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      this.following = false;
      this.zoomdiff = .01;
      this.cursors =  this.input.keyboard.createCursorKeys();
      this.scrollfac = 10;

      this.spawndoor = false;
      this.goalletters = 10;//number of letters if they are equal to letter ie letters collected the door will fade in and then progress to the next level
      this.letters = 0;
      this.tilediff= 32;
      //text
      let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '18px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
      } 
      this.cursors =  this.input.keyboard.createCursorKeys();
      this.difftimer = false; 
      this.keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.bgm = game.sound.add('backsound');
      this.bgm.loop = true;
      this.bgm.play();


      this.map = this.make.tilemap({ key: 'map' });
      this.tileset = this.map.addTilesetImage('level1', 'tiles1');
      this.layer = this.map.createStaticLayer('Background', this.tileset, 0, 0);
      this.layer2 = this.map.createDynamicLayer('Maze', this.tileset, 0, 0);
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
    this.addEnemy(1363, 942);
    this.addEnemy(436, 1023);
    this.addGoal();
    this.diffchar = 50;
    this.intialdiff  = 25;
    //setting collision
   
    //

    this.physics.add.collider(this.player, this.layer2);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    //this.bcText = this.add.text(580, 10, "press space to go to menu", menuConfig).setOrigin(0,0);
    this.test = this.add.sprite(0 ,0 , 'G');
    //first spell out the phobia now, then make it invisible, and then when player collects, change alpha back to 1
    this.a1 = this.add.sprite( 130, 100, 'A')
    this.a1.alpha = 0;


    this.g = this.add.sprite(130, 100, 'G')
    this.g.alpha = 0;

    this.o1 = this.add.sprite(180, 100, 'O')
    this.o1.alpha = 0;
    this.r = this.add.sprite(230, 100, 'R')
    this.r.alpha = 0;

    this.a2 = this.add.sprite(280, 100, 'A')
    this.a2.alpha = 0;

    this.p = this.add.sprite(330, 100, 'P')
    this.p.alpha = 0;

    this.h = this.add.sprite(380, 100, 'H')
    this.h.alpha = 0;

    this.o2 = this.add.sprite(430, 100, 'O')
    this.o2.alpha = 0;

    this.b = this.add.sprite(480, 100, 'B')
    this.b.alpha = 0;

    this.i = this.add.sprite(530, 100, 'I')
    this.i.alpha = 0;

    this.a3 = this.add.sprite(580, 100, 'A')
    this.a3.alpha = 0;


    this.addLetter('A', 178,2702,this.a1);
    this.addLetter('G', 1748,2693,this.g);
    this.addLetter('O', 616,2072,this.o1);
    this.addLetter('R', 1639,1946,this.r);
    this.addLetter('A', 692,606,this.a2);
    this.addLetter('P', 1004,1130,this.p);
    this.addLetter('H', 383,1413,this.h);
    this.addLetter('O', 841,142,this.o2);
    this.addLetter('B', 1123,1453,this.b);
    this.addLetter('I', 1445,1068,this.i);
    this.addLetter('A', 1070,1982,this.a3);

    this.heart1 = this.add.image(10, 400, 'heart').setOrigin(0,0);
      this.heart2 = this.add.image(50, 400, 'heart').setOrigin(0,0);
      this.heart3 = this.add.image(90, 400, 'heart').setOrigin(0,0);


    this.dOnce = true;

}
addPlayer(){
  this.player = new Player(this,95, 2723, 'player',this.input.keyboard.createCursorKeys());
  this.playerGroup.add(this.player);
}
addLetter(string, x, y, i){

  let letter = new Letter(this,x, y, string,i);

  this.letterGroup.add(letter);
}
addEnemy(x, y){
  var Ene;
  if(this.enemies == 1)
  {
    Ene = new Enemy(this,x, y, 'monster',this.layer2,true);
    
  }
  else
  {
    Ene = new Enemy(this,x, y, 'monster',this.layer2,false);
  }
  
  this.enemyGroup.add(Ene);
  this.enemies++;
}
addGoal(){
  this.goal = new Goal(this,945,46,'door');
  this.goalGroup.add(this.goal);
}
  update() {

    if(this.gameOver)
    {
        if(this.dOnce)
        {
          this.gm = game.sound.add("gameoversfx")
          this.gm.play()
          this.dOnce = false
          this.bgm.stop()
        }
        game.gameOver.currentLevel = 1;
      this.letterGroup.runChildUpdate = false;
      this.playerGroup.runChildUpdate = false;
      this.enemyGroup.runChildUpdate = false;
      this.goalGroup.runChildUpdate = false;
      this.time.delayedCall(600, () => { this.scene.start('gameoverScene'); }); 
      console.log('in gameover')
    }
    else{
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
    
    this.a1.setScrollFactor(0);
    /*this.a1.x = game.playerCoord.x - 300
    this.a1.y = game.playerCoord.y - 200
*/
  this.g.setScrollFactor(0);
    /*this.g.x = game.playerCoord.x - 250
    this.g.y = game.playerCoord.y - 200
    */
   this.o1.setScrollFactor(0);
   /* this.o1.x = game.playerCoord.x - 200
    this.o1.y = game.playerCoord.y - 200
    */
   this.r.setScrollFactor(0);/*
    this.r.x = game.playerCoord.x - 150
    this.r.y = game.playerCoord.y - 200*/
    this.a2.setScrollFactor(0);/*
    this.a2.x = game.playerCoord.x - 100
    this.a2.y = game.playerCoord.y - 200*/
    this.p.setScrollFactor(0);
    /*
    this.p.x = game.playerCoord.x - 50
    this.p.y = game.playerCoord.y - 200
*/
    this.h.setScrollFactor(0);
    /*
    this.h.x = game.playerCoord.x 
    this.h.y = game.playerCoord.y - 200
    */
    this.o2.setScrollFactor(0);/*
    this.o2.x = game.playerCoord.x + 50
    this.o2.y = game.playerCoord.y - 200
    */
    this.b.setScrollFactor(0);/*
    this.b.x = game.playerCoord.x + 100
    this.b.y = game.playerCoord.y - 200
    */
    this.i.setScrollFactor(0);/*
    this.i.x = game.playerCoord.x + 150
    this.i.y = game.playerCoord.y - 200
    */
    this.a3.setScrollFactor(0);
    /*
    this.a3.x = game.playerCoord.x + 200
    this.a3.y = game.playerCoord.y - 200
    */

    this.heart1.setScrollFactor(0);
    this.heart2.setScrollFactor(0);
    this.heart3.setScrollFactor(0);



   
    if(this.cursors.left.isDown && !this.gameOver) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x -this.tilediff, this.player.y, true);
     //console.log(tile.index);
      if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
      {

      }
      else
      { 
        this.player.play('left');
        this.player.x-= 5;
      }

  } else if(this.cursors.right.isDown) {
    var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
   // console.log(tile.index);
    if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
      {

      }
      else
      {

      this.player.x+= 5;
      }

} if(this.cursors.up.isDown) {
var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
   // console.log(tile.index);
if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
  {

  }
  else
  {
     this.player.y-= 5;
  }
      
  }
  else if(this.cursors.down.isDown) {
    var tile = this.layer2.getTileAtWorldXY(this.player.x , this.player.y+this.tilediff, true);
       // console.log(tile.index);
    if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
      {

      }
      else
      {

      this.player.y+= 5;
      } 
  }
    //this.bcText.x= this.player.x; 
    //this.bcText.y= this.player.y; 
    if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
      this.bgm.stop()
      this.scene.start("menuScene");   

    
    }
    this.physics.add.overlap( this.letterGroup,this.playerGroup,function(letter, player){
      if(!letter.collected)
      {
        letter.scene.pickup.play()
      }
      letter.collected = true
      game.wordIndex.collected = true;
      letter.alpha = 0
      letter.scene.collectedCounter--;


  });


  this.physics.add.overlap( this.goalGroup,this.playerGroup,function(goal, player){

    if(goal.scene.collectedCounter <= 0)
    {
      if(!goal.scene.done)
      {

      game.cleared.L2 = true;
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
      this.bgm.stop();
    }
      goal.scene.letterGroup.runChildUpdate = false;
      goal.scene.playerGroup.runChildUpdate = false;
      goal.scene.enemyGroup.runChildUpdate = false;
      goal.scene.goalGroup.runChildUpdate = false;

    }

});

this.physics.add.overlap( this.enemyGroup,this.playerGroup,function(enemy, player){
  if(enemy.scene.canHit)
  {

    this.hit = game.sound.add("hit")
    this.hit.play()
    enemy.scene.time.delayedCall(1000, () => {  enemy.scene.canHit = true }); 
    if(enemy.scene.hp ==3)
    {
      enemy.scene.heart3.destroy()
      enemy.scene.hp--;
    }
    else if(enemy.scene.hp ==2)
    {
      enemy.scene.heart2.destroy()
      enemy.scene.hp--;
    }
    else if(enemy.scene.hp ==1)
    {
      enemy.scene.heart1.destroy()
      enemy.scene.hp--;
      enemy.scene.gameOver = true;
      player.destroy()
    }
    
  }
  enemy.scene.canHit = false

});


  if(this.letters== this.goalletters)
  {
    this.goal.fadein = true;
    this.spawndoor = true;
  }
  this.physics.add.overlap( this.goalGroup,this.playerGroup,function(goal, player){
    if(this.spawndoor&& !this.goal.fadeintween.isPlaying())
    {
      //go to next scene
    }

});
    if( this.prevtime<this.timers-3)
    {
      this.enemyGroup.getChildren().forEach(element => {
        element.blinkwait = true;   
      })

    }
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
    //folow the player using math and x y cordinates
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
timerBump()
{
this.timers++;
}
}