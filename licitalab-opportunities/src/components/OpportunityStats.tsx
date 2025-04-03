"use client";

import React, { useEffect, useState } from "react";
import { Opportunity } from "@/types/Opportunity";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  TrendingUp,
  Clock,
  Star,
  FileText,
  ShoppingCart,
} from "lucide-react";

interface OpportunityStatsProps {
  opportunities: Opportunity[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  color: string;
}

const StatCard = ({ title, value, icon, trend, color }: StatCardProps) => (
  <Card className="border shadow-sm">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <h4 className="text-2xl font-bold">{value}</h4>
          {trend !== undefined && (
            <p
              className={`text-xs mt-1 flex items-center ${
                trend >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp
                className={`h-3 w-3 mr-1 ${trend < 0 ? "rotate-180" : ""}`}
              />
              {trend >= 0 ? "+" : ""}
              {trend}% respecto al mes anterior
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export default function OpportunityStats({
  opportunities,
}: OpportunityStatsProps) {
  const [stats, setStats] = useState({
    total: 0,
    followed: 0,
    closingSoon: 0,
    tenderCount: 0,
    agileCount: 0,
  });

  useEffect(() => {
    if (!opportunities.length) return;

    // Fecha actual y fecha límite para "próximo a cerrar" (3 días)
    const now = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(now.getDate() + 3);

    // Calcular estadísticas
    const followed = opportunities.filter((opp) => opp.is_followed).length;
    const closingSoon = opportunities.filter((opp) => {
      const closeDate = new Date(opp.close_date);
      return closeDate <= threeDaysFromNow;
    }).length;
    const tenderCount = opportunities.filter(
      (opp) => opp.type === "tender"
    ).length;
    const agileCount = opportunities.filter(
      (opp) => opp.type === "agile"
    ).length;

    setStats({
      total: opportunities.length,
      followed,
      closingSoon,
      tenderCount,
      agileCount,
    });
  }, [opportunities]);

  // Simular tendencias (en una app real, esto vendría de datos históricos)
  const trends = {
    total: 12, // 12% más que el mes pasado
    followed: 5,
    closingSoon: -8,
  };

  return (
    <div className="mb-8 space-y-6">
      <h3 className="text-lg font-medium mb-4">Resumen de Oportunidades</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Oportunidades"
          value={stats.total}
          icon={<Briefcase className="h-5 w-5 text-white" />}
          trend={trends.total}
          color="bg-blue-600"
        />

        <StatCard
          title="En Seguimiento"
          value={stats.followed}
          icon={<Star className="h-5 w-5 text-white" />}
          trend={trends.followed}
          color="bg-amber-500"
        />

        <StatCard
          title="Próximos a cerrar"
          value={stats.closingSoon}
          icon={<Clock className="h-5 w-5 text-white" />}
          trend={trends.closingSoon}
          color="bg-red-500"
        />

        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Distribución por tipo
            </p>

            <div className="flex gap-4 items-center mb-3">
              <div className="p-2 rounded-full bg-blue-100">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">Licitaciones</span>
                  <span className="text-xs font-medium">
                    {Math.round((stats.tenderCount / stats.total) * 100) || 0}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(stats.tenderCount / stats.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="p-2 rounded-full bg-green-100">
                <ShoppingCart className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">Compra Ágil</span>
                  <span className="text-xs font-medium">
                    {Math.round((stats.agileCount / stats.total) * 100) || 0}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${(stats.agileCount / stats.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border-t border-border pt-4 flex justify-between text-sm text-muted-foreground">
        <p>Actualizados al {new Date().toLocaleDateString("es-ES")}</p>
        <button className="hover:text-primary transition-colors">
          Ver estadísticas detalladas →
        </button>
      </div>
    </div>
  );
}
