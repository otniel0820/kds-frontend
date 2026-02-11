import { OrderListDto } from "@/dtos/OrderList.dto";

export type OrderEvents = {
  onCreated?: (order: OrderListDto) => void;
  onUpdated?: (order: OrderListDto) => void;
};
