import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.paralell = new MyParallelogram(this.scene)
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
    }

    initMaterials() {
        this.materials = []

        this.scene.blue_mat = new CGFappearance(this.scene)
        this.scene.blue_mat.setAmbient(0,0,1,1.0)
        this.scene.blue_mat.setDiffuse(0,0,0.5,1.0)
        this.scene.blue_mat.setSpecular(0,0,1.0,1.0)
        this.scene.blue_mat.setShininess(5.0)

        this.scene.orange_mat = new CGFappearance(this.scene)
        this.scene.orange_mat.setAmbient(1,155/255,0,1.0)
        this.scene.orange_mat.setDiffuse(0.5, 155/510,0,1.0)
        this.scene.orange_mat.setSpecular(1,155/255,0,1.0)
        this.scene.orange_mat.setShininess(5.0)

        this.scene.pink_mat = new CGFappearance(this.scene)
        this.scene.pink_mat.setAmbient(1,192/255,203/255,1.0)
        this.scene.pink_mat.setDiffuse(0.5,192/510,203/510,1.0)
        this.scene.pink_mat.setSpecular(1,155/255,0,1.0)
        this.scene.pink_mat.setShininess(5.0)

        this.scene.paral_mat = new CGFappearance(this.scene)
        this.scene.paral_mat.setAmbient(1,1,0,1)
        this.scene.paral_mat.setDiffuse(0.5,0.5,0,1)
        this.scene.paral_mat.setSpecular(1,1,0,1)
        this.scene.paral_mat.setShininess(5.0)

        this.scene.red_mat = new CGFappearance(this.scene)
        this.scene.red_mat.setAmbient(1.0,0,0,1.0)
        this.scene.red_mat.setDiffuse(0.5,0,0,1.0)
        this.scene.red_mat.setSpecular(1,0,0,1.0)
        this.scene.red_mat.setShininess(5.0)

        this.scene.purple_mat = new CGFappearance(this.scene)
        this.scene.purple_mat.setAmbient(218/255,112/255,214/255,1)
        this.scene.purple_mat.setDiffuse(218/510,112/510,214/510,1)
        this.scene.purple_mat.setSpecular(218/255,112/255,214/255,1)
        this.scene.purple_mat.setShininess(5.0)

        this.materials = [this.scene.blue_mat,  this.scene.orange_mat, this.scene.pink_mat, this.scene.paral_mat, this.scene.red_mat, this.scene.purple_mat];
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
        this.scene.materials[3].apply();
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
        this.materials[1].apply()
        this.orangeTriangle.display();
        this.scene.popMatrix();

        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),0,0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.materials[2].apply()
        this.pinkTriangle.display();
        this.scene.popMatrix();
        
        //Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0,-2*Math.sqrt(2),0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.materials[3].apply()
        this.paralell.display();
        this.scene.popMatrix();

        
        //Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2) + Math.sqrt(2)/2,-Math.sqrt(2)/2,0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.materials[4].apply()
        this.redTriangle.display();
        this.scene.popMatrix();

        //Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.3,-0.3,0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.materials[5].apply()
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