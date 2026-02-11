import { OrderRepository } from "@/application/order/order-repository";
import { HttpClient } from "@/application/shared/http-client";
import { ALL_ORDER_STATUSES, OrderStatus } from "@/domain/order/order-status";
import { OrderListDto } from "@/dtos/OrderList.dto";
import { OrderDetailDto } from "@/dtos/OrderDetails.dto";

type OrdersListResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    orders: OrderListDto[];
    total: number;
  };
};

type UpdateStatusResponse = {
  status: number;
  code: string;
  message: string;
};

type OrderDetailApiResponse = {
  status: number;
  code: string;
  message: string;
  data: any;
};

export class HttpOrderRepository implements OrderRepository {
  constructor(private readonly http: HttpClient) {}

  async listBoard(): Promise<OrderListDto[]> {
    const { createdFrom, createdTo } = this.getTodayRange();

    const response = await this.http.get<OrdersListResponse>(
      "/api/v1/orders/list",
      {
        params: {
          status: ALL_ORDER_STATUSES.join(","),
          createdFrom,
          createdTo,
        },
      },
    );

    return response.data.orders;
  }

  async updateStatus(id: string, toStatus: OrderStatus): Promise<void> {
    await this.http.patch<UpdateStatusResponse>(`/api/v1/orders/${id}/status`, {
      toStatus,
    });
  }

  async getDetail(id: string): Promise<OrderDetailDto> {
    const response = await this.http.get<OrderDetailApiResponse>(
      `/api/v1/order/details/${id}`,
    );

    return this.mapToOrderDetail(response.data);
  }

  private mapToOrderDetail(raw: any): OrderDetailDto {
    return {
      customerName: raw.customerName,
      customerPhone: raw.customerPhone,
      deliveryAddress: raw.deliveryAddress,
      notes: raw.notes,
      courierName: raw.courierName,
      items: raw.items.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        currency: item.product.currency,
        qty: item.qty,
      })),
    };
  }

  private getTodayRange() {
    const now = new Date();

    const start = new Date(now);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    return {
      createdFrom: start.toISOString(),
      createdTo: end.toISOString(),
    };
  }
}
