
class Level2 extends Phaser.Scene {
  
    constructor() {
          super("Level2Scene");
          
      }
      preload() {
        this.load.audio('backsound', './assets/psych2.wav');
        this.load.image('player', './assets/psychright.png');
        this.load.image('monster', './assets/monster.png');
        this.load.image('door', './assets/door.png');
        this.load.tilemapTiledJSON('map', './assets/psychward2.json');
        this.load.image('tiles1', './assets/lvl2.png');
        this.load.image('A', './assets/A.png');
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
        this.tileset = this.map.addTilesetImage('level2', 'tiles1');
        this.layer = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        this.layer2 = this.map.createDynamicLayer('House', this.tileset, 0, 0);
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
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);










      //////////////////////////////////

      //DIALOG//////////////////////////

      this.DBOX_X = 0;			    // dialog box x-position
      this.DBOX_Y = 400;			    // dialog box y-position
      this.DBOX_FONT = 'basic_font';	// dialog box font key

      this.TEXT_X = 50;			// text w/in dialog box x-position
      this.TEXT_Y = 360;			// text w/in dialog box y-position
      this.TEXT_SIZE = 24;		// text font size (in pixels)
      this.TEXT_MAX_WIDTH = 715;	// max width of text within box

      this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
      this.NEXT_X = 775;			// next text prompt x-position
      this.NEXT_Y = 574;			// next text prompt y-position

      this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

      // dialog variables
      this.dialogConvo = 0;			// current "conversation"
      this.dialogLine = 0;			// current line of conversation
      this.dialogSpeaker = null;		// current speaker
      this.dialogLastSpeaker = null;	// last speaker
      this.dialogTyping = false;		// flag to lock player input while text is "typing"
      this.dialogText = null;			// the actual dialog text
      this.nextText = null;			// player prompt text to continue typing

      // character variables
      this.psych = null;
      this.psych2 = null;
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
        //console.log(tile.index);
        if(tile == null ||tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
        {

        }
        else
        { 
        this.player.x-= 2;
       }

    } else if(this.cursors.right.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
      //console.log(tile.index);
      if(tile == null ||tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
        {

        }
        else
        {
        this.player.x+= 2;
        }

} if(this.cursors.up.isDown) {
  var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
  //console.log(tile.index);
  if(tile == null || tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
    {

    }
    else
    {
       this.player.y-= 2;
    }
        
    }
    else if(this.cursors.down.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x , this.player.y+this.tilediff, true);
      //console.log(tile.index);
      if(tile == null||tile.index == -1||tile.index == 11 ||tile.index==4||tile.index==2)
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


