import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf,
  Shield,
  Brain,
  Layers,
  Bug,
  CircleDot,
  Dumbbell,
  X,
  type LucideIcon,
} from 'lucide-react'
import { CELL_TYPES, type CellTypeId, type OrganelleId } from '../data/cells'
import { useStudio } from '../context/StudioContext'

const CELL_ICONS: Record<CellTypeId, LucideIcon> = {
  plant: Leaf,
  wbc: Shield,
  neuron: Brain,
  epithelial: Layers,
  bacteria: Bug,
  animal: CircleDot,
  muscle: Dumbbell,
}

export function LeftSidebar() {
  const {
    selectedCellType,
    setSelectedCellType,
    selectedOrganelle,
    setSelectedOrganelle,
    organelles,
    leftSidebarOpen,
    setLeftSidebarOpen,
  } = useStudio()

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {leftSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] lg:hidden"
            onClick={() => setLeftSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {leftSidebarOpen && (
          <motion.aside
            initial={{ x: -20, opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: 280 }}
            exit={{ x: -20, opacity: 0, width: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-y-14 left-0 z-50 flex w-[280px] shrink-0 flex-col overflow-hidden border-r border-panel-border bg-panel shadow-xl sm:inset-y-16 lg:static lg:z-auto lg:h-full lg:shadow-none"
          >
            <div className="flex h-full w-[280px] flex-col">
              {/* Mobile close */}
              <div className="flex items-center justify-between border-b border-panel-border px-4 py-3 lg:hidden">
                <span className="font-serif text-base font-semibold text-ink">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setLeftSidebarOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-cream-100"
                  aria-label="Close sidebar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="custom-scroll flex-1 overflow-y-auto px-3 py-4">
                {/* Cell Types */}
                <section>
                  <h2 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Cell Types
                  </h2>
                  <ul className="flex flex-col gap-0.5">
                    {CELL_TYPES.map((cell) => {
                      const Icon = CELL_ICONS[cell.id]
                      const active = selectedCellType === cell.id
                      return (
                        <li key={cell.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCellType(cell.id)
                              if (window.innerWidth < 1024) {
                                // keep open so user can pick organelle
                              }
                            }}
                            className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition ${
                              active
                                ? 'bg-sage-muted shadow-sm'
                                : 'hover:bg-cream-100'
                            }`}
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                                active
                                  ? 'bg-white text-sage-deep shadow-sm'
                                  : 'bg-cream-100 text-ink-soft group-hover:text-ink-muted'
                              }`}
                            >
                              <Icon className="h-4 w-4" strokeWidth={1.6} />
                            </span>
                            <span className="min-w-0">
                              <span
                                className={`block truncate text-sm font-medium ${
                                  active ? 'text-sage-deep' : 'text-ink'
                                }`}
                              >
                                {cell.name}
                              </span>
                              <span className="block truncate text-[11px] text-ink-soft">
                                {cell.sublabel}
                              </span>
                            </span>
                            {active && (
                              <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </section>

                {/* Organelles */}
                <section className="mt-6">
                  <h2 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Organelles
                  </h2>
                  <ul className="flex flex-col gap-1">
                    {organelles.map((org) => {
                      const active = selectedOrganelle === org.id
                      return (
                        <li key={org.id}>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedOrganelle(org.id as OrganelleId)
                            }
                            className={`flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition ${
                              active
                                ? 'border-lavender/40 bg-lavender-muted shadow-sm'
                                : 'border-transparent bg-cream-100/60 hover:border-panel-border hover:bg-cream-100'
                            }`}
                          >
                            <span
                              className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white"
                              style={{ backgroundColor: org.color }}
                            />
                            <span className="min-w-0">
                              <span
                                className={`block truncate text-[13px] font-medium ${
                                  active ? 'text-ink' : 'text-ink/90'
                                }`}
                              >
                                {org.name}
                              </span>
                              <span className="block truncate text-[10px] text-ink-soft">
                                {org.descriptor}
                              </span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              </div>

              {/* Footer hint */}
              <div className="border-t border-panel-border px-4 py-3">
                <p className="text-[11px] leading-relaxed text-ink-soft">
                  Select an organelle to highlight it in the 3D view and load
                  textbook notes.
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
