import { Button } from "@/components/ui/button";
import { ClipboardPaste, Search } from "lucide-react";

interface Props {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onDetect: () => void;
}

const PasteSection = ({ placeholder, value, onChange, onDetect }: Props) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
      <ClipboardPaste className="w-5 h-5 text-primary" />
      Pegar datos del panel
    </h2>
    <textarea
      className="w-full min-h-[180px] rounded-xl border border-input bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Button
      size="lg"
      className="mt-4 w-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-xl"
      onClick={onDetect}
    >
      <Search className="w-5 h-5 mr-2" />
      Detectar cuentas próximas a vencer
    </Button>
  </section>
);

export default PasteSection;
