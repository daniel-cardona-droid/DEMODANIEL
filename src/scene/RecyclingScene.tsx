import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { bins } from '../data/bins'
import type { BinId } from '../data/bins'
import { Bin } from './Bin'

type RecyclingSceneProps = {
  selectedId: BinId | null
  onSelect: (id: BinId) => void
}

function SceneContent({ selectedId, onSelect }: RecyclingSceneProps) {
  const positions: Record<BinId, [number, number, number]> = {
    green: [-1.7, 0, 0.15],
    white: [0, 0, 0.35],
    black: [1.7, 0, 0.15],
  }

  return (
    <>
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

      {bins.map((bin) => (
        <Float key={bin.id} speed={1.5} rotationIntensity={0.08} floatIntensity={0.12}>
          <Bin
            info={bin}
            position={positions[bin.id]}
            selected={selectedId === bin.id}
            onSelect={() => onSelect(bin.id)}
          />
        </Float>
      ))}

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
      gl={{ alpha: true }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0.15, 2.15, 6.2], fov: 40 }}
    >
      <SceneContent selectedId={selectedId} onSelect={onSelect} />
    </Canvas>
  )
}
