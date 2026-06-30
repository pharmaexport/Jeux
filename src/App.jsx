import React, { useState } from 'react'
import {
  DIFFERENCE_ITEMS,
  IMAGES,
  MEMORY_CARDS,
  SEEK_ITEMS,
  SIMPLE_GAMES,
  STAMPS,
  TABS
} from './leDosRondData.js'

function classNames(...names) {
  return names.filter(Boolean).join(' ')
}

function medalLabel(label) {
  return label.replace('Tampon', 'Médaille')
}

function shuffleItems(items) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = current
  }
  return shuffled
}

function App() {
  const [activeTab, setActiveTab] = useState('accueil')
  const [stamps, setStamps] = useState([])
  const [rewardMedal, setRewardMedal] = useState(null)
  const current = TABS.find((tab) => tab.id === activeTab) ?? TABS[0]
  const medalTarget = Object.keys(STAMPS).length

  function earnStamp(id) {
    setStamps((currentStamps) => currentStamps.includes(id) ? currentStamps : [...currentStamps, id])
    setRewardMedal({ id, label: medalLabel(STAMPS[id] ?? 'Médaille') })
  }

  return (
    <div className="app-shell dos-rond">
      <header className="site-header hand-frame">
        <div>
          <p className="kicker">Journal officiel du Sablona</p>
          <h1>Le dos rond</h1>
          <p className="subtitle">Grand reportage du petit chien — une mission par onglet.</p>
        </div>
        <div className="header-mascot" aria-label="Carnet de médailles">
          <span>{stamps.length}/{medalTarget}</span>
          <small>médailles de reportage</small>
        </div>
      </header>

      <nav className="tabs" aria-label="Choisir une mission">
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

      <main className="paper-panel hand-frame">
        <div className="current-game-title">
          <span aria-hidden="true">{current.icon}</span>
          <h2>{current.label}</h2>
        </div>

        {activeTab === 'accueil' && <Home stamps={stamps} onPlay={setActiveTab} />}
        {activeTab === 'memo' && <MemoryMission onWin={earnStamp} />}
        {activeTab === 'ferme' && <SimpleMission id="ferme" onWin={earnStamp} />}
        {activeTab === 'potager' && <GardenMission onWin={earnStamp} />}
        {activeTab === 'poulailler' && <SimpleMission id="poulailler" onWin={earnStamp} />}
        {activeTab === 'mare' && <PondMission onWin={earnStamp} />}
        {activeTab === 'montagne' && <MountainMission onWin={earnStamp} />}
        {activeTab === 'parapente' && <ParaglidingMission onWin={earnStamp} />}
        {activeTab === 'port' && <SimpleMission id="port" onWin={earnStamp} />}
        {activeTab === 'cachecache' && <SeekMission onWin={earnStamp} />}
        {activeTab === 'differences' && <DifferenceMission onWin={earnStamp} />}
        {activeTab === 'journal' && <FinalJournal stamps={stamps} />}
      </main>

      {rewardMedal && <MedalOverlay medal={rewardMedal} onClose={() => setRewardMedal(null)} />}
    </div>
  )
}

function MedalOverlay({ medal, onClose }) {
  return (
    <div className="medal-overlay" role="dialog" aria-modal="true" aria-label="Médaille gagnée" onClick={onClose}>
      <div className="medal-overlay-card hand-frame" onClick={(event) => event.stopPropagation()}>
        <p className="medal-overlay-kicker">Bravo !</p>
        <div className="giant-medal" aria-hidden="true">★</div>
        <h3>{medal.label}</h3>
        <p>Elle est ajoutée au carnet du petit reporter.</p>
        <button className="primary-action" type="button" onClick={onClose}>Continuer</button>
      </div>
    </div>
  )
}

