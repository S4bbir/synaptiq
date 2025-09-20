'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Component to detect screen size and adjust dots accordingly
function ResponsiveDots() {
  const { size } = useThree()
  const isMobile = size.width < 768
  
  return (
    <>
      <MovingDots isMobile={isMobile} />
      <FloatingParticles isMobile={isMobile} />
    </>
  )
}

function MovingDots({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null)
  
  // Generate random positions for dots
  const positions = useMemo(() => {
    // Increase number of dots for better visibility
    const count = isMobile ? 1200 : 3000
    const positions = new Float32Array(count * 3)
    
    // Adjust spread based on device
    const spread = isMobile ? 30 : 40
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread
      const y = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    
    return positions
  }, [isMobile])

  // Animate the dots
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.07) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#374151"
        // Increase size for better visibility
        size={isMobile ? 0.09 : 0.07}
        sizeAttenuation={true}
        depthWrite={false}
        // Increase opacity for better visibility
        opacity={isMobile ? 1.0 : 0.95}
      />
    </Points>
  )
}

function FloatingParticles({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    // Increase number of particles for better visibility
    const count = isMobile ? 800 : 2000
    const positions = new Float32Array(count * 3)
    
    // Adjust spread based on device
    const spread = isMobile ? 40 : 60
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread
      const y = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    
    return positions
  }, [isMobile])

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.0005
        positions[i] += Math.cos(state.clock.elapsedTime + positions[i + 1]) * 0.0003
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4b5563"
        // Increase size for better visibility
        size={isMobile ? 0.06 : 0.04}
        sizeAttenuation={true}
        depthWrite={false}
        // Increase opacity for better visibility
        opacity={isMobile ? 0.9 : 0.8}
      />
    </Points>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ResponsiveDots />
      </Canvas>
    </div>
  )
}