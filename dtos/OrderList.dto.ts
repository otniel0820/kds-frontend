import { OrderStatus } from "@/domain/order/order-status";

export type OrderPriority = "NORMAL" | "HIGH";

export type OrderListDto = {
  id: string;
  partnerName?: string;
  partnerImage?: string;
  displayNumber: string;
  status: OrderStatus;
  priority: OrderPriority;
  activeTimer?: string;
  courierName?: string;
};
