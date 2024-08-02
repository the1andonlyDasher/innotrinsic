import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial, ShaderMaterialParameters } from "three";


class CustomShaderMaterial extends ShaderMaterial {
    static compileCount = 0;

    constructor(parameters?: ShaderMaterialParameters) {
        super(parameters);

        // Add a default empty onBeforeCompile function to avoid issues
        this.onBeforeCompile = (shader) => {
            CustomShaderMaterial.compileCount++;
            console.log(`Shader compiled ${CustomShaderMaterial.compileCount} times`);
        };
    }
}



export default CustomShaderMaterial;
