import { bins } from '../data/bins'
import type { BinId } from '../data/bins'
import { RecyclingScene } from '../scene/RecyclingScene'
import { BinDetailPanel } from './BinDetailPanel'

type ExplorerProps = {
  selectedId: BinId | null
  onSelect: (id: BinId) => void
  onClose: () => void
}

export function Explorer({ selectedId, onSelect, onClose }: ExplorerProps) {
  return (
    <section className="explorer">
      <header className="explorer-top">
        <p className="kicker">Separación en la fuente</p>
        <h2>Toca una caneca y descubre qué va en cada color</h2>
        <p className="explorer-copy">
          Código nacional de Colombia (Resolución 2184 de 2019): verde, blanca y
          negra.
        </p>
      </header>

      <div className="stage">
        <RecyclingScene selectedId={selectedId} onSelect={onSelect} />
        {selectedId ? (
          <BinDetailPanel binId={selectedId} onClose={onClose} />
        ) : null}
      </div>

      <div className="bin-buttons" role="tablist" aria-label="Canecas">
        {bins.map((bin) => (
          <button
            key={bin.id}
            type="button"
            className={`bin-chip ${selectedId === bin.id ? 'active' : ''} ${bin.id}`}
            onClick={() => onSelect(bin.id)}
          >
            <span className="dot" />
            {bin.colorName}
          </button>
        ))}
      </div>
    </section>
  )
}
