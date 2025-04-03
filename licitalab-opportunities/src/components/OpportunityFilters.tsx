"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFilters,
  fetchOpportunities,
} from "@/redux/slices/opportunitiesSlice";
import type { OpportunityFilters } from "@/types/Opportunity";
import { OpportunityType } from "@/types/Opportunity";
import { Calendar, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Definición constante de tipos de oportunidades
const OPPORTUNITY_TYPES = [
  { value: "all", label: "Todos los tipos" },
  { value: "tender", label: "Licitación" },
  { value: "agile", label: "Compra Ágil" },
] as const;

export default function OpportunityFilters() {
  const dispatch = useAppDispatch();

  // Obtener los filtros actuales del estado
  const currentFilters = useAppSelector((state) => state.opportunities.filters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Estado local para manejar los filtros
  const [localFilters, setLocalFilters] = useState<OpportunityFilters>({
    type: currentFilters.type || "all", // Cambia a 'all' en lugar de ""
    startDate: currentFilters.startDate || "",
    endDate: currentFilters.endDate || "",
  });

  // Efecto para sincronizar filtros globales con estado local
  useEffect(() => {
    setLocalFilters({
      type: currentFilters.type || "all",
      startDate: currentFilters.startDate || "",
      endDate: currentFilters.endDate || "",
    });
  }, [currentFilters]);

  // Verificar si hay filtros activos
  const hasActiveFilters = Boolean(
    localFilters.type || localFilters.startDate || localFilters.endDate
  );

  // Calcular cuántos filtros están activos
  const activeFilterCount = [
    localFilters.type,
    localFilters.startDate,
    localFilters.endDate,
  ].filter(Boolean).length;

  // Función para manejar cambios en los filtros
  const handleFilterChange = useCallback(
    (name: string, value: string) => {
      // Crear copia del estado actual
      const updatedFilters: OpportunityFilters = {
        ...localFilters,
        [name]: name === "type" ? (value as OpportunityType) : value,
      };

      // Establecer estado local
      setLocalFilters(updatedFilters);

      // Despachar filtros a Redux
      dispatch(setFilters(updatedFilters));

      // Cargar oportunidades con filtros
      dispatch(fetchOpportunities(updatedFilters));
    },
    [dispatch, localFilters]
  );

  // Función para restablecer filtros
  const resetFilters = useCallback(() => {
    // Estado inicial de filtros
    const resetState: OpportunityFilters = {
      type: "all", // Cambia a 'all'
      startDate: "",
      endDate: "",
    };

    // Restablecer estado local
    setLocalFilters(resetState);

    // Limpiar filtros en Redux
    dispatch(setFilters(resetState));

    // Cargar todas las oportunidades
    dispatch(fetchOpportunities());
  }, [dispatch]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {activeFilterCount}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden"
          >
            {isFilterOpen ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
            >
              <X className="h-4 w-4" /> Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      <Card
        className={`overflow-hidden transition-all duration-300 ${
          isFilterOpen || hasActiveFilters
            ? "max-h-96"
            : "max-h-0 md:max-h-96 border-0 md:border"
        }`}
      >
        <CardContent className="p-4 md:p-6 pt-4 md:pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Selector de tipo de oportunidad */}
            <div className="space-y-2">
              <label
                htmlFor="type-select"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                Tipo de Oportunidad
              </label>
              <Select
                value={localFilters.type || "all"}
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {OPPORTUNITY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {localFilters.type && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => handleFilterChange("type", "all")}
                >
                  <X className="h-3 w-3 mr-1" /> Quitar filtro
                </Button>
              )}
            </div>

            {/* Selector de fecha de inicio */}
            <div className="space-y-2">
              <label
                htmlFor="start-date"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Fecha Inicio
              </label>
              <div className="relative">
                <input
                  id="start-date"
                  type="date"
                  name="startDate"
                  value={localFilters.startDate || ""}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {localFilters.startDate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => handleFilterChange("startDate", "")}
                >
                  <X className="h-3 w-3 mr-1" /> Quitar filtro
                </Button>
              )}
            </div>

            {/* Selector de fecha de fin */}
            <div className="space-y-2">
              <label
                htmlFor="end-date"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Fecha Fin
              </label>
              <div className="relative">
                <input
                  id="end-date"
                  type="date"
                  name="endDate"
                  value={localFilters.endDate || ""}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {localFilters.endDate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => handleFilterChange("endDate", "")}
                >
                  <X className="h-3 w-3 mr-1" /> Quitar filtro
                </Button>
              )}
            </div>
          </div>

          {/* Botón aplicar filtros en móvil */}
          <div className="mt-4 flex justify-end md:hidden">
            <Button
              variant="default"
              onClick={() => setIsFilterOpen(false)}
              className="w-full"
            >
              Aplicar filtros
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
