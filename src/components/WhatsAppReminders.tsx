import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  nombre: string;
  usuario: string;
  vencimiento: string;
  diasRestantes: number;
  whatsapp: string;
  telefono: string;
}

const WhatsAppReminders = ({ users }: { users: User[] }) => {
  const grouped = users.reduce<Record<string, User[]>>((acc, u) => {
    (acc[u.whatsapp] ||= []).push(u);
    return acc;
  }, {});

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
        <MessageCircle className="w-5 h-5 text-primary" />
        Enviar recordatorios por WhatsApp
      </h2>
      <div className="space-y-4">
        {Object.entries(grouped).map(([wa, clients]) => (
          <div key={wa} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-muted-foreground mb-3">{wa}</p>
            {clients.map((c) => {
              const msg = encodeURIComponent(
                `Hola ${c.nombre}, tu suscripción IPTV vence ${c.diasRestantes === 1 ? "mañana" : `en ${c.diasRestantes} días`} (${c.vencimiento}). ¿Deseas renovar?`
              );
              return (
                <div
                  key={c.usuario}
                  className="flex items-center justify-between gap-3 py-2 border-t border-border first:border-0 first:pt-0"
                >
                  <span className="font-medium text-foreground">{c.nombre}</span>
                  <a
                    href={`https://wa.me/${c.telefono}?text=${msg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold"
                    >
                      Abrir WhatsApp
                    </Button>
                  </a>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Demo visual — no es una automatización real
      </p>
    </section>
  );
};

export default WhatsAppReminders;
