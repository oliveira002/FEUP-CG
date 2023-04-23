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
			0,0,0, //E_BACK 0
			1,0,0, //B_BACK 1
			1,1,0, //D_BACK 2
			0,1,0, //G_BACK 3
			
			0,0,0, //E_LEFT 4 
			0,0,1, //F_LEFT 5
			0,1,1, //H_LEFT 6
			0,1,0, //G_LEFT 7

			1,0,0, // B_RIGHT 8
			1,0,1, // A_RIGHT 9
			1,1,1, // C_RIGHT 10
			1,1,0, // D_RIGHT 11
			
			1,0,1, // A_DOWN 12
			1,0,0, // B_DOWN 13
			0,0,0, // E_DOWN 14
			0,0,1, // F_DOWN 15

			0,1,1, // H_FRONT 16
			0,0,1, // F_FRONT 17
			1,0,1, // A_FRONT 18
			1,1,1, // C_FRONT 19

			0,1,0, // G_TOP 20
			1,1,0, // D_TOP 21
			1,1,1, // C_TOP 22
			0,1,1 // H_TOP 23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0,3,2,
			2,1,0, // BACK
			
			19,16,17,
			17,18,19, //FRONT

			21,20,23,
			23,22,21, //TOP
			
			5,6,7,
			5,7,4,

			8,11,10,
			8,10,9,

			13,12,15, //DOWN
			13,15,14
			
		];
		
		
		this.normals = [
			0,0,-1, 
			0,0,-1, 
			0,0,-1, 
			0,0,-1,//BACK
			
			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,//LEFT

			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0, //RIGHT

			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0, //DOWN

			0,0,1, 
			0,0,1, 
			0,0,1, 
			0,0,1, //FRONT
			
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0, //TOP
			
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    display() {
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }

}

