import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
    constructor(scene, maxAngle, speed) {    
        super(scene);
        this.initBuffers();
        this.maxAngle = maxAngle;
        this.currAngle = 0;
        this.up = true;
        this.speed = speed;
    }

    initBuffers() {
        this.plano = new MyQuad(this.scene);
    }

    animateWing() {
        if (this.up) {
            this.currAngle += this.speed;
            if (this.currAngle >= this.maxAngle) {
              this.currAngle = this.maxAngle;
              this.up = false;
            }
          } else {
            this.currAngle -= this.speed;
            if (this.currAngle <= -this.maxAngle) {
              this.currAngle = -this.maxAngle;
              this.up = true;
            }
        }
    }

    update(t) {
        var offset = (this.maxAngle) / (60/this.speed)

        if(t % 1000 < 500) {
            this.currAngle -= offset
        }
        else {
            this.currAngle += offset
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(this.currAngle,0,0,1);
        this.scene.translate(0.5,0,0);
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 10,0,0,1);
        this.scene.scale(1,1,2);
        this.plano.display();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 6,0,0,1);
        this.scene.translate(0.78,-0.38,0);
        this.scene.scale(1,1,2);
        this.plano.display();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.78,0.32,0);
        this.scene.scale(1,1,2);
        this.plano.display();   
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.plano.enableNormalViz();
    }
    disableNormalViz() {
        this.plano.disableNormalViz();
    }
}