import { useDraggable } from "@dnd-kit/core";
import type { OrderListDto } from "@/dtos/OrderList.dto";
import OrderCard from "@/components/card/OrderCard";

type Props = {
  order: OrderListDto;
  onClick: (id: string) => void;
};

export default function DraggableOrderCard({ order, onClick }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: order.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      {...attributes}
    >
      <div {...listeners}>
        <OrderCard order={order} onClick={() => onClick(order.id)} />
      </div>
    </div>
  );
}
