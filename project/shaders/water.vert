attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;
uniform float timeFactor;

void main() {

    vec4 filter = texture2D(uSampler2, aTextureCoord+vec2(cos(timeFactor*0.1)*0.07,cos(timeFactor*0.1)*0.07));
    vTextureCoord = aTextureCoord;
    vec3 offset=vec3(0.0,0.0,0.0);
    offset=aVertexNormal*0.009;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy,aVertexPosition.z + filter.g * 0.1, 1.0) + vec4(offset,0.0);


}

