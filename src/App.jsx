import { useMemo, useState } from 'react'

const CHARACTERS = [
  { id: 'chien', name: 'Petit chien', emoji: '🐶', note: 'curieux et gentil', color: '#ff8aa6' },
  { id: 'grenouille', name: 'Grenouille', emoji: '🐸', note: 'amie de la mare', color: '#8bdc65' },
  { id: 'loup', name: 'Loup', emoji: '🐺', note: 'il apprend à faire attention au feu', color: '#c8c8c8' },
  { id: 'papi', name: 'Papi', emoji: '👴', note: 'prépare le bois', color: '#f5c16c' },
  { id: 'mamie', name: 'Mamie', emoji: '👵', note: 'jardine et soigne', color: '#f3a3c7' },
  { id: 'saitoutou', name: 'Prof. SAITOUTOU', emoji: '🤓', note: 'savant botaniste', color: '#d5b4ff' },
  { id: 'abeille', name: 'Abeille', emoji: '🐝', note: 'cherche le pollen', color: '#ffd84d' },
  { id: 'libellule', name: 'Libellule', emoji: '🪰', note: 'mange les moustiques', color: '#9fe4ff' },
  { id: 'lapin', name: 'Lapin', emoji: '🐰', note: 'aime les carottes', color: '#ffe07a' }
]

const TABS = [
  { id: 'accueil', label: 'Accueil', icon: '🏠' },
  { id: 'memo', label: 'Mémo', icon: '🃏' },
  { id: 'calcul', label: 'Calcul', icon: '➕' },
  { id: 'potager', label: 'Potager', icon: '🥕' },
  { id: 'tournesol', label: 'Tournesol', icon: '🌻' },
  { id: 'mare', label: 'Mare', icon: '🐸' },
  { id: 'bois', label: 'Bois', icon: '🪵' }
]

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function classNames(...names) {
  return names.filter(Boolean).join(' ')
}

function App() {
  const [activeTab, setActiveTab] = useState('accueil')
  const current = TABS.find((tab) => tab.id === activeTab)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="kicker">Journal officiel du Sablona</p>
          <h1>Les jeux du dos rond</h1>
          <p className="subtitle">Un jeu par onglet, sans compte enfant, avec les personnages du journal.</p>
        </div>
        <div className="header-mascot" aria-hidden="true">
          <span>🐶</span>
          <small>gratuit pour les abonnés</small>
        </div>
      </header>

      <nav className="tabs" aria-label="Choisir un jeu">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={classNames('tab-button', activeTab === tab.id && 'active')}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="paper-panel">
        <div className="current-game-title">
          <span aria-hidden="true">{current.icon}</span>
          <h2>{current.label}</h2>
        </div>
        {activeTab === 'accueil' && <Home onPlay={setActiveTab} />}
        {activeTab === 'memo' && <MemoryGame />}
        {activeTab === 'calcul' && <MathGame />}
        {activeTab === 'potager' && <GardenGame />}
        {activeTab === 'tournesol' && <SunflowerGame />}
        {activeTab === 'mare' && <PondGame />}
        {activeTab === 'bois' && <WoodQuiz />}
      </main>
    </div>
  )
}

