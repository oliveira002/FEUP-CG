import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    constructor(scene) {    
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.plane = new MyPlane(this.scene,20);
        this.planeMat = new CGFappearance(this.scene);
        this.testShader = new CGFshader(this.scene.gl,"shaders/terrain.vert", "shaders/terrain.frag")

        this.texture1=new CGFtexture(this.scene,'images/terrain.jpg');
        this.map=new CGFtexture(this.scene,'images/heightmap.jpg');
        this.altimetry=new CGFtexture(this.scene,'images/altimetry.png');

        this.testShader.setUniformsValues({ uSampler1: 1 });
        this.testShader.setUniformsValues({ uSampler2: 2 });
    }


    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,-100,0);
        this.scene.scale(400,400,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.map.bind(1);
        this.altimetry.bind(2);

        this.planeMat.setTexture(this.scene.texture);

        // shaders
        this.scene.setActiveShader(this.testShader);
        this.scene.gl.activeTexture(this.scene.gl.TEXTURE0);
        //this.scene.gl.bindTexture(this.scene.gl.TEXTURE_2D, this.scene.heightMap);


        this.planeMat.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

    }
}