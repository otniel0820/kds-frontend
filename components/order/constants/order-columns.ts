import { OrderStatus } from "@/domain/order/order-status";

export const ORDER_COLUMNS: OrderStatus[] = [
  "RECEIVED",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "PICKED_UP",
  "DELIVERED",
  "CANCELLED",
];
