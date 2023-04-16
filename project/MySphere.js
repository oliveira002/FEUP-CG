import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks){
        super(scene);

        this.slices = slices;
        this.stacks = stacks * 2;

        this.initBuffers();
        this.initMaterials();
    }

    initMaterials(){
        this.mat = new CGFappearance(this.scene);
        this.mat.setAmbient(0.1, 0.1, 0.1, 1);
        this.mat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mat.setSpecular(0.1, 0.1, 0.1, 1);
        this.mat.setShininess(10.0);
        this.mat.loadTexture('images/earth.jpg');
        this.mat.setTextureWrap('REPEAT', 'REPEAT');
    }
    initBuffers() {
        this.stackSize = (1/this.stacks);
        var firstAngle = 2*Math.PI/this.slices;
        var x, y;
        var s, t;                    
        var halfAngle = Math.PI / this.stacks;

        var sliceAngle, stackAngle;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        var oneTime = 0;

        for(var i = 0; i <= this.stacks; i++)
        {
            stackAngle = Math.PI / 2 - i * halfAngle;

            for(var j = 0; j <= this.slices; j++)
            {
                sliceAngle = j * firstAngle; 

                if(i == 0 && oneTime == 0){
                    this.vertices.push(0, Math.sin(stackAngle) ,0);
                    oneTime = 1;
                    this.normals.push(0, Math.sin(stackAngle) ,0);
                    s = j / this.slices;
                    t = i / this.stacks;
                    this.texCoords.push(-s,t);
                }
                else if(i == this.stacks && oneTime == 1){
                    this.vertices.push(0, Math.sin(stackAngle) ,0);
                    oneTime = 2;
                    this.normals.push(0, Math.sin(stackAngle) ,0);
                    s = j / this.slices;
                    t = i / this.stacks;
                    this.texCoords.push(-s,t);
                }
                else if(i != 0 && i != this.stacks){
                    x =  Math.cos(stackAngle) * Math.cos(sliceAngle);             
                    y =  Math.cos(stackAngle) * Math.sin(sliceAngle);             
                    this.vertices.push(x, Math.sin(stackAngle) ,y);
                    this.normals.push(x, Math.sin(stackAngle) ,y);
                    s = j / this.slices;
                    t = i / this.stacks;
                    this.texCoords.push(-s,t);
                }
                
                
            }
        }
          for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
              var index1, index2, index3, index4;
              if (i == 0) {
                index1 = 0;
                index2 = j + 1;
                index3 = j + 2;
                index4 = index3;
                this.indices.push(index2, index1, index3);
                if (j == this.slices - 1) {
                    this.indices.push(index1, index3, 1);
                  }
              } else if (i == this.stacks - 1) {
                index1 = (i - 1) * (this.slices + 1) + j + 1;
                index2 = index1 + 1;
                index3 = this.vertices.length / 3 - 1;
                index4 = index3;
                this.indices.push(index1, index2, index3);
              } else {
                index1 = (i - 1) * (this.slices + 1) + j + 1;
                index2 = index1 + 1;
                index3 = i * (this.slices + 1) + j + 1;
                index4 = index3 + 1;
                this.indices.push(index1, index2, index3);
                this.indices.push(index2, index4, index3);
              }
            }
          }
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.mat.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        super.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.slices = 2 + Math.round(100 * complexity);
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}