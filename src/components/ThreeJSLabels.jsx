import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

function ThreeJSLabels() {
    const labels = [
        { position: [1, 0, 0], text: "Google", url: "https://google.com" },
        { position: [-1, 0, 0], text: "Facebook", url: "https://facebook.com" },
    ];

    return (
        <div style={{ width: "100%", height: 400 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <mesh rotation-x={0.4} rotation-y={0.8}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="royalblue" />
                </mesh>

                {labels.map(({ position, text, url }, idx) => (
                    <Html
                        key={idx}
                        position={position}
                        style={{
                            cursor: "pointer",
                            color: "cyan",
                            fontWeight: "bold",
                        }}
                        onClick={() => window.open(url, "_blank")}
                    >
                        {text}
                    </Html>
                ))}

                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default React.memo(ThreeJSLabels);
