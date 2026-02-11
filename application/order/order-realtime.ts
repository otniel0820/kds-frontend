import { OrderEvents } from "./order-events";

export interface OrderRealtime {
  connect(events: OrderEvents): void;
  disconnect(): void;
}
