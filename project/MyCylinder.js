import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks,size){
        super(scene);
        this.size = size;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
}
	
initBuffers() {
    this.stackSize = (this.size/this.stacks);
    this.firstAngle = 2*Math.PI/this.slices;
    this.halfAngle = Math.PI/this.slices;
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    var s, t; 


    for (var j = 0; j < this.stacks + 1; j++){
        for (var i = 0; i < this.slices; i++){
            s = i / (this.slices - 1);
            t = j / this.stacks;
            this.texCoords.push(s, t);
            this.vertices.push(Math.cos(i*this.firstAngle), Math.sin(i*this.firstAngle), this.stackSize*j);
            if(j != 0){
                this.indices.push(i + this.slices * j , i + this.slices * j - 1 , i + this.slices * (j - 1) );
                this.indices.push(i + this.slices * (j - 1) + 1, i + this.slices * j , i + this.slices * (j - 1) );
            }
            this.normals.push(Math.cos(i*this.firstAngle), Math.sin(i*this.firstAngle), 0);
        }
    }

    //Counter-clockwise reference of vertices
    

    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
}

}