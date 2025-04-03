"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchOpportunities } from "@/redux/slices/opportunitiesSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import OpportunityTable from "@/components/OpportunityTable";
import OpportunityFilters from "@/components/OpportunityFilters";
import OpportunityStats from "@/components/OpportunityStats";
import ExportData from "@/components/ExportData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, BarChart3 } from "lucide-react";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, filters } = useAppSelector(
    (state) => state.opportunities
  );

  useEffect(() => {
    // Cargar oportunidades al montar el componente
    dispatch(fetchOpportunities(filters));
  }, [dispatch, filters]);

  return (
    <main className="container mx-auto py-6 px-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              Listado de Oportunidades
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Visualiza y gestiona todas las oportunidades de licitación
              disponibles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ExportData
              opportunities={items}
              isLoading={status === "loading"}
            />
            <Link href="/analytics" passHref>
              <Button variant="outline" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Ver Análisis</span>
              </Button>
            </Link>
            <Link href="/followed" passHref>
              <Button variant="outline" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Ver Seguimientos</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Panel de estadísticas */}
          <OpportunityStats opportunities={items} />

          {/* Filtros de oportunidades */}
          <OpportunityFilters />

          {/* Tabla de oportunidades */}
          <OpportunityTable
            opportunities={items}
            loading={status === "loading"}
          />
        </CardContent>
      </Card>
    </main>
  );
}
