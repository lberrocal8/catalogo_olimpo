"use client"

import { useState, useMemo, useEffect } from "react"
import { PerfumeFilters } from "@/components/perfume-filters"
import { PerfumeGrid } from "@/components/perfume-grid"
import { SortControls } from "@/components/sort-controls"
import type { Perfume, FilterState, SortOption } from "@/types"
import { createClient } from "@/lib/supabase/client"

// Datos de ejemplo de perfumes
const SAMPLE_PERFUMES: Perfume[] = [
  {
    id: "1",
    nombrePerfume: "Oud Royale",
    marcaPerfume: "Maison Luxe",
    precioPerfume: 250,
    presentacionPerfume: "100ml",
    ocasionPerfume: "noche",
    climaPerfume: "frio",
    horaDiaPerfume: "noche",
    generoPerfume: "unisex",
    tipoPerfume: "arabe",
    imageUrl: "/luxury-oud-perfume-bottle.jpg",
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    nombrePerfume: "Fleur de Printemps",
    marcaPerfume: "Élégance Paris",
    precioPerfume: 180,
    presentacionPerfume: "50ml",
    ocasionPerfume: "dia",
    climaPerfume: "templado",
    horaDiaPerfume: "dia",
    generoPerfume: "mujer",
    tipoPerfume: "disenador",
    imageUrl: "/floral-perfume-bottle-pink.jpg",
    addedDate: "2024-02-20",
  },
  {
    id: "3",
    nombrePerfume: "Amber Noir",
    marcaPerfume: "Niche Artisan",
    precioPerfume: 320,
    presentacionPerfume: "75ml",
    ocasionPerfume: "noche",
    climaPerfume: "frio",
    horaDiaPerfume: "noche",
    generoPerfume: "hombre",
    tipoPerfume: "nicho",
    imageUrl: "/amber-noir-perfume-bottle.jpg",
    addedDate: "2024-01-10",
  },
  {
    id: "4",
    nombrePerfume: "Citrus Breeze",
    marcaPerfume: "Fresh & Co",
    precioPerfume: 95,
    presentacionPerfume: "100ml",
    ocasionPerfume: "casual",
    climaPerfume: "calido",
    horaDiaPerfume: "dia",
    generoPerfume: "unisex",
    tipoPerfume: "disenador",
    imageUrl: "/citrus-fresh-perfume-bottle.jpg",
    addedDate: "2024-03-05",
  },
  {
    id: "5",
    nombrePerfume: "Rose Mystique",
    marcaPerfume: "Atelier de Parfum",
    precioPerfume: 280,
    presentacionPerfume: "50ml",
    ocasionPerfume: "formal",
    climaPerfume: "templado",
    horaDiaPerfume: "tarde",
    generoPerfume: "mujer",
    tipoPerfume: "nicho",
    imageUrl: "/rose-mystique-perfume-bottle.jpg",
    addedDate: "2024-02-01",
  },
  {
    id: "6",
    nombrePerfume: "Leather & Spice",
    marcaPerfume: "Heritage House",
    precioPerfume: 210,
    presentacionPerfume: "100ml",
    ocasionPerfume: "casual",
    climaPerfume: "frio",
    horaDiaPerfume: "tarde",
    generoPerfume: "hombre",
    tipoPerfume: "disenador",
    imageUrl: "/leather-spice-perfume-bottle.jpg",
    addedDate: "2024-01-25",
  },
  {
    id: "7",
    nombrePerfume: "Jasmine Dreams",
    marcaPerfume: "Oriental Essence",
    precioPerfume: 195,
    presentacionPerfume: "75ml",
    ocasionPerfume: "noche",
    climaPerfume: "calido",
    horaDiaPerfume: "noche",
    generoPerfume: "mujer",
    tipoPerfume: "arabe",
    imageUrl: "/jasmine-oriental-perfume-bottle.jpg",
    addedDate: "2024-02-15",
  },
  {
    id: "8",
    nombrePerfume: "Aqua Marine",
    marcaPerfume: "Ocean Blue",
    precioPerfume: 120,
    presentacionPerfume: "100ml",
    ocasionPerfume: "dia",
    climaPerfume: "calido",
    horaDiaPerfume: "dia",
    generoPerfume: "hombre",
    tipoPerfume: "disenador",
    imageUrl: "/aqua-marine-perfume-bottle.jpg",
    addedDate: "2024-03-10",
  },
]

const supabase = createClient()

export function PerfumeCatalog() {
  const [filters, setFilters] = useState<FilterState>({
    presentation: [],
    occasion: [],
    climate: [],
    timeOfDay: [],
    gender: [],
    type: [],
    priceRange: [0, 500],
  })
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>("nombrePerfume")

  useEffect(() => {
    async function loadPerfumes() {
      const { data, error } = await supabase
        .from('img_metadata')
        .select('*')
      if (data) {
        // Transforma los datos y cachea las URLs de Cloudinary
        const transformedPerfumes = data.map(perfume => ({
          ...perfume,
          image: perfume.cloudinary_url
        }))
        setPerfumes(transformedPerfumes)
      }
      setLoading(false)
    }

    loadPerfumes()
  }, [])

  // Filtrar perfumes
  const filteredPerfumes = useMemo(() => {
    return SAMPLE_PERFUMES.filter((perfume) => {
      if (filters.presentation.length > 0 && !filters.presentation.includes(perfume.presentacionPerfume)) {
        return false
      }
      if (filters.occasion.length > 0 && !filters.occasion.includes(perfume.ocasionPerfume)) {
        return false
      }
      if (filters.climate.length > 0 && !filters.climate.includes(perfume.climaPerfume)) {
        return false
      }
      if (filters.timeOfDay.length > 0 && !filters.timeOfDay.includes(perfume.horaDiaPerfume)) {
        return false
      }
      if (filters.gender.length > 0 && !filters.gender.includes(perfume.generoPerfume)) {
        return false
      }
      if (filters.type.length > 0 && !filters.type.includes(perfume.tipoPerfume)) {
        return false
      }
      if (perfume.precioPerfume < filters.priceRange[0] || perfume.precioPerfume > filters.priceRange[1]) {
        return false
      }
      return true
    })
  }, [filters])

  // Ordenar perfumes
  const sortedPerfumes = useMemo(() => {
    const sorted = [...filteredPerfumes]
    switch (sortBy) {
      case "nombrePerfume":
        return sorted.sort((a, b) => a.nombrePerfume.localeCompare(b.nombrePerfume))
      case "precio-asc":
        return sorted.sort((a, b) => a.precioPerfume - b.precioPerfume)
      case "precio-desc":
        return sorted.sort((a, b) => b.precioPerfume - a.precioPerfume)
      case "newest":
        return sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
      case "oldest":
        return sorted.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime())
      default:
        return sorted
    }
  }, [filteredPerfumes, sortBy])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar de filtros */}
      <aside className="w-80 border-r border-border bg-card">
        <PerfumeFilters filters={filters} onFiltersChange={setFilters} />
      </aside>

      {/* Área principal con grid de productos */}
      <div className="flex-1">
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-3xl tracking-tight text-balance font-sans font-semibold">Catálogo de Perfumes</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {sortedPerfumes.length} {sortedPerfumes.length === 1 ? "perfume" : "perfumes"} encontrados
              </p>
            </div>
            <SortControls sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        <div className="p-8">
          <PerfumeGrid perfumes={sortedPerfumes} />
        </div>
      </div>
    </div>
  )
}
