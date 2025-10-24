"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { FilterState } from "@/types"

interface PerfumeFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function PerfumeFilters({ filters, onFiltersChange }: PerfumeFiltersProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = <K extends keyof FilterState>(key: K, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray as FilterState[K])
  }

  const clearAllFilters = () => {
    onFiltersChange({
      presentation: [],
      occasion: [],
      climate: [],
      timeOfDay: [],
      gender: [],
      type: [],
      priceRange: [0, 500],
    })
  }

  const hasActiveFilters =
    filters.presentation.length > 0 ||
    filters.occasion.length > 0 ||
    filters.climate.length > 0 ||
    filters.timeOfDay.length > 0 ||
    filters.gender.length > 0 ||
    filters.type.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 500

  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-sans font-semibold">Filtros</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-xs">
              <X className="h-3 w-3 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Presentación */}
        <FilterSection title="Presentación">
          <FilterCheckbox
            label="50ml"
            checked={filters.presentation.includes("50ml")}
            onCheckedChange={() => toggleArrayFilter("presentation", "50ml")}
          />
          <FilterCheckbox
            label="75ml"
            checked={filters.presentation.includes("75ml")}
            onCheckedChange={() => toggleArrayFilter("presentation", "75ml")}
          />
          <FilterCheckbox
            label="100ml"
            checked={filters.presentation.includes("100ml")}
            onCheckedChange={() => toggleArrayFilter("presentation", "100ml")}
          />
          <FilterCheckbox
            label="125ml"
            checked={filters.presentation.includes("125ml")}
            onCheckedChange={() => toggleArrayFilter("presentation", "125ml")}
          />
          <FilterCheckbox
            label="200ml"
            checked={filters.presentation.includes("200ml")}
            onCheckedChange={() => toggleArrayFilter("presentation", "200ml")}
          />
        </FilterSection>

        {/* Ocasión */}
        <FilterSection title="Ocasión">
          <FilterCheckbox
            label="Casual"
            checked={filters.occasion.includes("casual")}
            onCheckedChange={() => toggleArrayFilter("occasion", "casual")}
          />
          <FilterCheckbox
            label="Formal"
            checked={filters.occasion.includes("formal")}
            onCheckedChange={() => toggleArrayFilter("occasion", "formal")}
          />
          <FilterCheckbox
            label="Informal"
            checked={filters.occasion.includes("informal")}
            onCheckedChange={() => toggleArrayFilter("occasion", "informal")}
          />
          <FilterCheckbox
            label="Ocasión especial"
            checked={filters.occasion.includes("ocasion especial")}
            onCheckedChange={() => toggleArrayFilter("occasion", "ocasion especial")}
          />
        </FilterSection>

        {/* Clima */}
        <FilterSection title="Clima">
          <FilterCheckbox
            label="Cálido"
            checked={filters.climate.includes("calido")}
            onCheckedChange={() => toggleArrayFilter("climate", "calido")}
          />
          <FilterCheckbox
            label="Templado"
            checked={filters.climate.includes("templado")}
            onCheckedChange={() => toggleArrayFilter("climate", "templado")}
          />
          <FilterCheckbox
            label="Frío"
            checked={filters.climate.includes("frio")}
            onCheckedChange={() => toggleArrayFilter("climate", "frio")}
          />
        </FilterSection>

        {/* Hora del día */}
        <FilterSection title="Hora del Día">
          <FilterCheckbox
            label="Día"
            checked={filters.timeOfDay.includes("dia")}
            onCheckedChange={() => toggleArrayFilter("timeOfDay", "dia")}
          />
          <FilterCheckbox
            label="Tarde"
            checked={filters.timeOfDay.includes("tarde")}
            onCheckedChange={() => toggleArrayFilter("timeOfDay", "tarde")}
          />
          <FilterCheckbox
            label="Noche"
            checked={filters.timeOfDay.includes("noche")}
            onCheckedChange={() => toggleArrayFilter("timeOfDay", "noche")}
          />
        </FilterSection>

        {/* Género */}
        <FilterSection title="Género">
          <FilterCheckbox
            label="Hombre"
            checked={filters.gender.includes("hombre")}
            onCheckedChange={() => toggleArrayFilter("gender", "hombre")}
          />
          <FilterCheckbox
            label="Mujer"
            checked={filters.gender.includes("mujer")}
            onCheckedChange={() => toggleArrayFilter("gender", "mujer")}
          />
          <FilterCheckbox
            label="Unisex"
            checked={filters.gender.includes("unisex")}
            onCheckedChange={() => toggleArrayFilter("gender", "unisex")}
          />
        </FilterSection>

        {/* Tipo */}
        <FilterSection title="Tipo">
          <FilterCheckbox
            label="Árabe"
            checked={filters.type.includes("arabe")}
            onCheckedChange={() => toggleArrayFilter("type", "arabe")}
          />
          <FilterCheckbox
            label="Diseñador"
            checked={filters.type.includes("disenador")}
            onCheckedChange={() => toggleArrayFilter("type", "disenador")}
          />
          <FilterCheckbox
            label="Nicho"
            checked={filters.type.includes("nicho")}
            onCheckedChange={() => toggleArrayFilter("type", "nicho")}
          />
        </FilterSection>

        {/* Rango de precios */}
        <FilterSection title="Rango de Precios">
          <div className="space-y-4">
            <Slider
              min={0}
              max={500}
              step={10}
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>
      </div>
    </div>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="tracking-wide uppercase text-muted-foreground text-xs font-medium">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function FilterCheckbox({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: () => void
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} checked={checked} onCheckedChange={onCheckedChange} />
      <Label
        htmlFor={label}
        className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </Label>
    </div>
  )
}
