import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyWater extends CGFobject {
    constructor(scene,ycord) {
        super(scene);
        this.ycord = ycord;
        this.initBuffers();
    }
    initBuffers() {
        this.plane = new MyPlane(this.scene, 20);
        
        this.planeMat = new CGFappearance(this.scene);
		this.planeMat.setAmbient(0.3, 0.3, 0.3, 1);
		this.planeMat.setDiffuse(0.7, 0.7, 0.7, 1);
		this.planeMat.setSpecular(0.0, 0.0, 0.0, 1);
		this.planeMat.setShininess(120);

        this.waterTex = new CGFtexture(this.scene, "images/waterTex.jpg");
		this.waterMap = new CGFtexture(this.scene, "images/waterMap.jpg");
        this.waterShader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");

        this.waterShader.setUniformsValues({ uSampler2: 2 });
        this.waterShader.setUniformsValues({ timeFactor: 0 });

    }
    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, 0, this.ycord);

        this.scene.scale(200, 200, 60);
        this.waterMap.bind(2);

        this.planeMat.setTexture(this.waterTex);
        this.scene.gl.activeTexture(this.scene.gl.TEXTURE0);
        this.planeMat.setTextureWrap('REPEAT', 'REPEAT');
        
        this.scene.setActiveShader(this.waterShader);
        this.planeMat.apply();

        
        this.plane.display();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }
    update(t) {
        this.waterShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    }
    enableNormalViz() {
        this.plane.enableNormalViz();
    }
    disableNormalViz() {
        this.plane.disableNormalViz();
    }
    
}