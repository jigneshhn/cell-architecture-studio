import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  type CellTypeId,
  type OrganelleId,
  getCellById,
  getOrganelleById,
  getOrganellesForCell,
  type CellType,
  type Organelle,
} from '../data/cells'

export type ViewMode = 'full' | 'cross-section'

interface StudioState {
  selectedCellType: CellTypeId
  selectedOrganelle: OrganelleId | null
  viewMode: ViewMode
  autoRotate: boolean
  isolateMode: boolean
  hideOthers: boolean
  showLabel: boolean
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  bottomPanelOpen: boolean
}

interface StudioContextValue extends StudioState {
  cell: CellType
  organelle: Organelle | null
  organelles: Organelle[]
  setSelectedCellType: (id: CellTypeId) => void
  setSelectedOrganelle: (id: OrganelleId | null) => void
  setViewMode: (mode: ViewMode) => void
  toggleViewMode: () => void
  setAutoRotate: (v: boolean) => void
  toggleAutoRotate: () => void
  setIsolateMode: (v: boolean) => void
  toggleIsolateMode: () => void
  setHideOthers: (v: boolean) => void
  toggleHideOthers: () => void
  setShowLabel: (v: boolean) => void
  toggleShowLabel: () => void
  resetView: () => void
  setLeftSidebarOpen: (v: boolean) => void
  setRightSidebarOpen: (v: boolean) => void
  setBottomPanelOpen: (v: boolean) => void
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  toggleBottomPanel: () => void
}

const StudioContext = createContext<StudioContextValue | null>(null)

export function StudioProvider({ children }: { children: ReactNode }) {
  const [selectedCellType, setSelectedCellTypeRaw] =
    useState<CellTypeId>('plant')
  const [selectedOrganelle, setSelectedOrganelle] =
    useState<OrganelleId | null>('nucleus')
  const [viewMode, setViewMode] = useState<ViewMode>('full')
  const [autoRotate, setAutoRotate] = useState(false)
  const [isolateMode, setIsolateMode] = useState(false)
  const [hideOthers, setHideOthers] = useState(false)
  const [showLabel, setShowLabel] = useState(true)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true)

  const setSelectedCellType = useCallback((id: CellTypeId) => {
    setSelectedCellTypeRaw(id)
    const next = getOrganellesForCell(id)
    // Prefer keeping nucleus if present, else first organelle
    const preferred =
      next.find((o) => o.id === 'nucleus')?.id ?? next[0]?.id ?? null
    setSelectedOrganelle(preferred)
    setIsolateMode(false)
    setHideOthers(false)
  }, [])

  const toggleViewMode = useCallback(() => {
    setViewMode((m) => (m === 'full' ? 'cross-section' : 'full'))
  }, [])

  const toggleAutoRotate = useCallback(() => setAutoRotate((v) => !v), [])
  const toggleIsolateMode = useCallback(() => {
    setIsolateMode((v) => {
      if (!v) setHideOthers(false)
      return !v
    })
  }, [])
  const toggleHideOthers = useCallback(() => {
    setHideOthers((v) => {
      if (!v) setIsolateMode(false)
      return !v
    })
  }, [])
  const toggleShowLabel = useCallback(() => setShowLabel((v) => !v), [])
  const toggleLeftSidebar = useCallback(
    () => setLeftSidebarOpen((v) => !v),
    [],
  )
  const toggleRightSidebar = useCallback(
    () => setRightSidebarOpen((v) => !v),
    [],
  )
  const toggleBottomPanel = useCallback(
    () => setBottomPanelOpen((v) => !v),
    [],
  )

  const resetView = useCallback(() => {
    setAutoRotate(false)
    setIsolateMode(false)
    setHideOthers(false)
    setViewMode('full')
  }, [])

  const cell = useMemo(() => getCellById(selectedCellType), [selectedCellType])
  const organelle = useMemo(
    () => getOrganelleById(selectedOrganelle),
    [selectedOrganelle],
  )
  const organelles = useMemo(
    () => getOrganellesForCell(selectedCellType),
    [selectedCellType],
  )

  const value = useMemo<StudioContextValue>(
    () => ({
      selectedCellType,
      selectedOrganelle,
      viewMode,
      autoRotate,
      isolateMode,
      hideOthers,
      showLabel,
      leftSidebarOpen,
      rightSidebarOpen,
      bottomPanelOpen,
      cell,
      organelle,
      organelles,
      setSelectedCellType,
      setSelectedOrganelle,
      setViewMode,
      toggleViewMode,
      setAutoRotate,
      toggleAutoRotate,
      setIsolateMode,
      toggleIsolateMode,
      setHideOthers,
      toggleHideOthers,
      setShowLabel,
      toggleShowLabel,
      resetView,
      setLeftSidebarOpen,
      setRightSidebarOpen,
      setBottomPanelOpen,
      toggleLeftSidebar,
      toggleRightSidebar,
      toggleBottomPanel,
    }),
    [
      selectedCellType,
      selectedOrganelle,
      viewMode,
      autoRotate,
      isolateMode,
      hideOthers,
      showLabel,
      leftSidebarOpen,
      rightSidebarOpen,
      bottomPanelOpen,
      cell,
      organelle,
      organelles,
      setSelectedCellType,
      toggleViewMode,
      toggleAutoRotate,
      toggleIsolateMode,
      toggleHideOthers,
      toggleShowLabel,
      resetView,
      toggleLeftSidebar,
      toggleRightSidebar,
      toggleBottomPanel,
    ],
  )

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  )
}

export function useStudio() {
  const ctx = useContext(StudioContext)
  if (!ctx) {
    throw new Error('useStudio must be used within StudioProvider')
  }
  return ctx
}
