import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { MyCylinder } from './MyCylinder.js';
import {MyPyramid} from './MyPyramid.js'
import {MyWing} from './MyWing.js';

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
        this.body = new MyCylinder(this.scene,5,10,2);
        this.head = new MyPyramid(this.scene,5,10,2);
        this.lwing = new MyWing(this.scene);

    }

    display() {
        this.scene.pushMatrix();
        this.body.display();   
        this.lwing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0,0);
        this.scene.scale(1,2.5,1);
        this.head.display();   
        this.scene.popMatrix();
    }
}