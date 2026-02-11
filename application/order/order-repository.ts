import { OrderStatus } from "@/domain/order/order-status";
import { OrderDetailDto } from "@/dtos/OrderDetails.dto";
import { OrderListDto } from "@/dtos/OrderList.dto";

export interface OrderRepository {
  listBoard(): Promise<OrderListDto[]>;
  updateStatus(id: string, toStatus: OrderStatus): Promise<void>;
  getDetail(id: string): Promise<OrderDetailDto>;
}
