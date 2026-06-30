import React, { useState } from 'react'
import { IMAGES, SIMPLE_GAMES, STAMPS, TABS } from './leDosRondData.js'

function classNames(...names) {
  return names.filter(Boolean).join(' ')
}

function medalLabel(label) {
  return label.replace('Tampon', 'Médaille')
}

function App() {
  const [activeTab, setActiveTab] = useState('accueil')
  const [stamps, setStamps] = useState([])
  const current = TABS.find((tab) => tab.id === activeTab) ?? TABS[0]

  function earnStamp(id) {
    setStamps((currentStamps) => currentStamps.includes(id) ? currentStamps : [...currentStamps, id])
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
          <span>{stamps.length}/7</span>
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
        {activeTab === 'ferme' && <SimpleMission id="ferme" onWin={earnStamp} />}
        {activeTab === 'potager' && <GardenMission onWin={earnStamp} />}
        {activeTab === 'poulailler' && <SimpleMission id="poulailler" onWin={earnStamp} />}
        {activeTab === 'mare' && <PondMission onWin={earnStamp} />}
        {activeTab === 'montagne' && <MountainMission onWin={earnStamp} />}
        {activeTab === 'parapente' && <ParaglidingMission onWin={earnStamp} />}
        {activeTab === 'port' && <SimpleMission id="port" onWin={earnStamp} />}
        {activeTab === 'journal' && <FinalJournal stamps={stamps} />}
      </main>
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
        <p>Chaque mission réussie ajoute une médaille. Quand le carnet est complet, le journal final est prêt.</p>
        <button className="primary-action" type="button" onClick={() => onPlay('ferme')}>Commencer par la ferme</button>
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
  const [step, setStep] = useState(0)
  const [feedback, setFeedback] = useState('Choisis la bonne réponse.')
  const finished = step >= game.missions.length
  const mission = game.missions[step]

  function answer(choice) {
    if (finished) return
    if (choice === mission.a) {
      const next = step + 1
      setStep(next)
      if (next === game.missions.length) {
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
  const [order, setOrder] = useState([])
  const finished = order.join('|') === correct.join('|')

  function choose(action) {
    if (order.includes(action) || finished) return
    const next = [...order, action]
    setOrder(next)
    if (next.join('|') === correct.join('|')) onWin('montagne')
  }

  return (
    <MissionFrame image={IMAGES.tonton || IMAGES.montagne} alt="Tonton jardine à la montagne" helper="Remets dans l’ordre les gestes de Tonton au jardin.">
      <div className="answer-grid">{correct.map((action) => <button key={action} type="button" onClick={() => choose(action)}>{action}</button>)}</div>
      <ol className="order-list hand-frame">{order.map((action) => <li key={action}>{action}</li>)}</ol>
      <button className="primary-action" type="button" onClick={() => setOrder([])}>Recommencer</button>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{finished ? 'Le jardin de montagne est prêt.' : 'Indice : on commence par creuser.'}</p>
    </MissionFrame>
  )
}

function ParaglidingMission({ onWin }) {
  const letters = ['S', 'A', 'B', 'L', 'O', 'N', 'A']
  const [picked, setPicked] = useState([])
  const finished = picked.length === letters.length

  function collect(letter, index) {
    const key = `${letter}-${index}`
    if (picked.includes(key) || finished) return
    const next = [...picked, key]
    setPicked(next)
    if (next.length === letters.length) onWin('parapente')
  }

  return (
    <MissionFrame image={IMAGES.maman} alt="Maman en parapente" helper="Attrape les lettres du mot SABLONA avec Papa et Maman.">
      <SafeImage src={IMAGES.papa} alt="Papa en parapente" />
      <div className="answer-grid letter-grid">{letters.map((letter, index) => <button key={`${letter}-${index}`} type="button" onClick={() => collect(letter, index)}>{picked.includes(`${letter}-${index}`) ? '✓' : letter}</button>)}</div>
      <p className={finished ? 'success-bubble hand-frame' : 'feedback hand-frame'}>{finished ? 'SABLONA est complet dans le ciel !' : `${picked.length}/7 lettres attrapées`}</p>
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
        <p>{complete ? 'Bravo, le petit chien a terminé son grand reportage.' : `Médailles obtenues : ${stamps.length}/7.`}</p>
        <MedalBook stamps={stamps} />
      </article>
    </section>
  )
}

export default App