function Home({ stamps, onPlay }) {
  return (
    <section className="home-grid">
      <article className="intro-card hand-frame">
        <h3>Le grand reportage</h3>
        <p>
          Le petit chien prépare un nouveau numéro du journal. Il visite la ferme de Papi et Mamie,
          le potager, la mare, la montagne de Tonton, le ciel en parapente et le port de By.
        </p>
        <p>
          Trois jeux bonus complètent le reportage : un mémo des personnages, un cherche et trouve
          et un jeu des différences, avec l’humour du Dos rond.
        </p>
        <p>Chaque mission réussie ajoute une médaille. Quand le carnet est complet, le journal final est prêt.</p>
        <div className="home-actions">
          <button className="primary-action" type="button" onClick={() => onPlay('ferme')}>Commencer par la ferme</button>
          <button className="primary-action secondary-action" type="button" onClick={() => onPlay('memo')}>Essayer le mémo</button>
        </div>
      </article>
      <article className="intro-card image-card hand-frame">
        <SafeImage src={IMAGES.ferme} alt="Ferme de Papi et Mamie" />
      </article>
      <MedalBook stamps={stamps} />
    </section>
  )
}

function MedalBook({ stamps }) {
  return (
    <article className="intro-card medal-book-panel hand-frame">
      <h3>Carnet de médailles</h3>
      <div className="medal-grid">
        {Object.entries(STAMPS).map(([id, label]) => (
          <span key={id} className={classNames('medal', stamps.includes(id) && 'earned')}>
            <span aria-hidden="true">🏅</span>{stamps.includes(id) ? ' ' : ' '}{medalLabel(label)}
          </span>
        ))}
      </div>
    </article>
  )
}

function SafeImage({ src, alt }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="image-fallback hand-frame">
        <span className="fallback-doodle">✎</span>
        <strong>Dessin à charger</strong>
        <em>{alt}</em>
      </div>
    )
  }
  return <img className="story-image hand-frame" src={src} alt={alt} onError={() => setFailed(true)} />
}

function MissionFrame({ image, alt, helper, children }) {
  return (
    <section className="game-frame story-frame hand-frame">
      <p className="helper hand-frame">{helper}</p>
      <div className="story-layout">
        <SafeImage src={image} alt={alt} />
        <div className="mission-box hand-frame">{children}</div>
      </div>
    </section>
  )
}

function SimpleMission({ id, onWin }) {
  const game = SIMPLE_GAMES[id]
  const [missionDeck] = useState(() => game.missions.map((mission) => ({
    ...mission,
    options: shuffleItems(mission.options)
  })))
  const [step, setStep] = useState(0)
  const [feedback, setFeedback] = useState('Choisis la bonne réponse.')
  const finished = step >= missionDeck.length
  const mission = missionDeck[step]

  function answer(choice) {
    if (finished) return
    if (choice === mission.a) {
      const next = step + 1
      setStep(next)
      if (next === missionDeck.length) {
        setFeedback('Mission réussie : médaille ajoutée au carnet !')
        onWin(id)
      } else {
        setFeedback('Oui, le reportage continue.')
      }
    } else {
      setFeedback('Regarde bien l’image et essaie encore.')
    }
  }

  return (
    <MissionFrame image={game.image} alt={game.alt} helper={game.helper}>
      <h3>{finished ? 'Mission terminée' : mission.q}</h3>
      {!finished && <div className="answer-grid">{mission.options.map((option) => <button key={option} type="button" onClick={() => answer(option)}>{option}</button>)}</div>}
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{feedback}</p>
    </MissionFrame>
  )
}

