import { io, Socket } from "socket.io-client";
import { OrderRealtime } from "@/application/order/order-realtime";
import { OrderEvents } from "@/application/order/order-events";
import { OrderListDto } from "@/dtos/OrderList.dto";

export class SocketOrderRealtime implements OrderRealtime {
  private socket: Socket | null = null;

  constructor(private readonly baseUrl: string) {}

  connect(events: OrderEvents): void {
    if (!this.socket) {
      this.socket = io(this.baseUrl, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });
    }

    this.socket.off("order.created");
    this.socket.off("order.status.updated");

    this.socket.on("order.created", (order: OrderListDto) => {
      events.onCreated?.(order);
    });

    this.socket.on("order.status.updated", (order: OrderListDto) => {
      events.onUpdated?.(order);
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}
