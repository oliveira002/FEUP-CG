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
        this.head = new MyPyramid(this.scene,6,10,2);
        this.wing = new MyWing(this.scene);
        this.back = new MyPyramid(this.scene,6,10,2);
        this.tail = new MyPyramid(this.scene,6,10,2);
        this.eye = new MySphere(this.scene,50,50,0.1,true)
        

    }

    display() {
        this.scene.pushMatrix();
        this.body.display();   
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.46,-0.14,1);   
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.46,-0.14,1);   
        this.scene.scale(-1,1,1);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0,0);
        this.scene.scale(1,2.5,1);
        this.head.display();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,2);   
        this.scene.rotate(Math.PI / 2, 1, 0,0);
        this.scene.scale(1,1.5,1);
        this.back.display();
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
        this.scene.translate(0,0,4.35);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.tail.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.translate(0.52,0.3,-1);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.52,0.3,-1);
        this.eye.display();
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