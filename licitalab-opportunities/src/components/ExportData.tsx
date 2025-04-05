"use client";

import React, { useState } from "react";
import { Opportunity } from "@/types/Opportunity";
import { Button } from "@/components/ui/button";

import {
  FileDown,
  FileSpreadsheet,
  File,
  FileText,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ExportDataProps {
  opportunities: Opportunity[];
  isLoading?: boolean;
}

export default function ExportData({
  opportunities,
  isLoading = false,
}: ExportDataProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: es });
  };

  const prepareData = () => {
    return opportunities.map((opp) => ({
      Código: opp.code,
      Título: opp.title,
      Tipo: opp.type === "tender" ? "Licitación" : "Compra Ágil",
      "Fecha Publicación": formatDate(opp.publish_date),
      "Fecha Cierre": formatDate(opp.close_date),
      "En Seguimiento": opp.is_followed ? "Sí" : "No",
    }));
  };

  const exportToExcel = () => {
    try {
      setExporting("excel");
      const data = prepareData();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Oportunidades");

      const columnWidths = [
        { wch: 12 },
        { wch: 40 },
        { wch: 15 },
        { wch: 18 },
        { wch: 18 },
        { wch: 15 },
      ];
      ws["!cols"] = columnWidths;

      const fileName = `Oportunidades_${format(
        new Date(),
        "yyyyMMdd_HHmmss"
      )}.xlsx`;

      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
    } finally {
      setExporting(null);
    }
  };

  const exportToCSV = () => {
    try {
      setExporting("csv");
      const data = prepareData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Oportunidades_${format(new Date(), "yyyyMMdd_HHmmss")}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al exportar a CSV:", error);
    } finally {
      setExporting(null);
    }
  };

  const exportToPDF = () => {
    try {
      setExporting("pdf");
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Listado de Oportunidades", 14, 20);
      doc.setFontSize(11);
      doc.text(
        `Fecha de generación: ${format(new Date(), "dd/MM/yyyy HH:mm")}`,
        14,
        28
      );

      const data = prepareData();
      const columns = Object.keys(data[0]);
      const rows = data.map((item) => Object.values(item));

      // @ts-expect-error - la librería jspdf-autotable extiende jsPDF pero TypeScript no lo reconoce
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 35,
        margin: { top: 30 },
        styles: { overflow: "linebreak" },
        headStyles: { fillColor: [59, 130, 246], textColor: 255 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: "auto" },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
        },
      });

      doc.save(`Oportunidades_${format(new Date(), "yyyyMMdd_HHmmss")}.pdf`);
    } catch (error) {
      console.error("Error al exportar a PDF:", error);
    } finally {
      setExporting(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={
            isLoading || opportunities.length === 0 || exporting !== null
          }
          className="flex items-center gap-2"
        >
          {exporting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span>Exportando...</span>
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4" />
              <span>Exportar</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportToExcel}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          <span>Exportar a Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV}>
          <FileText className="h-4 w-4 mr-2" />
          <span>Exportar a CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <File className="h-4 w-4 mr-2" />
          <span>Exportar a PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
