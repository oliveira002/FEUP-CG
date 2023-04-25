import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
    constructor(scene, maxAngle) {    
        super(scene);
        this.initBuffers();
        this.maxAngle = maxAngle;
    }

    initBuffers() {
        this.plano = new MyQuad(this.scene);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 10,0,0,1);
        this.scene.scale(1,1,2);
        this.plano.display();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 6,0,0,1);
        this.scene.translate(0.83,-0.38,0);
        this.scene.scale(1,1,2);
        this.plano.display();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.83,0.32,0);
        this.scene.scale(1,1,2);
        this.plano.display();   
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.plano.enableNormalViz();
    }
    disableNormalViz() {
        this.plano.disableNormalViz();
    }
}