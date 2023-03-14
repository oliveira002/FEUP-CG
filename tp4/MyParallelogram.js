import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			3, 1, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
            0 ,0 ,0, 	//3
			3, 1, 0,	//4
			1, 1, 0,	//5
			2, 0, 0,	//6
            0 ,0 ,0     //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2,1,0,
            2,3,1,
            4,5,6,
            5,7,6
		];
		this.normals = [
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
	

