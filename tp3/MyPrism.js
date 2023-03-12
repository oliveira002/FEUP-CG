import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrims extends CGFobject {
	constructor(scene, slices, stacks){
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
}
	
	initBuffers() {
        this.stackSize = 1/this.stacks;
        
		this.vertices = [
			-0.5, 0, -0.5, //0
			0.5, 0, -0.5, //3
            -0.5, 0, 0.5,
            0.5, 0, 0.5 //3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1,0,2,
            3,1,2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}