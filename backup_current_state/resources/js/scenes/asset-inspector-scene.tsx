import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { SegmentInfo, SEGMENTS } from './asset-inspector-data';
export type { SegmentInfo };
export { SEGMENTS };

interface AssetInspectorProps {
    activeSegmentId: string;
    onSelectSegment: (segment: SegmentInfo) => void;
}

function ModelInspector({ activeSegmentId, onSelectSegment }: AssetInspectorProps) {
    const isSelected = (id: string) => activeSegmentId === id;

    return (
        <group position={[0, -0.2, 0]}>
            {/* Segment 1: Inlet Flange */}
            <mesh
                position={[-1.6, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectSegment(SEGMENTS[0]);
                }}
            >
                <cylinderGeometry args={[0.45, 0.45, 0.18, 20]} />
                <meshStandardMaterial
                    color={isSelected('seg-inlet-flange') ? '#A9DFD8' : '#FB7185'}
                    roughness={0.4}
                    metalness={0.7}
                    emissive={isSelected('seg-inlet-flange') ? '#A9DFD8' : '#000000'}
                    emissiveIntensity={isSelected('seg-inlet-flange') ? 0.5 : 0}
                />
            </mesh>

            {/* Inlet Neck Pipe */}
            <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.26, 0.26, 0.65, 20]} />
                <meshStandardMaterial color="#363847" roughness={0.5} metalness={0.5} />
            </mesh>

            {/* Segment 2: Vessel Shell Zone A */}
            <mesh
                position={[0, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectSegment(SEGMENTS[1]);
                }}
            >
                <cylinderGeometry args={[0.65, 0.65, 1.6, 24]} />
                <meshStandardMaterial
                    color={isSelected('seg-vessel-shell') ? '#A9DFD8' : '#2B2B36'}
                    roughness={0.4}
                    metalness={0.6}
                    emissive={isSelected('seg-vessel-shell') ? '#A9DFD8' : '#000000'}
                    emissiveIntensity={isSelected('seg-vessel-shell') ? 0.4 : 0}
                />
            </mesh>

            {/* Segment 3: Emergency Relief Valve */}
            <mesh
                position={[0, 0.95, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectSegment(SEGMENTS[2]);
                }}
            >
                <boxGeometry args={[0.34, 0.34, 0.34]} />
                <meshStandardMaterial
                    color={isSelected('seg-control-valve') ? '#A9DFD8' : '#FEB95A'}
                    roughness={0.3}
                    metalness={0.6}
                    emissive={isSelected('seg-control-valve') ? '#A9DFD8' : '#000000'}
                    emissiveIntensity={isSelected('seg-control-valve') ? 0.6 : 0}
                />
            </mesh>
            {/* Valve Handwheel */}
            <mesh position={[0, 1.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.16, 0.03, 8, 20]} />
                <meshStandardMaterial color="#FEB95A" roughness={0.3} metalness={0.5} />
            </mesh>

            {/* Segment 4: Outlet Nozzle */}
            <mesh
                position={[1.2, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectSegment(SEGMENTS[3]);
                }}
            >
                <cylinderGeometry args={[0.26, 0.26, 0.65, 20]} />
                <meshStandardMaterial
                    color={isSelected('seg-outlet-pipe') ? '#A9DFD8' : '#4ADE80'}
                    roughness={0.4}
                    metalness={0.7}
                    emissive={isSelected('seg-outlet-pipe') ? '#A9DFD8' : '#000000'}
                    emissiveIntensity={isSelected('seg-outlet-pipe') ? 0.4 : 0}
                />
            </mesh>

            {/* Base Saddles */}
            <mesh position={[-0.5, -0.85, 0]}>
                <boxGeometry args={[0.3, 0.5, 1.1]} />
                <meshStandardMaterial color="#171821" roughness={0.9} />
            </mesh>
            <mesh position={[0.5, -0.85, 0]}>
                <boxGeometry args={[0.3, 0.5, 1.1]} />
                <meshStandardMaterial color="#171821" roughness={0.9} />
            </mesh>
        </group>
    );
}

export default function AssetInspectorScene({ activeSegmentId, onSelectSegment }: AssetInspectorProps) {
    const controlsRef = useRef<any>(null);

    const handleResetCamera = () => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    return (
        <div className="relative w-full h-[360px] rounded-xl border border-[#2B2B36] bg-[#171821] overflow-hidden">
            {/* Controls Overlay */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="rounded bg-[#21222D]/90 border border-[#2B2B36] px-2.5 py-1 text-[11px] font-medium text-[#C5C7D0]">
                    Inspeksi 3D Komponen Aset
                </span>
                <button
                    type="button"
                    onClick={handleResetCamera}
                    className="rounded bg-[#21222D] border border-[#2B2B36] px-2 py-1 text-[10px] text-[#8C8D99] hover:text-[#FFFFFF] transition"
                >
                    Reset Kamera
                </button>
            </div>

            <div className="absolute top-3 right-3 z-10 text-[10px] text-[#8C8D99] bg-[#21222D]/80 border border-[#2B2B36]/60 px-2 py-1 rounded">
                Klik segmen 3D untuk memilih
            </div>

            <Canvas
                camera={{ position: [0, 1.2, 3.6], fov: 45 }}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 6, 4]} intensity={1.4} color="#FFFFFF" />
                <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#20AEF3" />

                <ModelInspector activeSegmentId={activeSegmentId} onSelectSegment={onSelectSegment} />

                <OrbitControls
                    ref={controlsRef}
                    enablePan={true}
                    enableZoom={true}
                    minDistance={2.0}
                    maxDistance={6.0}
                />
            </Canvas>
        </div>
    );
}