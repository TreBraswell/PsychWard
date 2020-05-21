
class Level1 extends Phaser.Scene {
  
    constructor() {
          super("Level1Scene");
          
      }
      preload() {
        this.load.audio('backsound', './assets/psych2.wav');
        this.load.image('player', './assets/psychright.png');
        this.load.image('monster', './assets/monster.png');
        this.load.tilemapTiledJSON('map', './assets/psychward.json');
        this.load.image('tiles1', './assets/level1.png');
        this.load.image('A', './assets/A.png');
      }
      create() {
        this.goalletters = 10;
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
       this.playerGroup = this.add.group({
          runChildUpdate: true    // make sure update runs on group children
      });
      this.enemyGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
    this.layer2.setCollisionByProperty({ collide: true });
      this.addPlayer();
      this.addEnemy();
      this.addLetter();
      //setting collision
     
      //

      this.physics.add.collider(this.player, this.layer2);

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.bcText = this.add.text(580, 10, "press space to go to menu", menuConfig).setOrigin(0,0);
  }
  addPlayer(){
    this.player = new Player(this,380, 280, 'player',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
  }
  addLetter(){
    let letter = new Letter(this,400, 480, 'A',this.input.keyboard.createCursorKeys());
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

    update() {
     
      if(this.cursors.left.isDown) {
        var tile = this.layer2.getTileAtWorldXY(this.player.x -this.tilediff, this.player.y, true);
        if(tile.index == 4 || tile.index == 5)
        {

        }
        else
        { 
        this.player.x-= 2;
        }

    } else if(this.cursors.right.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
        if(tile.index == 4 || tile.index == 5)
        {

        }
        else
        {
        this.player.x+= 2;
        }

} if(this.cursors.up.isDown) {
  var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
    if(tile.index == 4 || tile.index == 5)
    {

    }
    else
    {
       this.player.y-= 2;
    }
        
    }
    else if(this.cursors.down.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x , this.player.y+this.tilediff, true);
        if(tile.index == 4 || tile.index == 5)
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
        this.letters++;
        letter.destroy();
  
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


