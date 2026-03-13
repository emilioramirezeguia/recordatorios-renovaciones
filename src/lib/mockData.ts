function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export interface Subscriber {
  id: number;
  nombre: string;
  servicio: string;
  vencimiento: string;
  telefono: string;
}

export const MOCK_DATA: Subscriber[] = [
  { id: 1, nombre: "Roberto Méndez", servicio: "Hosting Anual", vencimiento: addDays(-5), telefono: "" },
  { id: 2, nombre: "Laura Sánchez", servicio: "Membresía Gym", vencimiento: addDays(-2), telefono: "" },
  { id: 3, nombre: "Pedro Castillo", servicio: "IPTV Premium", vencimiento: addDays(0), telefono: "" },
  { id: 4, nombre: "María López", servicio: "Plan Mensual", vencimiento: addDays(1), telefono: "" },
  { id: 5, nombre: "Carlos Ruiz", servicio: "Academia Online", vencimiento: addDays(2), telefono: "" },
  { id: 6, nombre: "Ana Torres", servicio: "Suscripción Premium", vencimiento: addDays(3), telefono: "" },
  { id: 7, nombre: "Diego Herrera", servicio: "Renta de Equipo", vencimiento: addDays(5), telefono: "" },
  { id: 8, nombre: "Sofía Ramírez", servicio: "Mantenimiento Mensual", vencimiento: addDays(7), telefono: "" },
  { id: 9, nombre: "Fernando Ortiz", servicio: "Club de Lectura", vencimiento: addDays(10), telefono: "" },
  { id: 10, nombre: "Gabriela Vega", servicio: "Streaming Familiar", vencimiento: addDays(14), telefono: "" },
  { id: 11, nombre: "Javier Morales", servicio: "Plan Empresarial", vencimiento: addDays(22), telefono: "" },
  { id: 12, nombre: "Isabel Flores", servicio: "Licencia Software", vencimiento: addDays(28), telefono: "" },
];

export function getDaysRemaining(vencimiento: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(vencimiento + "T00:00:00");
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDateDMY(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
}
