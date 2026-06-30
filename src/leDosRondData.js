export const imagePath = (name) => `/assets/${name}`

export const IMAGES = {
  ferme: imagePath('decor-ferme-papamie-final.png'),
  potager: imagePath('scene-potager-papi-mamie.png'),
  poule: imagePath('personnage-poule-oeuf.png'),
  mare: imagePath('decor-mare-libellule-nenuphar.png'),
  montagne: imagePath('decor-maison-montagne-tonton.png'),
  tonton: imagePath('personnage-tonton-jardin-montagne.png'),
  maman: imagePath('personnage-maman-parapente.png'),
  papa: imagePath('personnage-papa-parapente.png'),
  port: imagePath('decor-cabane-port-de-by-simplifiee.png'),
  chienLecture: imagePath('personnage-petit-chien-lecture.png'),
  chienArrose: imagePath('personnage-petit-chien-arrose-plante.png'),
  tournesol: imagePath('decor-tournesol-abeille.png'),
  enfants: imagePath('scene-enfants-potager-style-journal.png')
}

export const TABS = [
  { id: 'accueil', label: 'Accueil', icon: '🗞️' },
  { id: 'memo', label: 'Mémo', icon: '🃏' },
  { id: 'ferme', label: 'Ferme', icon: '🌹' },
  { id: 'potager', label: 'Potager', icon: '🥕' },
  { id: 'poulailler', label: 'Poulailler', icon: '🐔' },
  { id: 'mare', label: 'Mare', icon: '🐸' },
  { id: 'montagne', label: 'Montagne', icon: '⛰️' },
  { id: 'parapente', label: 'Parapente', icon: '🪂' },
  { id: 'port', label: 'Port de By', icon: '⛵' },
  { id: 'cachecache', label: 'Cherche et trouve', icon: '🔎' },
  { id: 'differences', label: 'Différences', icon: '🧐' },
  { id: 'journal', label: 'Journal final', icon: '🏆' }
]

export const STAMPS = {
  memo: 'Tampon Mémo des personnages',
  ferme: 'Tampon Ferme',
  potager: 'Tampon Potager',
  poulailler: 'Tampon Poulailler',
  mare: 'Tampon Mare',
  montagne: 'Tampon Montagne',
  parapente: 'Tampon Parapente',
  port: 'Tampon Port de By',
  cachecache: 'Tampon Cherche et trouve',
  differences: 'Tampon Jeu des différences'
}

export const MEMORY_CARDS = [
  { id: 'chien', icon: '🐶', label: 'Petit chien reporter', clue: 'Il veut aider tout le monde, même les bûches.' },
  { id: 'grenouille', icon: '🐸', label: 'Grenouille téléphone', clue: 'Elle donne des nouvelles depuis la mare.' },
  { id: 'mamie', icon: '👵', label: 'Mamie prudente', clue: 'Elle surveille la hache, le maïs et les poules.' },
  { id: 'papi', icon: '👴', label: 'Papi du Sablona', clue: 'Il connaît les bois, les poules et le poêle.' },
  { id: 'poule', icon: '🐔', label: 'Poule coquine', clue: 'Elle préfère l’herbe de la pelouse de Mamie.' },
  { id: 'tonton', icon: '🚗', label: 'Tonton en voiture', clue: 'Il file vers la petite maison de la montagne.' }
]

export const SEEK_ITEMS = [
  { id: 'helmet', icon: '🪖', label: 'le casque du petit chien', target: true },
  { id: 'axe', icon: '🪓', label: 'la grosse hache très dangereuse', target: true },
  { id: 'maize', icon: '🌽', label: 'le maïs que les rats adorent', target: true },
  { id: 'hot-chocolate', icon: '☕', label: 'le chocolat chaud du soir', target: true },
  { id: 'phone-frog', icon: '☎️', label: 'le téléphone de la grenouille', target: true },
  { id: 'sleepy-rabbit', icon: '🐰', label: 'le lapin qui creuse trop', target: false },
  { id: 'stove', icon: '🔥', label: 'le poêle qui attend l’hiver', target: false },
  { id: 'new-car', icon: '🚗', label: 'la nouvelle voiture de Tonton', target: false }
]

export const DIFFERENCE_ITEMS = [
  { id: 'casque', label: 'Le petit chien a oublié son casque avant de partir couper du bois.', target: true },
  { id: 'grenouille', label: 'La grenouille téléphone depuis son nénuphar dans une image seulement.', target: true },
  { id: 'mais', label: 'Un rat a chipé un grain de maïs de Mamie.', target: true },
  { id: 'chocolat', label: 'Un bol de chocolat chaud a changé de couleur.', target: true },
  { id: 'hache', label: 'La grosse hache est rangée du mauvais côté de la remorque.', target: true },
  { id: 'papi', label: 'Papi est devenu une libellule.', target: false },
  { id: 'gironde', label: 'La Gironde monte jusqu’à la montagne de Tonton.', target: false },
  { id: 'journal', label: 'Le journal est imprimé à l’envers par la poule.', target: false }
]

export const SIMPLE_GAMES = {
  ferme: {
    image: IMAGES.ferme,
    alt: 'Ferme longue avec véranda, roses, tilleul et poulailler',
    helper: 'Repère les trois allées qui partent de la véranda.',
    missions: [
      { q: 'Va vers les roses de Mamie.', a: 'allée des roses', options: ['allée du tilleul', 'allée des roses', 'allée du poulailler'] },
      { q: 'Va voir les poules près du figuier.', a: 'allée du poulailler', options: ['allée centrale', 'allée du poulailler', 'allée de la Gironde'] },
      { q: 'Va te reposer sous le grand tilleul.', a: 'allée du tilleul', options: ['allée du tilleul', 'allée des bateaux', 'allée du poêle'] }
    ]
  },
  poulailler: {
    image: IMAGES.poule,
    alt: 'Poule du journal Le dos rond',
    helper: 'Range le poulailler sans déranger les canards.',
    missions: [
      { q: 'Les poules ont faim. Que leur donnes-tu ?', a: 'des graines', options: ['des graines', 'des nuages', 'des cailloux'] },
      { q: 'Les canards préfèrent aller...', a: 'vers l’eau', options: ['vers l’eau', 'dans la cheminée', 'sur le toit'] },
      { q: 'L’œuf va dans...', a: 'le panier', options: ['le panier', 'la rivière', 'le cartable'] }
    ]
  },
  port: {
    image: IMAGES.port,
    alt: 'Cabane du port de By et petits bateaux',
    helper: 'Guide le petit bateau entre les cabanes du port de By.',
    missions: [
      { q: 'Quelle cabane faut-il retrouver ?', a: 'la troisième', options: ['la première', 'la troisième', 'la vingtième'] },
      { q: 'Les petites rivières se rejoignent pour aller vers...', a: 'la Gironde', options: ['la Gironde', 'la montagne', 'le potager'] },
      { q: 'Quel objet avance dans le chenal ?', a: 'le petit bateau', options: ['le petit bateau', 'la brouette', 'le poêle'] }
    ]
  }
}
