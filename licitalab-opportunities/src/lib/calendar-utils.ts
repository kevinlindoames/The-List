import { createEvents, EventAttributes } from 'ics';
import { saveAs } from 'file-saver';
import { Opportunity } from '@/types/Opportunity';

// Función para convertir fecha ISO a array para ics [año, mes, día, hora, minuto]
const convertToDateArray = (isoString: string): [number, number, number, number, number] => {
    const date = new Date(isoString);
    return [
        date.getFullYear(),
        date.getMonth() + 1, // Los meses en JS son 0-11, ics necesita 1-12
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    ];
};

// Función para crear un evento para una oportunidad
export const createCalendarEvent = (opportunity: Opportunity) => {
    // Obtener las fechas en formato esperado por la biblioteca ics
    const startDate = convertToDateArray(opportunity.publish_date);
    const endDate = convertToDateArray(opportunity.close_date);

    // Definir el evento
    const event: EventAttributes = {
        start: startDate,
        end: endDate,
        title: `${opportunity.type === 'tender' ? '[LICITACIÓN]' : '[COMPRA ÁGIL]'} ${opportunity.code} - ${opportunity.title}`,
        description: `Oportunidad de ${opportunity.type === 'tender' ? 'licitación' : 'compra ágil'} con código ${opportunity.code}.\n\nFecha de publicación: ${new Date(opportunity.publish_date).toLocaleDateString('es-ES')}\nFecha de cierre: ${new Date(opportunity.close_date).toLocaleDateString('es-ES')}`,
        // Añadir más campos si es necesario, como ubicación, etc.
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'LicitaLAB', email: 'info@licitalab.com' },
        categories: ['oportunidad', opportunity.type]
    };

    return createEvents([event], (error, value) => {
        if (error) {
            console.error(error);
            return;
        }

        // Crear un blob y guardarlo como archivo
        const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
        const filename = `${opportunity.code}_${opportunity.type}.ics`;
        saveAs(blob, filename);
    });
};

// Función para generar URL de Google Calendar
export const getGoogleCalendarUrl = (opportunity: Opportunity): string => {
    const startDate = new Date(opportunity.publish_date);
    const endDate = new Date(opportunity.close_date);

    // Formatear fechas para Google Calendar
    const formatDate = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);

    // Construir URL
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const title = encodeURIComponent(`${opportunity.type === 'tender' ? '[LICITACIÓN]' : '[COMPRA ÁGIL]'} ${opportunity.code}`);
    const details = encodeURIComponent(`${opportunity.title}\n\nCódigo: ${opportunity.code}\nTipo: ${opportunity.type === 'tender' ? 'Licitación' : 'Compra Ágil'}`);

    return `${baseUrl}&text=${title}&details=${details}&dates=${startDateFormatted}/${endDateFormatted}`;
};

// Función para generar URL de Outlook Web
export const getOutlookCalendarUrl = (opportunity: Opportunity): string => {
    const startDate = new Date(opportunity.publish_date);
    const endDate = new Date(opportunity.close_date);

    // Formatear fechas para Outlook Web
    const formatDate = (date: Date) => {
        return date.toISOString();
    };

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);

    // Construir URL
    const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent';
    const subject = encodeURIComponent(`${opportunity.type === 'tender' ? '[LICITACIÓN]' : '[COMPRA ÁGIL]'} ${opportunity.code}`);
    const body = encodeURIComponent(`${opportunity.title}\n\nCódigo: ${opportunity.code}\nTipo: ${opportunity.type === 'tender' ? 'Licitación' : 'Compra Ágil'}`);

    return `${baseUrl}&subject=${subject}&body=${body}&startdt=${startDateFormatted}&enddt=${endDateFormatted}`;
};