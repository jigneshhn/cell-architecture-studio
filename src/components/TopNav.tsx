import {
  BookOpen,
  GalleryHorizontalEnd,
  NotebookPen,
  Settings,
  Menu,
  PanelRight,
  PanelBottom,
} from 'lucide-react'
import { useStudio } from '../context/StudioContext'

const navLinks = [
  { id: 'gallery', label: 'Gallery', icon: GalleryHorizontalEnd },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'notebooks', label: 'Notebooks', icon: NotebookPen },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

export function TopNav() {
  const {
    toggleLeftSidebar,
    toggleRightSidebar,
    toggleBottomPanel,
    leftSidebarOpen,
    rightSidebarOpen,
    bottomPanelOpen,
  } = useStudio()

  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center justify-between border-b border-panel-border bg-panel/90 px-4 backdrop-blur-md sm:h-16 sm:px-6">
      {/* Logo */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={toggleLeftSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted transition hover:bg-cream-100 hover:text-ink lg:hidden"
          aria-label={leftSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage-soft to-lavender-soft shadow-sm">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-sage-deep"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="8" opacity="0.4" />
              <circle cx="12" cy="12" r="3.5" />
              <ellipse cx="12" cy="12" rx="8" ry="3" opacity="0.5" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="font-serif text-lg font-semibold leading-tight tracking-tight text-ink sm:text-xl">
              Cell Architecture Studio
            </h1>
            <p className="hidden truncate font-serif text-xs italic text-ink-muted sm:block">
              Explore life at the microscopic level
            </p>
          </div>
        </div>
      </div>

      {/* Right links */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        {/* Desktop collapse toggles */}
        <div className="mr-1 hidden items-center gap-0.5 border-r border-panel-border pr-2 lg:flex">
          <button
            type="button"
            onClick={toggleRightSidebar}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
              rightSidebarOpen
                ? 'bg-lavender-muted text-lavender'
                : 'text-ink-soft hover:bg-cream-100 hover:text-ink-muted'
            }`}
            title="Toggle info panel"
            aria-label="Toggle info panel"
          >
            <PanelRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={toggleBottomPanel}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
              bottomPanelOpen
                ? 'bg-sage-muted text-sage-deep'
                : 'text-ink-soft hover:bg-cream-100 hover:text-ink-muted'
            }`}
            title="Toggle bottom panel"
            aria-label="Toggle bottom panel"
          >
            <PanelBottom className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {navLinks.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="group flex h-9 w-9 items-center justify-center rounded-xl text-ink-soft transition hover:bg-cream-100 hover:text-ink-muted"
            title={label}
            aria-label={label}
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </button>
        ))}

        {/* Avatar */}
        <button
          type="button"
          className="ml-1.5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-cream-200 bg-gradient-to-br from-lavender-soft to-sage-soft shadow-sm transition hover:border-lavender"
          title="User profile"
          aria-label="User profile"
        >
          <span className="font-serif text-sm font-semibold text-ink/70">
            R
          </span>
        </button>
      </div>
    </header>
  )
}
