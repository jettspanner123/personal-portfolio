import React from "react";
import {useGLTF} from "@react-three/drei";
import * as THREE from "three";
import {RootState, useFrame, useThree} from "@react-three/fiber";

export function FooterInteractiveElement(): React.ReactElement {

    const elementRef = React.useRef<THREE.Group>(null!);
    const {scene} = useGLTF("/iphone_model.glb");


    const {viewport, mouse} = useThree();

    useFrame((_state: RootState, delta: number) => {

        elementRef.current.rotation.y = Math.PI + 0.3;
        const yRot: number = (mouse.x * viewport.height) / 8;
        const xRot: number = (mouse.y * viewport.width) / 12;

        elementRef.current.rotation.x += (xRot - elementRef.current.rotation.x) * 0.1;
        elementRef.current.rotation.y += (yRot - elementRef.current.rotation.y) * 0.1;
    })
    return (
        <group ref={elementRef}>
            <primitive object={scene}/>
        </group>
    );
}


useGLTF.preload("/iphone_model.glb");