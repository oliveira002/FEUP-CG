import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks,radius,outside,equirectangular){
        super(scene);

        this.slices = slices;
        this.stacks = 2*stacks;
        this.radius = radius;
        this.outside = outside;
        this.equirectangular = equirectangular;
        this.initBuffers();
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

                x =  Math.cos(stackAngle) * Math.cos(sliceAngle);             
                y =  Math.cos(stackAngle) * Math.sin(sliceAngle);             
                this.vertices.push(x, Math.sin(stackAngle) ,y);
                
                if(!this.outside) {
                    this.normals.push(-x, -Math.sin(stackAngle) ,-y);

                }
                else {
                    this.normals.push(x, Math.sin(stackAngle) ,y);

                }

                s = j / (this.slices-1);
                t = i / (this.stacks-1);
                if(this.equirectangular) {
                    this.texCoords.push(-s,t);
                }
                else {
                    this.texCoords.push(s,t);

                }
            }
        }
        var currentStack, nextStack;
        for(var i = 0; i < this.stacks; i++)
        {
            currentStack = i * (this.slices + 1);
            nextStack = currentStack + this.slices + 1;  

            for(var j = 0; j < this.slices; j++)
            {

                if(i != (this.stackSize-1))
                {
                    if(!this.outside) {
                        this.indices.push(currentStack + 1,nextStack,nextStack+1);

                    }
                    else {
                        this.indices.push(nextStack,currentStack + 1,nextStack+1);
                    }
                }
                if(i != 0)
                {
                    if(!this.outside) {
                        this.indices.push(currentStack,nextStack,currentStack+1);
                    }
                    else {
                        this.indices.push(nextStack,currentStack,currentStack+1);
                    }
                }
                currentStack++; 
                nextStack++;
            }
          }
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.radius,this.radius,this.radius)
        super.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.slices = 2 + Math.round(100 * complexity);
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}