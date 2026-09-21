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
  const [progress, setProgress] = useState(0)
  const [readBins, setReadBins] = useState<BinId[]>([])
  const [videoSeen, setVideoSeen] = useState(false)
  const [celebration, setCelebration] = useState<string | null>(null)

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const missions = useMemo(() => [
    { label: 'Leer una caneca', done: readBins.length > 0 },
    { label: 'Leer las tres', done: readBins.length === bins.length },
    { label: 'Ver y compartir', done: videoSeen },
  ], [videoSeen, readBins.length])
  const completedMissions = missions.filter((mission) => mission.done).length
  const handleSelect = (id: BinId) => {
    onSelect(id)
  }
  const handleReadComplete = useCallback((id: BinId) => {
    setReadBins((current) => {
      if (current.includes(id)) return current
      const next = [...current, id]
      setCelebration(next.length === bins.length ? '¡Insignia de explorador ambiental desbloqueada!' : '¡Misión completada! Caneca comprendida.')
      window.setTimeout(() => setCelebration(null), 3200)
      return next
    })
  }, [])
  const readCompleteHandler = useCallback(() => {
    if (selectedId) handleReadComplete(selectedId)
  }, [handleReadComplete, selectedId])

  return (
    <section className="explorer">
      {celebration ? <div className="mission-celebration" role="status"><span>✦</span><strong>{celebration}</strong><small>Tu conocimiento acaba de crecer.</small></div> : null}
      <div className="exploration-progress" aria-label={`Exploración completada: ${progress}%`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="mission-strip">
        <div><span className="mission-mark">◎</span><div><strong>Ruta ambiental</strong><small>{completedMissions}/3 misiones completadas</small></div></div>
        {missions.map((mission) => <span key={mission.label} className={`mission-badge ${mission.done ? 'done' : ''}`}>{mission.done ? '✓' : '○'} {mission.label}</span>)}
      </div>
      <header className="explorer-top">
        <p className="kicker">Misión 01 · Separación en la fuente</p>
        <h2>Elige una caneca y sigue el viaje del residuo</h2>
        <p className="explorer-copy">
          Código nacional de Colombia (Resolución 2184 de 2019): verde, blanca y
          negra.
        </p>
      </header>

      <div className="stage">
        <RecyclingScene selectedId={selectedId} onSelect={handleSelect} />
        {selectedId ? (
          <BinDetailPanel
            binId={selectedId}
            onClose={onClose}
            onReadComplete={readCompleteHandler}
          />
        ) : null}
      </div>

      <div className="bin-buttons" role="tablist" aria-label="Canecas">
        {bins.map((bin) => (
          <button
            key={bin.id}
            type="button"
            className={`bin-chip ${selectedId === bin.id ? 'active' : ''} ${bin.id}`}
            onClick={() => handleSelect(bin.id)}
          >
            <span className="dot" />
            {bin.colorName}
          </button>
        ))}
      </div>

      <section className="info-grid" id="relleno">
        <article className="info-card landfill-card">
          <p className="kicker">Misión 02 · El destino</p>
          <h2>¿Qué es un relleno sanitario?</h2>
          <p>
            Es una infraestructura diseñada para disponer residuos que no se
            pueden aprovechar. En capas compactadas, con control de lixiviados,
            gases y cobertura, evita impactos mayores; no es un lugar infinito
            ni una solución para producir basura sin límite.
          </p>
          <div className="callout">En Medellín, los residuos ordinarios llegan principalmente al <strong>relleno sanitario La Pradera</strong>, en Donmatías.</div>
          <a href="https://www.emvarias.com.co/" target="_blank" rel="noreferrer">Ver información de Emvarias ↗</a>
        </article>
        <article className="info-card action-card">
          <p className="kicker">Regla de oro</p>
          <h2>Antes de botar, juega las 3R</h2>
          <div className="three-rs">
            <span><b>1</b><strong>Reduce</strong><small>Compra solo lo necesario.</small></span>
            <span><b>2</b><strong>Reutiliza</strong><small>Dale otra vida a los objetos.</small></span>
            <span><b>3</b><strong>Recicla</strong><small>Separa limpio y seco.</small></span>
          </div>
        </article>
      </section>

      <section className="volume-section" id="cifras">
        <div>
          <p className="kicker">Misión 03 · El tamaño del reto</p>
          <h2>¿Cuánta basura recogemos en un año?</h2>
          <p className="explorer-copy">Cifras aproximadas de residuos sólidos urbanos recolectados por año. Sirven para comparar escalas: cada región usa metodologías y años de referencia distintos.</p>
        </div>
        <div className="volume-grid">
          <VolumeCard value={450} suffix=" mil t" label="Medellín" note="Referencia metropolitana" />
          <VolumeCard value={1.7} suffix=" M t" label="Antioquia" note="Estimación departamental" decimals={1} />
          <VolumeCard value={14} suffix=" M t" label="Colombia" note="Residuos municipales/año" />
          <VolumeCard value={2300} suffix=" M t" label="América" note="Orden de magnitud continental" />
          <VolumeCard value={225} suffix=" M t" label="Europa" note="Residuos municipales/año" />
          <VolumeCard value={800} suffix=" M t" label="Asia" note="Mayor crecimiento urbano" />
          <VolumeCard value={180} suffix=" M t" label="África" note="Proyección regional" />
        </div>
        <a className="source-link" href="https://datatopics.worldbank.org/what-a-waste/" target="_blank" rel="noreferrer">Fuente de referencia: What a Waste 2.0 · Banco Mundial ↗</a>
      </section>

      <section className="media-grid" id="inspiracion">
        <article className="video-card">
          <div className="video-heading">
            <div><p className="kicker">Misión 04 · Mira y comparte</p><h2>Una decisión puede cambiar el final</h2></div>
            <span className="play-pill">▶ VIDEO</span>
          </div>
          <div className="video-frame">
            <iframe onLoad={() => setVideoSeen(true)} src="https://www.youtube.com/embed/ZmipOA8DV-k" title="Video de concientización sobre residuos" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <p className="important-message">Si seguimos haciendo tanta basura no vamos a tener espacio en el mundo.</p>
        </article>
        <article className="allies-card">
          <p className="kicker">Aliados estratégicos</p>
          <h2>El cambio se juega en equipo</h2>
          <div className="ally-list">
            <a href="https://www.medellin.gov.co/" target="_blank" rel="noreferrer"><span>🏙️</span><b>Alcaldía de Medellín</b><small>Programas ambientales</small></a>
            <a href="https://www.emvarias.com.co/" target="_blank" rel="noreferrer"><span>♻️</span><b>Emvarias Grupo EPM</b><small>Recolección y aprovechamiento</small></a>
            <a href="https://www.minambiente.gov.co/" target="_blank" rel="noreferrer"><span>🌱</span><b>MinAmbiente</b><small>Educación y política pública</small></a>
          </div>
        </article>
      </section>

      <section className="gallery-section">
        <p className="kicker">Misión 05 · Inspírate</p>
        <h2>Ideas que empiezan en el colegio</h2>
        <div className="gallery-grid">
          <figure><img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80" alt="Persona separando materiales reciclables" /><figcaption>Separar también es participar.</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80" alt="Manos sosteniendo una planta" /><figcaption>Sembrar futuro es una acción colectiva.</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1591197172062-cada724d6a48?auto=format&fit=crop&w=900&q=80" alt="Jóvenes trabajando juntos en un proyecto" /><figcaption>Un equipo multiplica el impacto.</figcaption></figure>
        </div>
      </section>

      <section className="final-banner">
        <span className="final-icon">✦</span>
        <div><p className="kicker">Tu siguiente jugada</p><h2>Si seguimos haciendo tanta basura no vamos a tener espacio en el mundo.</h2><p>Empieza hoy: lleva tu botella reutilizable, evita un empaque y enseña a alguien el color correcto.</p></div>
        <a className="cta secondary-cta" href="#relleno">Volver a jugar ↑</a>
      </section>
      {readBins.length === bins.length ? (
        <section className="final-challenge">
          <div><p className="kicker">Reto desbloqueado · Nivel experto</p><h2>Ahora decide antes de tocar la caneca</h2><p>Explica en voz alta el destino de un residuo y elige una acción de las 3R antes de depositarlo. Si puedes enseñárselo a alguien, completaste el módulo.</p></div>
          <span className="challenge-seal">✓<small>3/3</small></span>
        </section>
      ) : null}
    </section>
  )
}

function VolumeCard({ value, suffix, label, note, decimals = 0 }: { value: number; suffix: string; label: string; note: string; decimals?: number }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const percent = Math.min(1, (now - start) / 1100)
      setCurrent(value * (1 - Math.pow(1 - percent, 3)))
      if (percent < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return <div><strong>~{current.toFixed(decimals)}{suffix}</strong><span>{label}</span><small>{note}</small><i className="metric-bar"><b style={{ width: `${Math.min(100, Math.max(14, value / 23))}%` }} /></i></div>
}
import { useCallback, useEffect, useMemo, useState } from 'react'
