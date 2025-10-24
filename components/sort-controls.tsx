"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"
import type { SortOption } from "@/types"

interface SortControlsProps {
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
}

export function SortControls({ sortBy, onSortChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Alfabético (A-Z)</SelectItem>
          <SelectItem value="price-asc">Precio (Menor a Mayor)</SelectItem>
          <SelectItem value="price-desc">Precio (Mayor a Menor)</SelectItem>
          <SelectItem value="newest">Más Recientes</SelectItem>
          <SelectItem value="oldest">Más Antiguos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
