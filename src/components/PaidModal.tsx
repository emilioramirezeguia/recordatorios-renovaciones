import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Subscriber, formatDateDMY } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface Props {
  subscriber: Subscriber | null;
  open: boolean;
  onClose: () => void;
}

function addMonths(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + 31);
  return d.toISOString().split("T")[0];
}

const PaidModal = ({ subscriber, open, onClose }: Props) => {
  const { toast } = useToast();
  const [customDate, setCustomDate] = useState("");

  if (!subscriber) return null;

  const nextMonth = addMonths(subscriber.vencimiento);

  const handleQuickPay = () => {
    toast({ title: "Fecha de pago actualizada", description: `Nuevo vencimiento: ${formatDateDMY(nextMonth)}` });
    onClose();
  };

  const handleSave = () => {
    if (!customDate) return;
    toast({ title: "Fecha de pago actualizada", description: `Nuevo vencimiento: ${formatDateDMY(customDate)}` });
    setCustomDate("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{subscriber.nombre}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pagado hasta: <span className="font-medium text-foreground">{formatDateDMY(subscriber.vencimiento)}</span>
          </p>

          <Button
            onClick={handleQuickPay}
            className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            +1 mes ({formatDateDMY(nextMonth)})
          </Button>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">O seleccionar fecha:</p>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!customDate}>Guardar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaidModal;
