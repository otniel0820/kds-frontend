import { OrderRepository } from "@/application/order/order-repository";
import { OrderRealtime } from "@/application/order/order-realtime";
import { OrderEvents } from "@/application/order/order-events";
import { OrderStatus } from "@/domain/order/order-status";
import { OrderListDto } from "@/dtos/OrderList.dto";
import { OrderDetailDto } from "@/dtos/OrderDetails.dto";

export class OrderOrchestrator {
  constructor(
    private readonly repository: OrderRepository,
    private readonly realtime: OrderRealtime,
  ) {}

  connect(events: OrderEvents): void {
    this.realtime.connect(events);
  }

  disconnect(): void {
    this.realtime.disconnect();
  }

  async listBoard(): Promise<OrderListDto[]> {
    return this.repository.listBoard();
  }

  async getOrderDetail(id: string): Promise<OrderDetailDto> {
    return this.repository.getDetail(id);
  }

  async updateOrderState(id: string, toStatus: OrderStatus): Promise<void> {
    await this.repository.updateStatus(id, toStatus);
  }
}
