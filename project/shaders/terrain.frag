#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 yTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 color1 = texture2D(uSampler2, yTextureCoord);

	

	color = color1 * 0.3 + color * 0.7;
    gl_FragColor = color;
}