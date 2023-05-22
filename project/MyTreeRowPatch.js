import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyBillBoard } from './MyBillBoard.js';

export class MyTreeRowPatch extends CGFobject {
    constructor(scene,textures,coords) {    
        super(scene);
        this.textures = textures;
        this.trees = [];
        this.coords = coords;
        this.initBuffers();
    }

    initBuffers() {
        this.mat = new CGFappearance(this.scene);
        this.createRow();
    }

    createRow() {
        var firstTree = this.randomInteger(0,2);
        this.trees[0] = new MyBillBoard(this.scene,this.textures[firstTree],[...this.coords],1);
        for(var i = 1; i < 6; i++) {
          var textureIdx = this.randomInteger(0,2);
          var xOffset = this.randomFloat(0.5,2.6);
          var zOffset = this.randomFloat(-0.4,0.4);
          this.coords[0] += xOffset;
          this.coords[2] += zOffset;
          console.log(this.coords)
          this.trees[i] = new MyBillBoard(this.scene,this.textures[textureIdx],[...this.coords],1); 
        }
      }
      
    
    display() {
        for(var i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            this.scene.scale(14,14,14)
            this.trees[i].display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        for(var i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            this.trees[i].enableNormalViz();
            this.scene.popMatrix();
        }
    }

    disableNormalViz() {
        for(var i = 0; i < 6; i++) {
            this.scene.pushMatrix();
            this.trees[i].disableNormalViz();
            this.scene.popMatrix();
        }
    }

    randomInteger(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    randomFloat(min, max) {
        const randomNum = Math.random() * (max - min) + min;
        return parseFloat(randomNum.toFixed(1));
    }

    updateBuffers(complexity){
    }
}