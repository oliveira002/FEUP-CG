import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEgg extends CGFobject {
    constructor(scene,ang,coords) {    
        super(scene);
        this.ang = ang;
        this.initBuffers();

    }

    initBuffers() {
        this.egg = new MySphere(this.scene,50,50,0.1,true,false);
        this.eggText = new CGFtexture(this.scene, "images/earth.jpg");
        this.mat = new CGFappearance(this.scene);
        this.testShader = new CGFshader(this.scene.gl,"shaders/egg.vert", "shaders/egg.frag");

    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.testShader);
        this.scene.scale(1.4,1.7,1.4);
        this.mat.setTexture(this.scene.egg);
        this.mat.apply();
        this.egg.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }

    enableNormalViz() {
        this.egg.enableNormalViz();
    }
    disableNormalViz() {
        this.egg.disableNormalViz();
    }
}