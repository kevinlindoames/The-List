"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchOpportunities } from "@/redux/slices/opportunitiesSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import OpportunityCharts from "@/components/OpportunityCharts";
import OpportunityFilters from "@/components/OpportunityFilters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
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
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Análisis de Oportunidades
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Visualiza tendencias y métricas de las oportunidades
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
          {/* Filtros de oportunidades */}
          <OpportunityFilters />

          {/* Visualizaciones */}
          {status === "loading" ? (
            <div className="w-full flex flex-col items-center justify-center p-12 space-y-4">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
              <p className="text-lg font-medium animate-pulse">
                Cargando análisis...
              </p>
            </div>
          ) : (
            <OpportunityCharts opportunities={items} />
          )}

          {/* KPIs adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{items.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Total de oportunidades
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {items.filter((item) => item.is_followed).length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    En seguimiento
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {
                      items.filter(
                        (item) => new Date(item.close_date) > new Date()
                      ).length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Oportunidades activas
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {Math.round(
                      (items.filter((item) => item.type === "tender").length /
                        items.length) *
                        100
                    ) || 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">Licitaciones</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