function Home({ onPlay }) {
  return (
    <section className="home-grid">
      <div className="intro-card">
        <h3>Bienvenue au Sablona !</h3>
        <p>
          Le petit chien visite le jardin, la mare, le bois et la maison de Papi et Mamie. Chaque onglet ouvre un mini-jeu
          court, lisible et pensé pour les 7–8 ans.
        </p>
        <button className="primary-action" type="button" onClick={() => onPlay('memo')}>Commencer avec le Mémo</button>
      </div>
      <div className="character-board" aria-label="Personnages">
        {CHARACTERS.map((character) => (
          <article className="character-chip" key={character.id} style={{ '--chip': character.color }}>
            <span>{character.emoji}</span>
            <strong>{character.name}</strong>
            <small>{character.note}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function GameFrame({ helper, children, actions }) {
  return (
    <section className="game-frame">
      <p className="helper">{helper}</p>
      {children}
      {actions && <div className="game-actions">{actions}</div>}
    </section>
  )
}

function makeMemoryDeck() {
  return shuffle(
    CHARACTERS.slice(0, 8).flatMap((character) => [
      { ...character, cardId: `${character.id}-a` },
      { ...character, cardId: `${character.id}-b` }
    ])
  )
}

function MemoryGame() {
  const [deck, setDeck] = useState(makeMemoryDeck)
  const [openCards, setOpenCards] = useState([])
  const [matchedIds, setMatchedIds] = useState([])
  const [attempts, setAttempts] = useState(0)

  const won = matchedIds.length === 8

  function reset() {
    setDeck(makeMemoryDeck())
    setOpenCards([])
    setMatchedIds([])
    setAttempts(0)
  }

  function openCard(card, index) {
    if (openCards.length === 2 || matchedIds.includes(card.id) || openCards.some((item) => item.index === index)) return
    const nextOpen = [...openCards, { ...card, index }]
    setOpenCards(nextOpen)

    if (nextOpen.length === 2) {
      setAttempts((value) => value + 1)
      const [first, second] = nextOpen
      if (first.id === second.id) {
        window.setTimeout(() => {
          setMatchedIds((ids) => [...ids, first.id])
          setOpenCards([])
        }, 500)
      } else {
        window.setTimeout(() => setOpenCards([]), 800)
      }
    }
  }

  return (
    <GameFrame
      helper="Retrouve les paires de personnages. Observe bien, puis retourne deux cartes."
      actions={<button type="button" onClick={reset}>Recommencer</button>}
    >
      <div className="score-line"><span>Essais : {attempts}</span><span>Paires : {matchedIds.length}/8</span></div>
      <div className="memory-grid">
        {deck.map((card, index) => {
          const visible = matchedIds.includes(card.id) || openCards.some((item) => item.index === index)
          return (
            <button
              key={card.cardId}
              className={classNames('memory-card', visible && 'revealed')}
              type="button"
              onClick={() => openCard(card, index)}
              aria-label={visible ? card.name : 'Carte cachée'}
            >
              {visible ? <><span className="big-emoji">{card.emoji}</span><strong>{card.name}</strong></> : <span className="question">?</span>}
            </button>
          )
        })}
      </div>
      {won && <p className="success-bubble">Bravo ! Tous les amis du journal sont retrouvés.</p>}
    </GameFrame>
  )
}

function buildMathQuestion(level) {
  const max = level < 4 ? 10 : 20
  const op = Math.random() > 0.45 ? '+' : '-'
  let a = 1 + Math.floor(Math.random() * max)
  let b = 1 + Math.floor(Math.random() * max)
  if (op === '-' && b > a) [a, b] = [b, a]
  const answer = op === '+' ? a + b : a - b
  const options = new Set([answer])
  while (options.size < 4) {
    options.add(Math.max(0, answer + Math.floor(Math.random() * 9) - 4))
  }
  return { a, b, op, answer, options: shuffle([...options]) }
}

function MathGame() {
  const [level, setLevel] = useState(1)
  const [question, setQuestion] = useState(() => buildMathQuestion(1))
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('Le petit chien attend ta réponse pour avancer dans le jardin.')

  function answer(value) {
    if (value === question.answer) {
      const nextLevel = Math.min(level + 1, 8)
      setScore((current) => current + 1)
      setLevel(nextLevel)
      setFeedback('Oui ! Le petit chien avance encore.')
      setQuestion(buildMathQuestion(nextLevel))
    } else {
      setFeedback('Presque. Compte doucement avec tes doigts puis essaie encore.')
    }
  }

  return (
    <GameFrame helper="Choisis le bon résultat. À chaque bonne réponse, le petit chien se rapproche des salades.">
      <div className="math-scene">
        <div className="path">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className={index < level ? 'path-dot done' : 'path-dot'}>{index < level ? '🐾' : '·'}</span>
          ))}
          <span className="garden-goal">🥬</span>
        </div>
        <div className="sum-card" aria-live="polite">
          <span>{question.a}</span>
          <span>{question.op}</span>
          <span>{question.b}</span>
          <span>=</span>
          <span>?</span>
        </div>
        <div className="answer-grid">
          {question.options.map((option) => (
            <button key={option} type="button" onClick={() => answer(option)}>{option}</button>
          ))}
        </div>
        <p className="feedback">{feedback}</p>
        <p className="score-line"><span>Bonnes réponses : {score}</span><span>Niveau : {level}</span></p>
      </div>
    </GameFrame>
  )
}

const PRODUCE = [
  { id: 's1', type: 'salade', label: 'Salade', icon: '🥬' },
  { id: 's2', type: 'salade', label: 'Salade', icon: '🥬' },
  { id: 'c1', type: 'carotte', label: 'Carotte', icon: '🥕' },
  { id: 'c2', type: 'carotte', label: 'Carotte', icon: '🥕' },
  { id: 'p1', type: 'poireau', label: 'Poireau', icon: '🧅' },
  { id: 'p2', type: 'poireau', label: 'Poireau', icon: '🧅' }
]

function GardenGame() {
  const [items, setItems] = useState(() => shuffle(PRODUCE))
  const [done, setDone] = useState([])
  const [feedback, setFeedback] = useState('Mamie a tout désherbé. Range chaque légume dans le bon panier.')

  function reset() {
    setItems(shuffle(PRODUCE))
    setDone([])
    setFeedback('Mamie a tout désherbé. Range chaque légume dans le bon panier.')
  }

  function choose(item, basket) {
    if (item.type === basket) {
      setDone((ids) => [...ids, item.id])
      setFeedback(`${item.label} bien rangé !`)
    } else {
      setFeedback(`Regarde encore : ce n’est pas le panier des ${basket}s.`)
    }
  }

  return (
    <GameFrame helper="Clique sur le bon panier : salade, carotte ou poireau." actions={<button type="button" onClick={reset}>Mélanger</button>}>
      <div className="garden-list">
        {items.map((item) => {
          const completed = done.includes(item.id)
          return (
            <article className={classNames('produce-card', completed && 'completed')} key={item.id}>
              <span className="big-emoji">{completed ? '✅' : item.icon}</span>
              <strong>{item.label}</strong>
              {!completed && (
                <div className="basket-buttons">
                  <button type="button" onClick={() => choose(item, 'salade')}>🥬 Salades</button>
                  <button type="button" onClick={() => choose(item, 'carotte')}>🥕 Carottes</button>
                  <button type="button" onClick={() => choose(item, 'poireau')}>🧅 Poireaux</button>
                </div>
              )}
            </article>
          )
        })}
      </div>
      <p className="feedback">{feedback}</p>
      {done.length === PRODUCE.length && <p className="success-bubble">Le potager est prêt pour la soupe de Mamie !</p>}
    </GameFrame>
  )
}

const STAGES = [
  { id: 'graine', label: 'La graine est plantée', icon: '🌰' },
  { id: 'germe', label: 'Elle germe', icon: '🌱' },
  { id: 'racines', label: 'Les racines grandissent', icon: '🪴' },
  { id: 'bourgeon', label: 'Le bourgeon apparaît', icon: '🌿' },
  { id: 'fleur', label: 'La fleur s’ouvre', icon: '🌻' },
  { id: 'graines', label: 'Les graines se forment', icon: '🌰' }
]

function SunflowerGame() {
  const [choices, setChoices] = useState(() => shuffle(STAGES))
  const [order, setOrder] = useState([])
  const [checked, setChecked] = useState(false)

  const correct = checked && order.every((stage, index) => stage.id === STAGES[index].id)

  function reset() {
    setChoices(shuffle(STAGES))
    setOrder([])
    setChecked(false)
  }

  function pick(stage) {
    if (checked) return
    setOrder((current) => [...current, stage])
    setChoices((current) => current.filter((item) => item.id !== stage.id))
  }

  return (
    <GameFrame helper="Aide le professeur SAITOUTOU : remets la vie du tournesol dans le bon ordre." actions={<button type="button" onClick={reset}>Recommencer</button>}>
      <div className="sequence-area">
        <div>
          <h3>Étapes à choisir</h3>
          <div className="stage-grid">
            {choices.map((stage) => (
              <button key={stage.id} type="button" onClick={() => pick(stage)} className="stage-card">
                <span>{stage.icon}</span>{stage.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3>Ton ordre</h3>
          <ol className="order-list">
            {order.map((stage) => <li key={stage.id}><span>{stage.icon}</span>{stage.label}</li>)}
          </ol>
          {order.length === STAGES.length && !checked && (
            <button className="primary-action" type="button" onClick={() => setChecked(true)}>Vérifier</button>
          )}
        </div>
      </div>
      {checked && correct && <p className="success-bubble">Exact ! Le professeur SAITOUTOU est très fier.</p>}
      {checked && !correct && <p className="feedback">Il y a une étape à déplacer. Recommence et cherche ce qui vient juste après la graine.</p>}
    </GameFrame>
  )
}

function makePondBoard() {
  const pool = [
    { id: 'm1', label: 'Moustique', icon: '🦟', target: true },
    { id: 'm2', label: 'Moustique', icon: '🦟', target: true },
    { id: 'l1', label: 'Libellule', icon: '🪰', target: false },
    { id: 'a1', label: 'Abeille', icon: '🐝', target: false },
    { id: 'f1', label: 'Fleur de nénuphar', icon: '🪷', target: false }
  ]
  return shuffle(pool).slice(0, 4)
}

function PondGame() {
  const [board, setBoard] = useState(makePondBoard)
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)
  const [misses, setMisses] = useState(0)
  const [feedback, setFeedback] = useState('Clique les moustiques. Laisse les libellules : elles aident la grenouille.')

  function reset() {
    setBoard(makePondBoard())
    setRound(1)
    setScore(0)
    setMisses(0)
    setFeedback('Clique les moustiques. Laisse les libellules : elles aident la grenouille.')
  }

  function select(creature) {
    if (round > 10) return
    if (creature.target) {
      setScore((value) => value + 1)
      setFeedback('Miam ! La grenouille est contente.')
    } else {
      setMisses((value) => value + 1)
      setFeedback(`${creature.label} n’est pas un moustique. On le laisse tranquille.`)
    }
    setRound((value) => value + 1)
    setBoard(makePondBoard())
  }

  const finished = round > 10

  return (
    <GameFrame helper="Jeu d’observation : protège le petit chien des moustiques sans embêter les amis de la mare." actions={<button type="button" onClick={reset}>Nouvelle partie</button>}>
      <div className="pond-scene">
        <div className="frog">🐸<span>Bonjour le petit chien !</span></div>
        {!finished ? (
          <div className="creature-grid">
            {board.map((creature) => (
              <button key={creature.id} type="button" className="creature-card" onClick={() => select(creature)}>
                <span>{creature.icon}</span>{creature.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="success-bubble">Partie terminée : {score} moustiques attrapés, {misses} amis dérangés.</p>
        )}
      </div>
      <p className="score-line"><span>Tour : {Math.min(round, 10)}/10</span><span>Score : {score}</span></p>
      <p className="feedback">{feedback}</p>
    </GameFrame>
  )
}

const WOOD_QUESTIONS = [
  {
    text: 'Quand le petit chien va aider à couper du bois, que doit-il mettre ?',
    options: ['Un casque', 'Des patins', 'Un chapeau de fête'],
    answer: 'Un casque'
  },
  {
    text: 'Le loup ne connaît pas le feu. Que faut-il faire ?',
    options: ['Laisser le loup toucher', 'Mettre un pare-feu', 'Cacher la soupe'],
    answer: 'Mettre un pare-feu'
  },
  {
    text: 'Pourquoi Mamie dit-elle de faire attention à la hache ?',
    options: ['Ça coupe', 'Ça chante', 'Ça pousse dans le jardin'],
    answer: 'Ça coupe'
  },
  {
    text: 'Avant de brûler le bois, Papi et Mamie le laissent...',
    options: ['bien sécher', 'manger des carottes', 'partir à la mare'],
    answer: 'bien sécher'
  }
]

function WoodQuiz() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('Réponds avec Papi, Mamie et le loup.')
  const current = WOOD_QUESTIONS[index]
  const finished = index >= WOOD_QUESTIONS.length

  function reset() {
    setIndex(0)
    setScore(0)
    setFeedback('Réponds avec Papi, Mamie et le loup.')
  }

  function answer(option) {
    if (option === current.answer) {
      setScore((value) => value + 1)
      setFeedback('Oui, c’est prudent !')
    } else {
      setFeedback(`Pas tout à fait. La bonne réponse était : ${current.answer}.`)
    }
    window.setTimeout(() => setIndex((value) => value + 1), 700)
  }

  return (
    <GameFrame helper="Un quiz très court sur la sécurité : bois, feu, hache et pare-feu." actions={<button type="button" onClick={reset}>Recommencer</button>}>
      <div className="wood-scene">
        <div className="fireplace" aria-hidden="true">👵 🐺 🔥 👴</div>
        {!finished ? (
          <article className="quiz-card">
            <h3>{current.text}</h3>
            <div className="answer-grid">
              {current.options.map((option) => <button key={option} type="button" onClick={() => answer(option)}>{option}</button>)}
            </div>
          </article>
        ) : (
          <p className="success-bubble">Quiz terminé : {score}/{WOOD_QUESTIONS.length}. Le loup a tout compris.</p>
        )}
        <p className="feedback">{feedback}</p>
      </div>
    </GameFrame>
  )
}

export default App
