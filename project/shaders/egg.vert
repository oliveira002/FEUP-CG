attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;


void main() {
    float scaling = 1.0;
    if(aVertexPosition.y > 0.0) {
        scaling = 1.4;
    }
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x,aVertexPosition.y * scaling,aVertexPosition.z,1.0);
    vTextureCoord = aTextureCoord;
}
