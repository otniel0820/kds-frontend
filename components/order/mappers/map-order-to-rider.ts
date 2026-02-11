import type { OrderListDto } from "@/dtos/OrderList.dto";
import type { RiderDto } from "@/dtos/Rider.dto";

export function mapOrderToRider(order: OrderListDto): RiderDto {
  return {
    id: order.id,
    name: order.courierName ?? "Sin asignar",
    orderId: order.id,
    displayNumber: order.displayNumber,
    riderNumber: Number(order.id.slice(-3)) || 100,
  };
}
