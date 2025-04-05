"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Opportunity } from "@/types/Opportunity";
import opportunityService from "@/services/opportunityService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function OpportunityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOpportunity() {
      try {
        setLoading(true);
        const data = await opportunityService.getOpportunityByCode(code);
        setOpportunity(data);
        setError(null);
      } catch (err) {
        setError("No se pudo cargar la oportunidad");
        console.error("Error al cargar la oportunidad:", err);
      } finally {
        setLoading(false);
      }
    }

    if (code) {
      fetchOpportunity();
    }
  }, [code]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg">Cargando detalles de la oportunidad...</p>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-2xl font-bold mb-2">Oportunidad no encontrada</h2>
          <p className="text-muted-foreground mb-6">
            No pudimos encontrar la oportunidad con el código: {code}
          </p>
          <Button
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al listado
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al listado
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div
          className={`w-full h-2 ${
            opportunity.type === "tender" ? "bg-blue-500" : "bg-green-500"
          }`}
        ></div>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    opportunity.type === "tender"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {opportunity.type === "tender" ? "Licitación" : "Compra Ágil"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {opportunity.code}
                </span>
              </div>
              <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
            </div>
            <div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  opportunity.is_followed
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {opportunity.is_followed ? "En seguimiento" : "Sin seguimiento"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Fecha de publicación
                </p>
                <p className="font-medium">
                  {formatDate(opportunity.publish_date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha de cierre</p>
                <p className="font-medium">
                  {formatDate(opportunity.close_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end">
            <Link href="/" passHref>
              <Button variant="outline" className="mr-2">
                Volver al listado
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
