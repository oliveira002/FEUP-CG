import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5, //0
			-0.5, 0.5, -0.5, //1
			0.5, 0.5, -0.5,	//2
			0.5, -0.5, -0.5, //3
            -0.5, -0.5, 0.5, //4
			-0.5, 0.5, 0.5,	//5
			0.5, 0.5, 0.5,	//6
			0.5, -0.5, 0.5 //7
            		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			7,6,4,
            6,5,4,
            3,2,6,
            7,3,6,
            5,1,0,
            0,4,5,
            5,6,2,
            2,1,5,
            0,7,4,
            0,3,7,
            0,1,2,
            3,0,2 
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        super.display();
        this.scene.popMatrix();
    }

}

