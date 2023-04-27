import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { MyCylinder } from './MyCylinder.js';
import {MyPyramid} from './MyPyramid.js'
import {MyWing} from './MyWing.js';
import {MyPrism} from './MyPrism.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MySphere } from './MySphere.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
    constructor(scene,ang,velo,coords) {    
        super(scene);
        this.initBuffers();
        this.coords = coords; // 0 for X, 1 for Y and 2 for Z
        this.ang = ang; // orientation angle
        this.velo = velo; // velocity
        this.up = false; // direction
        this.maxY = 1.2;
        this.initCords = coords;
        this.initAng = ang;

    }

    initBuffers() {
        this.head = new MySphere(this.scene,50,50,0.1,true);
        this.wing = new MyWing(this.scene,Math.PI/7,4);
        this.back = new MyPyramid(this.scene,6,10,2);
        this.tail = new MyPyramid(this.scene,6,10,2);
        this.eye = new MySphere(this.scene,50,50,0.1,true);
        this.mat = new CGFappearance(this.scene)

        this.mat2 = new CGFappearance(this.scene);
        this.mat2.setDiffuse(0, 0, 0, 255/255);
        this.mat2.setSpecular(255/255, 255/255, 255/255, 255/255);
        this.mat2.setAmbient(0, 0, 0, 255/255);
    }


    resetPosition() {
        this.coords = this.initCords;
        this.velo = 0;
        this.ang = this.initAng;
    }

    turn(v) {
        this.ang -= v;
    }

    accelerate(v) {
        this.velo += v*0.2; 
        if(this.velo <= 0) {
            this.velo = 0;
        }
    }

    update(t) {
        var offset = (this.maxY) / (60)

        if(t % 1000 < 500) {
            this.coords[1] -= offset
        }
        else {
            this.coords[1] += offset
        }

        this.vx = this.velo * Math.sin(this.ang);
        this.vz = this.velo * Math.cos(this.ang);
        this.coords[0] += this.vx;
        this.coords[2] += this.vz;
        this.wing.update(t);

    }
    
    
    display() {
        //this.update()
        this.scene.pushMatrix();
        
        this.scene.translate(-this.coords[0],-this.coords[1],-this.coords[2]);
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