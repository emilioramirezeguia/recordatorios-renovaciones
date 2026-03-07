import { useState } from "react";
import PasteSection from "@/components/PasteSection";
import DetectedUsers from "@/components/DetectedUsers";
import WhatsAppReminders from "@/components/WhatsAppReminders";

const PLACEHOLDER = `ID\tUsuario\tContraseña\tFecha de vencimiento
123\tkiko123\t*****\t2026-03-20
124\tjuan_tv\t*****\t2026-03-20
125\tana_stream\t*****\t2026-03-21`;

const MOCK_USERS = [
{ nombre: "Juan López", usuario: "juan_tv", vencimiento: "2026-03-20", diasRestantes: 1, whatsapp: "WhatsApp 1", telefono: "5210000000001" },
{ nombre: "Kiko", usuario: "kiko123", vencimiento: "2026-03-20", diasRestantes: 1, whatsapp: "WhatsApp Business", telefono: "5210000000002" },
{ nombre: "Ana", usuario: "ana_stream", vencimiento: "2026-03-21", diasRestantes: 2, whatsapp: "WhatsApp 2", telefono: "5210000000003" }];


const Index = () => {
  const [step, setStep] = useState(0);
  const [pasteValue, setPasteValue] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">Recordatorios de vencimiento IPTV

          </h1>
          <div className="mt-5 rounded-xl bg-card border border-border p-5 text-left">
            <p className="font-semibold text-foreground mb-3">Flujo de ejemplo:</p>
            <ol className="space-y-2 text-muted-foreground text-sm sm:text-base">
              {[
              "Copiar tabla cada panel IPTV",
              "Pegarlo abajo",
              "Detectar cuentas próximas a vencer",
              "Abrir recordatorios en WhatsApp"].
              map((text, i) =>
              <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-step-bg text-step-number font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{text}</span>
                </li>
              )}
            </ol>
          </div>
        </header>

        <PasteSection
          placeholder={PLACEHOLDER}
          value={pasteValue}
          onChange={setPasteValue}
          onDetect={() => setStep(1)} />
        

        {step >= 1 &&
        <>
            <DetectedUsers users={MOCK_USERS} />
            <WhatsAppReminders users={MOCK_USERS} />
          </>
        }
      </div>
    </div>);

};

export default Index;