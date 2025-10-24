export interface Perfume {
  id: string
  nombrePerfume: string
  marcaPerfume: string
  precioPerfume: number
  presentacionPerfume: string
  ocasionPerfume: string
  climaPerfume: string
  horaDiaPerfume: string
  generoPerfume: string
  tipoPerfume: "arabe" | "disenador" | "nicho"
  imageUrl: string
  addedDate: string
}

export interface FilterState {
  presentation: string[]
  occasion: string[]
  climate: string[]
  timeOfDay: string[]
  gender: string[]
  type: string[]
  priceRange: [number, number]
}

export type SortOption = "nombrePerfume" | "precio-asc" | "precio-desc" | "newest" | "oldest"
