import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyBillBoard } from './MyBillBoard.js';

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene,textures,coords) {    
        super(scene);
        this.textures = textures;
        this.trees = [];
        this.coords = coords;
        this.initCoords = [...coords];
        this.initBuffers();
    }

    initBuffers() {
        this.mat = new CGFappearance(this.scene);
        this.createGrid();
    }

    createGrid() {
        var row = 0;
        for(var i = 0; i < 3; i++) {
            this.createRow(row);
            this.coords[2] += 1.2;
            this.coords[0] = this.initCoords[0];
            row += 1;
        }
    }

    createRow(row) {
        var firstTree = this.randomInteger(0,2);
        var firstFactor = this.randomFloat(1,1.8);
        this.trees[row * 3] = new MyBillBoard(this.scene,this.textures[firstTree],[...this.coords],firstFactor,0);
        for(var i = 1; i < 3; i++) {
          var textureIdx = this.randomInteger(0,2);
          var xOffset = this.randomFloat(1,1.4);
          var zOffset = this.randomFloat(-0.3,0.3);
          var scaleFactor = this.randomFloat(1,1.8);
          this.coords[0] += xOffset;
          this.coords[2] += zOffset;
          this.trees[i + (row * 3)] = new MyBillBoard(this.scene,this.textures[textureIdx],[...this.coords],scaleFactor,0); 
        }
      }
      
    
    display() {
        for(var i = 0; i < 9; i++) {
            this.scene.pushMatrix();
            this.scene.scale(13,13,13)
            this.trees[i].display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        for(var i = 0; i < 9; i++) {
            this.scene.pushMatrix();
            this.trees[i].enableNormalViz();
            this.scene.popMatrix();
        }
    }

    disableNormalViz() {
        for(var i = 0; i < 9; i++) {
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