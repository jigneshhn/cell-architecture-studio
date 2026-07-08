import { Suspense, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from '@react-three/drei'
import {
  RotateCcw,
  Focus,
  EyeOff,
  RefreshCw,
  Camera,
  Download,
  Lightbulb,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { CellModel } from './CellModel'
import { useStudio } from '../context/StudioContext'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

function SceneFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#c5d9c2" wireframe />
    </mesh>
  )
}

export function ThreeViewport() {
  const {
    cell,
    viewMode,
    toggleViewMode,
    autoRotate,
    toggleAutoRotate,
    isolateMode,
    toggleIsolateMode,
    hideOthers,
    toggleHideOthers,
    resetView,
  } = useStudio()

  const controlsRef = useRef<OrbitControlsImpl>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  const handleResetView = useCallback(() => {
    resetView()
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }, [resetView])

  const handleScreenshot = useCallback(() => {
    const canvas = canvasWrapRef.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `${cell.id}-cell-architecture.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }, [cell.id])

  const handleExport = useCallback(() => {
    // Placeholder for future .glb export — user will supply models
    const blob = new Blob(
      [
        JSON.stringify(
          {
            cell: cell.id,
            name: cell.name,
            note: 'Replace placeholder geometry with your Tripo3D .glb models.',
            exportedAt: new Date().toISOString(),
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    )
    const link = document.createElement('a')
    link.download = `${cell.id}-export-manifest.json`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }, [cell])

  const toolbarItems = [
    {
      id: 'rotate',
      label: 'Auto-spin',
      icon: RefreshCw,
      active: autoRotate,
      onClick: toggleAutoRotate,
    },
    {
      id: 'isolate',
      label: 'Isolate',
      icon: Focus,
      active: isolateMode,
      onClick: toggleIsolateMode,
    },
    {
      id: 'hide',
      label: 'Hide others',
      icon: EyeOff,
      active: hideOthers,
      onClick: toggleHideOthers,
    },
    {
      id: 'reset',
      label: 'Reset view',
      icon: RotateCcw,
      active: false,
      onClick: handleResetView,
    },
    {
      id: 'screenshot',
      label: 'Screenshot',
      icon: Camera,
      active: false,
      onClick: handleScreenshot,
    },
    {
      id: 'export',
      label: '3D export',
      icon: Download,
      active: false,
      onClick: handleExport,
    },
  ] as const

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
      {/* Header row */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2.5">
          <motion.h2
            key={cell.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            {cell.name}
          </motion.h2>
          <div className="flex items-center gap-1.5 rounded-full border border-honey/70 bg-honey/90 px-3 py-1.5 text-[11px] text-ink shadow-sm backdrop-blur-sm">
            <Lightbulb className="h-3 w-3 shrink-0 text-honey-deep" strokeWidth={2} />
            <span className="hidden sm:inline">
              Tip: Drag to rotate · Scroll to zoom · Ctrl + drag to pan
            </span>
            <span className="sm:hidden">Drag · Scroll · Ctrl+drag</span>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="pointer-events-auto flex items-center gap-2.5 rounded-2xl border border-panel-border bg-panel/90 px-3 py-2 shadow-sm backdrop-blur-md">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            View Mode
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={viewMode === 'cross-section'}
            onClick={toggleViewMode}
            className="flex items-center gap-2"
          >
            <span
              className={`text-[11px] font-medium transition ${
                viewMode === 'full' ? 'text-ink' : 'text-ink-soft'
              }`}
            >
              Full
            </span>
            <span
              className={`toggle-track relative h-6 w-11 rounded-full p-0.5 ${
                viewMode === 'cross-section' ? 'bg-sage' : 'bg-cream-300'
              }`}
            >
              <span
                className={`toggle-thumb block h-5 w-5 rounded-full bg-white shadow-sm ${
                  viewMode === 'cross-section'
                    ? 'translate-x-5'
                    : 'translate-x-0'
                }`}
              />
            </span>
            <span
              className={`text-[11px] font-medium transition ${
                viewMode === 'cross-section' ? 'text-ink' : 'text-ink-soft'
              }`}
            >
              Cross-Section
            </span>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div
        ref={canvasWrapRef}
        className="canvas-container relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-panel-border bg-gradient-to-b from-cream-100 to-cream-200 shadow-inner"
      >
        <Canvas
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#f7f5f0']} />
          <PerspectiveCamera makeDefault position={[0, 1.2, 6.5]} fov={42} />
          <ambientLight intensity={0.65} />
          <directionalLight
            position={[5, 8, 4]}
            intensity={1.1}
            castShadow
            color="#fff8f0"
          />
          <directionalLight
            position={[-4, 2, -3]}
            intensity={0.35}
            color="#c5b8e0"
          />
          <pointLight position={[0, -2, 2]} intensity={0.3} color="#a8c9a4" />

          <Suspense fallback={<SceneFallback />}>
            <CellModel />
            <ContactShadows
              position={[0, -2.15, 0]}
              opacity={0.35}
              scale={12}
              blur={2.5}
              far={4}
              color="#2c2a26"
            />
            <Environment preset="studio" environmentIntensity={0.45} />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.06}
            minDistance={3}
            maxDistance={14}
            autoRotate={autoRotate}
            autoRotateSpeed={1.2}
            target={[0, 0, 0]}
          />
        </Canvas>

        {/* Soft vignette overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.03]" />
      </div>

      {/* Bottom toolbar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-3 sm:bottom-5">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-panel-border bg-panel/95 p-1.5 shadow-lg shadow-ink/5 backdrop-blur-md"
        >
          {toolbarItems.map(({ id, label, icon: Icon, active, onClick }, i) => (
            <div key={id} className="flex items-center">
              {i === 4 && (
                <span className="mx-1 h-5 w-px bg-panel-border" aria-hidden />
              )}
              <button
                type="button"
                onClick={onClick}
                title={label}
                aria-label={label}
                aria-pressed={active}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition sm:h-10 sm:w-10 ${
                  active
                    ? 'bg-sage-muted text-sage-deep shadow-sm'
                    : 'text-ink-muted hover:bg-cream-100 hover:text-ink'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${active && id === 'rotate' ? 'animate-spin' : ''}`}
                  strokeWidth={1.6}
                  style={
                    active && id === 'rotate'
                      ? { animationDuration: '3s' }
                      : undefined
                  }
                />
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
