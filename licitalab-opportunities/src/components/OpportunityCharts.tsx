"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Opportunity } from "@/types/Opportunity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

interface OpportunityChartsProps {
  opportunities: Opportunity[];
}

// Definir TYPE_COLORS fuera del componente para evitar re-creaciones
const TYPE_COLORS = {
  tender: "#3b82f6",
  agile: "#10b981",
} as const;

// Tipos para los datos de los gráficos
type MonthlyDataType = {
  month: string;
  total: number;
  tender: number;
  agile: number;
};

type TypeDistributionType = {
  name: string;
  value: number;
  color: string;
};

type StatusDistributionType = {
  name: string;
  value: number;
};

export default function OpportunityCharts({
  opportunities,
}: OpportunityChartsProps) {
  // Estados con tipos explícitos
  const [monthlyData, setMonthlyData] = useState<MonthlyDataType[]>([]);
  const [typeDistribution, setTypeDistribution] = useState<
    TypeDistributionType[]
  >([]);
  const [statusDistribution, setStatusDistribution] = useState<
    StatusDistributionType[]
  >([]);

  // Procesar datos mensuales con useCallback
  const processMonthlyData = useCallback(() => {
    const endDate = new Date();
    const startDate = subMonths(endDate, 5);

    const monthRange = eachMonthOfInterval({
      start: startDate,
      end: endDate,
    });

    const data: MonthlyDataType[] = monthRange.map((date) => {
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);

      const opportunitiesInMonth = opportunities.filter((opp) => {
        const pubDate = parseISO(opp.publish_date);
        return pubDate >= monthStart && pubDate <= monthEnd;
      });

      const tenderCount = opportunitiesInMonth.filter(
        (opp) => opp.type === "tender"
      ).length;
      const agileCount = opportunitiesInMonth.filter(
        (opp) => opp.type === "agile"
      ).length;

      return {
        month: format(date, "MMM yyyy", { locale: es }),
        total: opportunitiesInMonth.length,
        tender: tenderCount,
        agile: agileCount,
      };
    });

    setMonthlyData(data);
  }, [opportunities]);

  // Procesar distribución por tipo
  const processTypeDistribution = useCallback(() => {
    const tenderCount = opportunities.filter(
      (opp) => opp.type === "tender"
    ).length;
    const agileCount = opportunities.filter(
      (opp) => opp.type === "agile"
    ).length;

    const distribution: TypeDistributionType[] = [
      {
        name: "Licitación",
        value: tenderCount,
        color: TYPE_COLORS.tender,
      },
      {
        name: "Compra Ágil",
        value: agileCount,
        color: TYPE_COLORS.agile,
      },
    ];

    setTypeDistribution(distribution);
  }, [opportunities]);

  // Procesar distribución por estado
  const processStatusDistribution = useCallback(() => {
    const now = new Date();

    const distribution: StatusDistributionType[] = [
      {
        name: "Activas",
        value: opportunities.filter((opp) => new Date(opp.close_date) > now)
          .length,
      },
      {
        name: "Cerradas",
        value: opportunities.filter((opp) => new Date(opp.close_date) <= now)
          .length,
      },
      {
        name: "En seguimiento",
        value: opportunities.filter((opp) => opp.is_followed).length,
      },
    ];

    setStatusDistribution(distribution);
  }, [opportunities]);

  // Ejecutar procesamientos cuando cambien las oportunidades
  useEffect(() => {
    if (!opportunities.length) return;

    processMonthlyData();
    processTypeDistribution();
    processStatusDistribution();
  }, [
    opportunities,
    processMonthlyData,
    processTypeDistribution,
    processStatusDistribution,
  ]);

  // Resto del componente permanece igual...
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Tendencia mensual */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">
            Tendencia mensual de oportunidades
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="tender"
                name="Licitación"
                stroke={TYPE_COLORS.tender}
              />
              <Line
                type="monotone"
                dataKey="agile"
                name="Compra Ágil"
                stroke={TYPE_COLORS.agile}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribución por tipo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Distribución por tipo</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {typeDistribution.map(
                  (entry: TypeDistributionType, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  )
                )}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribución por estado */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estado de las oportunidades</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statusDistribution}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Cantidad" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
