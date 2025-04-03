"use client";

import React, { useState } from "react";
import { Opportunity } from "@/types/Opportunity";
import { useAppDispatch } from "@/redux/hooks";
import { toggleOpportunityFollow } from "@/redux/slices/opportunitiesSlice";
import { Button } from "@/components/ui/button";
import {
  Star,
  Calendar,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Eye,
  CalendarPlus,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import CalendarModal from "./CalendarModal";

interface OpportunityTableProps {
  opportunities: Opportunity[];
  loading: boolean;
}

export default function OpportunityTable({
  opportunities,
  loading,
}: OpportunityTableProps) {
  const dispatch = useAppDispatch();
  const [sortField, setSortField] = useState<keyof Opportunity | null>(
    "publish_date"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Estado para el modal de calendario
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);

  // Función para abrir el modal de calendario
  const handleOpenCalendarModal = (
    opportunity: Opportunity,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedOpportunity(opportunity);
    setCalendarModalOpen(true);
  };

  // Función para manejar el seguimiento de oportunidades
  const handleToggleFollow = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleOpportunityFollow(code));
  };

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Función para calcular cuánto tiempo queda para el cierre
  const getTimeRemaining = (closeDate: string) => {
    const now = new Date();
    const close = new Date(closeDate);
    const daysRemaining = Math.ceil(
      (close.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      daysRemaining,
      text: formatDistanceToNow(close, { locale: es, addSuffix: true }),
    };
  };

  // Función para obtener color según días restantes
  const getStatusColor = (closeDate: string) => {
    const { daysRemaining } = getTimeRemaining(closeDate);

    if (daysRemaining <= 3) return "text-red-600 bg-red-50 border-red-200";
    if (daysRemaining <= 7)
      return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  // Función para manejar el ordenamiento
  const handleSort = (field: keyof Opportunity) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Función para expandir/contraer detalles de la fila
  const toggleRowExpansion = (code: string) => {
    setExpandedRow(expandedRow === code ? null : code);
  };

  // Ordenar oportunidades
  const sortedOpportunities = [...opportunities].sort((a, b) => {
    if (!sortField) return 0;

    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }

    // Fallback para otros tipos
    return sortDirection === "asc"
      ? String(fieldA).localeCompare(String(fieldB))
      : String(fieldB).localeCompare(String(fieldA));
  });

  // Renderizar mensaje de carga
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 space-y-4">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="text-lg font-medium animate-pulse">
          Cargando oportunidades...
        </p>
      </div>
    );
  }

  // Renderizar mensaje si no hay oportunidades
  if (opportunities.length === 0) {
    return (
      <div className="w-full p-10 border rounded-xl flex flex-col items-center justify-center bg-muted/20">
        <div className="text-muted-foreground mb-4">
          <AlertTriangle size={48} className="mx-auto mb-2" />
          <p className="text-xl font-medium text-center">
            No se encontraron oportunidades
          </p>
        </div>
        <p className="text-muted-foreground text-center max-w-md">
          No se encontraron oportunidades que coincidan con los filtros
          seleccionados. Intenta modificar los criterios de búsqueda.
        </p>
      </div>
    );
  }

  // Renderizar cabecera de tabla
  const renderSortIcon = (field: keyof Opportunity) => {
    if (sortField !== field)
      return <ChevronDown className="w-4 h-4 opacity-50" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-border shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="p-4 text-left font-medium">
                  <button
                    onClick={() => handleSort("code")}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Código {renderSortIcon("code")}
                  </button>
                </th>
                <th className="p-4 text-left font-medium">
                  <button
                    onClick={() => handleSort("title")}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Título {renderSortIcon("title")}
                  </button>
                </th>
                <th className="p-4 text-left font-medium">
                  <button
                    onClick={() => handleSort("type")}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Tipo {renderSortIcon("type")}
                  </button>
                </th>
                <th className="p-4 text-left font-medium">
                  <button
                    onClick={() => handleSort("publish_date")}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Publicación {renderSortIcon("publish_date")}
                  </button>
                </th>
                <th className="p-4 text-left font-medium">
                  <button
                    onClick={() => handleSort("close_date")}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Cierre {renderSortIcon("close_date")}
                  </button>
                </th>
                <th className="p-4 text-center font-medium">Seguimiento</th>
                <th className="p-4 text-center font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedOpportunities.map((opportunity) => {
                const { daysRemaining, text } = getTimeRemaining(
                  opportunity.close_date
                );
                const statusColor = getStatusColor(opportunity.close_date);
                const isExpanded = expandedRow === opportunity.code;

                return (
                  <React.Fragment key={opportunity.id}>
                    <tr
                      className="border-b hover:bg-muted/10 transition-colors cursor-pointer"
                      onClick={() => toggleRowExpansion(opportunity.code)}
                    >
                      <td className="p-4 font-medium">
                        <Link
                          href={`/opportunity/${opportunity.code}`}
                          className="hover:underline hover:text-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {opportunity.code}
                        </Link>
                      </td>
                      <td className="p-4">{opportunity.title}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            opportunity.type === "tender"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {opportunity.type === "tender"
                            ? "Licitación"
                            : "Compra Ágil"}
                        </span>
                      </td>
                      <td className="p-4 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {formatDate(opportunity.publish_date)}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {formatDate(opportunity.close_date)}
                          </div>
                          <div
                            className={`text-xs mt-1 py-0.5 px-2 rounded-md inline-flex items-center border ${statusColor}`}
                          >
                            {daysRemaining <= 3 ? (
                              <AlertTriangle className="w-3 h-3 mr-1" />
                            ) : null}
                            {text}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) =>
                            handleToggleFollow(opportunity.code, e)
                          }
                          aria-label={
                            opportunity.is_followed
                              ? "Dejar de seguir"
                              : "Seguir oportunidad"
                          }
                          className="transition-all duration-200 hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              opportunity.is_followed
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        </Button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRowExpansion(opportunity.code);
                            }}
                            aria-label="Ver detalles"
                          >
                            <Eye className="w-5 h-5 text-muted-foreground" />
                          </Button>

                          {/* Botón para agregar al calendario */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) =>
                              handleOpenCalendarModal(opportunity, e)
                            }
                            aria-label="Agregar a calendario"
                          >
                            <CalendarPlus className="w-5 h-5 text-muted-foreground" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Fila expandida con detalles */}
                    {isExpanded && (
                      <tr className="bg-muted/5">
                        <td colSpan={7} className="p-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 animate-in fade-in-50 zoom-in-95 duration-200">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-muted-foreground">
                                Detalle de la Oportunidad
                              </h4>
                              <p className="text-lg font-medium">
                                {opportunity.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Código: {opportunity.code}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-muted-foreground">
                                Fechas
                              </h4>
                              <p className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>
                                  Publicada:{" "}
                                  {formatDate(opportunity.publish_date)}
                                </span>
                              </p>
                              <p className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>
                                  Cierra: {formatDate(opportunity.close_date)}
                                </span>
                              </p>
                              <p
                                className={`text-sm mt-1 py-0.5 px-2 rounded-md inline-flex items-center ${statusColor}`}
                              >
                                {daysRemaining <= 3 ? (
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                ) : null}
                                {text}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-semibold text-sm text-muted-foreground">
                                Acciones
                              </h4>
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant={
                                    opportunity.is_followed
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  className="justify-start"
                                  onClick={(e) =>
                                    handleToggleFollow(opportunity.code, e)
                                  }
                                >
                                  <Star
                                    className={`w-4 h-4 mr-2 ${
                                      opportunity.is_followed
                                        ? "fill-primary-foreground"
                                        : ""
                                    }`}
                                  />
                                  {opportunity.is_followed
                                    ? "Dejar de seguir"
                                    : "Seguir oportunidad"}
                                </Button>

                                {/* Botón para agregar al calendario en vista expandida */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="justify-start"
                                  onClick={(e) =>
                                    handleOpenCalendarModal(opportunity, e)
                                  }
                                >
                                  <CalendarPlus className="w-4 h-4 mr-2" />
                                  Agregar a calendario
                                </Button>

                                <Link
                                  href={`/opportunity/${opportunity.code}`}
                                  passHref
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="justify-start"
                                  >
                                    <Eye className="w-4 h-4 mr-2" /> Ver ficha
                                    completa
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de calendario */}
      {selectedOpportunity && (
        <CalendarModal
          opportunity={selectedOpportunity}
          isOpen={calendarModalOpen}
          onClose={() => setCalendarModalOpen(false)}
        />
      )}
    </>
  );
}
