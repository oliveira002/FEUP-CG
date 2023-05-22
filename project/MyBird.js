import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import {MyPyramid} from './MyPyramid.js'
import {MyWing} from './MyWing.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MySphere } from './MySphere.js';
import { MyBirdPaw } from './MyBirdPaw.js';
import { MyBirdEgg } from './MyBirdEgg.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
    constructor(scene,ang,velo,coords) {    
        super(scene);
        this.coords = coords; // 0 for X, 1 for Y and 2 for Z
        this.ang = ang; // orientation angle
        this.velo = velo; // velocity
        this.amplitude = 2;
        this.initCords = structuredClone(coords);
        this.initAng = ang;
        this.initBuffers();
        this.pickEgg = false;
        this.startPickEgg = false;
        this.startTime = null;
        this.lastTime = 0;
        this.attachedEgg = null;
        this.initialY = 0;
        this.dropEggQuadratic = true;
        this.down = true;
        this.notToUse = true;
    }

    initBuffers() {
        this.head = new MySphere(this.scene,20,7,0.1,true,false);
        this.wing = new MyWing(this.scene,Math.PI/(5),this.velo);
        this.back = new MyPyramid(this.scene,6,3);
        this.tail = new MyPyramid(this.scene,6,5);
        this.eye = new MySphere(this.scene,20,20,0.1,true);
        this.paw = new MyBirdPaw(this.scene);
        this.mat = new CGFappearance(this.scene);


        this.mat2 = new CGFappearance(this.scene);
        this.mat2.setDiffuse(0, 0, 0, 255/255);
        this.mat2.setSpecular(255/255, 255/255, 255/255, 255/255);
        this.mat2.setAmbient(0, 0, 0, 255/255);

    }


    resetPosition() {
        this.velo = 0;
        this.ang = this.initAng;
        this.coords = structuredClone(this.initCords);
        this.wing.currAngle = 0;
    }

    turn(v) {
        this.ang -= v * 0.8 * this.scene.speedFactor;
    }

    accelerate(v) {
        this.velo += v * 0.1 * this.scene.speedFactor; 
        if(this.velo <= 0) {
            this.velo = 0;
        }
    }

    update(t) {
        var refreshRate = 60;
        var offset = (this.amplitude) / (refreshRate)
  

        if (this.pickEgg) {
            if(this.notToUse) {
                this.birdVertical();
                return;
            }
            if (!this.startPickEgg) {
                this.startTime = t;
                this.startPickEgg = true;
                this.initialY = this.coords[1];
            }
            if(this.attachedEgg == null) {
                this.getAttachedEgg();
            }
            var timeElapsed = (t - this.startTime) / 1000.0;
            var targetY = -26; 
        
            if (timeElapsed < 1.0) {
                var eggOffset = Math.abs(this.initialY - targetY) / 10;
                this.coords[1] -= eggOffset;
            } else if (timeElapsed >= 1.0 && timeElapsed <= 2.0) {
                var eggOffset = Math.abs(this.initialY - targetY) / 10;
                this.coords[1] += eggOffset;
            } else {
                this.coords[1] = this.initialY;
                this.startPickEgg = false;
                this.pickEgg = false;
            }
        
            this.lastTime = t;
        }
        else {
            if(t % 1000 < 500) {
                this.coords[1] -= offset
            }
            else if(t % 1000 > 500 && t % 1000 < 1000) {
                this.coords[1] += offset
            }
        }

        this.vx = this.velo * Math.sin(this.ang);
        this.vz = this.velo * Math.cos(this.ang);
        this.coords[0] -= this.vx;
        this.coords[2] -= this.vz;


        this.wing.update(t);
        this.wing.updateSpeed(this.velo);
    }

    isBirdOnEgg(eggCords, range) {
        const isInRangeX = Math.abs(this.coords[0] - eggCords[0]) <= range;
        const isInRangeZ = Math.abs(this.coords[2] - eggCords[2]) <= range;
        const isInRangeY = Math.abs(this.coords[1] - eggCords[1]) <= 3;

        return isInRangeX && isInRangeZ && isInRangeY;
    }

    getAttachedEgg() {
        for(var i = 0; i < 4; i++) {
            if(this.isBirdOnEgg(this.scene.eggs[i].coords,7.5)) {
                this.attachedEgg = this.scene.eggs[i];
                this.scene.nest.removeEgg(this.scene.eggs[i]);
                this.scene.eggs[i].attached = true;
                this.scene.eggs = this.scene.eggs.filter(e => e != this.scene.eggs[i]);
                break;
            }
        }
    }
    dropEgg() {
        if(this.attachedEgg == null) {
            return;
        }
        if(!this.dropEggQuadratic) {
            const nestCords = this.scene.nest.coords;
            const isInRangeX = Math.abs(this.coords[0] - nestCords[0]) <= 0.6;
            const isInRangeZ = Math.abs(this.coords[2] - nestCords[2]) <= 0.6;
            if(isInRangeX && isInRangeZ && this.attachedEgg != null && nestCords[1] < this.coords[1]) {
                this.attachedEgg.dropQuadratic = false;
                this.attachedEgg.dropEgg = true;
                this.attachedEgg.coords = [...this.coords];
                this.scene.eggs.push(this.attachedEgg);
                this.attachedEgg = null;
            }
        }else{
            const nestCords = this.scene.nest.coords;
            const xVec = nestCords[0] - this.coords[0];
            const zVec = nestCords[2] - this.coords[2];
            const yDiff = nestCords[1] - this.coords[1];
            const dist = Math.sqrt(xVec * xVec + zVec * zVec);
            const range = 2.2 * Math.abs(yDiff)/4;
            const isInRange = dist <= range;
            
            if (isInRange && nestCords[1] < this.coords[1]) {
                this.attachedEgg.dropQuadratic = true;
                this.attachedEgg.dropEgg = true;
                this.attachedEgg.coords = [...this.coords];
                this.scene.eggs.push(this.attachedEgg);
                this.attachedEgg = null;
            }
        }
    }

    birdVertical() {
        var targetY = -60;

        if(this.attachedEgg == null) {
            this.getAttachedEgg();
        }

        if(this.down) {
            if(this.coords[1] <= targetY) {
                this.coords[1] = targetY;
                this.down = false;
            }
            else {
                this.coords[1] -= 2;
            }
        }
        else {
            if(this.coords[1] >= this.initialY) {
                this.coords[1] = this.initialY;
                this.pickEgg = false;
                this.down = true;
            }
            else {
                this.coords[1] += 2;
            }
        }
    }

    display() {

        //this.update()
        this.scene.pushMatrix();
        if (this.attachedEgg != null) {
            this.scene.pushMatrix();
            this.scene.translate(this.coords[0] - this.attachedEgg.coords[0],this.coords[1] - 2.9 - this.attachedEgg.coords[1],this.coords[2]  - this.attachedEgg.coords[2] - 0.2);
            this.attachedEgg.display();
            this.scene.popMatrix();
          }
        this.scene.translate(this.coords[0],this.coords[1],this.coords[2]);
        this.scene.scale(2,2,2);
        this.scene.rotate(this.ang,0,1,0);
        this.scene.translate(0,0,-0.98);
    
        //body
        this.scene.pushMatrix();
        this.mat.setTexture(this.scene.head);
        this.mat.apply();
        this.scene.translate(0,0,1)
        this.scene.scale(10,10,18);
        this.eye.display();   
        this.scene.popMatrix();

        // wings
        this.scene.pushMatrix();
        this.scene.translate(1.28,-0.14,1);
        this.mat.setTexture(this.scene.wing);
        this.mat.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.28,-0.14,1);  
        this.mat.setTexture(this.scene.wing);
        this.mat.apply(); 
        this.scene.scale(-1,1,1);
        this.wing.display();
        this.scene.popMatrix();

        // sphere head
        this.scene.pushMatrix();
        this.mat.setTexture(this.scene.head);
        this.mat.apply();
        this.scene.translate(0,0.5,-1.4)
        this.scene.scale(8,8,8);
        this.head.display();   
        this.scene.popMatrix();
        
        // tail
        this.scene.pushMatrix();
        this.scene.translate(0,0,3.74);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.mat.setTexture(this.scene.wing);
        this.mat.apply();
        this.tail.display();
        this.scene.popMatrix();

        // eyes
        this.scene.pushMatrix();
        this.scene.translate(0.52,0.8,-2);
        this.scene.scale(1.3,1.3,1.3);
        this.mat2.apply();
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.52,0.8,-2);
        this.scene.scale(1.3,1.3,1.3);
        this.mat2.apply();
        this.eye.display();
        this.scene.popMatrix();
        
        // beak
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-2.1);
        this.scene.rotate(-Math.PI / 2, 1, 0,0);
        this.scene.scale(0.2,0.7,0.2);
        this.mat.setTexture(this.scene.beak);
        this.mat.apply();
        this.back.display();   
        this.scene.popMatrix();

        // paws
        this.scene.pushMatrix();
        this.scene.translate(0.4,-1.3,1.5);
        this.scene.rotate(Math.PI/1.5,0,1,0);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,-1.3,1.5);
        this.scene.rotate(Math.PI/1.5,0,1,0);
        this.paw.display();
        this.scene.popMatrix();


        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.wing.enableNormalViz();
        this.head.enableNormalViz();
        this.back.enableNormalViz();
        this.tail.enableNormalViz();
        this.eye.enableNormalViz();
    }
    disableNormalViz() {
        this.wing.disableNormalViz();
        this.head.disableNormalViz();
        this.back.disableNormalViz();
        this.tail.disableNormalViz();
        this.eye.disableNormalViz();
    }
}