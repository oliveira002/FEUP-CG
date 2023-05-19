import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEgg extends CGFobject {
    constructor(scene,coords, dropEgg) {    
        super(scene);
        this.coords = coords;
        this.dropEgg = false;
        this.initBuffers();

    }

    initBuffers() {
        this.egg = new MySphere(this.scene,50,50,0.1,true,false);
        this.mat = new CGFappearance(this.scene);
        this.testShader = new CGFshader(this.scene.gl,"shaders/egg.vert", "shaders/egg.frag");

    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.testShader);
        this.scene.translate(this.coords[0],this.coords[1],this.coords[2])
        this.scene.scale(1.4,1.7,1.4);
        this.mat.setTexture(this.scene.egg);
        this.mat.apply();
        this.egg.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }
    update(t){
        if(this.dropEgg){
            var offset = this.coords[1] / 60;
            this.coords[1] -= offset;
            if(this.coords[1] < 0){
                this.dropEgg = false;
                this.coords[1] = 0;
            }
        }
    }

    enableNormalViz() {
        this.egg.enableNormalViz();
    }
    disableNormalViz() {
        this.egg.disableNormalViz();
    }
}