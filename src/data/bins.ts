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
    hex: '#2f8f4e',
    accent: '#1f6b38',
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
    hex: '#f4f7fb',
    accent: '#c9d4e3',
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
    hex: '#2a2d33',
    accent: '#111318',
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
