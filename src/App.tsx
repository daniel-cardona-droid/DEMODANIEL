import { useState } from 'react'
import type { BinId } from './data/bins'
import { Hero } from './components/Hero'
import { Explorer } from './components/Explorer'

export default function App() {
  const [started, setStarted] = useState(false)
  const [selectedId, setSelectedId] = useState<BinId | null>(null)

  return (
    <div className="app">
      <div className="glow" />
      {!started ? (
        <Hero onExplore={() => setStarted(true)} />
      ) : (
        <Explorer
          selectedId={selectedId}
          onSelect={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
      <footer className="pae-footer">
        <span>🌎 PRAE Medellín · Misión: menos residuos, más futuro</span>
        <small>Resolución 2184 de 2019 · Peligrosos y electrónicos: puntos especiales</small>
      </footer>
    </div>
  )
}
