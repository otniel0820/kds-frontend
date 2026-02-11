import { OrderStatus } from "@/domain/order/order-status";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  RECEIVED: "Recibido",
  CONFIRMED: "Confirmado",
  PREPARING: "En preparación",
  READY: "Listo",
  PICKED_UP: "Repartidores",
  DELIVERED: "Entregadas",
  CANCELLED: "Cancelado",
};
