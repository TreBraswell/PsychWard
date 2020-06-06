var camera;
var group=[];
class transition3s extends Phaser.Scene {
    
  constructor() {
        super("transition3sScene");


         
    }

     preload ()
{
  this.load.json('fonttest', './assets/Myfont_Regular1.json');
   this.load.text('data', './assets/t3s.txt');
    this.load.script('threejs', './assets/three.js');
}
create ()
{
    // this.add.text(10, 10, 'Extern Test 1');
    var scene;
    var mesh;
    var renderer;
    var e = this.add.extern();


    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z =0;

    scene = new THREE.Scene();
    this.loaded = false;
    var material = new THREE.MeshNormalMaterial();
    var amountc = 4;
    var amountr = 4;
    var r;
    
    
    //var gone = ["boy", "what", "are", "you", "doing", "with", "that", "head", "look", "at", "the", "top", "of", "his", "head"]
    var loadertext =new THREE.FileLoader();
    var sizediff = 10;
    var filetxt;
    var i =0;
    var doonce = true;
    var loaded2 =false;
    //-20 -15
    //20 10
    var startx = -7;
    var starty = -5;
    var endx = 4;
    var endy = 5;
    var cdiff = (Math.abs(startx)+endx)/amountc;
    var rdiff = (Math.abs(starty)+endy)/amountr;
    var filetxt =this.cache.text.get('data');
    var c;
        
     

      filetxt = filetxt.toLowerCase()
      var final= filetxt.trim().split(" ");
      var b ;
      final.sort(() => Math.random() - 0.5);
    
       
       // console.log(loaded2);
      this.loaded = false;
       var loader = new THREE.FontLoader();
          //r= -20 && c= -40
          //console.log("test");

          loader.load('./assets/Myfont_Regular1.json', function (font) {
          for (r = starty; r <= endy; r+=rdiff) {
            for (c = startx; c <= endx; c+=cdiff ) {

              if(i>=final.length)
              {
                i = 0;
                //final.sort(() => Math.random() - 0.5);
              }

              var geometry = new THREE.TextGeometry(final[i], {
                font: font,
                size: 2,
                height: .3,
                curveSegments: 1,
                bevelThickness: .1,
	            	bevelSize: .1,
		            bevelSegments: 1,
                
              });
              
              var mesh = new THREE.Mesh(geometry, material);
              var child = mesh;
              child.position.z =-10;
              child.position.y = r;
              child.position.x =c;
              //child.position.z = -10;
              child.lookAt(scene.position.x,scene.position.y,-10);
              group.push(child);
              scene.add(child);
              i++;
            }
          }

          //console.log(this.group); 
        });
        
        //console.log(this.group.length);
        //console.log(group.length);
        
        //
    renderer = new THREE.WebGLRenderer( { canvas: this.game.canvas, context: this.game.context, antialias: true } );
    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize(800, 600);

    e.render = function (prenderer, pcamera, pcalcMatrix)
    {
        renderer.state.reset();

        renderer.render(scene, camera);
    }

    renderer.autoClear = false;

     document.body.appendChild( renderer.domElement );
}

 update ()
{
  var i;
 // console.log(group);


      camera.rotation.z = camera.rotation.z +.003;
     // group.position.z++
    for (i = 0; i <  group.length; i++) {
      

       group[i].position.z= group[i].position.z+.035;
       


// Your 3d point to check
var pos = group[i].position;

      if (group[i].position.z > 5) {
        this.scene.start("Level3Scene");
      }
      }
    
    
    
    // renderer.render( scene, camera );
}

}