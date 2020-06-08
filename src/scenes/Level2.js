
class Level2 extends Phaser.Scene {
  
    constructor() {
          super("Level2Scene");



          //debug
          

                //////////////////////////////////

      //DIALOG//////////////////////////

      this.DBOX_X = 0;			    // dialog box x-position
      this.DBOX_Y = 10;			    // dialog box y-position
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

      this.dialogbox = null

      // character variables
      this.psych = null;
      this.psych2 = null;

      this.isTalking = false;
      this.firstType = true;



      this.noteGroup = null
      this.goalGroup =null

      this.playerGroup =  null
      this.enemyGroup = null
          
      }
      preload() {
        
        

       



      

        
      }
      create() {
        this.collectedCounter = 9;
        this.canHit = true;
        this.hp = 3
        this.gameOver = false;
  



        this.goalletters = 10;//number of letters if they are equal to letter ie letters collected the door will fade in and then progress to the next level
        this.letters = 0;

        this.pickup = game.sound.add('pickup');

        this.bgm = game.sound.add('lvl2');
        this.bgm.loop = true;
        this.bgm.play();

        this.done = false
       var dialog1 = this.cache.json.get('level2-1Dialog')
       var dialog2 = this.cache.json.get('level2-2Dialog')
       var dialog3 = this.cache.json.get('level2-3Dialog')
       var dialog4 = this.cache.json.get('level2-4Dialog')
       var dialog5 = this.cache.json.get('level2-5Dialog')
       var dialog6 = this.cache.json.get('level2-6Dialog')
       var dialog7 = this.cache.json.get('level2-7Dialog')
       var dialog8 = this.cache.json.get('level2-8Dialog')
       var dialog9 = this.cache.json.get('level2-9Dialog')
        this.zoomin = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
          this.zoomout = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
          this.follow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
          this.following = false;
          this.zoomdiff = .01;
          //this.cursors =  this.input.keyboard.createCursorKeys();
          this.scrollfac = 10;
        //text
        this.typing = game.sound.add('typing')
        this.typing.loop = true;
        this.tilediff = 32;
       this.cursors =  this.input.keyboard.createCursorKeys();
        this.keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /*
        this.bgm = game.sound.add('backsound');
        this.bgm.loop = true;
        this.bgm.play();*/


        this.map = this.make.tilemap({ key: 'map2' });
        this.tileset = this.map.addTilesetImage('level2', 'tiles2');
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









    this.layer2.setCollisionByProperty({ collide: true });
      this.addPlayer();





      this.p = this.add.sprite( 130, 100, 'P')
      this.p.alpha = 0;
  
      this.y = this.add.sprite(180,100, 'Y')
      this.y.alpha = 0;
  
      this.r = this.add.sprite(230,100, 'R')
      this.r.alpha = 0;
      this.o = this.add.sprite(280,100, 'O')
      this.o.alpha = 0;
  
      this.m = this.add.sprite(330,100, 'M')
      this.m.alpha = 0;
  
      this.a1 = this.add.sprite(380,100, 'A')
      this.a1.alpha = 0;
  
      this.n = this.add.sprite(430,100, 'N')
      this.n.alpha = 0;
  
      this.i = this.add.sprite(480,100, 'I')
      this.i.alpha = 0;
  
      this.a2 = this.add.sprite(530,100, 'A')
      this.a2.alpha = 0;
  























     // this.addEnemy();
      this.addNote(1850, 174,'A', dialog1,this.p);
      this.addNote(268, 2400,'O', dialog2,this.y);
      this.addNote(1768, 2408,'O', dialog3,this.r);
      this.addNote(312, 1668,'O', dialog4,this.o);
      this.addNote(1413, 1842,'O', dialog5,this.m);
      this.addNote(1916, 955,'O', dialog6,this.a1);
      this.addNote(264, 735,'O', dialog7,this.n);
      this.addNote(286, 178,'O', dialog8,this.i);
      this.addNote(1005, 2400,'O', dialog9,this.a2);

      this.addGoal();
      //setting collision
      //first value=x, second value=y, third value=distance, fourth value=whether it goes horizontal or not, fifth value=speed
     this.addEnemy(876,2369,180,false,5);
     this.addEnemy(1150,2362,180,false,5);
     this.addEnemy(1022,2546,137,true,3);
     this.addEnemy(1007,2218,200,true,4);
     this.addEnemy(795,1674,100,false,4);
     this.addEnemy(1923,1725,135,true,5);
     this.addEnemy(1725,1036,175,false,5);
     this.addEnemy(1143,1135,146,false,4);
     this.addEnemy(889,381,213,true,5);
     this.addEnemy(672,236,146,false,5);
      //

      this.physics.add.collider(this.player, this.layer2);

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      this.TEXT_X = 	this.cameras.main.scrollX
      this.TEXT_Y = this.cameras.main.scrollY
      this.gameover = false;
      this.fadeout = this.tweens.add({
        targets: this,
        alpha: {
            from: 1,
            to: 0
        },
        duration: 1000
    });
      

      this.heart1 = this.add.image(10, 400, 'heart').setOrigin(0,0);
      this.heart2 = this.add.image(50, 400, 'heart').setOrigin(0,0);
      this.heart3 = this.add.image(90, 400, 'heart').setOrigin(0,0);


    this.dOnce = true;


///////////////// dialog stuff





      //console.log(this.dialog);

      // add dialog box sprite

      // initialize dialog text objects (with no text)

      dialog_cursor = this.input.keyboard.createCursorKeys();

  }
  addPlayer(){
    this.player = new Player(this,1014, 2765, 'player',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
  }
  addNote(x, y,string, dialog, im){
    let note = new Note(this,x, y,'notes' ,dialog, im);
    this.noteGroup.add(note);
  }
  addEnemy(x,y,diff,side,speed){
    var Ene;
    Ene = new Fireball(this,x, y, 'firedown',diff,side,speed);
    
    this.enemyGroup.add(Ene);
  }
  addGoal(){
    this.goal = new Goal(this,1715,46,'lvl2door');
    this.goal.alpha = 0;
    this.goalGroup.add(this.goal);
  }
    update() {
     /* if(this.physics.overlap( this.enemyGroup,this.playerGroup)||this.gameover)
      {
        if(!this.fadeout.isPlaying()&&this.gameover==false)
        {
          this.fadeout.play();
          this.gameover = true;
        }
        if(!this.fadeout.isPlaying()&&this.gameover==false)
        {
          this.scene.start("GameoverScene");
        }
      }
      else
      {*/
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
      this.TEXT_X = game.playerCoord.x - 400
      this.TEXT_Y = game.playerCoord.y +100
      this.DBOX_X = game.playerCoord.x -420
      this.DBOX_Y = game.playerCoord.y -250


      this.heart1.setScrollFactor(0);
      this.heart2.setScrollFactor(0);
      this.heart3.setScrollFactor(0);


      this.p.setScrollFactor(0);
      this.y.setScrollFactor(0);
      this.r.setScrollFactor(0);
      this.o.setScrollFactor(0);
      this.m.setScrollFactor(0);
      this.a1.setScrollFactor(0);
      this.n.setScrollFactor(0);
      this.i.setScrollFactor(0);
      this.a2.setScrollFactor(0);

      if(this.gameOver)
      {

        if(this.dOnce)
        {
          this.gm = game.sound.add("gameoversfx")
          this.gm.play()
          this.dOnce = false
          this.bgm.stop()
        }
        game.gameOver.currentLevel = 2;
        this.time.delayedCall(3000, () => { this.scene.start('gameoverScene'); });

      }
      else{

      if(!this.isTalking)
      
     {

      if(this.cursors.left.isDown) {
        var tile = this.layer2.getTileAtWorldXY(this.player.x -this.tilediff, this.player.y, true);
        //console.log(tile.index);
        if(tile == null ||tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
        {

        }
        else
        { 
        this.player.x-= 5;
       }

    } else if(this.cursors.right.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
      //console.log(tile.index);
      if(tile == null ||tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
        {

        }
        else
        {
        this.player.x+= 5;
        }

} if(this.cursors.up.isDown) {
  var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
  //console.log(tile.index);
  if(tile == null || tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
    {

    }
    else
    {
       this.player.y-= 5;
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
        this.player.y+= 5;
        } 
    }


    this.physics.add.overlap( this.noteGroup,this.playerGroup,function(note, player){

      game.level2.currDialog = note.dialog
      if(!note.collected)
      {
      note.scene.isTalking = true;
      note.scene.collectedCounter--;
      note.alpha = 0
    }
      note.collected = true



      //note.scene.pickup.play()

  });


  this.physics.add.overlap( this.goalGroup,this.playerGroup,function(goal, player){
    console.log(goal.scene.collectedCounter)

    if(goal.scene.collectedCounter <= 0)
    {
      if(!goal.scene.done)
      {

      game.cleared.L2 = true;
      if(game.cleared.L1 && game.cleared.L2 && game.cleared.L3 )
      {
        goal.scene.time.delayedCall(600, () => { goal.scene.scene.start('transition1eScene'); }); 
      }
      else{
       goal.scene.time.delayedCall(600, () => { goal.scene.scene.start('clearedScene'); }); 
      }

      goal.scene.done = true;
      this.clearedSFX = game.sound.add('clearedSound')
      this.clearedSFX.play()

      goal.scene.bgm.stop();
      player.destroy()

    }
      goal.scene.noteGroup.runChildUpdate = false;
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


      
  }


  else
  {
    
    if(this.firstType)
    {
      this.dialogbox = this.add.sprite(0,0, 'dialogbox').setOrigin(0);
      this.dialogbox.setScrollFactor(0);
      this.dialogbox.visible = true;
      this.dialog = game.level2.currDialog;
      this.dialogText = this.add.bitmapText(80, 330, this.DBOX_FONT, '', this.TEXT_SIZE);
      this.dialogText.setScrollFactor(0);
      this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
    this.typeText()
    this.firstType = false;
    this.typing.play();
    console.log("in first")
  }

    
    this.noteGroup.runChildUpdate = false;
    this.goalGroup.runChildUpdate = false;
     this.playerGroup.runChildUpdate = false;
    this.enemyGroup.runChildUpdate = false;
    if(Phaser.Input.Keyboard.JustDown(dialog_cursor.space) && !this.dialogTyping) {
      // trigger dialog
      this.typing.play();
      this.typeText();
  }





}
  }
//}
}

typeText() {

  // lock input while typing
  this.dialogTyping = true;

  // clear text
  this.dialogText.text = '';
  this.nextText.text = '';

  /* Note: In my conversation data structure: 
          - each array within the main JSON array is a "conversation"
          - each object within a "conversation" is a "line"
          - each "line" can have 3 properties: 
              1. a speaker
              2. the dialog text
              3. an (optional) flag indicating if this speaker is new
  */

  // make sure there are lines left to read in this convo, otherwise jump to next convo
  if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
      this.dialogLine = 0;
      // I increment conversations here, but you could create logic to exit the dialog here
      this.dialogConvo++;
  }
  
  // make sure we haven't run out of conversations...
  if(this.dialogConvo >= this.dialog.length) {
      // here I'm simply "exiting" the last speaker and removing the dialog box,
      // but you could build other logic to change game states here
      console.log('End of Conversations');
      // tween out prior speaker's image
      // if(this.dialogLastSpeaker) {
      //     this.tweens.add({
      //         targets: this[this.dialogLastSpeaker],
      //         x: this.OFFSCREEN_X,
      //         duration: this.tweenDuration,
      //         ease: 'Linear'
      //     });
      // }
      // make text box invisible
      this.dialogbox.visible = false;
      this.isTalking = false
      this.firstType = true
      this.typing.stop();


      this.noteGroup.runChildUpdate = true;
      this.goalGroup.runChildUpdate = true;
      this.playerGroup.runChildUpdate = true;
      this.enemyGroup.runChildUpdate = true;



      this.dialogConvo = 0;			// current "conversation"
      this.dialogLine = 0;			// current line of conversation
      this.dialogSpeaker = null;		// current speaker
      this.dialogLastSpeaker = null;	// last speaker
      this.dialogTyping = false;		// flag to lock player input while text is "typing"
      this.dialogText = null;			// the actual dialog text
      this.nextText = null;			// player prompt text to continue typing

  } else {
      // if not, set current speaker
      this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
      // check if there's a new speaker (for exit/enter animations)
      // if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
      //     // tween out prior speaker's image
      //     if(this.dialogLastSpeaker) {
      //         this.tweens.add({
      //             targets: this[this.dialogLastSpeaker],
      //             x: this.OFFSCREEN_X,
      //             duration: this.tweenDuration,
      //             ease: 'Linear'
      //         });
      //     }
      //     // tween in new speaker's image
      //     this.tweens.add({
      //         targets: this[this.dialogSpeaker],
      //         x: this.DBOX_X + 50,
      //         duration: this.tweenDuration,
      //         ease: 'Linear'
      //     });
      // }

      // build dialog (concatenate speaker + line of text)
      this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker']+ ' two: \n' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

      // create a timer to iterate through each letter in the dialog text

      
      let currentChar = 0; 
      this.textTimer = this.time.addEvent({
          delay: this.LETTER_TIMER,
          repeat: this.dialogLines.length - 1,
          callback: () => { 
              // concatenate next letter from dialogLines
              this.dialogText.text += this.dialogLines[currentChar];
              // advance character position
              currentChar++;
              // check if timer has exhausted its repeats 
              // (necessary since Phaser 3 no longer seems to have an onComplete event)
              if(this.textTimer.getRepeatCount() == 0) {
                  // show prompt for more text
                  this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                  // un-lock input
                  this.dialogTyping = false;
                  // destroy timer
                  this.textTimer.destroy();
                 this.typing.stop()
                  
              }
          },
          callbackScope: this // keep Scene context

      });
      
      // set bounds on dialog
      this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

      // increment dialog line
      this.dialogLine++;

      // set past speaker
      this.dialogLastSpeaker = this.dialogSpeaker;
  }
}






  timerBump()
{
  this.timers++;
}




}


