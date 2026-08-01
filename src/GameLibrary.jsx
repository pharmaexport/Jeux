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
        <p>La bibliothèque des aventures</p>
        <h1>Choisis ton jeu</h1>
        <p>Deux grandes histoires, des missions, des jeux de mémoire et des récompenses à collectionner.</p>
      </header>
      <section className="library-grid">
        <article className="library-card dos">
          <div className="library-art" aria-hidden="true">🐶🗞️🌻</div>
          <h2>Le dos rond</h2>
          <p>Retrouve le petit chien reporter, la ferme, le potager, la mare, la montagne, le port et les jeux bonus.</p>
          <button type="button" onClick={() => setGame('dos-rond')}>Jouer au Dos rond</button>
        </article>
        <article className="library-card mammoth">
          <div className="library-art" aria-hidden="true">🦣🐒💎🎈</div>
          <h2>La Vallée des Mammouths</h2>
          <p>Aide Milo, ses parents et Kiki à trouver les cristaux bleus d’hélium, puis le village africain des mille ouistitis.</p>
          <button type="button" onClick={() => setGame('mammouths')}>Partir avec les mammouths</button>
        </article>
      </section>
    </main>
  )
}
