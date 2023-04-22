import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
    constructor(scene) {    
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.close = new MyQuad(this.scene);

    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 6,0,0,1);
        this.scene.translate(1.5,0,1);
        this.scene.scale(1,1,2);
        this.close.display();   
        this.scene.popMatrix();
    }
}