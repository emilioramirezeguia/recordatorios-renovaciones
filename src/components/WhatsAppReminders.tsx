import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface User {
  nombre: string;
  usuario: string;
  vencimiento: string;
  diasRestantes: number;
  whatsapp: string;
  telefono: string;
}

const WA_ORDER = ["WhatsApp 1", "WhatsApp 2", "WhatsApp Business"];

const WhatsAppReminders = ({ users, demoPhoneNumber }: { users: User[]; demoPhoneNumber: string }) => {
  const [showWarning, setShowWarning] = useState(false);

  const grouped = users.reduce<Record<string, User[]>>((acc, u) => {
    (acc[u.whatsapp] ||= []).push(u);
    return acc;
  }, {});

  const handleClick = (e: React.MouseEvent) => {
    if (!demoPhoneNumber.trim()) {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
  };

  const msg = encodeURIComponent(
    "Hola te recordamos que tu suscripción IPTV vence pronto. Si deseas renovarla avísanos para activarla."
  );

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
        <MessageCircle className="w-5 h-5 text-primary" />
        Enviar recordatorios por WhatsApp
      </h2>

      {showWarning && (
        <p className="mb-3 text-sm font-medium text-warning-foreground bg-warning/15 rounded-lg px-3 py-2">
          Primero ingresa tu número de WhatsApp para probar el demo.
        </p>
      )}

      <div className="space-y-4">
        {WA_ORDER.map((wa) => {
          const clients = grouped[wa] || [];
          return (
            <div key={wa} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-muted-foreground mb-3">{wa}</p>
              {clients.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Sin clientes</p>
              ) : (
                clients.map((c) => (
                  <div
                    key={c.usuario}
                    className="flex items-center justify-between gap-3 py-2 border-t border-border first:border-0 first:pt-0"
                  >
                    <span className="font-medium text-foreground">{c.nombre}</span>
                    <a
                      href={demoPhoneNumber.trim() ? `https://wa.me/${demoPhoneNumber.trim()}?text=${msg}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClick}
                    >
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold"
                      >
                        Abrir WhatsApp
                      </Button>
                    </a>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatsAppReminders;
