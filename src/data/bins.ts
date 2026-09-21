export type BinId = 'green' | 'white' | 'black'

export type WasteExample = {
  name: string
  hint: string
}

export type BinInfo = {
  id: BinId
  name: string
  colorName: string
  title: string
  description: string
  hex: string
  accent: string
  destination: string
  route: string
  examples: WasteExample[]
}

export const bins: BinInfo[] = [
  {
    id: 'green',
    name: 'Caneca verde',
    colorName: 'Verde',
    title: 'Residuos orgánicos aprovechables',
    description:
      'Restos de origen natural que pueden convertirse en compost o mejoradores de suelo cuando hay ruta de aprovechamiento.',
    hex: '#00875A',
    accent: '#006b49',
    destination: 'Va a una ruta de aprovechamiento orgánico: compostaje o transformación en abono.',
    route: 'Caneca verde → recolección diferenciada → planta de compostaje → suelo fértil.',
    examples: [
      { name: 'Cáscaras de frutas', hint: 'Banano, naranja, mango' },
      { name: 'Cáscaras de verduras', hint: 'Papa, zanahoria, cebolla' },
      { name: 'Restos de comida cruda', hint: 'Sin salsas ni empaques' },
      { name: 'Poda de jardín', hint: 'Hojas y ramas pequeñas' },
      { name: 'Césped cortado', hint: 'Residuos de corte' },
      { name: 'Desechos agrícolas', hint: 'Material vegetal' },
    ],
  },
  {
    id: 'white',
    name: 'Caneca blanca',
    colorName: 'Blanca',
    title: 'Residuos aprovechables',
    description:
      'Materiales reciclables que deben ir limpios y secos para reincorporarse a ciclos productivos: plástico, vidrio, metales, papel, cartón y multicapa.',
    hex: '#F5F5F5',
    accent: '#c9d4e3',
    destination: 'Va a una estación de clasificación y luego a recicladores y empresas que lo transforman en nuevos productos.',
    route: 'Caneca blanca → reciclador de oficio → clasificación → industria → nuevo producto.',
    examples: [
      { name: 'Plástico', hint: 'Botellas y envases limpios' },
      { name: 'Vidrio', hint: 'Frascos y botellas' },
      { name: 'Metales', hint: 'Latas de aluminio o acero' },
      { name: 'Papel', hint: 'Hojas y cuadernos secos' },
      { name: 'Cartón', hint: 'Cajas limpias y secas' },
      { name: 'Multicapa', hint: 'Envases tipo Tetra Pak' },
    ],
  },
  {
    id: 'black',
    name: 'Caneca negra',
    colorName: 'Negra',
    title: 'Residuos no aprovechables',
    description:
      'Materiales que no se reciclan en la ruta ordinaria y van a disposición final. No mezclar con aprovechables ni con orgánicos.',
    hex: '#1C1C1C',
    accent: '#111111',
    destination: 'Va al relleno sanitario La Pradera para disposición final controlada. ¡Por eso es la caneca que debemos reducir!',
    route: 'Caneca negra → recolección ordinaria → estación de transferencia → relleno sanitario La Pradera.',
    examples: [
      { name: 'Papel higiénico', hint: 'Usado' },
      { name: 'Servilletas', hint: 'Sucias o húmedas' },
      { name: 'Papel con comida', hint: 'Cartón o papel contaminado' },
      { name: 'Papeles metalizados', hint: 'Empaques brillantes' },
      { name: 'Comida preparada', hint: 'Restos cocidos o con salsas' },
      { name: 'Tapabocas y guantes', hint: 'Residuos de bioseguridad' },
    ],
  },
]

export function getBin(id: BinId) {
  return bins.find((bin) => bin.id === id)!
}