function MemoryMission({ onWin }) {
  const [deck] = useState(() => shuffleItems(MEMORY_CARDS.flatMap((card) => [
    { ...card, cardId: `${card.id}-1`, pairId: card.id },
    { ...card, cardId: `${card.id}-2`, pairId: card.id }
  ])))
  const [selected, setSelected] = useState([])
  const [matched, setMatched] = useState([])
  const [feedback, setFeedback] = useState('Retourne deux cartes pour retrouver les personnages du journal.')
  const finished = matched.length === MEMORY_CARDS.length

  function pick(card) {
    if (finished || matched.includes(card.pairId) || selected.includes(card.cardId) || selected.length === 2) return

    const nextSelected = [...selected, card.cardId]
    setSelected(nextSelected)

    if (nextSelected.length === 1) {
      setFeedback(`${card.label} attend sa paire. Le journal retient son souffle.`)
      return
    }

    const firstCard = deck.find((item) => item.cardId === nextSelected[0])
    if (firstCard.pairId === card.pairId) {
      const nextMatched = [...matched, card.pairId]
      setMatched(nextMatched)
      setSelected([])
      if (nextMatched.length === MEMORY_CARDS.length) {
        setFeedback('Toutes les paires sont retrouvées : le petit chien peut boucler son reportage !')
        onWin('memo')
      } else {
        setFeedback(`${card.label} retrouvé. ${card.clue}`)
      }
    } else {
      setFeedback('Patatras, ce n’est pas la paire. Même la poule a regardé de travers.')
      window.setTimeout(() => setSelected([]), 650)
    }
  }

  return (
    <MissionFrame image={IMAGES.chienLecture} alt="Petit chien reporter avec son journal" helper="Retrouve les paires de personnages du Dos rond.">
      <h3>{finished ? 'Mémo terminé' : 'Le mémo des personnages'}</h3>
      <div className="memory-grid">
        {deck.map((card) => {
          const visible = selected.includes(card.cardId) || matched.includes(card.pairId)
          return (
            <button
              key={card.cardId}
              className={classNames('memory-card', visible && 'visible', matched.includes(card.pairId) && 'matched')}
              type="button"
              onClick={() => pick(card)}
              aria-pressed={visible}
            >
              {visible ? (
                <>
                  <span aria-hidden="true">{card.icon}</span>
                  <strong>{card.label}</strong>
                </>
              ) : (
                <span className="memory-back" aria-hidden="true">?</span>
              )}
            </button>
          )
        })}
      </div>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{feedback}</p>
    </MissionFrame>
  )
}

function GardenMission({ onWin }) {
  const target = { salade: 3, carotte: 2, poireau: 2 }
  const [basket, setBasket] = useState({ salade: 0, carotte: 0, poireau: 0 })
  const finished = basket.salade === 3 && basket.carotte === 2 && basket.poireau === 2

  function pick(type) {
    if (finished) return
    setBasket((current) => {
      const next = { ...current, [type]: Math.min(target[type], current[type] + 1) }
      if (next.salade === 3 && next.carotte === 2 && next.poireau === 2) onWin('potager')
      return next
    })
  }

  return (
    <MissionFrame image={IMAGES.potager} alt="Papi et Mamie au potager" helper="Aide Mamie à préparer le panier du potager.">
      <h3>Il faut 3 salades, 2 carottes et 2 poireaux.</h3>
      <div className="answer-grid">
        <button type="button" onClick={() => pick('salade')}>🥬 Salade {basket.salade}/3</button>
        <button type="button" onClick={() => pick('carotte')}>🥕 Carotte {basket.carotte}/2</button>
        <button type="button" onClick={() => pick('poireau')}>🧅 Poireau {basket.poireau}/2</button>
      </div>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{finished ? 'Le panier est prêt pour la soupe de Mamie !' : 'Clique les légumes pour remplir le panier.'}</p>
    </MissionFrame>
  )
}

function PondMission({ onWin }) {
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const finished = score >= 5
  const board = ['🦟', '🐝', '🪰', '🦟', '🪷', '🦟']

  function clickCreature(creature) {
    if (finished) return
    if (creature === '🦟') {
      const next = score + 1
      setScore(next)
      if (next >= 5) onWin('mare')
    } else {
      setMistakes((value) => value + 1)
    }
  }

  return (
    <MissionFrame image={IMAGES.mare} alt="Mare avec grenouille, libellule et nénuphar" helper="Protège le petit chien : clique seulement les moustiques.">
      <div className="creature-grid">
        {board.map((creature, index) => <button className="creature-card" key={`${creature}-${index}-${score}-${mistakes}`} type="button" onClick={() => clickCreature(creature)}><span>{creature}</span></button>)}
      </div>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{finished ? 'La grenouille est contente, le petit chien n’est pas piqué.' : `Moustiques : ${score}/5 — amis dérangés : ${mistakes}`}</p>
    </MissionFrame>
  )
}

