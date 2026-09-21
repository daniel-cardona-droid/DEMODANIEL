import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { bins } from '../data/bins'
import type { BinId } from '../data/bins'
import { Bin } from './Bin'

type RecyclingSceneProps = {
  selectedId: BinId | null
  onSelect: (id: BinId) => void
}

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[7.5, 64]} />
        <meshStandardMaterial color="#c8d7c4" roughness={0.92} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[2.15, 2.35, 64]} />
        <meshStandardMaterial color="#9bb89a" roughness={0.8} />
      </mesh>
    </>
  )
}

function SceneContent({ selectedId, onSelect }: RecyclingSceneProps) {
  const positions: Record<BinId, [number, number, number]> = {
    green: [-1.7, 0, 0.15],
    white: [0, 0, 0.35],
    black: [1.7, 0, 0.15],
  }

  return (
    <>
      <color attach="background" args={['#d7e6d8']} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#fff6e5', '#6d8a6e', 1]} />
      <directionalLight
        position={[4.5, 7, 3.5]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#9ec4ff" />

      <Ground />
      {bins.map((bin) => (
        <Bin
          key={bin.id}
          info={bin}
          position={positions[bin.id]}
          selected={selectedId === bin.id}
          onSelect={() => onSelect(bin.id)}
        />
      ))}

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.42}
        scale={10}
        blur={2.2}
        far={4}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minAzimuthAngle={-0.5}
        maxAzimuthAngle={0.5}
        minPolarAngle={0.95}
        maxPolarAngle={1.28}
        target={[0, 0.7, 0]}
      />
    </>
  )
}

export function RecyclingScene({ selectedId, onSelect }: RecyclingSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0.15, 2.15, 6.2], fov: 40 }}
    >
      <SceneContent selectedId={selectedId} onSelect={onSelect} />
    </Canvas>
  )
}
