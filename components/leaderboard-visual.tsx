'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Torus } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function OrbitingRelic() {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.08
  })
  return <group ref={group}>
    <Float speed={1.3} rotationIntensity={0.22} floatIntensity={0.35}>
      <Torus args={[1.45, 0.025, 16, 96]} rotation={[Math.PI / 2.7, 0, 0]}><meshStandardMaterial color="#e7d279" emissive="#6e2b1f" emissiveIntensity={1.1} metalness={0.8} roughness={0.3} /></Torus>
      <Torus args={[.95, 0.018, 12, 64]} rotation={[Math.PI / 2.7, 0.4, 0.2]}><meshStandardMaterial color="#ef493a" emissive="#ef493a" emissiveIntensity={1.2} /></Torus>
      <mesh rotation={[0.3, 0.3, 0]}><octahedronGeometry args={[.33, 0]} /><meshStandardMaterial color="#f5f0e8" emissive="#ef493a" emissiveIntensity={0.5} metalness={0.65} roughness={0.2} wireframe /></mesh>
    </Float>
  </group>
}

export function LeaderboardVisual() {
  return <div className="leaderboard-visual" aria-hidden="true"><Canvas camera={{ position: [0, 0, 4.6], fov: 35 }} dpr={[1, 1.5]}><ambientLight intensity={0.25} /><pointLight position={[2, 2, 3]} color="#ef493a" intensity={7} /><pointLight position={[-2, -1, 2]} color="#e7d279" intensity={5} /><OrbitingRelic /><Sparkles count={70} scale={5.5} size={1.8} speed={0.3} color="#f5f0e8" /></Canvas><div className="visual-vertical-label">勝 · RANK WITH HONOR</div></div>
}
