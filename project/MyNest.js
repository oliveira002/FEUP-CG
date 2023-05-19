import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
	constructor(scene, slices, stacks,equirectangular, texture,coords){
        super(scene);

        this.slices = slices;
        this.texture = texture;
        this.stacks = 2*stacks;
        this.radius = 2.5;
        this.outside = true;
        this.equirectangular = equirectangular;
        this.coords = coords;
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

        for(var i = 0; i <= this.stacks/2; i++)
        {
            stackAngle = Math.PI / 2 - i * halfAngle;

            for(var j = 0; j <= this.slices; j++)
            {
                sliceAngle = j * firstAngle; 

                x =  Math.cos(stackAngle) * Math.cos(sliceAngle);             
                y =  Math.cos(stackAngle) * Math.sin(sliceAngle);             
                this.vertices.push(x, Math.sin(stackAngle) ,y);
                this.normals.push(x, Math.sin(stackAngle) ,y);

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
        for(var i = 0; i < this.stacks/2; i++)
        {
            currentStack = i * (this.slices + 1);
            nextStack = currentStack + this.slices + 1;  

            for(var j = 0; j < this.slices; j++)
            {

                if(i != (this.stackSize-1))
                {
                    this.indices.push(currentStack + 1,nextStack,nextStack+1);
                    this.indices.push(nextStack,currentStack + 1,nextStack+1);
                }
                if(i != 0)
                {
                    this.indices.push(currentStack,nextStack,currentStack+1)
                    this.indices.push(nextStack,currentStack,currentStack+1);
                }
                currentStack++; 
                nextStack++;
            }
          }
          
        for(var i = 0; i <= this.stacks/2; i++)
        {
            stackAngle = Math.PI / 2 - i * halfAngle;

            for(var j = 0; j <= this.slices; j++)
            {
                sliceAngle = j * firstAngle; 

                x =  Math.cos(stackAngle) * Math.cos(sliceAngle);             
                y =  Math.cos(stackAngle) * Math.sin(sliceAngle);             
                this.vertices.push(x, Math.sin(stackAngle) ,y);
                this.normals.push(-x, -Math.sin(stackAngle) ,-y)

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
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.mat = new CGFappearance(this.scene)
        this.initGLBuffers();
        
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.coords[0],this.coords[1],this.coords[2]);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.scale(this.radius,this.radius,this.radius);
        this.scene.scale(0.3,0.2,0.3);
        this.mat.setSpecular(1,1,1,1);
        this.mat.setShininess(10.0);
        this.mat.setDiffuse(1,1,1,1); 
        this.mat.setAmbient(1.5,1.5,1.5,1.5);
        this.mat.setEmission(0.15,0.15,0.15,1);
        this.mat.setTexture(this.texture);
        this.mat.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        super.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.slices = 2 + Math.round(100 * complexity);
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}