import {CGFappearance, CGFobject, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    constructor(scene) {    
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.plane = new MyPlane(this.scene,30);
        this.planeMat = new CGFappearance(this.scene);
        this.testShader = new CGFshader(this.scene.gl,"shaders/terrain.vert", "shaders/terrain.frag")
    }


    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,-100,0);
        this.scene.scale(400,400,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.planeMat.setTexture(this.scene.texture);

        // shaders
        this.scene.setActiveShader(this.testShader);
        this.scene.gl.activeTexture(this.scene.gl.TEXTURE0);
        //this.scene.gl.bindTexture(this.scene.gl.TEXTURE_2D, this.scene.heightMap);


        this.planeMat.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

    }
}