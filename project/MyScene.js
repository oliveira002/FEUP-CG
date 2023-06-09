import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyWing } from "./MyWing.js";
import { MyBirdPaw } from "./MyBirdPaw.js";
import { MyBillBoard } from "./MyBillBoard.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyNest } from "./MyNest.js";
import { MyWater } from "./MyWater.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }


  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    
    //Objects connected to MyInterface
    this.selectedObject = 0;
    this.displayNormals = false;
    this.objectComplexity = 0.5;
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    //--textures
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.earth = new CGFtexture(this, 'images/earth.jpg');
    this.sky = new CGFtexture(this, 'images/panorama4.jpg');
    this.wing = new CGFtexture(this,"images/wing.jpg");
    this.beak = new CGFtexture(this,"images/beak.jpg");
    this.eye = new CGFtexture(this,"images/eye.jpg");
    this.head = new CGFtexture(this,"images/head.jpg");
    this.egg = new CGFtexture(this,"images/egg.jpg");
    this.heightMap = new CGFtexture(this, 'images/heightmap.jpg');
    this.tree1 = new CGFtexture(this, 'images/billboardtree.png');
    this.tree2 = new CGFtexture(this, 'images/tree2.png');
    this.tree3 = new CGFtexture(this, 'images/tree3.png');
    this.nestTexture = new CGFtexture(this, 'images/nest.png');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.panorama = new MyPanorama(this, this.sky);
    this.bird = new MyBird(this,Math.PI, 0, [0,4,0]);
    this.birdEgg = new MyBirdEgg(this, [0,0,0],false);
    this.eggs = [new MyBirdEgg(this, [82,-61.2,-21],false), new MyBirdEgg(this, [-39,-61.2,29],false),new MyBirdEgg(this,[-70,-61.2,-10],false),new MyBirdEgg(this, [0,-61.2,-100],false)]
    this.tree = new MyBillBoard(this,this.tree1,[0,0,0],1,0);
    this.treeRow = new MyTreeRowPatch(this,[this.tree1,this.tree2,this.tree3],[-6,-4.5,-2.5],3);
    this.treeRowEx = new MyTreeRowPatch(this,[this.tree1,this.tree2,this.tree3],[0,0,0],6);
    this.treeGridEx = new MyTreeGroupPatch(this,[this.tree1,this.tree2,this.tree3],[0,0,0]);
    this.treeGrid = new MyTreeGroupPatch(this,[this.tree1,this.tree2,this.tree3],[3.5,-4.8,2]);
    this.treeGrid2 = new MyTreeGroupPatch(this,[this.tree1,this.tree2,this.tree3],[5.5,-4.8,-2.3]);
    this.treeGrid3 = new MyTreeGroupPatch(this,[this.tree1,this.tree2,this.tree3],[-4,-4.8,2.5]);
    this.nest = new MyNest(this,30,6,true,this.nestTexture,[85,-61.2,-50]);
    this.treeGrids = [this.treeGrid,this.treeGrid2,this.treeGrid3]
    this.water = new MyWater(this, -69);
    this.sphere = new MySphere(this,50,50,1,true,true);


    
    this.objects = [this.tree, this.sphere, this.panorama, this.bird, this.birdEgg, this.nest, this.terrain, this.tree, this.treeRowEx, this.treeGridEx];
    this.objectIDs = {'Scene': 0, 'Earth': 1, 'Panorama': 2, 'Bird': 3, 'Egg': 4, 'Nest/Eggs': 5, 'Terrain' : 6, 'Tree': 7, 'TreeRow': 8, 'TreeGroup': 9};

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.setUpdatePeriod(1000/60)
  }

  update(t) {
    this.checkKeys();
    this.bird.update(t);
    for(let i = 0; i < this.eggs.length; i++){
      if(this.eggs[i].dropEgg)
        this.eggs[i].update(t,i);
    }
    this.water.update(t);
  }


  updateObjectComplexity(){
  }


  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }


  initCameras() {
    this.camera = new CGFcamera(
      Math.PI / 2,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }


  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var keysPressed = false;

    if(this.gui.isKeyPressed("KeyW")) {
      this.bird.accelerate(0.5);
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyS")) {
      this.bird.accelerate(-0.5);
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyA")) {
      this.bird.turn(-Math.PI / 16);
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyD")) {
      this.bird.turn(Math.PI / 16);
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyR")) {
      this.bird.resetPosition();
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyP")) {
      this.bird.pickEgg = true;
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyO")) {
      this.bird.dropEgg();
      keysPressed = true;
    }
  }



  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.pushMatrix();

    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

    if (this.displayNormals)
        this.objects[this.selectedObject].enableNormalViz();
    else
        this.objects[this.selectedObject].disableNormalViz();
      
    
    if(this.selectedObject == 0) {
      this.terrain.display();
      this.panorama.display();
      for(var i = 0; i < this.treeGrids.length; i++) {
        this.treeGrids[i].display();
      }
      this.treeRow.display();
      this.bird.display();
      this.water.display();
      this.nest.display();
      for(var i = 0; i < this.eggs.length; i++) {
        this.eggs[i].display();
      }
    }
    else if(this.selectedObject == 1) {
      this.mat = new CGFappearance(this)
      this.mat.setTexture(this.earth);
      this.mat.apply();
      this.sphere.display();
    }
    else if(this.selectedObject == 5) {
      this.bird.display();
      this.nest.display();
      for(var i = 0; i < this.eggs.length; i++) {
        this.eggs[i].display();
      }
    }
    else {
      this.objects[this.selectedObject].display();
    }    

    this.popMatrix();
  }
}
