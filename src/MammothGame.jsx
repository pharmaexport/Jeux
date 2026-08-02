import React, { useMemo, useState } from 'react'
import {
  ANIMAL_CLUES,
  CRYSTAL_SEQUENCE,
  MAMMOTH_BADGES,
  MAMMOTH_MEMORY,
  MAMMOTH_TABS,
  ROUTE_STEPS,
  STORY_CHAPTERS
} from './mammothData.js'

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5)

export default function MammothGame({ onBack }) {
  const [tab, setTab] = useState('accueil')
  const [badges, setBadges] = useState([])
  const [reward, setReward] = useState(null)
  const current = MAMMOTH_TABS.find((item) => item.id === tab) || MAMMOTH_TABS[0]

  function win(id) {
    setBadges((items) => items.includes(id) ? items : [...items, id])
    setReward(MAMMOTH_BADGES[id])
  }

  return (
    <div className="mammoth-game">
      <header className="mammoth-header">
        <button className="back-library" type="button" onClick={onBack}>← Jeux</button>
        <div>
          <p className="mammoth-kicker">Petit Mammouth et Ouistiti</p>
          <h1>La Vallée des Mammouths</h1>
          <p>Cristaux bleus et village des ouistitis</p>
        </div>
        <div className="mammoth-score"><strong>{badges.length}/{Object.keys(MAMMOTH_BADGES).length}</strong><span>badges</span></div>
      </header>

      <nav className="mammoth-tabs" aria-label="Chapitres">
        {MAMMOTH_TABS.map((item) => (
          <button key={item.id} type="button" className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>

      <main className="mammoth-panel">
        <div className="mammoth-current"><span>{current.icon}</span><h2>{current.label}</h2></div>
        {tab === 'accueil' && <Home badges={badges} onPlay={setTab} />}
        {tab === 'vallee' && <StoryQuiz chapter="vallee" id="vallee" onWin={win} />}
        {tab === 'sorcier' && <MemoryGame onWin={win} />}
        {tab === 'carte' && <RouteGame onWin={win} />}
        {tab === 'andes' && <StoryQuiz chapter="andes" id="andes" onWin={win} />}
        {tab === 'cristaux' && <CrystalGame onWin={win} />}
        {tab === 'ballon' && <BalloonGame onWin={win} />}
        {tab === 'afrique' && <StoryQuiz chapter="afrique" id="afrique" onWin={win} />}
        {tab === 'animaux' && <AnimalGame onWin={win} />}
        {tab === 'orangoutan' && <OrangutanGame onWin={win} />}
        {tab === 'village' && <VillageGame onWin={win} />}
        {tab === 'carnet' && <FinalBook badges={badges} />}
      </main>

      {reward && <Reward label={reward} onClose={() => setReward(null)} />}
    </div>
  )
}

function Reward({ label, onClose }) {
  return <div className="mammoth-reward" role="dialog" aria-modal="true" onClick={onClose}>
    <div onClick={(event) => event.stopPropagation()}><div className="reward-gem">💎</div><h3>Bravo !</h3><p>{label}</p><button type="button" onClick={onClose}>Continuer</button></div>
  </div>
}

function Home({ badges, onPlay }) {
  return <section className="mammoth-home">
    <article className="mammoth-card hero-card">
      <div className="hero-characters" aria-hidden="true">🦣 🦣 🦣 🐒 🎈</div>
      <h3>Deux quêtes</h3>
      <p>Petit Mammouth, ses parents et Ouistiti cherchent les cristaux bleus.</p>
      <p>Puis ils retrouvent la famille de Ouistiti en Afrique.</p>
      <div className="mammoth-actions"><button type="button" onClick={() => onPlay('vallee')}>Commencer</button><button type="button" onClick={() => onPlay('sorcier')}>Mémo</button></div>
    </article>
    <BadgeBook badges={badges} />
  </section>
}

function BadgeBook({ badges }) {
  return <article className="mammoth-card"><h3>Mes badges</h3><div className="mammoth-badges">{Object.entries(MAMMOTH_BADGES).map(([id, label]) => <div key={id} className={badges.includes(id) ? 'earned' : ''}><span>{badges.includes(id) ? '🏅' : '○'}</span><strong>{label}</strong></div>)}</div></article>
}

function StoryQuiz({ chapter, id, onWin }) {
  const data = STORY_CHAPTERS[chapter]
  const questions = chapter === 'vallee' ? [
    ['Pourquoi chercher les cristaux ?', 'Pour la montgolfière', ['Pour la montgolfière', 'Pour la maison', 'Pour manger']],
    ['Où sont-ils ?', 'Dans la montagne sacrée', ['Dans la montagne sacrée', 'Dans la Vallée des Mammouths', 'Sur la Lune']],
    ['Qui part ?', 'La famille et Ouistiti', ['La famille et Ouistiti', 'Le crocodile', 'Personne']]
  ] : chapter === 'andes' ? [
    ['Comment les choisir ?', 'Suivre le rythme', ['Suivre le rythme', 'Tout prendre', 'Crier']],
    ['Pourquoi en laisser ?', 'Protéger la grotte', ['Protéger la grotte', 'Ils sont lourds', 'Pour le crocodile']],
    ['Quelle couleur ?', 'Bleue', ['Bleue', 'Rouge', 'Verte']]
  ] : [
    ['Pourquoi aller en Afrique ?', 'Retrouver la famille', ['Retrouver la famille', 'Chercher une route', 'Trouver des robots']],
    ['Qui aide ?', 'Les animaux', ['Les animaux', 'Les poissons', 'Les robots']],
    ['Qui connaît le chemin ?', 'Tonton orang-outan', ['Tonton orang-outan', 'Papa Mammouth', 'Le crocodile']]
  ]
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('Lis puis réponds.')
  const done = step === questions.length

  function answer(value) {
    if (value !== questions[step][1]) return setMessage('Essaie encore.')
    const next = step + 1
    setStep(next)
    setMessage(next === questions.length ? 'Mission réussie !' : 'Bravo !')
    if (next === questions.length) onWin(id)
  }

  return <section className="mammoth-story">
    <article className="mammoth-card story-text"><h3>{data.title}</h3><p>{data.text}</p><div className="story-scene">{chapter === 'vallee' ? '🏕️ 🦣 🦣 🦣 🐒 🎈' : chapter === 'andes' ? '⛰️ 💎 💎 🎈' : '🌍 🐘 🦒 🦏 🐊 🦧 🐒'}</div></article>
    <article className="mammoth-card challenge-card"><h3>{done ? 'Terminé !' : questions[step][0]}</h3>{!done && <div className="choice-grid">{shuffle(questions[step][2]).map((option) => <button key={option} type="button" onClick={() => answer(option)}>{option}</button>)}</div>}<p className="game-feedback">{message}</p></article>
  </section>
}

function MemoryGame({ onWin }) {
  const deck = useMemo(() => shuffle(MAMMOTH_MEMORY.flatMap((card) => [{ ...card, uid: `${card.id}-a` }, { ...card, uid: `${card.id}-b` }])), [])
  const [open, setOpen] = useState([])
  const [matched, setMatched] = useState([])
  const [message, setMessage] = useState('Retrouve les paires.')

  function pick(card) {
    if (open.length === 2 || open.includes(card.uid) || matched.includes(card.id)) return
    const next = [...open, card.uid]
    setOpen(next)
    if (next.length !== 2) return
    const first = deck.find((item) => item.uid === next[0])
    if (first.id === card.id) {
      const result = [...matched, card.id]
      setMatched(result); setOpen([]); setMessage(card.clue)
      if (result.length === MAMMOTH_MEMORY.length) onWin('sorcier')
    } else window.setTimeout(() => { setOpen([]); setMessage('Pas la paire.') }, 700)
  }

  return <section className="mammoth-card"><h3>Le mémo</h3><div className="mammoth-memory">{deck.map((card) => { const visible = open.includes(card.uid) || matched.includes(card.id); return <button key={card.uid} type="button" className={visible ? 'visible' : ''} onClick={() => pick(card)}>{visible ? <><span>{card.icon}</span><strong>{card.label}</strong></> : <span>?</span>}</button> })}</div><p className="game-feedback">{message}</p></section>
}

function RouteGame({ onWin }) {
  const [route, setRoute] = useState([])
  const target = ROUTE_STEPS.map((item) => item.id)
  function add(item) {
    if (item.id !== target[route.length]) return setRoute([])
    const next = [...route, item.id]
    setRoute(next)
    if (next.length === target.length) onWin('carte')
  }
  return <section className="mammoth-card"><h3>La carte</h3><p>Choisis le bon ordre.</p><div className="route-result">{route.map((id) => ROUTE_STEPS.find((item) => item.id === id)).map((item) => <span key={item.id}>{item.icon} {item.label}</span>)}</div><div className="choice-grid">{ROUTE_STEPS.filter((item) => !route.includes(item.id)).map((item) => <button key={item.id} type="button" onClick={() => add(item)}>{item.icon} {item.label}</button>)}</div><button className="reset-button" type="button" onClick={() => setRoute([])}>Recommencer</button></section>
}

function CrystalGame({ onWin }) {
  const [sequence, setSequence] = useState([])
  const [energy, setEnergy] = useState(0)
  const options = { petit: '🔹 Petit', moyen: '🔷 Moyen', grand: '💎 Grand' }
  function choose(size) {
    if (size !== CRYSTAL_SEQUENCE[sequence.length]) { setSequence([]); setEnergy(0); return }
    const next = [...sequence, size]
    setSequence(next)
    setEnergy((value) => value + ({ petit: 10, moyen: 20, grand: 30 }[size]))
    if (next.length === CRYSTAL_SEQUENCE.length) onWin('cristaux')
  }
  return <section className="mammoth-card"><h3>Les cristaux</h3><p>Petit, moyen, grand, moyen.</p><div className="crystal-sequence">{sequence.map((size, index) => <span key={`${size}-${index}`}>{options[size]}</span>)}</div><div className="choice-grid">{Object.entries(options).map(([id, label]) => <button key={id} type="button" onClick={() => choose(id)}>{label}</button>)}</div><p className="game-feedback">Énergie : {energy}/80</p></section>
}

function BalloonGame({ onWin }) {
  const [parts, setParts] = useState([])
  const target = ['enveloppe', 'panier', 'bruleur', 'cristal']
  const labels = { enveloppe: '🎈 Enveloppe', panier: '🧺 Panier', bruleur: '🔥 Brûleur', cristal: '💎 Cristal' }
  function install(id) { const next = parts.includes(id) ? parts : [...parts, id]; setParts(next); if (next.length === target.length) onWin('ballon') }
  return <section className="mammoth-card"><h3>Répare le ballon</h3><div className="balloon-workshop"><div className="balloon-preview">{parts.includes('enveloppe') ? '🎈' : '☁️'}<span>{parts.includes('panier') ? '🧺' : '□'}</span><small>{parts.includes('bruleur') ? '🔥' : '○'} {parts.includes('cristal') ? '💎' : '◇'}</small></div><div className="choice-grid">{target.map((id) => <button key={id} type="button" disabled={parts.includes(id)} onClick={() => install(id)}>{parts.includes(id) ? '✓ ' : ''}{labels[id]}</button>)}</div></div><p className="game-feedback">{parts.length}/4</p></section>
}

function AnimalGame({ onWin }) {
  const [solved, setSolved] = useState([])
  function answer(animal, choice) { if (choice === animal.answer) { const next = [...new Set([...solved, animal.id])]; setSolved(next); if (next.length === ANIMAL_CLUES.length) onWin('animaux') } }
  return <section className="animal-grid">{ANIMAL_CLUES.map((animal) => <article className={`mammoth-card animal-card ${solved.includes(animal.id) ? 'solved' : ''}`} key={animal.id}><div>{animal.icon}</div><h3>{animal.name}</h3><p>{animal.question}</p><div className="choice-grid compact">{shuffle(ANIMAL_CLUES.map((item) => item.answer)).map((choice) => <button key={choice} type="button" onClick={() => answer(animal, choice)}>{choice}</button>)}</div></article>)}</section>
}

function OrangutanGame({ onWin }) {
  const clues = ['Arbres rouges', 'Rocher trompe', 'Pont de lianes', 'Mille cris']
  const [ordered, setOrdered] = useState([])
  function add(clue) { if (clue !== clues[ordered.length]) return setOrdered([]); const next = [...ordered, clue]; setOrdered(next); if (next.length === clues.length) onWin('orangoutan') }
  return <section className="mammoth-card"><div className="tonton-scene">🦧🌳🗺️</div><h3>Les conseils de Tonton</h3><ol>{ordered.map((clue) => <li key={clue}>{clue}</li>)}</ol><div className="choice-grid">{shuffle(clues.filter((clue) => !ordered.includes(clue))).map((clue) => <button key={clue} type="button" onClick={() => add(clue)}>{clue}</button>)}</div></section>
}

function VillageGame({ onWin }) {
  const [found, setFound] = useState([])
  const targets = ['bébé', 'musicien', 'ancien', 'acrobate', 'cuisinier', 'messager']
  const icons = { bébé: '👶🐒', musicien: '🥁🐒', ancien: '👴🐒', acrobate: '🤸🐒', cuisinier: '🍌🐒', messager: '✉️🐒' }
  function find(id) { const next = [...new Set([...found, id])]; setFound(next); if (next.length === targets.length) onWin('village') }
  return <section className="mammoth-card"><h3>Le village</h3><p>Retrouve la famille de Ouistiti.</p><div className="monkey-village">{shuffle([...targets, ...targets, 'farceur', 'grimpeur', 'dormeur', 'danseur']).map((id, index) => <button key={`${id}-${index}`} type="button" onClick={() => targets.includes(id) && find(id)}>{icons[id] || '🐒'}</button>)}</div><p className="game-feedback">Trouvés : {found.length}/6</p></section>
}

function FinalBook({ badges }) {
  const complete = badges.length === Object.keys(MAMMOTH_BADGES).length
  return <section className="mammoth-card final-book"><div className="final-scene">🦣🦣🦣 🐒 🎈 💎 🌍 🐒🐒🐒</div><h3>{complete ? 'La grande fête !' : 'Encore quelques missions'}</h3><p>{complete ? 'La montgolfière vole. Ouistiti retrouve sa famille. Tout le village fait la fête !' : `${badges.length} badges sur ${Object.keys(MAMMOTH_BADGES).length}.`}</p><BadgeBook badges={badges} /></section>
}
