export type CellTypeId =
  | 'plant'
  | 'wbc'
  | 'neuron'
  | 'epithelial'
  | 'bacteria'
  | 'animal'
  | 'muscle'

export type OrganelleId =
  | 'nucleus'
  | 'nucleolus'
  | 'rough-er'
  | 'smooth-er'
  | 'golgi'
  | 'mitochondria'
  | 'chloroplast'
  | 'vacuole'
  | 'plasma-membrane'
  | 'cell-wall'
  | 'ribosome'
  | 'lysosome'
  | 'centrosome'
  | 'cytoskeleton'
  | 'axon'
  | 'dendrite'
  | 'flagellum'
  | 'nucleoid'
  | 'capsule'
  | 'myofibril'
  | 'sarcoplasmic-reticulum'

export interface Organelle {
  id: OrganelleId
  name: string
  descriptor: string
  size: string
  location: string
  visibleInLM: boolean
  notes: string
  funFact: string
  occursIn: CellTypeId[]
  color: string
  /** Relative position in 3D placeholder scene */
  position: [number, number, number]
  scale: number
  shape: 'sphere' | 'capsule' | 'torus' | 'box' | 'ellipsoid'
}

export interface CellType {
  id: CellTypeId
  name: string
  sublabel: string
  category: string
  description: string
  organelles: OrganelleId[]
  accent: string
  membraneColor: string
}

export const CELL_TYPES: CellType[] = [
  {
    id: 'plant',
    name: 'Plant Cell',
    sublabel: 'Eukaryotic Cell',
    category: 'Eukaryote',
    description:
      'A photosynthetic eukaryotic cell with a rigid cellulose wall, large central vacuole, and chloroplasts.',
    organelles: [
      'nucleus',
      'nucleolus',
      'rough-er',
      'smooth-er',
      'golgi',
      'mitochondria',
      'chloroplast',
      'vacuole',
      'plasma-membrane',
      'cell-wall',
      'ribosome',
    ],
    accent: '#8faa8b',
    membraneColor: '#a8c9a4',
  },
  {
    id: 'wbc',
    name: 'White Blood Cell',
    sublabel: 'Immune Leukocyte',
    category: 'Eukaryote',
    description:
      'A mobile immune cell that patrols tissues, engulfs pathogens, and coordinates adaptive immunity.',
    organelles: [
      'nucleus',
      'nucleolus',
      'rough-er',
      'golgi',
      'mitochondria',
      'lysosome',
      'plasma-membrane',
      'ribosome',
      'cytoskeleton',
    ],
    accent: '#b8a9c9',
    membraneColor: '#d4c4e8',
  },
  {
    id: 'neuron',
    name: 'Neuron',
    sublabel: 'Excitable Cell',
    category: 'Eukaryote',
    description:
      'A specialized nerve cell that transmits electrochemical signals via axons and dendrites.',
    organelles: [
      'nucleus',
      'nucleolus',
      'rough-er',
      'golgi',
      'mitochondria',
      'plasma-membrane',
      'ribosome',
      'cytoskeleton',
      'axon',
      'dendrite',
    ],
    accent: '#9b8ec4',
    membraneColor: '#c5b8e0',
  },
  {
    id: 'epithelial',
    name: 'Epithelial Cell',
    sublabel: 'Barrier Tissue',
    category: 'Eukaryote',
    description:
      'A tightly packed cell forming protective linings of surfaces, cavities, and organs.',
    organelles: [
      'nucleus',
      'rough-er',
      'smooth-er',
      'golgi',
      'mitochondria',
      'plasma-membrane',
      'ribosome',
      'cytoskeleton',
      'centrosome',
    ],
    accent: '#c4a484',
    membraneColor: '#e0c9a8',
  },
  {
    id: 'bacteria',
    name: 'Bacteria Cell',
    sublabel: 'Prokaryotic Cell',
    category: 'Prokaryote',
    description:
      'A prokaryotic microorganism lacking membrane-bound organelles, with a nucleoid and often a capsule.',
    organelles: [
      'nucleoid',
      'plasma-membrane',
      'cell-wall',
      'ribosome',
      'flagellum',
      'capsule',
    ],
    accent: '#7a9e8e',
    membraneColor: '#a3c4b5',
  },
  {
    id: 'animal',
    name: 'Animal Cell',
    sublabel: 'Eukaryotic Cell',
    category: 'Eukaryote',
    description:
      'A typical animal eukaryotic cell with membrane-bound organelles but no cell wall or chloroplasts.',
    organelles: [
      'nucleus',
      'nucleolus',
      'rough-er',
      'smooth-er',
      'golgi',
      'mitochondria',
      'lysosome',
      'plasma-membrane',
      'ribosome',
      'centrosome',
      'cytoskeleton',
    ],
    accent: '#c9a0a0',
    membraneColor: '#e8c4c4',
  },
  {
    id: 'muscle',
    name: 'Muscle Cell',
    sublabel: 'Contractile Fiber',
    category: 'Eukaryote',
    description:
      'A highly specialized cell packed with contractile myofibrils and a calcium-storing reticulum.',
    organelles: [
      'nucleus',
      'mitochondria',
      'plasma-membrane',
      'ribosome',
      'cytoskeleton',
      'myofibril',
      'sarcoplasmic-reticulum',
    ],
    accent: '#c47878',
    membraneColor: '#e0a0a0',
  },
]

