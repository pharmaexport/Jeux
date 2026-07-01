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
  enfants: imagePath('scene-enfants-potager-style-journal.png'),
  differencesA: imagePath('differences_image_A_jardin_original.png'),
  differencesB: imagePath('differences_image_B_jardin_modifie.png')
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
  { id: 'shovel', icon: '🪏', label: 'la pelle du jardin', target: true },
  { id: 'carrots', icon: '🥕', label: 'les carottes', target: true },
  { id: 'leeks', icon: '🌱', label: 'les poireaux', target: true },
  { id: 'lettuces', icon: '🥬', label: 'les salades', target: true },
  { id: 'cap', icon: '🧢', label: 'la casquette rouge', target: true },
  { id: 'glasses', icon: '👓', label: 'les lunettes du jardinier', target: false },
  { id: 'sun', icon: '☀️', label: 'le soleil', target: false },
  { id: 'house', icon: '🏠', label: 'la maison', target: false },
  { id: 'tree', icon: '🌳', label: 'le grand arbre', target: false },
  { id: 'fence', icon: '🪵', label: 'la clôture', target: false }
]

export const DIFFERENCE_ITEMS = [
  { id: 'cap-blue', label: 'La casquette du petit chien devient bleue.', target: true },
  { id: 'carrot-missing', label: 'Une carotte a disparu du rang du potager.', target: true },
  { id: 'cloud-sun', label: 'Un nuage cache une partie du soleil.', target: true },
  { id: 'door-heart', label: 'Le cœur sur la porte de la maison a disparu.', target: true },
  { id: 'leek-missing', label: 'Il manque un poireau à droite du potager.', target: true },
  { id: 'butterfly', label: 'Un papillon apparaît près du grand arbre.', target: true },
  { id: 'pumpkin', label: 'Une salade est remplacée par une citrouille.', target: true },
  { id: 'mountain', label: 'La montagne a disparu derrière la maison.', target: false },
  { id: 'dog-gone', label: 'Le petit chien n’est plus dans l’image.', target: false },
  { id: 'house-color', label: 'La maison est devenue violette.', target: false }
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
