import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.4, 100, 200]} scale={1}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0.1}
          metalness={0.8}
          emissive="#3730a3"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField() {
  const count = 800
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  const particlesRef = useRef()
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.04} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function RingOrbit() {
  const ringRef = useRef()
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2.5
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} transparent opacity={0.6} />
    </mesh>
  )
}

function RingOrbit2() {
  const ringRef = useRef()
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3.5
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.2
    }
  })
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.8, 0.015, 16, 100]} />
      <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} transparent opacity={0.4} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#6366f1" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[10, -5, -10]} intensity={0.3} color="#8b5cf6" />
        <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
        <ParticleField />
        <AnimatedSphere />
        <RingOrbit />
        <RingOrbit2 />
      </Canvas>
    </div>
  )
}