export const ORGANELLES: Record<OrganelleId, Organelle> = {
  nucleus: {
    id: 'nucleus',
    name: 'Nucleus',
    descriptor: 'The control center',
    size: '5–10 µm',
    location: 'Central / slightly eccentric',
    visibleInLM: true,
    notes:
      'The nucleus houses the cell’s genetic material as chromatin and coordinates gene expression, DNA replication, and ribosome biogenesis. A double nuclear envelope with pores regulates traffic of RNA and proteins between the nucleoplasm and cytoplasm.',
    funFact:
      'If stretched end-to-end, the DNA in one human nucleus would measure roughly two meters long.',
    occursIn: ['plant', 'wbc', 'neuron', 'epithelial', 'animal', 'muscle'],
    color: '#8b7bb8',
    position: [0, 0.15, 0],
    scale: 1,
    shape: 'sphere',
  },
  nucleolus: {
    id: 'nucleolus',
    name: 'Nucleolus',
    descriptor: 'Ribosome factory',
    size: '1–3 µm',
    location: 'Inside the nucleus',
    visibleInLM: true,
    notes:
      'The nucleolus is a dense subnuclear body where ribosomal RNA is transcribed and ribosomal subunits begin assembly. Its size often correlates with the cell’s demand for protein synthesis.',
    funFact:
      'Cells that produce lots of protein—like secretory neurons—often have especially large nucleoli.',
    occursIn: ['plant', 'wbc', 'neuron', 'animal'],
    color: '#6b5a9e',
    position: [0.12, 0.22, 0.08],
    scale: 0.28,
    shape: 'sphere',
  },
  'rough-er': {
    id: 'rough-er',
    name: 'Rough ER',
    descriptor: 'Protein synthesis hub',
    size: 'Extensive network',
    location: 'Perinuclear cytoplasm',
    visibleInLM: false,
    notes:
      'Rough endoplasmic reticulum is studded with ribosomes and synthesizes proteins destined for secretion, membranes, or organelles. Nascent polypeptides enter the ER lumen for folding and quality control.',
    funFact:
      'Plasma cells are packed with rough ER so they can mass-produce antibodies.',
    occursIn: ['plant', 'wbc', 'neuron', 'epithelial', 'animal'],
    color: '#d4a574',
    position: [0.55, 0.1, 0.2],
    scale: 0.7,
    shape: 'torus',
  },
  'smooth-er': {
    id: 'smooth-er',
    name: 'Smooth ER',
    descriptor: 'Lipid & detox lab',
    size: 'Variable network',
    location: 'Cytoplasmic periphery',
    visibleInLM: false,
    notes:
      'Smooth ER lacks ribosomes and specializes in lipid synthesis, steroid hormone production, and detoxification of drugs and toxins. In muscle cells, a related form stores calcium.',
    funFact:
      'Liver hepatocytes expand their smooth ER when repeatedly exposed to certain drugs.',
    occursIn: ['plant', 'epithelial', 'animal'],
    color: '#e8c89a',
    position: [-0.5, -0.15, 0.25],
    scale: 0.55,
    shape: 'torus',
  },
  golgi: {
    id: 'golgi',
    name: 'Golgi Apparatus',
    descriptor: 'Shipping & packaging',
    size: '1–3 µm stack',
    location: 'Near nucleus / MTOC',
    visibleInLM: false,
    notes:
      'The Golgi apparatus modifies, sorts, and packages proteins and lipids into vesicles for delivery to lysosomes, the plasma membrane, or the extracellular space. Cis and trans faces define directional traffic.',
    funFact:
      'Camillo Golgi discovered this organelle in 1898 using a silver stain—long before electron microscopy confirmed it.',
    occursIn: ['plant', 'wbc', 'neuron', 'epithelial', 'animal'],
    color: '#c9a0c0',
    position: [0.35, -0.35, -0.15],
    scale: 0.5,
    shape: 'capsule',
  },
  mitochondria: {
    id: 'mitochondria',
    name: 'Mitochondria',
    descriptor: 'Powerhouse of the cell',
    size: '0.5–1 × 2–8 µm',
    location: 'Cytoplasm (energy-rich zones)',
    visibleInLM: false,
    notes:
      'Mitochondria generate ATP via oxidative phosphorylation across their inner membrane cristae. They also participate in apoptosis signaling and contain their own circular DNA—a remnant of ancient endosymbiosis.',
    funFact:
      'A single heart muscle cell may contain thousands of mitochondria working in parallel.',
    occursIn: ['plant', 'wbc', 'neuron', 'epithelial', 'animal', 'muscle'],
    color: '#e07a5f',
    position: [-0.4, 0.35, -0.2],
    scale: 0.4,
    shape: 'capsule',
  },
  chloroplast: {
    id: 'chloroplast',
    name: 'Chloroplast',
    descriptor: 'Photosynthetic engine',
    size: '2–10 µm',
    location: 'Cytoplasm / near cell wall',
    visibleInLM: true,
    notes:
      'Chloroplasts capture light energy to fix carbon dioxide into sugars. Stacked thylakoid membranes (grana) host the photosynthetic electron transport chain; the stroma holds Calvin cycle enzymes.',
    funFact:
      'Chloroplasts, like mitochondria, descended from free-living bacteria engulfed by ancestral cells.',
    occursIn: ['plant'],
    color: '#6b9b6e',
    position: [0.45, 0.4, -0.3],
    scale: 0.55,
    shape: 'ellipsoid',
  },
  vacuole: {
    id: 'vacuole',
    name: 'Central Vacuole',
    descriptor: 'Storage & turgor',
    size: 'Up to 90% of cell volume',
    location: 'Central cytoplasm',
    visibleInLM: true,
    notes:
      'The large central vacuole stores water, ions, pigments, and waste, maintaining turgor pressure that keeps plant tissues rigid. The tonoplast membrane carefully regulates its contents.',
    funFact:
      'Wilting flowers often recover when water refills their vacuoles and restores turgor.',
    occursIn: ['plant'],
    color: '#a8c5e2',
    position: [-0.15, -0.25, 0.35],
    scale: 0.85,
    shape: 'sphere',
  },
  'plasma-membrane': {
    id: 'plasma-membrane',
    name: 'Plasma Membrane',
    descriptor: 'Selective boundary',
    size: '~7–10 nm thick',
    location: 'Cell surface',
    visibleInLM: false,
    notes:
      'A phospholipid bilayer studded with proteins that controls substance entry and exit, senses signals, and mediates cell–cell adhesion. Fluid mosaic dynamics allow lateral movement of components.',
    funFact:
      'Membrane proteins make up roughly half the mass of a typical plasma membrane despite covering less surface area than lipids.',
    occursIn: [
      'plant',
      'wbc',
      'neuron',
      'epithelial',
      'bacteria',
      'animal',
      'muscle',
    ],
    color: '#d4c4a8',
    position: [0, 0, 0],
    scale: 2.2,
    shape: 'sphere',
  },
  'cell-wall': {
    id: 'cell-wall',
    name: 'Cell Wall',
    descriptor: 'Rigid outer scaffold',
    size: '0.1–10 µm thick',
    location: 'Outside plasma membrane',
    visibleInLM: true,
    notes:
      'In plants, a cellulose-based wall provides structural support and defines cell shape. Bacterial walls use peptidoglycan; both protect against osmotic lysis and mechanical stress.',
    funFact:
      'Plant secondary walls can become so lignified they form wood—essentially fossilized cell walls.',
    occursIn: ['plant', 'bacteria'],
    color: '#c8b89a',
    position: [0, 0, 0],
    scale: 2.45,
    shape: 'sphere',
  },
  ribosome: {
    id: 'ribosome',
    name: 'Ribosomes',
    descriptor: 'Protein assemblers',
    size: '~20–30 nm',
    location: 'Cytosol & rough ER',
    visibleInLM: false,
    notes:
      'Ribosomes translate mRNA into polypeptide chains. Free cytosolic ribosomes make cytoplasmic proteins; ER-bound ribosomes feed secretory and membrane proteins into the ER lumen.',
    funFact:
      'A rapidly growing bacterial cell can contain tens of thousands of ribosomes at once.',
    occursIn: [
      'plant',
      'wbc',
      'neuron',
      'epithelial',
      'bacteria',
      'animal',
      'muscle',
    ],
    color: '#a0c4a8',
    position: [0.2, -0.5, 0.15],
    scale: 0.15,
    shape: 'sphere',
  },
  lysosome: {
    id: 'lysosome',
    name: 'Lysosome',
    descriptor: 'Digestive vesicle',
    size: '0.1–1.2 µm',
    location: 'Cytoplasm',
    visibleInLM: false,
    notes:
      'Lysosomes contain acid hydrolases that break down macromolecules, worn organelles, and engulfed pathogens. Their acidic lumen (~pH 4.5–5) is maintained by proton pumps.',
    funFact:
      'White blood cells weaponize lysosomes when they fuse with phagosomes to destroy microbes.',
    occursIn: ['wbc', 'animal'],
    color: '#e8a0b0',
    position: [-0.55, -0.3, -0.1],
    scale: 0.3,
    shape: 'sphere',
  },
  centrosome: {
    id: 'centrosome',
    name: 'Centrosome',
    descriptor: 'Microtubule organizer',
    size: '~1 µm',
    location: 'Near nucleus',
    visibleInLM: false,
    notes:
      'The centrosome is the primary microtubule-organizing center in animal cells. During mitosis it duplicates and helps form the spindle that segregates chromosomes.',
    funFact:
      'Most plant cells lack centrosomes yet still build spindles—an elegant alternative architecture.',
    occursIn: ['epithelial', 'animal'],
    color: '#9ab0c8',
    position: [0.15, 0.45, -0.35],
    scale: 0.25,
    shape: 'sphere',
  },
  cytoskeleton: {
    id: 'cytoskeleton',
    name: 'Cytoskeleton',
    descriptor: 'Internal scaffolding',
    size: 'nm–µm filaments',
    location: 'Throughout cytoplasm',
    visibleInLM: false,
    notes:
      'Actin filaments, intermediate filaments, and microtubules form a dynamic scaffold for shape, motility, intracellular transport, and cell division. Motors like kinesin walk cargo along tracks.',
    funFact:
      'Some neurons ship vesicles several meters from the soma to the axon terminal using microtubule highways.',
    occursIn: ['wbc', 'neuron', 'epithelial', 'animal', 'muscle'],
    color: '#b0a8c8',
    position: [0, 0, 0],
    scale: 1.8,
    shape: 'torus',
  },
  axon: {
    id: 'axon',
    name: 'Axon',
    descriptor: 'Signal output cable',
    size: 'µm–meter lengths',
    location: 'Extends from soma',
    visibleInLM: true,
    notes:
      'The axon conducts action potentials away from the cell body to synapses. Myelin sheaths in many axons greatly increase conduction speed via saltatory propagation.',
    funFact:
      'The longest human axons—from spinal cord to toes—can exceed a meter in length.',
    occursIn: ['neuron'],
    color: '#a898d0',
    position: [1.4, 0, 0],
    scale: 1.2,
    shape: 'capsule',
  },
  dendrite: {
    id: 'dendrite',
    name: 'Dendrites',
    descriptor: 'Signal input tree',
    size: 'Branching µm network',
    location: 'Soma periphery',
    visibleInLM: true,
    notes:
      'Dendrites receive synaptic inputs and integrate excitatory and inhibitory signals. Spines on many dendrites are tiny compartments for local plasticity.',
    funFact:
      'A single Purkinje neuron in the cerebellum can form over 100,000 dendritic synapses.',
    occursIn: ['neuron'],
    color: '#c0b0e0',
    position: [-1.1, 0.4, 0.2],
    scale: 0.9,
    shape: 'capsule',
  },
  flagellum: {
    id: 'flagellum',
    name: 'Flagellum',
    descriptor: 'Motility propeller',
    size: 'Several µm long',
    location: 'Cell pole / surface',
    visibleInLM: true,
    notes:
      'Bacterial flagella are rotary nanomachines powered by ion gradients. They enable chemotaxis toward nutrients and away from toxins by alternating runs and tumbles.',
    funFact:
      'The bacterial flagellar motor can spin at hundreds of revolutions per second.',
    occursIn: ['bacteria'],
    color: '#7a9e8e',
    position: [1.6, 0, 0],
    scale: 1.4,
    shape: 'capsule',
  },
  nucleoid: {
    id: 'nucleoid',
    name: 'Nucleoid',
    descriptor: 'DNA region (no membrane)',
    size: 'Irregular, µm-scale',
    location: 'Central cytoplasm',
    visibleInLM: true,
    notes:
      'The nucleoid is the region of a prokaryotic cell where chromosomal DNA is concentrated. Unlike a nucleus, it lacks a surrounding membrane and is organized by nucleoid-associated proteins.',
    funFact:
      'A typical E. coli chromosome is ~1.5 mm long—about 1,000× the cell’s length—yet fits inside the nucleoid.',
    occursIn: ['bacteria'],
    color: '#5a8a78',
    position: [0, 0, 0],
    scale: 0.7,
    shape: 'ellipsoid',
  },
  capsule: {
    id: 'capsule',
    name: 'Capsule',
    descriptor: 'Protective slime layer',
    size: 'Variable thickness',
    location: 'Outermost surface',
    visibleInLM: true,
    notes:
      'A polysaccharide (or polypeptide) capsule shields bacteria from desiccation and phagocytosis, and can enhance virulence by masking surface antigens.',
    funFact:
      'Encapsulated Streptococcus pneumoniae is far more pathogenic than capsule-deficient strains.',
    occursIn: ['bacteria'],
    color: '#b8d4c8',
    position: [0, 0, 0],
    scale: 2.7,
    shape: 'sphere',
  },
  myofibril: {
    id: 'myofibril',
    name: 'Myofibrils',
    descriptor: 'Contractile cables',
    size: '1–2 µm diameter',
    location: 'Length of muscle fiber',
    visibleInLM: true,
    notes:
      'Myofibrils are linear arrays of sarcomeres—the fundamental contractile units of skeletal and cardiac muscle. Sliding actin and myosin filaments shorten the sarcomere during contraction.',
    funFact:
      'The striated “stripes” visible in skeletal muscle under a light microscope are ordered arrays of myofibrils.',
    occursIn: ['muscle'],
    color: '#d07070',
    position: [0, 0, 0],
    scale: 1.5,
    shape: 'capsule',
  },
  'sarcoplasmic-reticulum': {
    id: 'sarcoplasmic-reticulum',
    name: 'Sarcoplasmic Reticulum',
    descriptor: 'Calcium storehouse',
    size: 'Extensive network',
    location: 'Around myofibrils',
    visibleInLM: false,
    notes:
      'A specialized smooth ER that sequesters and releases Ca²⁺ to trigger and terminate contraction. T-tubules couple surface action potentials to calcium release channels.',
    funFact:
      'A single action potential can flood the myoplasm with enough calcium to activate thousands of sarcomeres almost simultaneously.',
    occursIn: ['muscle'],
    color: '#e8b0a0',
    position: [0.3, 0.2, 0.3],
    scale: 0.6,
    shape: 'torus',
  },
}

export function getCellById(id: CellTypeId): CellType {
  return CELL_TYPES.find((c) => c.id === id) ?? CELL_TYPES[0]
}

export function getOrganellesForCell(cellId: CellTypeId): Organelle[] {
  const cell = getCellById(cellId)
  return cell.organelles.map((id) => ORGANELLES[id])
}

export function getOrganelleById(id: OrganelleId | null): Organelle | null {
  if (!id) return null
  return ORGANELLES[id] ?? null
}

export function getCellName(id: CellTypeId): string {
  return getCellById(id).name
}
