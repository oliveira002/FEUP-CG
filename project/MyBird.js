import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { MyCylinder } from './MyCylinder.js';
import {MyPyramid} from './MyPyramid.js'
import {MyWing} from './MyWing.js';
import {MyPrism} from './MyPrism.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MySphere } from './MySphere.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
    constructor(scene) {    
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.body = new MyCylinder(this.scene,6,10,2);
        this.head = new MySphere(this.scene,50,50,0.1,true);
        this.wing = new MyWing(this.scene);
        this.back = new MyPyramid(this.scene,6,10,2);
        this.tail = new MyPyramid(this.scene,6,10,2);
        this.eye = new MySphere(this.scene,50,50,0.1,true);
        this.mat = new CGFappearance(this.scene)

        this.mat2 = new CGFappearance(this.scene);
        this.mat2.setDiffuse(0, 0, 0, 255/255);
        this.mat2.setSpecular(255/255, 255/255, 255/255, 255/255);
        this.mat2.setAmbient(0, 0, 0, 255/255);
        this.mat2.apply();
    }


    display() {
        this.scene.pushMatrix();
        this.mat.setTexture(this.scene.head);
        this.mat.apply();
        this.scene.translate(0,0,1)
        this.scene.scale(10,10,18);
        this.eye.display();   
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.36,-0.14,1);
        this.mat.setTexture(this.scene.wing);
        this.mat.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.36,-0.14,1);  
        this.mat.setTexture(this.scene.wing);
        this.mat.apply(); 
        this.scene.scale(-1,1,1);
        this.wing.display();
        this.scene.popMatrix();
        
        /* pyramid head
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0,0);
        this.scene.scale(1,2.5,1);
        this.mat.setTexture(this.scene.wing);
        this.mat.apply();
        this.head.display();   
        this.scene.popMatrix();
        */

        // sphere head
        this.scene.pushMatrix();
        this.mat.setTexture(this.scene.head);
        this.mat.apply();
        this.scene.translate(0,0.5,-1.4)
        this.scene.scale(8,8,8);
        this.head.display();   
        this.scene.popMatrix();
        

        
        /*
        this.scene.pushMatrix();
        this.scene.translate(0,0,3);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.6,0.6,0.6);   
        this.tail.display();
        this.scene.popMatrix();
        */

        this.scene.pushMatrix();
        this.scene.translate(0,0,3.74);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.mat.setTexture(this.scene.wing);
        this.mat.apply();
        this.tail.display();
        this.scene.popMatrix();


        // eyes
        this.scene.pushMatrix();
        this.scene.translate(0.52,0.8,-2);
        this.scene.scale(1.3,1.3,1.3);
        this.mat2.apply();
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.52,0.8,-2);
        this.scene.scale(1.3,1.3,1.3);
        this.mat2.apply();
        this.eye.display();
        this.scene.popMatrix();
        
        // beak
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-2.1);
        this.scene.rotate(-Math.PI / 2, 1, 0,0);
        this.scene.scale(0.2,0.7,0.2);
        this.mat.setTexture(this.scene.beak);
        this.mat.apply();
        this.back.display();   
        this.scene.popMatrix();


    }

    enableNormalViz() {
        this.body.enableNormalViz();
        this.wing.enableNormalViz();
        this.head.enableNormalViz();
        this.back.enableNormalViz();
        this.tail.enableNormalViz();
        this.eye.enableNormalViz();
    }
    disableNormalViz() {
        this.body.disableNormalViz();
        this.wing.disableNormalViz();
        this.head.disableNormalViz();
        this.back.disableNormalViz();
        this.tail.disableNormalViz();
        this.eye.disableNormalViz();
    }
}