import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {FooterInteractiveElement} from "../footer_3d_model/footer_3d_element";


export default function FooterThreeDModel() {
    return (
        <div className={`w-full h-full`}>
            <Canvas camera={{position: [0, 0, 3], fov: 45}} shadows>
                <ambientLight intensity={1}/>
                <directionalLight castShadow position={[5, 10, 7]} intensity={2}/>
                <Suspense fallback={null}>
                    <FooterInteractiveElement/>
                </Suspense>
            </Canvas>
        </div>
    )
}