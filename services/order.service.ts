import { AxiosHttpClient } from "@/infraestructure/http/axios-http.client";
import { HttpOrderRepository } from "@/infraestructure/http/order.repository";
import { SocketOrderRealtime } from "@/infraestructure/socket/order-realtime.socket";
import { OrderOrchestrator } from "@/orchestrators/order/OrderOrchestrator";

const httpClient = new AxiosHttpClient();

const repository = new HttpOrderRepository(httpClient);

const realtime = new SocketOrderRealtime(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3004",
);

export const orderOrchestrator = new OrderOrchestrator(repository, realtime);
