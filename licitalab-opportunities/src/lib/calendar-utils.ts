import { createEvents, EventAttributes } from "ics";
import { saveAs } from "file-saver";
import { Opportunity } from "@/types/Opportunity";

const convertToDateArray = (
  isoString: string
): [number, number, number, number, number] => {
  const date = new Date(isoString);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

export const createCalendarEvent = (opportunity: Opportunity) => {
  const startDate = convertToDateArray(opportunity.publish_date);
  const endDate = convertToDateArray(opportunity.close_date);

  const event: EventAttributes = {
    start: startDate,
    end: endDate,
    title: `${
      opportunity.type === "tender" ? "[LICITACIÓN]" : "[COMPRA ÁGIL]"
    } ${opportunity.code} - ${opportunity.title}`,
    description: `Oportunidad de ${
      opportunity.type === "tender" ? "licitación" : "compra ágil"
    } con código ${opportunity.code}.\n\nFecha de publicación: ${new Date(
      opportunity.publish_date
    ).toLocaleDateString("es-ES")}\nFecha de cierre: ${new Date(
      opportunity.close_date
    ).toLocaleDateString("es-ES")}`,

    status: "CONFIRMED",
    busyStatus: "BUSY",
    organizer: { name: "LicitaLAB", email: "info@licitalab.com" },
    categories: ["oportunidad", opportunity.type],
  };

  return createEvents([event], (error, value) => {
    if (error) {
      console.error(error);
      return;
    }

    const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
    const filename = `${opportunity.code}_${opportunity.type}.ics`;
    saveAs(blob, filename);
  });
};

export const getGoogleCalendarUrl = (opportunity: Opportunity): string => {
  const startDate = new Date(opportunity.publish_date);
  const endDate = new Date(opportunity.close_date);

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate);

  const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent(
    `${opportunity.type === "tender" ? "[LICITACIÓN]" : "[COMPRA ÁGIL]"} ${
      opportunity.code
    }`
  );
  const details = encodeURIComponent(
    `${opportunity.title}\n\nCódigo: ${opportunity.code}\nTipo: ${
      opportunity.type === "tender" ? "Licitación" : "Compra Ágil"
    }`
  );

  return `${baseUrl}&text=${title}&details=${details}&dates=${startDateFormatted}/${endDateFormatted}`;
};

export const getOutlookCalendarUrl = (opportunity: Opportunity): string => {
  const startDate = new Date(opportunity.publish_date);
  const endDate = new Date(opportunity.close_date);

  const formatDate = (date: Date) => {
    return date.toISOString();
  };

  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate);

  const baseUrl =
    "https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent";
  const subject = encodeURIComponent(
    `${opportunity.type === "tender" ? "[LICITACIÓN]" : "[COMPRA ÁGIL]"} ${
      opportunity.code
    }`
  );
  const body = encodeURIComponent(
    `${opportunity.title}\n\nCódigo: ${opportunity.code}\nTipo: ${
      opportunity.type === "tender" ? "Licitación" : "Compra Ágil"
    }`
  );

  return `${baseUrl}&subject=${subject}&body=${body}&startdt=${startDateFormatted}&enddt=${endDateFormatted}`;
};
