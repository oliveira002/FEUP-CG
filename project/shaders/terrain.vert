attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec2 yTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler;

void main() {
    vTextureCoord = aTextureCoord;
    vec3 offset = vec3(0.0, 0.0, texture2D(uSampler1, vTextureCoord).r);


    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy,aVertexPosition.z + offset.z*0.4, 1.0);
    yTextureCoord.y = 1.0 - (offset.z);
    yTextureCoord.x = 0.0;
}
