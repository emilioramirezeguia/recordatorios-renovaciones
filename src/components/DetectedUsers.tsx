import { AlertTriangle } from "lucide-react";

interface User {
  nombre: string;
  usuario: string;
  vencimiento: string;
  diasRestantes: number;
}

const DetectedUsers = ({ users }: { users: User[] }) => (
  <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
      <AlertTriangle className="w-5 h-5 text-accent" />
      Clientes próximos a vencer
    </h2>
    <p className="text-sm font-medium text-muted-foreground mb-3">
      {users.length} {users.length === 1 ? "cliente necesita" : "clientes necesitan"} recordatorio hoy
    </p>
    <div className="space-y-3">
      {users.map((u) => (
        <div
          key={u.usuario}
          className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <div>
            <p className="font-semibold text-foreground">{u.nombre}</p>
            <p className="text-sm text-muted-foreground">Usuario: {u.usuario}</p>
            <p className="text-sm text-muted-foreground">Vence: {u.vencimiento}</p>
          </div>
          <span className="inline-flex self-start sm:self-center rounded-full bg-warning/15 px-3 py-1 text-sm font-medium text-warning-foreground">
            {u.diasRestantes === 1 ? "vence mañana" : `vence en ${u.diasRestantes} días`}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default DetectedUsers;
