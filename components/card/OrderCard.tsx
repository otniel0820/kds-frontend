import Card from "@/bases/card/Card";
import clsx from "classnames";
import s from "./OrderCard.module.scss";
import type { OrderListDto } from "@/dtos/OrderList.dto";
import { formatHour } from "@/helpers";
import { OrderStatus } from "@/domain/order/order-status";

const STATUS_CLASS: Record<OrderStatus, string | undefined> = {
  RECEIVED: s.received,
  CONFIRMED: s.confirmed,
  PREPARING: s.preparing,
  READY: s.ready,
  PICKED_UP: s.pickedUp,
  DELIVERED: s.delivered,
  CANCELLED: s.cancelled,
};

type OrderCardProps = {
  order: OrderListDto;
  onClick?: () => void;
  isOverlay?: boolean;
};

export default function OrderCard({
  order,
  onClick,
  isOverlay = false,
}: OrderCardProps) {
  const isHighPriority = order.priority === "HIGH";
  return (
    <Card
      size="md"
      variant="elevated"
      className={clsx(
        s.card,
        STATUS_CLASS[order.status],
        isOverlay && s.overlay,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <div className={s.content}>
        <div className={s.partnerName}>{order.partnerName}</div>

        <div className={s.orderNumber}>Orden: {order.displayNumber}</div>

        <span
          className={clsx(
            s.priority,
            isHighPriority ? s.priorityHigh : s.priorityNormal,
          )}
        >
          {isHighPriority ? "Alta" : "Normal"}
        </span>

        {order.activeTimer && (
          <div className={s.time}>
            <span className={s.clockIcon}>🕒</span>
            {formatHour(order.activeTimer)}
          </div>
        )}
      </div>

      {order.partnerImage && (
        <div className={s.logoWrapper}>
          <img
            src={order.partnerImage}
            alt={order.partnerName}
            loading="lazy"
          />
        </div>
      )}
    </Card>
  );
}
