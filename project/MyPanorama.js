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
        this.sphere = new MySphere(this.scene,100,100,200,false)
        this.mat = new CGFappearance(this.scene)
        this.mat.setEmission(1, 1, 1, 1)
    }

    display() {
        
        this.scene.pushMatrix();
        this.mat.setTexture(this.texture);
        this.mat.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
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