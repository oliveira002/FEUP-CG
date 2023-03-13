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
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for (var i = 0; i < this.stacks; i++) {
            for(var j = 0; j < this.slices; j++){

                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca,-sa,i / this.stacks);
                this.vertices.push(caa, -saa, i / this.stacks);
                this.vertices.push(caa, -saa, (i+1)/ this.stacks);
                this.vertices.push(ca,-sa,(i+1)/this.stacks);

                var normal= [
                    saa-sa,
                    
                    caa-ca,0,
                ];

                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
    

                this.indices.push(4*j + (i*this.slices*4), 4* j + (i*this.slices*4)+ 2, 4*j  + (i*this.slices*4) + 1);
                this.indices.push(4*j + (i*this.slices*4), 4* j + (i*this.slices*4)+ 3, 4*j  + (i*this.slices*4) + 2);

                ang+=alphaAng;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    //updateBuffers(complexity){
        //this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        //this.initBuffers();
        //this.initNormalVizBuffers();
    //}
}