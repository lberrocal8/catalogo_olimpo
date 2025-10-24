"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Perfume } from "@/types"

interface PerfumeGridProps {
  perfumes: Perfume[]
}

export function PerfumeGrid({ perfumes }: PerfumeGridProps) {
  if (perfumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-serif font-light mb-2">No se encontraron perfumes</h3>
        <p className="text-muted-foreground">Intenta ajustar los filtros para ver más resultados</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {perfumes.map((perfume) => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  )
}

function PerfumeCard({ perfume }: { perfume: Perfume }) {
  const typeLabels = {
    arabe: "Árabe",
    disenador: "Diseñador",
    nicho: "Nicho",
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[1/1] overflow-hidden bg-muted">
          <Image
            src={perfume.imageUrl || "/placeholder.svg"}
            alt={perfume.nombrePerfume}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {typeLabels[perfume.tipoPerfume]}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="w-full">
          <h3 className="leading-tight text-balance font-sans font-medium text-base">{perfume.nombrePerfume}</h3>
          <p className="text-muted-foreground mt-1 text-xs">{perfume.marcaPerfume}</p>
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          <span className="text-muted-foreground text-xs">{perfume.presentacionPerfume}</span>
          <span className="text-base font-semibold">${perfume.precioPerfume}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
