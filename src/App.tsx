import { StudioProvider, useStudio } from './context/StudioContext'
import { TopNav } from './components/TopNav'
import { LeftSidebar } from './components/LeftSidebar'
import { ThreeViewport } from './components/ThreeViewport'
import { InfoPanel } from './components/InfoPanel'
import { BottomPanel } from './components/BottomPanel'
import { PanelRight, PanelBottom, Menu } from 'lucide-react'

function StudioLayout() {
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    bottomPanelOpen,
    setLeftSidebarOpen,
    setRightSidebarOpen,
    setBottomPanelOpen,
  } = useStudio()

  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-cream text-ink">
      <TopNav />

      <div className="flex min-h-0 flex-1">
        <LeftSidebar />

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col p-2 sm:p-3">
          {/* Collapsed sidebar affordances */}
          <div className="pointer-events-none absolute left-3 top-3 z-30 flex gap-1.5 lg:left-4 lg:top-4">
            {!leftSidebarOpen && (
              <button
                type="button"
                onClick={() => setLeftSidebarOpen(true)}
                className="pointer-events-auto flex h-9 items-center gap-1.5 rounded-full border border-panel-border bg-panel/95 px-3 text-[11px] font-medium text-ink-muted shadow-sm backdrop-blur-md transition hover:text-ink"
              >
                <Menu className="h-3.5 w-3.5" strokeWidth={1.6} />
                Cells
              </button>
            )}
          </div>

          <div className="pointer-events-none absolute right-3 top-3 z-30 flex gap-1.5 xl:right-4 xl:top-4">
            {!rightSidebarOpen && (
              <button
                type="button"
                onClick={() => setRightSidebarOpen(true)}
                className="pointer-events-auto flex h-9 items-center gap-1.5 rounded-full border border-panel-border bg-panel/95 px-3 text-[11px] font-medium text-ink-muted shadow-sm backdrop-blur-md transition hover:text-ink"
              >
                <PanelRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                Info
              </button>
            )}
          </div>

          {!bottomPanelOpen && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
              <button
                type="button"
                onClick={() => setBottomPanelOpen(true)}
                className="pointer-events-auto flex h-8 items-center gap-1.5 rounded-full border border-panel-border bg-panel/95 px-3 text-[11px] font-medium text-ink-muted shadow-sm backdrop-blur-md transition hover:text-ink"
              >
                <PanelBottom className="h-3.5 w-3.5" strokeWidth={1.6} />
                Microscope & Compare
              </button>
            </div>
          )}

          <ThreeViewport />
          <BottomPanel />
        </main>

        <InfoPanel />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <StudioProvider>
      <StudioLayout />
    </StudioProvider>
  )
}
