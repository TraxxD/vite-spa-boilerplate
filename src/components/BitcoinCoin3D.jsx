import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Create the Bitcoin "B" logo as a canvas texture
function createBitcoinTexture(isFront) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Gold base
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
  gradient.addColorStop(0, '#f9a94b')
  gradient.addColorStop(0.5, '#F7931A')
  gradient.addColorStop(1, '#c4750f')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2)
  ctx.fill()

  // Outer rim
  ctx.strokeStyle = 'rgba(160, 90, 0, 0.5)'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/2 - 12, 0, Math.PI * 2)
  ctx.stroke()

  // Inner ring
  ctx.strokeStyle = 'rgba(100, 60, 0, 0.3)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/2 - 40, 0, Math.PI * 2)
  ctx.stroke()

  // Highlight arc (top-left)
  ctx.strokeStyle = 'rgba(255, 220, 150, 0.25)'
  ctx.lineWidth = 12
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/2 - 25, -Math.PI * 0.8, -Math.PI * 0.2)
  ctx.stroke()

  // Bitcoin symbol
  ctx.save()
  ctx.translate(size/2, size/2)
  ctx.fillStyle = 'rgba(10, 8, 0, 0.85)'
  ctx.font = 'bold 240px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('\u20BF', 0, 10)

  // Slight emboss effect
  ctx.fillStyle = 'rgba(255, 200, 100, 0.12)'
  ctx.fillText('\u20BF', -2, 8)
  ctx.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

// Create edge (ridged) texture
function createEdgeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 64
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 0, 64)
  gradient.addColorStop(0, '#d4880e')
  gradient.addColorStop(0.2, '#c4750f')
  gradient.addColorStop(0.5, '#8a5000')
  gradient.addColorStop(0.8, '#c4750f')
  gradient.addColorStop(1, '#d4880e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 64)

  // Ridges
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.lineWidth = 1
  for (let i = 0; i < 512; i += 4) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 64)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(8, 1)
  return texture
}

function Coin({ dragging, dragRotation }) {
  const groupRef = useRef()
  const autoRotation = useRef(0)

  const frontTexture = useMemo(() => createBitcoinTexture(true), [])
  const backTexture = useMemo(() => createBitcoinTexture(false), [])
  const edgeTexture = useMemo(() => createEdgeTexture(), [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (dragging.current) {
      // When dragging, apply drag rotation directly
      groupRef.current.rotation.x = dragRotation.current.x
      groupRef.current.rotation.y = dragRotation.current.y
    } else {
      // Auto-rotate: smoothly blend back and continue spinning
      autoRotation.current += delta * 0.8

      // Ease drag rotation back toward 0 on X axis
      dragRotation.current.x *= 0.95
      // Sync Y auto-rotation from current drag position
      dragRotation.current.y += delta * 0.8

      groupRef.current.rotation.x = dragRotation.current.x
      groupRef.current.rotation.y = dragRotation.current.y
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef}>
        {/* Front face - circleGeometry faces +Z by default */}
        <mesh position={[0, 0, 0.08]}>
          <circleGeometry args={[2.2, 64]} />
          <meshStandardMaterial
            map={frontTexture}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Back face - rotated 180° around Y to face -Z */}
        <mesh position={[0, 0, -0.08]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[2.2, 64]} />
          <meshStandardMaterial
            map={backTexture}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Edge (cylinder body) - rotated 90° around X so it runs along Z */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.16, 128, 1, true]} />
          <meshStandardMaterial
            map={edgeTexture}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

function GlowRing() {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <ringGeometry args={[2.5, 3.5, 64]} />
      <meshBasicMaterial color="#F7931A" transparent opacity={0.12} />
    </mesh>
  )
}

function Scene({ dragging, dragRotation }) {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new THREE.Color('#111328')
  }, [scene])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 8]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, -2, 4]} intensity={0.6} color="#F7931A" />
      <pointLight position={[0, 4, 4]} intensity={1.0} color="#ffd699" distance={15} />
      <pointLight position={[-3, -3, 2]} intensity={0.4} color="#F7931A" distance={12} />
      <pointLight position={[3, -2, -3]} intensity={0.3} color="#ffcc80" distance={10} />
      <GlowRing />
      <Coin dragging={dragging} dragRotation={dragRotation} />
    </>
  )
}

export default function BitcoinCoin3D() {
  const dragging = useRef(false)
  const dragRotation = useRef({ x: 0, y: 0 })
  const lastMouse = useRef({ x: 0, y: 0 })
  const containerRef = useRef()

  const handlePointerDown = (e) => {
    dragging.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    dragRotation.current.y += dx * 0.01
    dragRotation.current.x += dy * 0.01
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = () => {
    dragging.current = false
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        cursor: 'grab',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ antialias: true }}
      >
        <Scene dragging={dragging} dragRotation={dragRotation} />
      </Canvas>
    </div>
  )
}
