#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 yTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}