import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js'


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdPaw extends CGFobject {
    constructor(scene) {    
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.paw = new MyUnitCubeQuad(this.scene);
    }

   
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.14,0.14,0.14);


        this.scene.pushMatrix();
        this.scene.scale(1,4,1);
        this.scene.translate(0,0.5,0);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,1);
        this.scene.scale(1,1,2.5);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0.5,0);
        this.scene.scale(2.5,1,1);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.75,0.5,0.75);
        this.scene.rotate(-Math.PI/4,0,1,0);
        this.scene.scale(2.5,1,1);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.plano.enableNormalViz();
    }
    disableNormalViz() {
        this.plano.disableNormalViz();
    }
}