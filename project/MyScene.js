import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import {MyUnitCube} from "./MyUnitCube.js"
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

    this.enableTextures(true);
    //--textures
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.earth = new CGFtexture(this, 'images/earth.jpg');
    this.sky = new CGFtexture(this, 'images/panorama4.jpg');

    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.panorama = new MyPanorama(this, this.sky);
    this.bird = new MyBird(this);
    this.cube = new MyUnitCube(this);

    this.objects = [this.bird, this.panorama];
    this.objectIDs = {'bird': 0, 'panorama': 1};

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }
  updateObjectComplexity(){
    this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
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

    // ---- BEGIN Primitive drawing section
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    this.pushMatrix();

    
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    
    if (this.displayNormals)
        this.objects[this.selectedObject].enableNormalViz();
    else
        this.objects[this.selectedObject].disableNormalViz();
    
    //this.translate(this.camera.position[0],this.camera.position[1],this.camera.position[2])

    // scaling for the bird
    if(this.selectedObject == 0) {
      this.scale(0.38,0.38,0.38);
    }

    this.objects[this.selectedObject].display();
    this.popMatrix();

   
    
    // ---- END Primitive drawing section
  }
}
