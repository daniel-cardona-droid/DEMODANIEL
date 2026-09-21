import { useEffect, useState } from 'react'
import { getBin } from '../data/bins'
import type { BinId } from '../data/bins'

type Props = {
  binId: BinId
  onClose: () => void
  onReadComplete: () => void
}

const READING_TIME_SECONDS = 8

export function BinDetailPanel({ binId, onClose, onReadComplete }: Props) {
  const bin = getBin(binId)
  const [secondsLeft, setSecondsLeft] = useState(READING_TIME_SECONDS)
  const [readComplete, setReadComplete] = useState(false)

  useEffect(() => {
    setSecondsLeft(READING_TIME_SECONDS)
    setReadComplete(false)
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          setReadComplete(true)
          onReadComplete()
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [binId, onReadComplete])

  return (
    <aside
      className={`panel ${bin.id}`}
      aria-live="polite"
      role="dialog"
      aria-label={`Información sobre ${bin.name}`}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="panel-bar" />
      <div className="panel-head">
        <div>
          <p className="kicker">{bin.name}</p>
          <h3>{bin.title}</h3>
        </div>
        <button
          type="button"
          className="close"
          onClick={(event) => {
            event.stopPropagation()
            onClose()
          }}
          aria-label={`Cerrar información de ${bin.name}`}
        >
          ×
        </button>
      </div>
      <p className="panel-desc">{bin.description}</p>
      <div className={`reading-check ${readComplete ? 'complete' : ''}`}>
        <div>
          <span>{readComplete ? 'Lectura confirmada' : 'Lee esta ficha para desbloquear la misión'}</span>
          <strong>{readComplete ? '✓' : `${secondsLeft}s`}</strong>
        </div>
        <i><b style={{ width: `${((READING_TIME_SECONDS - secondsLeft) / READING_TIME_SECONDS) * 100}%` }} /></i>
      </div>
      <div className="destination">
        <span className="destination-label">¿A DÓNDE VA?</span>
        <strong>{bin.destination}</strong>
        <small>{bin.route}</small>
      </div>
      <p className="panel-subtitle">Ejemplos para acertar</p>
      <ul className="examples">
        {bin.examples.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>
            <span>{item.hint}</span>
          </li>
        ))}
      </ul>
      <p className="note">
        {bin.id === 'white'
          ? 'Tip de agente: entrega los aprovechables limpios, secos y sin restos de comida.'
          : bin.id === 'green'
            ? 'Tip de agente: separa lo orgánico de empaques, aceites y líquidos.'
            : 'Tip de agente: antes de usar esta caneca, pregúntate si puedes reparar, reutilizar o reciclar.'}
      </p>
    </aside>
  )
}
