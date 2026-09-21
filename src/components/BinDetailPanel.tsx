import { getBin } from '../data/bins'
import type { BinId } from '../data/bins'

type Props = {
  binId: BinId
  onClose: () => void
}

export function BinDetailPanel({ binId, onClose }: Props) {
  const bin = getBin(binId)

  return (
    <aside className={`panel ${bin.id}`} aria-live="polite">
      <div className="panel-bar" />
      <div className="panel-head">
        <div>
          <p className="kicker">{bin.name}</p>
          <h3>{bin.title}</h3>
        </div>
        <button type="button" className="close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
      </div>
      <p className="panel-desc">{bin.description}</p>
      <ul className="examples">
        {bin.examples.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>
            <span>{item.hint}</span>
          </li>
        ))}
      </ul>
      {bin.id === 'white' ? (
        <p className="note">Recuerda: los aprovechables deben ir limpios y secos.</p>
      ) : null}
    </aside>
  )
}
