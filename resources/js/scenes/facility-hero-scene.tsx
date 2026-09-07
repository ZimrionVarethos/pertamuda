import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Procedural studio HDRI environment for physical metallic reflections and IBL
function StudioLighting() {
    const { gl, scene } = useThree();

    useEffect(() => {
        const pmremGenerator = new THREE.PMREMGenerator(gl);
        pmremGenerator.compileEquirectangularShader();
        const roomEnv = new RoomEnvironment();
        const envTexture = pmremGenerator.fromScene(roomEnv).texture;
        scene.environment = envTexture;

        return () => {
            envTexture.dispose();
            pmremGenerator.dispose();
        };
    }, [gl, scene]);

    return null;
}

function RealisticIndustrialSeparator() {
    const groupRef = useRef<THREE.Group>(null);
    const sensorRef1 = useRef<THREE.Mesh>(null);
    const sensorRef2 = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    const isDesktop = viewport.width > 7;
    const posX = 0;
    const posY = isDesktop ? -0.5 : -0.6;
    const scale = isDesktop ? 1.3 : 1.0;

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (sensorRef1.current) {
            const s = 1 + Math.sin(t * 3.5) * 0.22;
            sensorRef1.current.scale.set(s, s, s);
        }
        if (sensorRef2.current) {
            const s = 1 + Math.cos(t * 3.0) * 0.22;
            sensorRef2.current.scale.set(s, s, s);
        }
    });

    return (
        <group ref={groupRef} position={[posX, posY, 0]} scale={scale}>
            {/* 1. Reinforced Concrete Skid Plinth */}
            <mesh position={[0, -0.15, 0]} receiveShadow>
                <boxGeometry args={[4.8, 0.22, 2.6]} />
                <meshStandardMaterial color="#1E202B" roughness={0.92} metalness={0.08} />
            </mesh>

            {/* Steel Skid Beams (I-Beams) */}
            <mesh position={[0, -0.02, 1.1]}>
                <boxGeometry args={[4.7, 0.08, 0.12]} />
                <meshStandardMaterial color="#353846" roughness={0.4} metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.02, -1.1]}>
                <boxGeometry args={[4.7, 0.08, 0.12]} />
                <meshStandardMaterial color="#353846" roughness={0.4} metalness={0.8} />
            </mesh>

            {/* Heavy Skid Corner Lifting Lugs (Pad Eyes) */}
            {[
                [-2.25, 1.1],
                [2.25, 1.1],
                [-2.25, -1.1],
                [2.25, -1.1],
            ].map(([lx, lz], li) => (
                <group key={`lug-${li}`} position={[lx, 0.06, lz]}>
                    <mesh>
                        <boxGeometry args={[0.08, 0.12, 0.04]} />
                        <meshStandardMaterial color="#FEB95A" roughness={0.3} metalness={0.7} />
                    </mesh>
                    <mesh position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.035, 0.012, 8, 16]} />
                        <meshStandardMaterial color="#FEB95A" roughness={0.25} metalness={0.75} />
                    </mesh>
                </group>
            ))}

            {/* 2. Heavy Welded Saddle Supports (Left & Right) */}
            {[-0.85, 0.85].map((sx) => (
                <group key={`saddle-${sx}`} position={[sx, 0.25, 0]}>
                    {/* Saddle Base Plate */}
                    <mesh position={[0, -0.22, 0]}>
                        <boxGeometry args={[0.38, 0.06, 1.4]} />
                        <meshStandardMaterial color="#2B2D3A" roughness={0.5} metalness={0.7} />
                    </mesh>
                    {/* Saddle Web Plate */}
                    <mesh position={[0, 0.05, 0]}>
                        <boxGeometry args={[0.26, 0.5, 1.25]} />
                        <meshStandardMaterial color="#242632" roughness={0.55} metalness={0.65} />
                    </mesh>
                    {/* Saddle Cradle Arc Ring */}
                    <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.67, 0.67, 0.28, 32, 1, false, 0, Math.PI]} />
                        <meshStandardMaterial color="#353846" roughness={0.4} metalness={0.75} />
                    </mesh>
                </group>
            ))}

            {/* 3. Main Horizontal Pressure Vessel Shell */}
            <mesh position={[0, 0.95, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.62, 0.62, 2.7, 48]} />
                <meshStandardMaterial
                    color="#282A38"
                    roughness={0.28}
                    metalness={0.82}
                />
            </mesh>

            {/* ASME Dished Elliptical Heads (Left & Right Ends) */}
            <mesh position={[-1.35, 0.95, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 0.45, 1]} castShadow>
                <sphereGeometry args={[0.62, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#323445" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[1.35, 0.95, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 0.45, 1]} castShadow>
                <sphereGeometry args={[0.62, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#323445" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Circumferential Girth Welds / Stiffener Bands */}
            {[-0.6, 0, 0.6].map((wx) => (
                <mesh key={`weld-${wx}`} position={[wx, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.625, 0.015, 8, 48]} />
                    <meshStandardMaterial color="#4A4E62" roughness={0.35} metalness={0.85} />
                </mesh>
            ))}

            {/* ASME Vessel Code Nameplate */}
            <mesh position={[0, 0.95, 0.625]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.22, 0.14, 0.01]} />
                <meshStandardMaterial color="#C59B27" roughness={0.25} metalness={0.9} />
            </mesh>

            {/* 4. Bolted Front Manway Hatch (Left Head Apex) */}
            <group position={[-1.63, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh position={[0, -0.04, 0]}>
                    <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
                    <meshStandardMaterial color="#3E4254" roughness={0.3} metalness={0.85} />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                    <cylinderGeometry args={[0.26, 0.26, 0.03, 24]} />
                    <meshStandardMaterial color="#A9DFD8" roughness={0.25} metalness={0.9} />
                </mesh>
                <mesh position={[0, 0.04, 0]}>
                    <cylinderGeometry args={[0.23, 0.23, 0.02, 24]} />
                    <meshStandardMaterial color="#2E3040" roughness={0.3} metalness={0.85} />
                </mesh>
                {/* 8 Bolt Studs */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    return (
                        <mesh key={`stud-${i}`} position={[Math.cos(angle) * 0.2, 0.055, Math.sin(angle) * 0.2]}>
                            <cylinderGeometry args={[0.016, 0.016, 0.025, 8]} />
                            <meshStandardMaterial color="#CBD5E1" roughness={0.15} metalness={0.95} />
                        </mesh>
                    );
                })}
            </group>

            {/* 5. Inlet Manifold & Gas Control Valve Assembly */}
            <group position={[-0.75, 0.95, 0]}>
                {/* Top Riser Neck */}
                <mesh position={[0, 0.72, 0.35]}>
                    <cylinderGeometry args={[0.11, 0.11, 0.45, 24]} />
                    <meshStandardMaterial color="#3B3E50" roughness={0.35} metalness={0.8} />
                </mesh>
                {/* Top Weld Flange */}
                <mesh position={[0, 0.96, 0.35]}>
                    <cylinderGeometry args={[0.19, 0.19, 0.05, 24]} />
                    <meshStandardMaterial color="#A9DFD8" roughness={0.25} metalness={0.88} />
                </mesh>
                {/* Valve Body in Safety Amber */}
                <mesh position={[0, 1.15, 0.35]}>
                    <boxGeometry args={[0.28, 0.26, 0.28]} />
                    <meshStandardMaterial color="#FEB95A" roughness={0.3} metalness={0.65} />
                </mesh>
                {/* Valve Bonnet & Stem */}
                <mesh position={[0, 1.34, 0.35]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
                    <meshStandardMaterial color="#4A4E62" roughness={0.2} metalness={0.9} />
                </mesh>
                {/* Valve Handwheel (Spoked Rim) */}
                <group position={[0, 1.44, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh>
                        <torusGeometry args={[0.16, 0.024, 12, 32]} />
                        <meshStandardMaterial color="#FEB95A" roughness={0.25} metalness={0.7} />
                    </mesh>
                    {/* Handwheel 4 Spokes */}
                    {[0, Math.PI / 2].map((rot, ri) => (
                        <mesh key={`spoke-${ri}`} rotation={[0, 0, rot]}>
                            <boxGeometry args={[0.32, 0.02, 0.02]} />
                            <meshStandardMaterial color="#FEB95A" roughness={0.3} metalness={0.7} />
                        </mesh>
                    ))}
                </group>
            </group>

            {/* 6. Top Gas Outlet Demister Nozzle */}
            <group position={[0.75, 0.95, -0.15]}>
                <mesh position={[0, 0.72, 0]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.45, 24]} />
                    <meshStandardMaterial color="#353846" roughness={0.35} metalness={0.8} />
                </mesh>
                <mesh position={[0, 0.96, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
                    <meshStandardMaterial color="#A9DFD8" roughness={0.25} metalness={0.88} />
                </mesh>
                {/* Gas Run Header */}
                <mesh position={[0, 1.25, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.55, 24]} />
                    <meshStandardMaterial color="#353846" roughness={0.35} metalness={0.8} />
                </mesh>
            </group>

            {/* 7. Pressure Safety Relief Valve (PSV) in Safety Red */}
            <group position={[0.1, 1.58, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.07, 0.07, 0.25, 20]} />
                    <meshStandardMaterial color="#3B3E50" roughness={0.3} metalness={0.8} />
                </mesh>
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[0.18, 0.2, 0.18]} />
                    <meshStandardMaterial color="#FB7185" roughness={0.3} metalness={0.75} />
                </mesh>
                {/* Vertical Vent Stack */}
                <mesh position={[0.1, 0.52, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.55, 20]} />
                    <meshStandardMaterial color="#FB7185" roughness={0.35} metalness={0.7} />
                </mesh>
            </group>

            {/* 8. Level Bridle & Glass Tube (Front Telemetry Column) */}
            <group position={[0.25, 0.95, 0.68]}>
                {/* Top Isolation Arm */}
                <mesh position={[0, 0.35, -0.06]}>
                    <boxGeometry args={[0.06, 0.06, 0.14]} />
                    <meshStandardMaterial color="#4A4E62" roughness={0.3} metalness={0.8} />
                </mesh>
                {/* Bottom Isolation Arm */}
                <mesh position={[0, -0.35, -0.06]}>
                    <boxGeometry args={[0.06, 0.06, 0.14]} />
                    <meshStandardMaterial color="#4A4E62" roughness={0.3} metalness={0.8} />
                </mesh>
                {/* Vertical Bridle Column */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.85, 16]} />
                    <meshStandardMaterial color="#E2E8F0" roughness={0.1} metalness={0.15} />
                </mesh>
                {/* Sight Glass Tube (Liquid Column) */}
                <mesh position={[0, -0.05, 0.02]}>
                    <cylinderGeometry args={[0.022, 0.022, 0.55, 16]} />
                    <meshPhysicalMaterial
                        color="#A9DFD8"
                        roughness={0.05}
                        metalness={0.1}
                        transmission={0.85}
                        transparent={true}
                        opacity={0.8}
                    />
                </mesh>
            </group>

            {/* 9. Bottom Water Sump / Boot */}
            <group position={[-0.35, 0.18, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.22, 0.22, 0.45, 24]} />
                    <meshStandardMaterial color="#2B2D3A" roughness={0.35} metalness={0.75} />
                </mesh>
                {/* Bottom Drain Flange & Pipe */}
                <mesh position={[0, -0.25, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                    <meshStandardMaterial color="#4A4E62" roughness={0.3} metalness={0.8} />
                </mesh>
                <mesh position={[0, -0.34, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
                    <meshStandardMaterial color="#A9DFD8" roughness={0.25} metalness={0.88} />
                </mesh>
            </group>

            {/* 10. Digital SCADA Sensor Transmitter (With glowing beacon) */}
            <group position={[-0.75, 2.52, 0.35]}>
                {/* Digital Head Enclosure */}
                <mesh>
                    <cylinderGeometry args={[0.11, 0.11, 0.18, 20]} />
                    <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.6} />
                </mesh>
                {/* Circular Glass Display Face */}
                <mesh position={[0, 0, 0.095]} rotation={[Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.085, 20]} />
                    <meshBasicMaterial color="#0F172A" />
                </mesh>
                {/* Pulsing Optical Methane Sensor LED */}
                <mesh ref={sensorRef1} position={[0, 0.15, 0]}>
                    <octahedronGeometry args={[0.09, 0]} />
                    <meshStandardMaterial
                        color="#4ADE80"
                        emissive="#4ADE80"
                        emissiveIntensity={1.2}
                    />
                </mesh>
            </group>

            {/* Sensor Beacon 2: High Pressure Transducer */}
            <group position={[0.75, 2.55, -0.15]}>
                <mesh ref={sensorRef2}>
                    <octahedronGeometry args={[0.085, 0]} />
                    <meshStandardMaterial
                        color="#20AEF3"
                        emissive="#20AEF3"
                        emissiveIntensity={1.2}
                    />
                </mesh>
            </group>
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
                <div className="text-xs font-code text-[#8C8D99]">Memuat pemodelan 3D digital twin...</div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <Canvas
                camera={{ position: [3.6, 2.2, 4.0], fov: 38 }}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.25,
                }}
                dpr={[1, 1.5]}
                shadows
            >
                {/* Procedural physical studio environment lighting */}
                <StudioLighting />

                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[6, 9, 6]}
                    intensity={1.8}
                    color="#FFFFFF"
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <directionalLight position={[-6, 4, -5]} intensity={0.7} color="#A9DFD8" />
                <pointLight position={[-0.75, 2.5, 0.4]} intensity={1.6} color="#4ADE80" distance={3.5} />
                <pointLight position={[0.75, 2.5, -0.2]} intensity={1.4} color="#20AEF3" distance={3.5} />

                {/* Gentle floating physics */}
                <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.05}>
                    <RealisticIndustrialSeparator />
                </Float>

                {/* Technical Ground Grid & Soft Ground Shadow */}
                <Grid
                    position={[0, -0.66, 0]}
                    args={[16, 16]}
                    cellSize={0.4}
                    cellThickness={0.8}
                    cellColor="#252733"
                    sectionSize={2.0}
                    sectionThickness={1.2}
                    sectionColor="#353846"
                    fadeDistance={9}
                    fadeStrength={1.2}
                />
                <ContactShadows
                    position={[0, -0.65, 0]}
                    opacity={0.65}
                    scale={10}
                    blur={2.2}
                    far={3.5}
                    color="#08090C"
                />

                {/* Smooth 360-degree Orbit Control */}
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={2.4}
                    maxDistance={8.5}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.05}
                    autoRotate={true}
                    autoRotateSpeed={0.7}
                />
            </Canvas>
        </div>
    );
}