export function formatHour(iso: string) {
  const date = new Date(iso);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}