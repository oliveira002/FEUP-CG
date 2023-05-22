import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyBillBoard extends CGFobject {
    constructor(scene,texture, coords, scale) {    
        super(scene);
        this.initBuffers();
        this.texture = texture;
        this.coords = coords;
        this.scale = scale;
    }

    initBuffers() {
        this.quad = new MyQuad(this.scene);
        this.mat = new CGFappearance(this.scene);
    }

    billBoardPosition() {
        var cam = []
        var normals = [0,0,1]
        for(var i = 0; i < 3; i++) {
            cam[i] = this.scene.camera.position[i] - this.scene.camera.target[i];

        }
        vec3.normalize(cam,cam);
        vec3.normalize(normals,normals);

        var dot_prod = cam[0] * normals[0] + cam[1] * normals[1] + cam[2] * normals[2];
        var cross_prod = [];
        vec3.cross(cross_prod,cam,normals);
        var angle = Math.acos(dot_prod);
        vec3.normalize(cross_prod,cross_prod);
        this.scene.rotate(-angle,0,cross_prod[1],0);
    }
    
    display() {
        this.scene.pushMatrix();
        this.mat.setTexture(this.texture);
        this.mat.apply();
        this.scene.translate(this.coords[0],this.coords[1],this.coords[2]);
        this.scene.scale(1,this.scale,1);
        this.scene.translate(0,0.5,0);
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

    updateBuffers(complexity){
    }
}