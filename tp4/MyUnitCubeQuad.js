import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyUnitCube } from './MyUnitCube.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {    
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.baixo = new MyQuad(this.scene)
        this.cima = new MyQuad(this.scene)
        this.esquerda = new MyQuad(this.scene)
        this.direita = new MyQuad(this.scene)
        this.frente = new MyQuad(this.scene)
        this.tras = new MyQuad(this.scene)
    }

    display() {
        this.scene.translate(0,0,-0.5);
        //baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.baixo.display();
        this.scene.popMatrix();

        // cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.cima.display();
        this.scene.popMatrix();

        // esquerda
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.esquerda.display();
        this.scene.popMatrix();

        // direita
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.direita.display();
        this.scene.popMatrix();

        // frente
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.frente.display();
        this.scene.popMatrix();

         // frente
         this.scene.pushMatrix();
         this.scene.translate(0,0,-0.5);
         this.scene.rotate(-Math.PI/2, 1, 0, 0);
         this.tras.display();
         this.scene.popMatrix();
        
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