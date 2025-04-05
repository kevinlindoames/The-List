"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types/Opportunity";
import {
  createCalendarEvent,
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
} from "@/lib/calendar-utils";
import { Calendar, CalendarClock, Mail } from "lucide-react";

interface CalendarModalProps {
  opportunity: Opportunity;
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarModal({
  opportunity,
  isOpen,
  onClose,
}: CalendarModalProps) {
  const handleAddToLocalCalendar = () => {
    createCalendarEvent(opportunity);
    onClose();
  };

  const handleAddToGoogleCalendar = () => {
    const googleUrl = getGoogleCalendarUrl(opportunity);
    window.open(googleUrl, "_blank");
    onClose();
  };

  const handleAddToOutlookCalendar = () => {
    const outlookUrl = getOutlookCalendarUrl(opportunity);
    window.open(outlookUrl, "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar a calendario</DialogTitle>
          <DialogDescription>
            Selecciona dónde quieres agregar el evento de la oportunidad{" "}
            {opportunity.code}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-14"
            onClick={handleAddToLocalCalendar}
          >
            <Calendar className="h-6 w-6 text-blue-500" />
            <div className="text-left">
              <p className="font-medium">Calendario Local (.ics)</p>
              <p className="text-xs text-muted-foreground">
                Descarga un archivo .ics compatible con Apple Calendar, Outlook,
                etc.
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-14"
            onClick={handleAddToGoogleCalendar}
          >
            <CalendarClock className="h-6 w-6 text-red-500" />
            <div className="text-left">
              <p className="font-medium">Google Calendar</p>
              <p className="text-xs text-muted-foreground">
                Abre Google Calendar para agregar este evento
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-14"
            onClick={handleAddToOutlookCalendar}
          >
            <Mail className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">Outlook Calendar</p>
              <p className="text-xs text-muted-foreground">
                Abre Outlook Web Calendar para agregar este evento
              </p>
            </div>
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
