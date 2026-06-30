import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './handdrawn.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, maxWidth: 900, margin: '0 auto', fontFamily: 'Trebuchet MS, system-ui, sans-serif' }}>
          <h1>Le dos rond</h1>
          <p>Le site s’est chargé, mais le jeu a rencontré une erreur.</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fff', border: '3px solid #1e1a16', borderRadius: 16, padding: 16 }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Élément #root introuvable dans index.html')
}

rootElement.innerHTML = `
  <div style="padding:24px;max-width:900px;margin:0 auto;font-family:Trebuchet MS,system-ui,sans-serif;color:#2f261b">
    <h1 style="color:#e73737;text-shadow:2px 2px 0 #1e1a16">Le dos rond</h1>
    <p>Chargement du jeu...</p>
  </div>
`

import('./App.jsx')
  .then(({ default: App }) => {
    createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    )
  })
  .catch((error) => {
    rootElement.innerHTML = `
      <div style="padding:24px;max-width:900px;margin:0 auto;font-family:Trebuchet MS,system-ui,sans-serif;color:#2f261b">
        <h1 style="color:#e73737;text-shadow:2px 2px 0 #1e1a16">Le dos rond</h1>
        <p>Impossible de charger le jeu. GitHub/Vercel a bien servi la page, mais le module React n’a pas démarré.</p>
        <pre style="white-space:pre-wrap;background:#fff;border:3px solid #1e1a16;border-radius:16px;padding:16px">${String(error?.message || error).replaceAll('<', '&lt;')}</pre>
      </div>
    `
  })
