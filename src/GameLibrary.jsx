import React, { useState } from 'react'
import DosRondGame from './App.jsx'
import MammothGame from './MammothGame.jsx'

export default function GameLibrary() {
  const [game, setGame] = useState(null)

  if (game === 'dos-rond') return <DosRondGame onBack={() => setGame(null)} />
  if (game === 'mammouths') return <MammothGame onBack={() => setGame(null)} />

  return (
    <main className="game-library">
      <header className="library-hero">
        <p>Deux aventures</p>
        <h1>Choisis ton jeu</h1>
        <p>Joue, réussis les missions et gagne des médailles.</p>
      </header>
      <section className="library-grid">
        <article className="library-card dos">
          <div className="library-art" aria-hidden="true">🐶🗞️🌻</div>
          <h2>Le dos rond</h2>
          <p>Aide le petit chien reporter.</p>
          <button type="button" onClick={() => setGame('dos-rond')}>Jouer au Dos rond</button>
        </article>
        <article className="library-card mammoth">
          <div className="library-art" aria-hidden="true">🦣🐒💎🎈</div>
          <h2>La Vallée des Mammouths</h2>
          <p>Trouve les cristaux et la famille de Ouistiti.</p>
          <button type="button" onClick={() => setGame('mammouths')}>Jouer avec Petit Mammouth</button>
        </article>
      </section>
    </main>
  )
}
