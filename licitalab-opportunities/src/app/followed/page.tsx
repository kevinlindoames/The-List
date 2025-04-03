"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchOpportunities } from "@/redux/slices/opportunitiesSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import OpportunityTable from "@/components/OpportunityTable";
import OpportunityFilters from "@/components/OpportunityFilters";
import OpportunityStats from "@/components/OpportunityStats";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FollowedPage() {
  const dispatch = useAppDispatch();
  const { followed, status, filters } = useAppSelector(
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
              Oportunidades en Seguimiento
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Visualiza las oportunidades que estás siguiendo actualmente
            </p>
          </div>
          <Link href="/" passHref>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a Listado</span>
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Panel de estadísticas - filtramos solo para mostrar seguidas */}
          <OpportunityStats opportunities={followed} />

          {/* Filtros de oportunidades */}
          <OpportunityFilters />

          {/* Tabla de oportunidades seguidas */}
          <OpportunityTable
            opportunities={followed}
            loading={status === "loading"}
          />
        </CardContent>
      </Card>
    </main>
  );
}
