type HeroProps = {
  onExplore: () => void
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section className="hero-screen">
      <p className="brand">Programa de Alimentación Escolar</p>
      <h1>
        Aprende a <em>APRENDER CON EL PAE</em>
      </h1>
      <p className="lead">
        Una demo visual para separar residuos con las tres canecas del código de
        colores de Colombia y cuidar el comedor, el colegio y el planeta.
      </p>
      <button type="button" className="cta" onClick={onExplore}>
        Explorar las canecas
      </button>
    </section>
  )
}
