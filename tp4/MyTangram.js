import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {    
        super(scene);
        this.initBuffers();
        this.initMaterials();
    }

    initBuffers() {
        this.diamond = new MyDiamond(this.scene);
        this.diamond.updateTexCoords([
            0,0.5,
			0.25,0.75,
			0.25,0.25,
			0.5,0.5
        ])
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.blueTriangle.updateTexCoords([
            0.5,0.5,
            0,0,
            1,0
        ])
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.orangeTriangle.updateTexCoords([
            0.5,0.5,
            1,0,
            1,1
        ])
        this.pinkTriangle = new MyTriangle(this.scene);
        this.pinkTriangle.updateTexCoords([
            0.5,1,
            0,1,
            0,0.5
        ])
        this.paralell = new MyParallelogram(this.scene);
        this.paralell.updateTexCoords([
            0.25,0.75,
            0.5,1,
            0.75,0.75,
            1,1
        ])
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.redTriangle.updateTexCoords([
            0.5,0.5,
            0.25,0.75,
            0.75,0.75
        ])
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.purpleTriangle.updateTexCoords([
            0.25,0.25,
            0,0,
            0,0.5
        ])
    }

    initMaterials() {
        this.materials = []

        this.scene.text = new CGFappearance(this.scene)
        this.scene.text.loadTexture('images/tangram.png')

        this.materials = [this.scene.text];
    }

    display() {
        // Diamond
        this.scene.pushMatrix();

        var translateMatrix = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            Math.sqrt(2)-0.4,2,0,1
        ];
        
        this.scene.multMatrix(translateMatrix);
        this.materials[0].apply();
        this.diamond.display();
        this.scene.popMatrix();
        
        
        // Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2),-Math.sqrt(2),0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.materials[0].apply()
        this.blueTriangle.display();
        this.scene.popMatrix();

        //Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),-Math.sqrt(2),0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.materials[0].apply()
        this.orangeTriangle.display();
        this.scene.popMatrix();

        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),0,0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.materials[0].apply()
        this.pinkTriangle.display();
        this.scene.popMatrix();
        
        //Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0,-2*Math.sqrt(2),0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.materials[0].apply()
        this.paralell.display();
        this.scene.popMatrix();

        
        //Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2) + Math.sqrt(2)/2,-Math.sqrt(2)/2,0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.materials[0].apply()
        this.redTriangle.display();
        this.scene.popMatrix();

        //Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.3,-0.3,0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.materials[0].apply()
        this.purpleTriangle.display();
        this.scene.popMatrix();
        
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.blueTriangle.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.paralell.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
    }
    disableNormalViz() {
		this.diamond.disableNormalViz();
        this.blueTriangle.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.paralell.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
    }
}