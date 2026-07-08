import { motion, AnimatePresence } from 'framer-motion'
import {
  Microscope,
  Plus,
  ArrowLeftRight,
  ChevronDown,
  ImageIcon,
} from 'lucide-react'
import { CELL_TYPES } from '../data/cells'
import { useStudio } from '../context/StudioContext'
import { useState } from 'react'

const MICROSCOPE_VIEWS = [
  {
    id: 'lm',
    title: 'Light Microscope',
    subtitle: 'Brightfield · 400×',
    gradient: 'from-sage-soft/80 to-cream-200',
  },
  {
    id: 'stained',
    title: 'Stained Section',
    subtitle: 'H&E · Paraffin',
    gradient: 'from-blush/90 to-cream-200',
  },
  {
    id: 'em',
    title: 'Electron Microscope',
    subtitle: 'TEM · Ultrastructure',
    gradient: 'from-lavender-soft to-cream-200',
  },
] as const

export function BottomPanel() {
  const { cell, selectedCellType, bottomPanelOpen, setBottomPanelOpen } =
    useStudio()
  const [compareWith, setCompareWith] = useState(
    () => CELL_TYPES.find((c) => c.id !== selectedCellType)?.id ?? 'animal',
  )

  const compareCell =
    CELL_TYPES.find((c) => c.id === compareWith) ?? CELL_TYPES[0]

  // Keep compare target valid when selection changes
  const safeCompareId =
    compareWith === selectedCellType
      ? (CELL_TYPES.find((c) => c.id !== selectedCellType)?.id ?? compareWith)
      : compareWith

  const safeCompareCell =
    CELL_TYPES.find((c) => c.id === safeCompareId) ?? compareCell

  return (
    <AnimatePresence initial={false}>
      {bottomPanelOpen && (
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          className="shrink-0 overflow-hidden border-t border-panel-border bg-panel"
        >
          <div className="grid gap-4 px-4 py-3 sm:px-5 lg:grid-cols-[1.4fr_1fr]">
            {/* Microscope View */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Microscope
                    className="h-3.5 w-3.5 text-ink-soft"
                    strokeWidth={1.6}
                  />
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Microscope View
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBottomPanelOpen(false)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-ink-soft transition hover:bg-cream-100 hover:text-ink-muted"
                >
                  Collapse
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {MICROSCOPE_VIEWS.map((view) => (
                  <button
                    key={view.id}
                    type="button"
                    className="group relative flex h-20 w-32 shrink-0 flex-col justify-end overflow-hidden rounded-xl border border-panel-border text-left shadow-sm transition hover:border-sage/40 hover:shadow-md sm:h-24 sm:w-36"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${view.gradient}`}
                    />
                    {/* Decorative microscopy pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute left-1/2 top-1/3 h-8 w-8 -translate-x-1/2 rounded-full border border-ink/20" />
                      <div className="absolute left-1/2 top-1/3 h-4 w-4 -translate-x-1/2 translate-y-2 rounded-full bg-ink/10" />
                      <div className="absolute right-3 top-2 h-2 w-2 rounded-full bg-ink/15" />
                      <div className="absolute bottom-8 left-3 h-1.5 w-1.5 rounded-full bg-ink/10" />
                    </div>
                    <div className="relative z-[1] bg-gradient-to-t from-panel/95 to-transparent px-2.5 pb-2 pt-6">
                      <p className="truncate text-[11px] font-semibold text-ink">
                        {view.title}
                      </p>
                      <p className="truncate text-[10px] text-ink-soft">
                        {view.subtitle}
                      </p>
                    </div>
                  </button>
                ))}

                {/* Add image */}
                <button
                  type="button"
                  className="flex h-20 w-28 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-cream-300 bg-cream-100/50 text-ink-soft transition hover:border-sage/50 hover:bg-sage-muted/40 hover:text-sage-deep sm:h-24 sm:w-32"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-panel shadow-sm">
                    <Plus className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-medium">
                    <ImageIcon className="h-3 w-3" />
                    Add Image
                  </span>
                </button>
              </div>
            </div>

            {/* Compare Cells */}
            <div className="rounded-2xl border border-panel-border bg-cream-100/60 p-3 sm:p-4">
              <div className="mb-2.5 flex items-center gap-2">
                <ArrowLeftRight
                  className="h-3.5 w-3.5 text-ink-soft"
                  strokeWidth={1.6}
                />
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Compare Cells
                </h3>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-panel-border bg-panel px-2 py-2.5 shadow-sm">
                  <span
                    className="mb-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: cell.accent }}
                  />
                  <span className="truncate text-center font-serif text-sm font-semibold text-ink">
                    {cell.name}
                  </span>
                  <span className="text-[10px] text-ink-soft">Current</span>
                </div>

                <span className="shrink-0 font-serif text-lg italic text-ink-soft">
                  vs
                </span>

                <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-panel-border bg-panel px-2 py-2.5 shadow-sm">
                  <span
                    className="mb-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: safeCompareCell.accent }}
                  />
                  <select
                    value={safeCompareId}
                    onChange={(e) =>
                      setCompareWith(
                        e.target.value as (typeof CELL_TYPES)[number]['id'],
                      )
                    }
                    className="w-full cursor-pointer truncate border-0 bg-transparent text-center font-serif text-sm font-semibold text-ink outline-none"
                    aria-label="Compare with cell type"
                  >
                    {CELL_TYPES.filter((c) => c.id !== selectedCellType).map(
                      (c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ),
                    )}
                  </select>
                  <span className="text-[10px] text-ink-soft">Compare</span>
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-cream shadow-sm transition hover:bg-ink/90 active:scale-[0.99]"
              >
                <ArrowLeftRight className="h-4 w-4" strokeWidth={1.6} />
                Open Comparison View
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
