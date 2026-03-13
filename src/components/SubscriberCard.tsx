import { MessageCircle, DollarSign } from "lucide-react";
import { Subscriber, getDaysRemaining, formatDateDMY } from "@/lib/mockData";

interface Props {
  subscriber: Subscriber;
  onPaid: (subscriber: Subscriber) => void;
}

const WA_MSG = encodeURIComponent(
  "Hola, te recordamos que tu suscripción vence pronto. Si deseas renovar, avísanos y con gusto te ayudamos."
);

function getUrgencyBadge(dias: number) {
  if (dias < 0) {
    const abs = Math.abs(dias);
    return {
      text: abs === 1 ? "Venció ayer" : `Venció hace ${abs} días`,
      classes: "bg-destructive/15 text-destructive",
    };
  }
  if (dias === 0) return { text: "Vence hoy", classes: "bg-destructive/15 text-destructive" };
  if (dias === 1) return { text: "Vence mañana", classes: "bg-accent/20 text-warning-foreground" };
  if (dias <= 3) return { text: `Vence en ${dias} días`, classes: "bg-accent/20 text-warning-foreground" };
  return { text: `Vence en ${dias} días`, classes: "bg-primary/15 text-primary" };
}

const SubscriberCard = ({ subscriber, onPaid }: Props) => {
  const dias = getDaysRemaining(subscriber.vencimiento);
  const badge = getUrgencyBadge(dias);

  return (
    <div className="rounded-xl border border-border bg-card p-4 animate-in fade-in duration-300 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">{subscriber.nombre}</p>
          <p className="text-sm text-muted-foreground">{subscriber.servicio}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <a
            href={`https://wa.me/?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            title="Enviar WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={() => onPaid(subscriber)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            title="Marcar pagado"
          >
            <DollarSign className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">{formatDateDMY(subscriber.vencimiento)}</span>
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.classes}`}>
          {badge.text}
        </span>
      </div>
    </div>
  );
};

export default SubscriberCard;
