import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Organelle, OrganelleId } from '../data/cells'
import { useStudio } from '../context/StudioContext'

function OrganelleMesh({
  organelle,
  isSelected,
  isDimmed,
  onSelect,
  showLabel,
}: {
  organelle: Organelle
  isSelected: boolean
  isDimmed: boolean
  onSelect: () => void
  showLabel: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { position, scale, shape, color, name } = organelle

  const meshScale: [number, number, number] =
    shape === 'ellipsoid'
      ? [scale * 1.2, scale * 0.75, scale]
      : [scale, scale, scale]

  useFrame((state) => {
    if (!meshRef.current) return
    const [sx, sy, sz] = meshScale
    if (isSelected) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2.5) * 0.04
      meshRef.current.scale.set(sx * pulse, sy * pulse, sz * pulse)
    } else {
      meshRef.current.scale.set(sx, sy, sz)
    }
  })

  const opacity = isDimmed ? 0.12 : isSelected ? 0.92 : 0.72
  const emissiveIntensity = isSelected ? 0.35 : 0.05

  const isMembraneLike =
    organelle.id === 'plasma-membrane' ||
    organelle.id === 'cell-wall' ||
    organelle.id === 'capsule' ||
    organelle.id === 'cytoskeleton'

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={meshScale}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        {shape === 'capsule' && <capsuleGeometry args={[0.35, 0.9, 8, 16]} />}
        {shape === 'torus' && <torusGeometry args={[0.55, 0.18, 12, 32]} />}
        {shape === 'box' && <boxGeometry args={[0.9, 0.5, 0.7]} />}
        {(shape === 'sphere' || shape === 'ellipsoid') && (
          <sphereGeometry args={[0.55, 32, 32]} />
        )}
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={isMembraneLike ? opacity * 0.35 : opacity}
          roughness={0.35}
          metalness={0.05}
          transmission={isMembraneLike ? 0.55 : 0.15}
          thickness={0.6}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          side={isMembraneLike ? THREE.DoubleSide : THREE.FrontSide}
          depthWrite={!isMembraneLike}
        />
      </mesh>

      {/* Selection ring */}
      {isSelected && !isDimmed && (
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={scale * 1.35}>
          <ringGeometry args={[0.7, 0.78, 48]} />
          <meshBasicMaterial
            color="#c9a84c"
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {showLabel && isSelected && !isDimmed && (
        <Html
          position={[0, scale * 0.75 + 0.35, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none' }}
        >
          <div className="whitespace-nowrap rounded-full border border-honey/60 bg-honey/95 px-2.5 py-1 font-sans text-[11px] font-medium text-ink shadow-md backdrop-blur-sm">
            {name}
          </div>
        </Html>
      )}
    </group>
  )
}

/** Decorative free-floating ribosomes / vesicles */
function AccentParticles({ accent }: { accent: string }) {
  const points = useMemo(() => {
    const arr: [number, number, number][] = []
    for (let i = 0; i < 18; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.1 + Math.random() * 0.7
      arr.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ])
    }
    return arr
  }, [])

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p} scale={0.04 + (i % 3) * 0.015}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={accent}
            transparent
            opacity={0.45}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

export function CellModel() {
  const {
    cell,
    organelles,
    selectedOrganelle,
    setSelectedOrganelle,
    viewMode,
    isolateMode,
    hideOthers,
    showLabel,
  } = useStudio()

  const groupRef = useRef<THREE.Group>(null)

  // Gentle ambient bob for the whole cell
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.4) * 0.04
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef}>
        {/* Ambient soft shell representing cytoplasm */}
        <mesh scale={2.05}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color={cell.membraneColor}
            transparent
            opacity={viewMode === 'cross-section' ? 0.12 : 0.18}
            roughness={0.5}
            transmission={0.7}
            thickness={1.2}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Cross-section cut plane indicator */}
        {viewMode === 'cross-section' && (
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.05, 0, 0]}>
            <circleGeometry args={[2.05, 64]} />
            <meshBasicMaterial
              color="#f5e6b8"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        <AccentParticles accent={cell.accent} />

        {organelles.map((org) => {
          const isSelected = selectedOrganelle === org.id
          const isDimmed = Boolean(
            (isolateMode || hideOthers) &&
              selectedOrganelle &&
              !isSelected,
          )

          // Cross-section: hide outer shells so interior is visible
          if (
            viewMode === 'cross-section' &&
            (org.id === 'plasma-membrane' ||
              org.id === 'cell-wall' ||
              org.id === 'capsule')
          ) {
            return null
          }

          return (
            <OrganelleMesh
              key={org.id}
              organelle={org}
              isSelected={isSelected}
              isDimmed={isDimmed}
              showLabel={showLabel}
              onSelect={() =>
                setSelectedOrganelle(org.id as OrganelleId)
              }
            />
          )
        })}

        {/* Soft ground glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
          <circleGeometry args={[2.4, 48]} />
          <meshBasicMaterial
            color={cell.accent}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  )
}