function MountainMission({ onWin }) {
  const correct = ['creuser', 'planter', 'arroser', 'attendre', 'récolter']
  const [actionCards] = useState(() => shuffleItems(correct))
  const [order, setOrder] = useState([])
  const finished = order.join('|') === correct.join('|')

  function choose(action) {
    if (order.includes(action) || finished) return
    const next = [...order, action]
    setOrder(next)
    if (next.join('|') === correct.join('|')) onWin('montagne')
  }

  function reset() {
    setOrder([])
  }

  return (
    <MissionFrame image={IMAGES.tonton || IMAGES.montagne} alt="Tonton jardine à la montagne" helper="Remets dans l’ordre les gestes de Tonton au jardin.">
      <div className="answer-grid">{actionCards.map((action) => <button key={action} type="button" onClick={() => choose(action)}>{action}</button>)}</div>
      <ol className="order-list hand-frame">{order.map((action) => <li key={action}>{action}</li>)}</ol>
      <button className="primary-action" type="button" onClick={reset}>Recommencer</button>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{finished ? 'Le jardin de montagne est prêt.' : 'Indice : commence par trouver le premier geste.'}</p>
    </MissionFrame>
  )
}

function ParaglidingMission({ onWin }) {
  const [letterCards] = useState(() => shuffleItems(['S', 'A', 'B', 'L', 'O', 'N', 'A'].map((letter, index) => ({
    letter,
    id: `${letter}-${index}`
  }))))
  const [picked, setPicked] = useState([])
  const finished = picked.length === letterCards.length

  function collect(card) {
    if (picked.includes(card.id) || finished) return
    const next = [...picked, card.id]
    setPicked(next)
    if (next.length === letterCards.length) onWin('parapente')
  }

  return (
    <MissionFrame image={IMAGES.maman} alt="Maman en parapente" helper="Attrape les lettres du mot SABLONA avec Papa et Maman.">
      <SafeImage src={IMAGES.papa} alt="Papa en parapente" />
      <div className="answer-grid letter-grid">{letterCards.map((card) => <button key={card.id} type="button" onClick={() => collect(card)}>{picked.includes(card.id) ? '✓' : card.letter}</button>)}</div>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{finished ? 'SABLONA est complet dans le ciel !' : `${picked.length}/7 lettres attrapées`}</p>
    </MissionFrame>
  )
}

