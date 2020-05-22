
class Level1 extends Phaser.Scene {
  
    constructor() {
          super("Level1Scene");
          
      }
      preload() {
        this.load.audio('backsound', './assets/psych2.wav');
        this.load.image('player', './assets/psychright.png');
        this.load.image('monster', './assets/monster.png');
        this.load.image('door', './assets/door.png');
        this.load.tilemapTiledJSON('map', './assets/psychward..json');
        this.load.image('tiles1', './assets/lvl1.png');



        this.load.image('A', './assets/A.png');
        this.load.image('G', './assets/g.png');
        this.load.image('O', './assets/o.png');
        this.load.image('R', './assets/r.png');
        //  this.load.image('A', './assets/A.png');
        this.load.image('P', './assets/p.png');
        this.load.image('H', './assets/h.png');
        //this.load.image('O', './assets/A.png');
        this.load.image('B', './assets/b.png');
        this.load.image('I', './assets/i.png');
        //this.load.image('A', './assets/A.png');
      }
      create() {


      




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
      this.addEnemy();
      this.addLetter('A', 500,600,0);
      this.addLetter('G', 600,780,1);
      this.addLetter('O', 300,480,2);
      this.addLetter('R', 200,580,3);
      this.addLetter('A', 700,780,4);
      this.addLetter('P', 700,280,5);
      this.addLetter('H', 400,780,6);
      this.addLetter('O', 800,580,7);
      this.addLetter('B', 300,680,8);
      this.addLetter('I', 300,230,9);
      this.addLetter('A', 100,60,10);
      this.addGoal();
      //setting collision
     
      //

      this.physics.add.collider(this.player, this.layer2);

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.bcText = this.add.text(580, 10, "press space to go to menu", menuConfig).setOrigin(0,0);




      //first spell out the phobia now, then make it invisible, and then when player collects, change alpha back to 1
      this.a1 = this.add.sprite(game.playerCoord.x ,game.playerCoord.y , 'A')
      this.a1.alpha = 0;
      
      this.g = this.add.sprite(game.playerCoord.x + 20 ,game.playerCoord.y , 'G')
      this.g.alpha = 0;

      this.o1 = this.add.sprite(game.playerCoord.x + 40 ,game.playerCoord.y , 'O')
      this.o1.alpha = 0;

      this.r = this.add.sprite(game.playerCoord.x + 60 ,game.playerCoord.y , 'R')
      this.r.alpha = 0;

      this.a2 = this.add.sprite(game.playerCoord.x + 80 ,game.playerCoord.y , 'A')
      this.a2.alpha = 0;

      this.p = this.add.sprite(game.playerCoord.x + 100 ,game.playerCoord.y , 'P')
      this.p.alpha = 0;

      this.h = this.add.sprite(game.playerCoord.x + 120 ,game.playerCoord.y , 'H')
      this.h.alpha = 0;

      this.o2 = this.add.sprite(game.playerCoord.x + 140 ,game.playerCoord.y , 'O')
      this.o2.alpha = 0;

      this.b = this.add.sprite(game.playerCoord.x + 160 ,game.playerCoord.y , 'B')
      this.b.alpha = 0;

      this.i = this.add.sprite(game.playerCoord.x + 180 ,game.playerCoord.y , 'I')
      this.i.alpha = 0;

      this.a3 = this.add.sprite(game.playerCoord.x + 200 ,game.playerCoord.y , 'A')
      this.a3.alpha = 0;

  }
  addPlayer(){
    this.player = new Player(this,380, 280, 'player',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
  }
  addLetter(string, x, y, i){

    let letter = new Letter(this,x, y, string,i);

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

      if(game.wordIndex.collected)
      {
        if(game.wordIndex.i0)
        {
          this.a1.alpha = 1;
        }
        if(game.wordIndex.i1)
        {
          this.g.alpha = 1;
        }
        if(game.wordIndex.i2)
        {
          this.o1.alpha = 1;
        }
        if(game.wordIndex.i3)
        {
          this.r.alpha = 1;
        }
        if(game.wordIndex.i4)
        {
          this.a2.alpha = 1;
        }
        if(game.wordIndex.i5)
        {
          this.p.alpha = 1;
        }
        if(game.wordIndex.i6)
        {
          this.h.alpha = 1;
        }
        if(game.wordIndex.i7)
        {
          this.o2.alpha = 1;
        }
        if(game.wordIndex.i8)
        {
          this.b.alpha = 1;
        }
        if(game.wordIndex.i9)
        {
          this.i.alpha = 1;
        }
        if(game.wordIndex.i10)
        {
          this.a3.alpha = 1;
        }
        console.log("Hello, in collected")


        game.wordIndex.collected = false
      }

      this.a1.x = game.playerCoord.x - 300
      this.a1.y = game.playerCoord.y - 200

      this.g.x = game.playerCoord.x - 250
      this.g.y = game.playerCoord.y - 200
      
      this.o1.x = game.playerCoord.x - 200
      this.o1.y = game.playerCoord.y - 200

      this.r.x = game.playerCoord.x - 150
      this.r.y = game.playerCoord.y - 200

      this.a2.x = game.playerCoord.x - 100
      this.a2.y = game.playerCoord.y - 200

      this.p.x = game.playerCoord.x - 50
      this.p.y = game.playerCoord.y - 200

      this.h.x = game.playerCoord.x 
      this.h.y = game.playerCoord.y - 200

      this.o2.x = game.playerCoord.x + 50
      this.o2.y = game.playerCoord.y - 200

      this.b.x = game.playerCoord.x + 100
      this.b.y = game.playerCoord.y - 200

      this.i.x = game.playerCoord.x + 150
      this.i.y = game.playerCoord.y - 200

      this.a3.x = game.playerCoord.x + 200
      this.a3.y = game.playerCoord.y - 200





     
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
      this.bcText.x= this.player.x; 
      this.bcText.y= this.player.y; 
      if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
        this.scene.start("menuScene");   
  
      
      }
      this.physics.add.overlap( this.letterGroup,this.playerGroup,function(letter, player){

        if(letter.num  == 0)
        {
          game.wordIndex.i0 = true;
        }
        else if(letter.num == 1)
        {
          game.wordIndex.i1 = true;
        }
        else if(letter.num == 2)
        {
          game.wordIndex.i2 = true;
        }
        else if(letter.num  == 3)
        {
          game.wordIndex.i3 = true;
        }
        else if(letter.num == 4)
        {
          game.wordIndex.i4 = true;
        }
        else if(letter.num == 5)
        {
          game.wordIndex.i5 = true;
        }
        else if(letter.num == 6)
        {
          game.wordIndex.i6 = true;
        }
        else if(letter.num == 7)
        {
          game.wordIndex.i7 = true;
        }
        else if(letter.num == 8)
        {
          game.wordIndex.i8 = true;
        }
        else if(letter.num == 9)
        {
          game.wordIndex.i9 = true;
        }
        else if(letter.num == 10)
        {
          game.wordIndex.i10 = true;
        }


        game.wordIndex.collected = true;
        letter.destroy();
  
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
  timerBump()
{
  this.timers++;
}
}


