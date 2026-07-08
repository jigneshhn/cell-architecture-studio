import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, MapPin, Ruler, Eye, Tag } from 'lucide-react'
import { getCellName, type CellTypeId } from '../data/cells'
import { useStudio } from '../context/StudioContext'

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Ruler
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-cream-100/80 px-3 py-2.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-soft" strokeWidth={1.6} />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
          {label}
        </p>
        <p className="text-sm text-ink">{value}</p>
      </div>
    </div>
  )
}

export function InfoPanel() {
  const {
    organelle,
    showLabel,
    toggleShowLabel,
    rightSidebarOpen,
    setRightSidebarOpen,
  } = useStudio()

  return (
    <>
      <AnimatePresence>
        {rightSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] xl:hidden"
            onClick={() => setRightSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {rightSidebarOpen && (
          <motion.aside
            initial={{ x: 20, opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: 320 }}
            exit={{ x: 20, opacity: 0, width: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-y-14 right-0 z-50 flex w-[320px] shrink-0 flex-col overflow-hidden border-l border-panel-border bg-panel shadow-xl sm:inset-y-16 xl:static xl:z-auto xl:h-full xl:shadow-none"
          >
            <div className="flex h-full w-[320px] flex-col">
              <div className="flex items-center justify-between border-b border-panel-border px-4 py-3">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Organelle Details
                </h2>
                <button
                  type="button"
                  onClick={() => setRightSidebarOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-cream-100 xl:hidden"
                  aria-label="Close info panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="custom-scroll flex-1 overflow-y-auto px-4 py-4">
                <AnimatePresence mode="wait">
                  {organelle ? (
                    <motion.div
                      key={organelle.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-col gap-5"
                    >
                      {/* Title */}
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full shadow-sm ring-2 ring-white"
                          style={{ backgroundColor: organelle.color }}
                        />
                        <div>
                          <h3 className="font-serif text-2xl font-semibold leading-tight text-ink">
                            {organelle.name}
                          </h3>
                          <p className="mt-0.5 font-serif text-sm italic text-ink-muted">
                            {organelle.descriptor}
                          </p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="grid gap-2">
                        <MetaRow
                          icon={Ruler}
                          label="Size"
                          value={organelle.size}
                        />
                        <MetaRow
                          icon={MapPin}
                          label="Location"
                          value={organelle.location}
                        />
                        <MetaRow
                          icon={Eye}
                          label="Visible in LM"
                          value={organelle.visibleInLM ? 'Yes' : 'No (EM only)'}
                        />
                      </div>

                      {/* Toggles */}
                      <div className="rounded-2xl border border-panel-border bg-cream/50 p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Tag className="h-3.5 w-3.5 text-ink-soft" strokeWidth={1.6} />
                            <span className="text-sm font-medium text-ink">
                              Label
                            </span>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={showLabel}
                            onClick={toggleShowLabel}
                            className={`toggle-track relative h-6 w-11 rounded-full p-0.5 ${
                              showLabel ? 'bg-sage' : 'bg-cream-300'
                            }`}
                          >
                            <span
                              className={`toggle-thumb block h-5 w-5 rounded-full bg-white shadow-sm ${
                                showLabel ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                        <p className="mt-1.5 text-[11px] text-ink-soft">
                          Show floating name tag on the selected organelle in
                          3D.
                        </p>
                      </div>

                      {/* Biological notes */}
                      <section>
                        <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                          Biological Notes
                        </h4>
                        <blockquote className="relative rounded-2xl border border-lavender-soft bg-gradient-to-br from-lavender-muted/80 to-cream p-4 shadow-sm">
                          <span
                            className="absolute left-3 top-2 font-serif text-4xl leading-none text-lavender/40"
                            aria-hidden
                          >
                            “
                          </span>
                          <p className="relative z-[1] pt-3 font-serif text-[15px] leading-relaxed text-ink/90">
                            {organelle.notes}
                          </p>
                          <footer className="mt-3 flex items-start gap-2 border-t border-lavender-soft/80 pt-3">
                            <Sparkles
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-honey-deep"
                              strokeWidth={1.8}
                            />
                            <p className="text-[12px] leading-relaxed text-ink-muted">
                              <span className="font-semibold text-ink">
                                Fun fact:{' '}
                              </span>
                              {organelle.funFact}
                            </p>
                          </footer>
                        </blockquote>
                      </section>

                      {/* Where it occurs */}
                      <section>
                        <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                          Where it Occurs
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {organelle.occursIn.map((cellId: CellTypeId) => (
                            <span
                              key={cellId}
                              className="inline-flex items-center rounded-full border border-panel-border bg-cream-100 px-2.5 py-1 text-[11px] font-medium text-ink-muted"
                            >
                              {getCellName(cellId)}
                            </span>
                          ))}
                        </div>
                      </section>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center gap-3 py-16 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-100 text-ink-soft">
                        <Sparkles className="h-6 w-6" strokeWidth={1.4} />
                      </div>
                      <p className="font-serif text-lg text-ink-muted">
                        Select an organelle
                      </p>
                      <p className="max-w-[200px] text-xs text-ink-soft">
                        Choose from the left sidebar or click a structure in the
                        3D view.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
