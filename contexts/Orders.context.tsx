import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { OrderListDto } from "@/dtos/OrderList.dto";
import { OrderStatus } from "@/domain/order/order-status";
import { orderOrchestrator } from "@/services/order.service";

type OrdersContextValue = {
  orders: OrderListDto[];
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  ordersByStatus: Record<OrderStatus, OrderListDto[]>;
  isLoading: boolean;
  error: string | null;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const upsert = (incoming: OrderListDto) => {
    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === incoming.id);
      if (idx === -1) return [incoming, ...prev];

      const next = [...prev];
      next[idx] = incoming;
      return next;
    });
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitial = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const initial = await orderOrchestrator.listBoard();
        if (cancelled) return;

        setOrders(initial);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? "Error loading orders");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadInitial();

    orderOrchestrator.connect({
      onCreated: upsert,
      onUpdated: upsert,
    });

    return () => {
      cancelled = true;
      orderOrchestrator.disconnect();
    };
  }, []);

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    let previous: OrderListDto | undefined;

    setOrders((curr) => {
      previous = curr.find((o) => o.id === id);
      return curr.map((o) => (o.id === id ? { ...o, status } : o));
    });

    try {
      await orderOrchestrator.updateOrderState(id, status);
    } catch (e) {
      if (!previous) return;

      setOrders((curr) => curr.map((o) => (o.id === id ? previous! : o)));
    }
  };

  const ordersByStatus = useMemo(() => {
    return orders.reduce<Record<OrderStatus, OrderListDto[]>>(
      (acc, order) => {
        (acc[order.status] ||= []).push(order);
        return acc;
      },
      {} as Record<OrderStatus, OrderListDto[]>,
    );
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        updateOrderStatus,
        ordersByStatus,
        isLoading,
        error,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return ctx;
};
