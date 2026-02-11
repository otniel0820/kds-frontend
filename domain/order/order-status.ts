export type OrderStatus =
  | "RECEIVED"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "PICKED_UP"
  | "DELIVERED"
  | "CANCELLED";

export const ALL_ORDER_STATUSES: OrderStatus[] = [
  "RECEIVED",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "PICKED_UP",
  "DELIVERED",
  "CANCELLED",
];
