import { OrderStatus } from "./order-status";

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  RECEIVED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["PICKED_UP", "CANCELLED"],
  PICKED_UP: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
