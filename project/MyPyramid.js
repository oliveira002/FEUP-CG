import {CGFobject} from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        // vertices and normals for the top of the pyramid
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0);

        for (var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            // vertices and normals for the side faces
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            var normal = [saa - sa, ca * saa - sa * caa, caa - ca];

            // normalization
            var nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);

            // texture coordinates for the side faces
            this.texCoords.push(i / this.slices, 1);
            this.texCoords.push((i + 1) / this.slices, 1);

            // indices for the side faces
            this.indices.push(2 * i + 1, 2 * i + 2, 0);

            ang += alphaAng;
        }

        // vertices, normals, and texture coordinates for the bottom of the pyramid
        this.vertices.push(0, 0, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        // indices for the bottom faces
        for (var i = 0; i < this.slices; i++) {
            this.indices.push(2 * i + 2, 2 * i + 1, 2 * this.slices + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}