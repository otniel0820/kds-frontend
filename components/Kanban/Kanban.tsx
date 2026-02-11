import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useOrders } from "@/contexts/Orders.context";
import Column from "@/components/Column/Column";
import OrderCard from "@/components/card/OrderCard";
import Riders from "@/components/Riders/Riders";
import { OrderDetailModal } from "@/components/modal/OrderDtailsModal";
import type { OrderListDto } from "@/dtos/OrderList.dto";
import type { RiderDto } from "@/dtos/Rider.dto";
import { OrderStatus } from "@/domain/order/order-status";
import { canTransition } from "@/domain/order/order-transitions";
import { canTransitionFromUi } from "@/orchestrators/order/order-ui-policy";
import { ORDER_COLUMNS } from "@/components/order/constants/order-columns";
import { ORDER_STATUS_LABELS } from "@/components/order/constants/order-status-labels";
import s from "./Kanban.module.scss";
import DraggableOrderCard from "../Column/dnd/DraggableOrderCard";
import DraggableRiderCard from "../Column/dnd/DraggableRiderCard";
import { mapOrderToRiderViewModel } from "../order/mappers/map-order-to-rider";

export default function Kanban() {
  const { ordersByStatus, updateOrderStatus } = useOrders();

  const [activeOrder, setActiveOrder] = useState<OrderListDto | null>(null);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const riders: RiderDto[] = useMemo(() => {
    return Object.values(ordersByStatus)
      .flat()
      .filter((order) => order.status === "PICKED_UP" && order.courierName)
      .map(
        (order): RiderDto => ({
          id: order.id,
          name: order.courierName!,
          orderId: order.id,
          displayNumber: order.displayNumber,
          riderNumber: Number(order.id.slice(-3)) || 100,
          ...(order.partnerName && {
            partnerName: order.partnerName,
          }),
        }),
      );
  }, [ordersByStatus]);

  const ordersMap = useMemo(() => {
    const map = new Map<string, OrderListDto>();

    Object.values(ordersByStatus)
      .flat()
      .forEach((order) => {
        map.set(order.id, order);
      });

    return map;
  }, [ordersByStatus]);

  const findOrder = (id: string) => ordersMap.get(id) ?? null;

  const onDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id);
    setActiveOrder(findOrder(id));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveOrder(null);

    if (!over) return;

    const orderId = String(active.id);
    const targetStatus = String(over.id) as OrderStatus;

    const current = findOrder(orderId);
    if (!current) return;

    if (current.status === targetStatus) return;

    if (!canTransition(current.status, targetStatus)) return;

    if (!canTransitionFromUi(current.status, targetStatus)) return;

    updateOrderStatus(orderId, targetStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveOrder(null)}
    >
      <section className={s.wrapper}>
        <div className={s["pk-kanban"]}>
          {ORDER_COLUMNS.map((status) => {
            const columnOrders = ordersByStatus[status] ?? [];

            return (
              <Column
                key={status}
                status={status}
                title={ORDER_STATUS_LABELS[status]}
                count={columnOrders.length}
              >
                {status === "PICKED_UP"
                  ? riders.map((rider) => (
                      <DraggableRiderCard
                        key={rider.id}
                        rider={rider}
                        onClick={setSelectedOrderId}
                      />
                    ))
                  : columnOrders.map((order) => (
                      <DraggableOrderCard
                        key={order.id}
                        order={order}
                        onClick={setSelectedOrderId}
                      />
                    ))}
              </Column>
            );
          })}
        </div>
      </section>

      <DragOverlay>
        {activeOrder ? (
          activeOrder.status === "PICKED_UP" ? (
            <Riders rider={mapOrderToRiderViewModel(activeOrder)} />
          ) : (
            <OrderCard order={activeOrder} isOverlay />
          )
        ) : null}
      </DragOverlay>

      {selectedOrderId && (
        <OrderDetailModal
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </DndContext>
  );
}
