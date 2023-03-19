import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene,top,front,right,back,left,bottom) {    
        super(scene);
        this.top = top
        this.front = front
        this.right = right
        this.back = back
        this.left = left
        this.bottom = bottom
        this.initBuffers();
    }

    initBuffers() {
        this.baixo = new MyQuad(this.scene)
        this.mat = new CGFappearance(this.scene)
        this.baixo.updateTexCoords([0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0])
    }

    display() {
        //baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.mat.setTexture(this.bottom);
        this.mat.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.baixo.display();
        this.scene.popMatrix();


        // cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.mat.setTexture(this.top);
        this.mat.apply();
        this.baixo.display();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.popMatrix();
        

        // esquerda
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.mat.setTexture(this.left);
        this.mat.apply();
        this.baixo.display();
        this.scene.popMatrix();

        
        // direita
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.mat.setTexture(this.right);
        this.mat.apply();
        this.baixo.display();
        this.scene.popMatrix();

        
        // frente
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.mat.setTexture(this.front);
        this.mat.apply();
        this.baixo.display();
        this.scene.popMatrix();
        
        
        // frente
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.mat.setTexture(this.back);
        this.mat.apply();
        this.baixo.display();
        this.scene.popMatrix();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
    }
    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}