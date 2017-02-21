const THREE = require('three');
const EffectComposer = require('three-effectcomposer')(THREE)

var FisheyeShader = new EffectComposer.ShaderPass({
    uniforms: {
        // the texture the frame is rendered to before passing to the post processing shader
        tDiffuse: {
            type: 't',
            value: null
        }
    },
    vertexShader: require('../glsl/pass-vert.glsl'),
    fragmentShader: require('../glsl/fisheye-frag.glsl')
});

export default function Fisheye(renderer, scene, camera) {
    
    // this is the THREE.js object for doing post-process effects
    var composer = new EffectComposer(renderer);
    composer.addPass(new EffectComposer.RenderPass(scene, camera));
    composer.addPass(FisheyeShader);  

    // set this to true on the shader for your last pass to write to the screen
    FisheyeShader.renderToScreen = true;  

    return {
        initGUI: function(gui) {
        },
        
        render: function() {;
            composer.render();
        }
    }
}