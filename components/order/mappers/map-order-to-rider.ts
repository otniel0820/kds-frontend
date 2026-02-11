import type { OrderListDto } from "@/dtos/OrderList.dto";
import type { RiderDto } from "@/dtos/Rider.dto";

export function mapOrderToRiderViewModel(order: OrderListDto): RiderDto {
    const rider: RiderDto = {
      id: order.id,
      name: order.courierName ?? '',
      orderId: order.id,
      displayNumber: order.displayNumber,
      riderNumber: Number(order.id.slice(-3)) || 100,
    };

    if (order.partnerName) {
      rider.partnerName = order.partnerName;
    }

    return rider;
  }