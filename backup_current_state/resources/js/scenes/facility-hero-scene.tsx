import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function ResponsiveIndustrialFacility() {
    const groupRef = useRef<THREE.Group>(null);
    const sensorRef1 = useRef<THREE.Mesh>(null);
    const sensorRef2 = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    // Position slightly to the right on wide desktop, centered on mobile/tablet
    const isDesktop = viewport.width > 7;
    const posX = isDesktop ? 1.4 : 0;
    const scale = isDesktop ? 1.15 : 0.9;

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.25 + 0.45;
        }
        if (sensorRef1.current) {
            const s = 1 + Math.sin(t * 4) * 0.18;
            sensorRef1.current.scale.set(s, s, s);
        }
        if (sensorRef2.current) {
            const s = 1 + Math.cos(t * 3.5) * 0.18;
            sensorRef2.current.scale.set(s, s, s);
        }
    });

    return (
        <group ref={groupRef} position={[posX, -0.7, 0]} scale={scale}>
            {/* Concrete Pad Foundation */}
            <mesh position={[0, -0.15, 0]}>
                <boxGeometry args={[4.6, 0.25, 3.4]} />
                <meshStandardMaterial color="#21222D" roughness={0.88} metalness={0.12} />
            </mesh>

            {/* Separator Horizontal Pressure Vessel */}
            <mesh position={[0, 0.95, -0.3]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.58, 0.58, 2.6, 32]} />
                <meshStandardMaterial color="#2B2B36" roughness={0.45} metalness={0.65} />
            </mesh>
            {/* Vessel End Caps */}
            <mesh position={[-1.3, 0.95, -0.3]}>
                <sphereGeometry args={[0.58, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#363847" roughness={0.45} metalness={0.65} />
            </mesh>
            <mesh position={[1.3, 0.95, -0.3]} rotation={[0, Math.PI, 0]}>
                <sphereGeometry args={[0.58, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#363847" roughness={0.45} metalness={0.65} />
            </mesh>

            {/* Vessel Support Saddles */}
            <mesh position={[-0.75, 0.2, -0.3]}>
                <boxGeometry args={[0.32, 0.45, 1.25]} />
                <meshStandardMaterial color="#171821" roughness={0.85} metalness={0.3} />
            </mesh>
            <mesh position={[0.75, 0.2, -0.3]}>
                <boxGeometry args={[0.32, 0.45, 1.25]} />
                <meshStandardMaterial color="#171821" roughness={0.85} metalness={0.3} />
            </mesh>

            {/* Main Inlet Pipeline */}
            <mesh position={[-1.5, 0.35, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.13, 0.13, 2.0, 20]} />
                <meshStandardMaterial color="#4A4C5D" roughness={0.4} metalness={0.75} />
            </mesh>

            {/* Riser Pipe to Vessel */}
            <mesh position={[-0.75, 1.35, 0.4]}>
                <cylinderGeometry args={[0.11, 0.11, 0.8, 20]} />
                <meshStandardMaterial color="#4A4C5D" roughness={0.4} metalness={0.75} />
            </mesh>

            {/* Control Valve Body */}
            <mesh position={[-0.75, 1.85, 0.4]}>
                <boxGeometry args={[0.28, 0.28, 0.28]} />
                <meshStandardMaterial color="#FEB95A" roughness={0.35} metalness={0.55} />
            </mesh>
            {/* Valve Handwheel */}
            <mesh position={[-0.75, 2.08, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.15, 0.028, 8, 24]} />
                <meshStandardMaterial color="#FEB95A" roughness={0.3} metalness={0.65} />
            </mesh>

            {/* Gas Discharge Header Pipe */}
            <mesh position={[0.85, 1.85, -0.3]}>
                <cylinderGeometry args={[0.1, 0.1, 1.0, 20]} />
                <meshStandardMaterial color="#2B2B36" roughness={0.4} metalness={0.7} />
            </mesh>

            {/* Flanged Connections with Accent Color */}
            <mesh position={[-1.5, 0.35, 1.6]}>
                <cylinderGeometry args={[0.22, 0.22, 0.06, 20]} />
                <meshStandardMaterial color="#A9DFD8" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0.85, 2.35, -0.3]}>
                <cylinderGeometry args={[0.18, 0.18, 0.05, 20]} />
                <meshStandardMaterial color="#A9DFD8" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Sensor Beacon 1: Gas Sniffer (Methane Sensor) */}
            <mesh ref={sensorRef1} position={[-0.75, 2.3, 0.4]}>
                <octahedronGeometry args={[0.11, 0]} />
                <meshStandardMaterial color="#4ADE80" emissive="#4ADE80" emissiveIntensity={0.8} />
            </mesh>

            {/* Sensor Beacon 2: Pressure Transducer */}
            <mesh ref={sensorRef2} position={[0, 1.65, -0.3]}>
                <octahedronGeometry args={[0.1, 0]} />
                <meshStandardMaterial color="#20AEF3" emissive="#20AEF3" emissiveIntensity={0.8} />
            </mesh>
        </group>
    );
}

interface FacilityHeroSceneProps {
    className?: string;
}

export default function FacilityHeroScene({ className = 'w-full h-full' }: FacilityHeroSceneProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={`flex items-center justify-center bg-[#171821] ${className}`}>
                <div className="text-xs font-code text-[#8C8D99]">Memuat representasi 3D fasilitas...</div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <Canvas
                camera={{ position: [3.8, 2.6, 4.4], fov: 42 }}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.85} />
                <directionalLight position={[6, 8, 5]} intensity={1.6} color="#FFFFFF" />
                <directionalLight position={[-5, 4, -4]} intensity={0.5} color="#20AEF3" />
                <pointLight position={[-0.75, 2.3, 0.4]} intensity={1.4} color="#4ADE80" distance={3.5} />
                <pointLight position={[0, 1.8, -0.3]} intensity={1.2} color="#20AEF3" distance={3.5} />

                <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
                    <ResponsiveIndustrialFacility />
                </Float>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2.1}
                />
            </Canvas>
        </div>
    );
}