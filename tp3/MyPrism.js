import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks){
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
}
	
	initBuffers() {
        this.stackSize = (1/this.stacks);
        this.firstAngle = 2*Math.PI/this.slices;
        this.halfAngle = Math.PI/this.slices;
		this.vertices = [
		];
        this.indices = [
		];
        this.normals = [
        ];
        for (var j = 0; j < this.stacks + 1; j++){
            for (var i = 0; i < this.slices; i++){
                this.vertices.push(0, 0, this.stackSize*j);
                this.vertices.push(Math.cos(i*this.firstAngle), Math.sin(i*this.firstAngle), this.stackSize*j);
                this.vertices.push(Math.cos((1 + i)*this.firstAngle), Math.sin((1 + i)*this.firstAngle), this.stackSize*j);
                this.indices.push(i*3 + this.slices * j * 3, i*3+1 + this.slices * j * 3, i*3+2 + this.slices * j * 3 );
                this.indices.push(i*3+2 + this.slices * j * 3 , i*3+1+ this.slices * j * 3, i*3+ this.slices * j* 3);
                if(j != 0){
                    this.indices.push(i*3+2 + this.slices * j * 3, i*3+1 + this.slices * j * 3, i*3+2 + this.slices * (j-1) * 3);
                    this.indices.push(i*3+2 + this.slices * (j-1) * 3, i*3+1 + this.slices * j * 3, i*3+1 + this.slices * (j-1) * 3); 
                }
                
                this.normals.push(0, 0, 0);
                this.normals.push(Math.cos((i)*this.firstAngle + this.halfAngle), Math.sin((i)*this.firstAngle + this.halfAngle), 0);
                this.normals.push(Math.cos((i)*this.firstAngle + this.halfAngle), Math.sin((i)*this.firstAngle + this.halfAngle), 0);
                
            }
        }
         
		//Counter-clockwise reference of vertices
		

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}