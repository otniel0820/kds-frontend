import { OrderStatus } from "@/domain/order/order-status";

const UI_ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  RECEIVED: ["CONFIRMED"],
  CONFIRMED: ["PREPARING"],
  PREPARING: ["READY"],
  READY: [],
  PICKED_UP: [],
  DELIVERED: [],
  CANCELLED: [],
};

export function canTransitionFromUi(
  from: OrderStatus,
  to: OrderStatus,
): boolean {
  return UI_ALLOWED_TRANSITIONS[from].includes(to);
}
