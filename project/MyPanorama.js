import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    constructor(scene,texture) {    
        super(scene);
        this.texture = texture;
        this.initBuffers();
    }

    initBuffers() {
        this.sphere = new MySphere(this.scene,100,100,200)
        this.mat = new CGFappearance(this.scene)

    }

    display() {
        
        this.scene.pushMatrix();
        this.mat.setTexture(this.texture);
        this.mat.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        //this.scene.translate(this.camera.position[0],this.camera.position[1],this.camera.position[2])
        this.sphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }
    disableNormalViz() {
		this.sphere.disableNormalViz();
    }
}