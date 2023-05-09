import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyBillBoard extends CGFobject {
    constructor(scene,coords) {    
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.quad = new MyQuad(this.scene);
        this.mat = new CGFappearance(this.scene);
    }

    billBoardPosition() {
        var cam = []
        var normals = []
        var c = 0;
        for(var i = 0; i < 3; i++) {
            cam[i] = this.scene.camera.position[i] - this.scene.camera.target[i];
            normals[i] = c;
            if(i == 1) {
                c++;
            }
        }
        vec3.normalize(cam,cam);
        console.log(cam)
        vec3.normalize(normals,normals);

        var dot_prod = cam[0] * normals[0] + cam[1] * normals[1] + cam[2] * normals[2];
        var cross_prod = [];
        vec3.cross(cross_prod,cam,normals);
        var angle = Math.acos(dot_prod);
        console.log(angle)
        vec3.normalize(cross_prod,cross_prod);
        this.scene.rotate(-angle,0,cross_prod[1],0);
    }
    
    display() {
        this.scene.pushMatrix();
        this.mat.setTexture(this.scene.treeTexture);
        this.mat.apply();
        this.billBoardPosition();
        this.scene.rotate(-Math.PI,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }
    disableNormalViz() {
        this.quad.disableNormalViz();
    }
}