export const MAMMOTH_TABS = [
  { id: 'accueil', label: 'Départ', icon: '🏕️' },
  { id: 'vallee', label: 'La vallée', icon: '🦣' },
  { id: 'sorcier', label: 'Le sorcier', icon: '🧙🏾' },
  { id: 'carte', label: 'Carte sacrée', icon: '🗺️' },
  { id: 'andes', label: 'Les Andes', icon: '⛰️' },
  { id: 'cristaux', label: 'Cristaux bleus', icon: '💎' },
  { id: 'ballon', label: 'Montgolfière', icon: '🎈' },
  { id: 'afrique', label: 'Afrique', icon: '🌍' },
  { id: 'animaux', label: 'Les animaux', icon: '🦒' },
  { id: 'orangoutan', label: 'Tonton orang-outan', icon: '🦧' },
  { id: 'village', label: 'Village ouistiti', icon: '🐒' },
  { id: 'carnet', label: 'Carnet final', icon: '🏆' }
]

export const MAMMOTH_BADGES = {
  vallee: 'Badge de la famille mammouth',
  sorcier: 'Badge de l’énigme magique',
  carte: 'Badge du cartographe',
  andes: 'Badge du passage des Andes',
  cristaux: 'Badge des cristaux bleus',
  ballon: 'Badge du pilote de montgolfière',
  afrique: 'Badge du grand voyage',
  animaux: 'Badge des amis de la savane',
  orangoutan: 'Badge du conseil de Tonton',
  village: 'Badge des mille ouistitis'
}

export const MAMMOTH_MEMORY = [
  { id: 'milo', icon: '🦣', label: 'Milo', clue: 'Le petit mammouth curieux qui conduit l’aventure.' },
  { id: 'maman', icon: '👩‍🍼', label: 'Maman Mammouth', clue: 'Elle connaît les vents et garde la famille unie.' },
  { id: 'papa', icon: '🧭', label: 'Papa Mammouth', clue: 'Il répare la montgolfière et lit les instruments.' },
  { id: 'kiki', icon: '🐒', label: 'Kiki le ouistiti', clue: 'Rapide, drôle et déterminé à retrouver sa famille.' },
  { id: 'sorcier', icon: '🧙🏾', label: 'Le sorcier des brumes', clue: 'Il révèle les cartes seulement aux voyageurs attentifs.' },
  { id: 'tonton', icon: '🦧', label: 'Tonton orang-outan', clue: 'Il connaît les pistes secrètes de la grande forêt.' }
]

export const ANIMAL_CLUES = [
  { id: 'elephant', icon: '🐘', name: 'Éléphant', question: 'Qui se souvient du passage d’un grand groupe de petits singes ?', answer: 'éléphant' },
  { id: 'girafe', icon: '🦒', name: 'Girafe', question: 'Qui peut regarder au-dessus des acacias pour repérer de petites cabanes ?', answer: 'girafe' },
  { id: 'rhino', icon: '🦏', name: 'Rhinocéros', question: 'Qui connaît le sentier solide qui traverse les hautes herbes ?', answer: 'rhinocéros' },
  { id: 'crocodile', icon: '🐊', name: 'Crocodile grincheux', question: 'Qui garde le gué et demande une énigme avant de laisser passer ?', answer: 'crocodile' }
]

export const ROUTE_STEPS = [
  { id: 'vallee', label: 'Vallée des Mammouths', icon: '🏕️' },
  { id: 'ocean', label: 'Océan', icon: '🌊' },
  { id: 'andes', label: 'Montagne sacrée des Andes', icon: '⛰️' },
  { id: 'savane', label: 'Savane africaine', icon: '🌾' },
  { id: 'foret', label: 'Forêt des ouistitis', icon: '🌳' }
]

export const CRYSTAL_SEQUENCE = ['petit', 'moyen', 'grand', 'moyen']

export const STORY_CHAPTERS = {
  vallee: {
    title: 'Le souffle bleu s’éteint',
    text: 'Dans la Vallée des Mammouths, Milo vit avec ses deux parents dans une maison ronde, juste à côté de leur montgolfière familiale. Un matin, le brûleur tousse : le dernier cristal d’hélium bleu a perdu sa lumière. Sans nouveaux cristaux, plus aucun grand voyage n’est possible. Kiki, le meilleur ami ouistiti de Milo, propose de partir chercher la montagne sacrée d’Amérique du Sud où les cristaux naissent dans la roche.'
  },
  sorcier: {
    title: 'La tente du sorcier des brumes',
    text: 'Le sorcier n’offre jamais une carte entière. Il remet trois fragments aux enfants capables d’observer, de mémoriser et de raisonner. Sa première carte indique la montagne sacrée. Une seconde carte, cachée derrière un symbole de lune, indique un ancien chemin vers l’Afrique et le village perdu des ouistitis.'
  },
  andes: {
    title: 'La montagne qui chante',
    text: 'Au-dessus des nuages, les parois des Andes résonnent comme un xylophone. Les cristaux bleus ne doivent pas être arrachés au hasard : il faut suivre le rythme de la montagne et ne prendre que les cristaux arrivés à maturité. Chaque cristal alimente un voyage, mais la famille doit aussi protéger la grotte pour les générations futures.'
  },
  afrique: {
    title: 'La piste des mille voix',
    text: 'Une fois la montgolfière réparée, Kiki avoue qu’il rêve de retrouver sa famille. La carte du sorcier conduit la troupe jusqu’en Afrique. Éléphants, girafes et rhinocéros offrent chacun une partie de l’itinéraire. Un crocodile grincheux bloque le gué, avant que Tonton orang-outan n’explique comment atteindre le village caché où vivent des milliers de ouistitis.'
  }
}
