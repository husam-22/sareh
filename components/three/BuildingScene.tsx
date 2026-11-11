"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type SceneProps = { progress: MutableRefObject<number>; reduced: boolean; visible: boolean; onReady: () => void };

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const phase = (p: number, start: number, end: number) => clamp((p - start) / (end - start));

function StoneBox({ position, scale, material }: { position: [number, number, number]; scale: [number, number, number]; material: THREE.Material }) {
  return <mesh position={position} scale={scale} material={material} castShadow receiveShadow><boxGeometry /></mesh>;
}

function Building({ progress, reduced }: { progress: MutableRefObject<number>; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const structure = useRef<THREE.Group>(null);
  const slabs = useRef<THREE.Group>(null);
  const envelope = useRef<THREE.Group>(null);
  const glazing = useRef<THREE.Group>(null);
  const landscape = useRef<THREE.Group>(null);
  const grid = useRef<THREE.GridHelper>(null);
  const stone = new THREE.MeshStandardMaterial({ color: "#cbbb9f", roughness: 0.86 });
  const concrete = new THREE.MeshStandardMaterial({ color: "#d4c9b7", roughness: 0.9 });
  const bronze = new THREE.MeshStandardMaterial({ color: "#65533a", roughness: 0.48, metalness: 0.45 });
  const glass = new THREE.MeshPhysicalMaterial({ color: "#34433e", roughness: 0.22, metalness: 0.15, transparent: true, opacity: 0.75 });

  useFrame(({ camera, invalidate }) => {
    const p = reduced ? 1 : progress.current;
    const smooth = (group: THREE.Group | null, value: number, vertical = false) => {
      if (!group) return;
      const target = Math.max(0.001, value);
      group.visible = value > 0.002;
      group.scale.y = THREE.MathUtils.lerp(group.scale.y, vertical ? target : 1, 0.1);
      const xz = THREE.MathUtils.lerp(group.scale.x, vertical ? 1 : target, 0.1);
      group.scale.x = group.scale.z = xz;
    };
    smooth(structure.current, phase(p, 0.37, 0.58), true);
    smooth(slabs.current, phase(p, 0.47, 0.68), true);
    smooth(envelope.current, phase(p, 0.64, 0.87), false);
    smooth(glazing.current, phase(p, 0.7, 0.9), true);
    smooth(landscape.current, phase(p, 0.85, 0.98), true);
    if (grid.current) {
      const mat = grid.current.material as THREE.Material & { opacity: number };
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.25 * (1 - phase(p, 0.65, 0.95)), 0.08);
    }
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, -0.25 + p * 0.28, 0.06);
      root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, -0.4 + p * 0.15, 0.08);
    }
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 8.6 - p * 1.0, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 6.2 + p * 0.5, 0.045);
    camera.lookAt(-0.9, 1.2, 0);
    invalidate();
  });

  const columns = [-2.1, 0, 2.1].flatMap((x) => [-1.5, 1.5].map((z) => ({ x, z })));
  return (
    <group ref={root} position={[-1.8, -0.4, 0]}>
      <mesh position={[0, -0.18, 0]} receiveShadow><boxGeometry args={[7.8, 0.28, 5.8]} /><meshStandardMaterial color="#e6dfd2" roughness={0.95} /></mesh>
      <gridHelper ref={grid} args={[11, 22, "#aa9369", "#cfc6b7"]} position={[0, 0.015, 0]} />
      <group ref={structure}>
        {columns.map(({ x, z }, index) => <StoneBox key={index} position={[x, 1.65, z]} scale={[0.2, 3.3, 0.2]} material={concrete} />)}
      </group>
      <group ref={slabs}>
        <StoneBox position={[0, 0.15, 0]} scale={[4.65, 0.18, 3.5]} material={concrete} />
        <StoneBox position={[-0.5, 1.85, 0]} scale={[3.65, 0.18, 3.5]} material={concrete} />
        <StoneBox position={[-0.5, 3.4, 0]} scale={[3.65, 0.2, 3.5]} material={concrete} />
        <StoneBox position={[1.75, 1.85, 0]} scale={[0.9, 0.18, 3.5]} material={concrete} />
      </group>
      <group ref={envelope}>
        <StoneBox position={[-1.1, 3.48, 0]} scale={[3.9, 0.25, 3.8]} material={stone} />
        <StoneBox position={[-2.4, 2.6, 0]} scale={[0.28, 1.65, 3.55]} material={stone} />
        <StoneBox position={[-1.25, 2.62, -1.7]} scale={[2.6, 1.65, 0.25]} material={stone} />
        <StoneBox position={[0.1, 2.62, 0]} scale={[0.3, 1.65, 3.5]} material={stone} />
        <StoneBox position={[-1.2, 0.97, -1.7]} scale={[2.6, 1.5, 0.25]} material={stone} />
        <StoneBox position={[2.15, 0.97, 0]} scale={[0.28, 1.5, 3.5]} material={stone} />
        <StoneBox position={[1.1, 1.78, 0]} scale={[2.35, 0.25, 3.7]} material={stone} />
        <StoneBox position={[1.15, 0.97, -1.7]} scale={[2.25, 1.5, 0.25]} material={stone} />
        <StoneBox position={[-1.25, 3.0, 1.72]} scale={[2.6, 0.36, 0.18]} material={stone} />
        <StoneBox position={[-2.4, 0.96, 0]} scale={[0.28, 1.5, 3.5]} material={stone} />
      </group>
      <group ref={glazing}>
        <StoneBox position={[-1.15, 2.55, 1.69]} scale={[1.9, 1.35, 0.06]} material={glass} />
        <StoneBox position={[1.08, 0.94, 1.69]} scale={[1.75, 1.4, 0.06]} material={glass} />
        <StoneBox position={[2.13, 0.94, 0.1]} scale={[0.06, 1.4, 2.6]} material={glass} />
        {[-2.08, -1.15, -0.22].map((x) => <StoneBox key={x} position={[x, 2.55, 1.75]} scale={[0.045, 1.45, 0.07]} material={bronze} />)}
        {[0.25, 1.1, 1.95].map((x) => <StoneBox key={x} position={[x, 0.95, 1.75]} scale={[0.045, 1.5, 0.07]} material={bronze} />)}
        <StoneBox position={[-0.25, 0.95, 1.73]} scale={[0.7, 1.45, 0.1]} material={bronze} />
      </group>
      <group ref={landscape}>
        <mesh position={[-3.15, 0.15, 1.35]}><boxGeometry args={[1.2, 0.45, 1.4]} /><meshStandardMaterial color="#c7b89d" /></mesh>
        <mesh position={[-3.15, 0.95, 1.35]} castShadow><cylinderGeometry args={[0.09, 0.14, 1.4, 7]} /><meshStandardMaterial color="#655341" /></mesh>
        <mesh position={[-3.15, 1.8, 1.35]} castShadow><dodecahedronGeometry args={[0.75, 0]} /><meshStandardMaterial color="#68705a" roughness={1} /></mesh>
        <mesh position={[3.15, 0.2, -1.55]}><boxGeometry args={[0.85, 0.45, 0.85]} /><meshStandardMaterial color="#c7b89d" /></mesh>
        <mesh position={[3.15, 0.75, -1.55]}><icosahedronGeometry args={[0.48, 0]} /><meshStandardMaterial color="#737760" /></mesh>
      </group>
    </group>
  );
}

export default function BuildingScene({ progress, reduced, visible, onReady }: SceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "100px" });
    const onVisibility = () => setPageVisible(!document.hidden);
    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);
  return (
    <div className={`building-canvas ${visible ? "is-active" : ""}`} ref={host} aria-hidden="true">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [8.6, 6.2, 10], fov: 35 }} frameloop={active && pageVisible ? "always" : "never"} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.setClearColor("#f4f0e8", 0); onReady(); }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[4, 9, 7]} intensity={3.2} color="#fff4df" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-6, 4, -5]} intensity={0.8} color="#e7dfce" />
        <Building progress={progress} reduced={reduced} />
        <ContactShadows position={[-1.8, -0.35, 0]} opacity={0.28} scale={14} blur={2.8} far={7} color="#625847" />
      </Canvas>
    </div>
  );
}
