export const imagePath = (name) => `/assets/${name}`

export const IMAGES = {
  ferme: imagePath('decor-ferme-bollene-tonton-final.png'),
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
  { id: 'ferme', label: 'Ferme', icon: '🌹' },
  { id: 'potager', label: 'Potager', icon: '🥕' },
  { id: 'poulailler', label: 'Poulailler', icon: '🐔' },
  { id: 'mare', label: 'Mare', icon: '🐸' },
  { id: 'montagne', label: 'Montagne', icon: '⛰️' },
  { id: 'parapente', label: 'Parapente', icon: '🪂' },
  { id: 'port', label: 'Port de By', icon: '⛵' },
  { id: 'journal', label: 'Journal final', icon: '🏆' }
]

export const STAMPS = {
  ferme: 'Tampon Ferme',
  potager: 'Tampon Potager',
  poulailler: 'Tampon Poulailler',
  mare: 'Tampon Mare',
  montagne: 'Tampon Montagne',
  parapente: 'Tampon Parapente',
  port: 'Tampon Port de By'
}

export const SIMPLE_GAMES = {
  ferme: {
    image: IMAGES.ferme,
    alt: 'Ferme longue avec véranda, roses, tilleul et poulailler',
    helper: 'Repère les trois allées qui partent de la véranda.',
    missions: [
      { q: 'Va vers les roses de Mamie.', a: 'allée des roses', options: ['allée du tilleul', 'allée des roses', 'allée du poulailler'] },
      { q: 'Va voir les poules près du figuier.', a: 'allée du poulailler', options: ['allée centrale', 'allée du poulailler', 'allée de la Garonne'] },
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
      { q: 'Les petites rivières se rejoignent pour aller vers...', a: 'la Garonne', options: ['la Garonne', 'la montagne', 'le potager'] },
      { q: 'Quel objet avance dans le chenal ?', a: 'le petit bateau', options: ['le petit bateau', 'la brouette', 'le poêle'] }
    ]
  }
}
