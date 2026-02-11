import { useEffect, useState } from "react";
import { OrderDetailDto } from "@/dtos/OrderDetails.dto";
import { orderOrchestrator } from "@/services/order.service";


export function useOrderDetail(orderId: string | null) {
  const [detail, setDetail] = useState<OrderDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await orderOrchestrator.getOrderDetail(orderId);

        if (!cancelled) {
          setDetail(data);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "Error loading order detail");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return { detail, isLoading, error };
}
