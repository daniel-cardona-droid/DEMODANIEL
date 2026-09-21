type HeroProps = {
  onExplore: () => void
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section className="hero-screen">
      <div className="hero-art" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85" alt="" />
        <span className="hero-orbit orbit-one">♻️</span>
        <span className="hero-orbit orbit-two">🌱</span>
        <span className="hero-orbit orbit-three">💧</span>
        <div className="hero-art-caption"><b>Tu planeta</b><small>es tu misión diaria</small></div>
      </div>
      <div className="hero-badge">PRAE · Medellín</div>
      <h1>
        El planeta no tiene <em>un botón de reinicio</em>
      </h1>
      <p className="lead">
        Convierte la separación de residuos en una misión. Descubre qué ocurre
        después de cada caneca, conoce el viaje de la basura de Medellín y
        activa tu poder como agente ambiental.
      </p>
      <div className="hero-actions">
        <button type="button" className="cta" onClick={onExplore}>Jugar: explorar las canecas →</button>
        <a className="text-link" href="https://www.medellin.gov.co/es/secretaria-medio-ambiente/" target="_blank" rel="noreferrer">
          Conoce el PRAE en Medellín ↗
        </a>
      </div>
      <div className="hero-facts" aria-label="Datos rápidos">
        <span><strong>3</strong> colores</span>
        <span><strong>1</strong> decisión diaria</span>
        <span><strong>∞</strong> futuros posibles</span>
      </div>
    </section>
  )
}