function SeekMission({ onWin }) {
  const [items] = useState(() => shuffleItems(SEEK_ITEMS))
  const [found, setFound] = useState([])
  const [misses, setMisses] = useState(0)
  const [feedback, setFeedback] = useState('Trouve les 5 objets importants du reportage. Les bêtises ne comptent pas.')
  const targetCount = SEEK_ITEMS.filter((item) => item.target).length
  const finished = found.length === targetCount

  function spot(item) {
    if (finished || found.includes(item.id)) return
    if (item.target) {
      const next = [...found, item.id]
      setFound(next)
      if (next.length === targetCount) {
        setFeedback('Tout est retrouvé : Mamie peut ranger, la grenouille peut téléphoner et le journal peut paraître.')
        onWin('cachecache')
      } else {
        setFeedback(`${item.label} retrouvé. Le petit chien note ça dans son carnet.`)
      }
    } else {
      setMisses((value) => value + 1)
      setFeedback('Celui-là est drôle, mais ce n’est pas dans la liste. Le lapin fait semblant de ne pas comprendre.')
    }
  }

  return (
    <MissionFrame image={IMAGES.tonton || IMAGES.montagne} alt="La petite maison de Tonton à la montagne" helper="Cherche les objets du journal : bois, maïs, casque, chocolat chaud et téléphone de grenouille.">
      <h3>{finished ? 'Tout est trouvé' : 'Cherche et trouve du Sablona'}</h3>
      <p className="game-note hand-frame">Objectifs : {found.length}/{targetCount} — fausses pistes : {misses}</p>
      <div className="seek-grid">
        {items.map((item) => (
          <button
            key={item.id}
            className={classNames('seek-card', found.includes(item.id) && 'found')}
            type="button"
            onClick={() => spot(item)}
          >
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{feedback}</p>
    </MissionFrame>
  )
}

function DifferenceMission({ onWin }) {
  const [choices] = useState(() => shuffleItems(DIFFERENCE_ITEMS))
  const [found, setFound] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [feedback, setFeedback] = useState('Compare les deux scènes et clique les vraies différences.')
  const targetCount = DIFFERENCE_ITEMS.filter((item) => item.target).length
  const finished = found.length === targetCount

  function choose(item) {
    if (finished || found.includes(item.id)) return
    if (item.target) {
      const next = [...found, item.id]
      setFound(next)
      if (next.length === targetCount) {
        setFeedback('Œil de reporter validé : même le rat du maïs est démasqué.')
        onWin('differences')
      } else {
        setFeedback('Bien vu. Le petit chien souligne la différence dans son journal.')
      }
    } else {
      setMistakes((value) => value + 1)
      setFeedback('Non, ça c’est une invention du loup pour passer dans le journal.')
    }
  }

  return (
    <MissionFrame image={IMAGES.poule} alt="Poule du Sablona" helper="Trouve 5 différences entre deux scènes très sérieuses, donc forcément un peu ridicules.">
      <h3>{finished ? 'Différences trouvées' : 'Les deux images ne racontent pas tout à fait la même bêtise'}</h3>
      <div className="difference-scenes">
        <div className="difference-scene hand-frame">
          <strong>Image A</strong>
          <p>🐶🪖 + 🪓 + 🪵 + 👵 + ☕</p>
          <small>Le petit chien aide, Mamie surveille, personne ne coupe ses oreilles.</small>
        </div>
        <div className="difference-scene hand-frame">
          <strong>Image B</strong>
          <p>🐶 + ☎️🐸 + 🌽🐀 + 🪵 + ☕</p>
          <small>La grenouille appelle, le rat grignote, et le casque a disparu.</small>
        </div>
      </div>
      <p className="game-note hand-frame">Différences : {found.length}/{targetCount} — inventions du loup : {mistakes}</p>
      <div className="answer-grid">
        {choices.map((item) => (
          <button
            key={item.id}
            className={classNames('difference-choice', found.includes(item.id) && 'found')}
            type="button"
            onClick={() => choose(item)}
          >
            {found.includes(item.id) ? '✓ ' : ''}{item.label}
          </button>
        ))}
      </div>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{feedback}</p>
    </MissionFrame>
  )
}

function FinalJournal({ stamps }) {
  const complete = stamps.length >= Object.keys(STAMPS).length
  return (
    <section className="home-grid">
      <article className="intro-card image-card hand-frame"><SafeImage src={IMAGES.chienLecture} alt="Petit chien lit le journal" /></article>
      <article className="intro-card hand-frame">
        <p className="kicker">Édition spéciale</p>
        <h3>{complete ? 'Le nouveau numéro est prêt !' : 'Le journal attend encore des reportages'}</h3>
        <p>{complete ? 'Bravo, le petit chien a terminé son grand reportage et les trois jeux bonus.' : `Médailles obtenues : ${stamps.length}/${Object.keys(STAMPS).length}.`}</p>
        <MedalBook stamps={stamps} />
      </article>
    </section>
  )
}

export default App
