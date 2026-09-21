import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import type { BinInfo } from '../data/bins'

type BinProps = {
  info: BinInfo
  position: [number, number, number]
  selected: boolean
  onSelect: () => void
}

export function Bin({ info, position, selected, onSelect }: BinProps) {
  const group = useRef<THREE.Group>(null)
  const lidPivot = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const lidAngle = useRef(0)

  const isWhite = info.id === 'white'
  const bodyColor = info.hex
  const trimColor = isWhite ? '#8ea0b5' : info.accent

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: bodyColor,
        roughness: isWhite ? 0.28 : 0.38,
        metalness: isWhite ? 0.12 : 0.08,
      }),
    [bodyColor, isWhite],
  )

  const trimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: trimColor,
        roughness: 0.35,
        metalness: 0.25,
      }),
    [trimColor],
  )

  useFrame((_, delta) => {
    const target = selected ? -1.15 : hovered ? -0.18 : 0
    lidAngle.current = THREE.MathUtils.damp(lidAngle.current, target, 8, delta)
    if (lidPivot.current) lidPivot.current.rotation.x = lidAngle.current

    if (group.current) {
      const lift = selected ? 0.08 : hovered ? 0.04 : 0
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        lift,
        8,
        delta,
      )
    }
  })

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <group ref={group}>
        <mesh position={[0, 0.72, 0]} material={bodyMat} castShadow receiveShadow>
          <cylinderGeometry args={[0.52, 0.42, 1.28, 32]} />
        </mesh>
        <mesh position={[0, 1.34, 0]} material={trimMat} castShadow>
          <torusGeometry args={[0.53, 0.045, 12, 40]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} material={trimMat}>
          <cylinderGeometry args={[0.46, 0.46, 0.08, 28]} />
        </mesh>
        <mesh position={[-0.58, 0.92, 0]} material={trimMat} castShadow>
          <torusGeometry args={[0.11, 0.028, 8, 16, Math.PI]} />
        </mesh>
        <mesh position={[0.58, 0.92, 0]} rotation={[0, Math.PI, 0]} material={trimMat} castShadow>
          <torusGeometry args={[0.11, 0.028, 8, 16, Math.PI]} />
        </mesh>

        <group ref={lidPivot} position={[0, 1.38, -0.42]}>
          <group position={[0, 0, 0.42]}>
            <mesh material={bodyMat} castShadow>
              <cylinderGeometry args={[0.55, 0.55, 0.08, 32]} />
            </mesh>
            <mesh position={[0, 0.08, 0]} material={trimMat} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.06, 20]} />
            </mesh>
          </group>
        </group>

        <mesh position={[0, 0.78, 0.43]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.42, 0.28, 0.02]} />
          <meshStandardMaterial color="#111" roughness={0.6} />
        </mesh>
        <Text
          position={[0, 0.78, 0.45]}
          fontSize={0.09}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.38}
        >
          {info.colorName.toUpperCase()}
        </Text>
      </group>
    </group>
  )
}
