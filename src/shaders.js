var SHADERS = {"interaction":{"vertex":"#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec3 aColor;\nuniform mat4 uMMatrix;\nuniform mat4 uMatrix;\nuniform float uFogRadius;\nvarying vec4 vColor;\nvoid main() {\n  gl_Position = uMatrix * aPosition;\n  vec4 mPosition = vec4(uMMatrix * aPosition);\n  float distance = length(mPosition);\n  if (distance > uFogRadius) {\n    vColor = vec4(0.0, 0.0, 0.0, 0.0);\n  } else {\n    vColor = vec4(aColor, 1.0);\n  }\n}\n","fragment":"#ifdef GL_ES\n  precision mediump float;\n#endif\nvarying vec4 vColor;\nvoid main() {\n  gl_FragColor = vColor;\n}\n"},"depth":{"vertex":"#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nuniform mat4 uMatrix;\nvarying vec4 vPosition;\nvoid main() {\n//  if (aHidden == 1.0) {\n//    gl_Position = vec4(0.0);\n//    vPosition = vec4(0.0);\n//  }\n  gl_Position = uMatrix * aPosition;\n  vPosition = aPosition;\n}\n","fragment":"#ifdef GL_ES\n  precision mediump float;\n#endif\nvarying vec4 vPosition;\nvoid main() {\n\tgl_FragColor = vec4(vPosition.xyz, length(vPosition));\n}\n"},"skydome":{"vertex":"#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uMatrix;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nfloat gradientHeight = 10.0;\nfloat gradientStrength = 1.0;\nvoid main() {\n  gl_Position = uMatrix * aPosition;\n  vTexCoord = aTexCoord;\n  vFogIntensity = clamp((gradientHeight-aPosition.z) / (gradientHeight/gradientStrength), 0.0, gradientStrength);\n}\n","fragment":"#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTileImage;\nuniform vec3 uFogColor;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nvoid main() {\n  vec3 color = vec3(texture2D(uTileImage, vec2(vTexCoord.x, -vTexCoord.y)));\n  gl_FragColor = vec4(mix(color, uFogColor, vFogIntensity), 1.0);\n}\n"},"buildings":{"vertex":"#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec3 aColor;\nattribute vec3 aIDColor;\nuniform mat4 uMatrix;\nuniform mat4 uMMatrix;\nuniform mat3 uNormalTransform;\nuniform vec3 uLightDirection;\nuniform vec3 uLightColor;\nuniform vec3 uFogColor;\nuniform float uFogRadius;\nuniform vec3 uHighlightColor;\nuniform vec3 uHighlightID;\nvarying vec3 vColor;\nfloat fogBlur = uFogRadius * 0.05;\nfloat gradientHeight = 90.0;\nfloat gradientStrength = 0.4;\nvoid main() {\n  vec4 glPosition = uMatrix * aPosition;\n  gl_Position = glPosition;\n  //*** highlight object ******************************************************\n  vec3 color = aColor;\n  if (uHighlightID.r == aIDColor.r && uHighlightID.g == aIDColor.g && uHighlightID.b == aIDColor.b) {\n    color = mix(aColor, uHighlightColor, 0.5);\n  }\n  //*** light intensity, defined by light direction on surface ****************\n  vec3 transformedNormal = aNormal * uNormalTransform;\n  float lightIntensity = max( dot(transformedNormal, uLightDirection), 0.0) / 1.5;\n  color = color + uLightColor * lightIntensity;\n  //*** vertical shading ******************************************************\n  float verticalShading = clamp((gradientHeight-aPosition.z) / (gradientHeight/gradientStrength), 0.0, gradientStrength);\n  //*** fog *******************************************************************\n  vec4 mPosition = uMMatrix * aPosition;\n  float distance = length(mPosition);\n  float fogIntensity = (distance - fogBlur) / (uFogRadius - fogBlur);\n  fogIntensity = clamp(fogIntensity, 0.0, 1.0);\n  //***************************************************************************\n  vColor = mix(vec3(color - verticalShading), uFogColor, fogIntensity);\n}\n","fragment":"#ifdef GL_ES\n  precision mediump float;\n#endif\nvarying vec3 vColor;\nvoid main() {\n  gl_FragColor = vec4(vColor, 1.0);\n}\n"},"basemap":{"vertex":"#ifdef GL_ES\n  precision mediump float;\n#endif\nattribute vec4 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uMMatrix;\nuniform mat4 uMatrix;\nuniform float uFogRadius;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nfloat fogBlur = uFogRadius * 0.95;\nvoid main() {\n  vec4 glPosition = uMatrix * aPosition;\n  gl_Position = glPosition;\n  vTexCoord = aTexCoord;\n  //*** fog *******************************************************************\n  vec4 mPosition = uMMatrix * aPosition;\n  float distance = length(mPosition);\n  float fogIntensity = (distance - fogBlur) / (uFogRadius - fogBlur);\n  vFogIntensity = clamp(fogIntensity, 0.0, 1.0);\n}\n","fragment":"#ifdef GL_ES\n  precision mediump float;\n#endif\nuniform sampler2D uTileImage;\nuniform vec3 uFogColor;\nvarying vec2 vTexCoord;\nvarying float vFogIntensity;\nvoid main() {\n  vec3 color = vec3(texture2D(uTileImage, vec2(vTexCoord.x, -vTexCoord.y)));\n  gl_FragColor = vec4(mix(color, uFogColor, vFogIntensity), 1.0);\n}\n"}};
