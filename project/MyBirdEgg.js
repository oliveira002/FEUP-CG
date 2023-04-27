import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
        this.mat = new CGFappearance(this.scene);
    }
    
    display() {
        this.scene.pushMatrix();
        this.mat.setTexture(this.scene.egg);
        this.mat.apply();
        this.scene.scale(1.2,1.8,1.2);
        this.egg.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.egg.enableNormalViz();
    }
    disableNormalViz() {
        this.egg.disableNormalViz();
    }
}