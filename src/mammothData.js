export const MAMMOTH_TABS = [
  { id: 'accueil', label: 'Départ', icon: '🏕️' },
  { id: 'vallee', label: 'Vallée', icon: '🦣' },
  { id: 'sorcier', label: 'Sorcier', icon: '🧙🏾' },
  { id: 'carte', label: 'Carte', icon: '🗺️' },
  { id: 'andes', label: 'Andes', icon: '⛰️' },
  { id: 'cristaux', label: 'Cristaux', icon: '💎' },
  { id: 'ballon', label: 'Ballon', icon: '🎈' },
  { id: 'afrique', label: 'Afrique', icon: '🌍' },
  { id: 'animaux', label: 'Animaux', icon: '🦒' },
  { id: 'orangoutan', label: 'Tonton', icon: '🦧' },
  { id: 'village', label: 'Village', icon: '🐒' },
  { id: 'carnet', label: 'Carnet', icon: '🏆' }
]

export const MAMMOTH_BADGES = {
  vallee: 'Famille mammouth',
  sorcier: 'Mémoire magique',
  carte: 'Explorateur',
  andes: 'Andes',
  cristaux: 'Cristaux bleus',
  ballon: 'Pilote',
  afrique: 'Grand voyage',
  animaux: 'Amis de la savane',
  orangoutan: 'Conseil de Tonton',
  village: 'Mille ouistitis'
}

export const MAMMOTH_MEMORY = [
  { id: 'petit-mammouth', icon: '🦣', label: 'Petit Mammouth', clue: 'Petit Mammouth mène l’aventure.' },
  { id: 'maman', icon: '🦣', label: 'Maman Mammouth', clue: 'Maman Mammouth connaît les vents.' },
  { id: 'papa', icon: '🧭', label: 'Papa Mammouth', clue: 'Papa Mammouth répare le ballon.' },
  { id: 'ouistiti', icon: '🐒', label: 'Ouistiti', clue: 'Ouistiti cherche sa famille.' },
  { id: 'sorcier', icon: '🧙🏾', label: 'Sorcier', clue: 'Le sorcier donne les cartes.' },
  { id: 'tonton', icon: '🦧', label: 'Tonton', clue: 'Tonton connaît la forêt.' }
]

export const ANIMAL_CLUES = [
  { id: 'elephant', icon: '🐘', name: 'Éléphant', question: 'Qui se souvient des ouistitis ?', answer: 'éléphant' },
  { id: 'girafe', icon: '🦒', name: 'Girafe', question: 'Qui voit au-dessus des arbres ?', answer: 'girafe' },
  { id: 'rhino', icon: '🦏', name: 'Rhinocéros', question: 'Qui connaît le sentier solide ?', answer: 'rhinocéros' },
  { id: 'crocodile', icon: '🐊', name: 'Crocodile', question: 'Qui garde le passage de la rivière ?', answer: 'crocodile' }
]

export const ROUTE_STEPS = [
  { id: 'vallee', label: 'Vallée', icon: '🏕️' },
  { id: 'ocean', label: 'Océan', icon: '🌊' },
  { id: 'andes', label: 'Andes', icon: '⛰️' },
  { id: 'savane', label: 'Savane', icon: '🌾' },
  { id: 'foret', label: 'Forêt', icon: '🌳' }
]

export const CRYSTAL_SEQUENCE = ['petit', 'moyen', 'grand', 'moyen']

export const STORY_CHAPTERS = {
  vallee: {
    title: 'Le cristal est vide !',
    text: 'La montgolfière ne vole plus. Petit Mammouth, ses parents et Ouistiti partent chercher des cristaux bleus dans les Andes.'
  },
  sorcier: {
    title: 'Le sorcier des brumes',
    text: 'Le sorcier donne deux cartes : une pour les cristaux et une pour retrouver la famille de Ouistiti.'
  },
  andes: {
    title: 'La montagne qui chante',
    text: 'Les cristaux suivent un rythme. Il faut prendre seulement les cristaux mûrs et protéger la grotte.'
  },
  afrique: {
    title: 'La famille de Ouistiti',
    text: 'En Afrique, les animaux donnent des indices. Tonton orang-outan connaît le chemin du village.'
  }
}
