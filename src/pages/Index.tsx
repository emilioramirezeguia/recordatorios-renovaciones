import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { MOCK_DATA, Subscriber, getDaysRemaining } from "@/lib/mockData";
import SubscriberCard from "@/components/SubscriberCard";
import PaidModal from "@/components/PaidModal";

type FilterKey = "vencidos" | "hoy" | "3d" | "7d" | "15d" | "30d";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "vencidos", label: "Vencidos" },
  { key: "hoy", label: "Hoy" },
  { key: "3d", label: "3d" },
  { key: "7d", label: "7d" },
  { key: "15d", label: "15d" },
  { key: "30d", label: "30d" },
];

function filterSubscribers(data: Subscriber[], filter: FilterKey): Subscriber[] {
  return data.filter((s) => {
    const d = getDaysRemaining(s.vencimiento);
    switch (filter) {
      case "vencidos": return d < 0;
      case "hoy": return d === 0;
      case "3d": return d >= -1 && d <= 3;
      case "7d": return d >= -1 && d <= 7;
      case "15d": return d >= -1 && d <= 15;
      case "30d": return d >= -1 && d <= 30;
    }
  });
}

function getCounterText(filter: FilterKey, count: number): string {
  if (filter === "vencidos") return `${count} suscripcion${count === 1 ? "" : "es"} vencida${count === 1 ? "" : "s"}`;
  if (filter === "hoy") return `${count} suscripcion${count === 1 ? "" : "es"} vence${count === 1 ? "" : "n"} hoy`;
  return `${count} suscripcion${count === 1 ? "" : "es"} por vencer`;
}

const Index = () => {
  const [filter, setFilter] = useState<FilterKey>("3d");
  const [search, setSearch] = useState("");
  const [modalSub, setModalSub] = useState<Subscriber | null>(null);

  const filtered = useMemo(() => {
    let result = filterSubscribers(MOCK_DATA, filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.nombre.toLowerCase().includes(q));
    }
    return result;
  }, [filter, search]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Recordatorios</h1>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">Demo</span>
          </div>
          <p className="text-base text-muted-foreground mt-1">Gestiona vencimientos de pago y envía avisos de renovación por WhatsApp en segundos.</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Ideal para negocios con clientes recurrentes: IPTV · gimnasios · hosting · academias · membresías · y más</p>
        </header>

        {/* Controls */}
        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-muted-foreground">{getCounterText(filter, filtered.length)}</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const isActive = filter === f.key;
              const isOverdue = f.key === "vencidos";
              let classes: string;
              if (isActive) {
                classes = isOverdue
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-primary text-primary-foreground";
              } else {
                classes = isOverdue
                  ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80";
              }
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${classes}`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar suscriptor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No se encontraron suscriptores.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SubscriberCard key={s.id} subscriber={s} onPaid={setModalSub} />
            ))}
          </div>
        )}
      </div>

      <PaidModal subscriber={modalSub} open={!!modalSub} onClose={() => setModalSub(null)} />
    </div>
  );
};

export default Index;
