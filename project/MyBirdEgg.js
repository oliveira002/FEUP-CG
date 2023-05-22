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
        this.dropQuadratic = false;
        this.offset = null;
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
        this.scene.scale(4,4,4)
        this.mat.setTexture(this.scene.egg);
        this.mat.apply();
        this.egg.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }
    update(t,index){
        if(!this.dropQuadratic){
          if(this.dropEgg){
            if(this.offset == null){
                this.offset = (this.coords[1]-this.scene.nest.coords[1]) / 60;
            }
            if(this.offset){
                this.coords[1] -= this.offset;
            }
            if(this.coords[1]-this.scene.nest.coords[1] < 0){
                this.dropEgg = false;
                this.coords[1] = this.scene.nest.coords[1];
                this.offset = null;
            }
        }  
        }else{
            if(this.dropEgg){
                if(this.offset == null){
                    this.offset = (this.coords[1]-this.scene.nest.coords[1]) / 60;
                }
                if(this.offset){
                    this.coords[1] -= this.offset;

                    const xDistance = this.coords[0] - this.scene.nest.coords[0] + 0.3;
                    const zDistance = this.coords[2] - this.scene.nest.coords[2] + 0.3;

                    const xHorizontalOffset = (xDistance ** 2) / 27;
                    const zHorizontalOffset = (zDistance ** 2) / 27;

                    this.coords[0] -= xHorizontalOffset * (xDistance < 0 ? -1 : 1);
                    this.coords[2] -= zHorizontalOffset * (zDistance < 0 ? -1 : 1);
                }
                
            }
        }
        
        this.scene.nest.checkEggCollision(index)
    }

    enableNormalViz() {
        this.egg.enableNormalViz();
    }
    disableNormalViz() {
        this.egg.disableNormalViz();
    }
}