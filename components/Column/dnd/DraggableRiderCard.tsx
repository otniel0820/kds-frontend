import { useDraggable } from "@dnd-kit/core";
import type { RiderDto } from "@/dtos/Rider.dto";
import Riders from "@/components/Riders/Riders";

type Props = {
  rider: RiderDto;
  onClick: (id: string) => void;
};

export default function DraggableRiderCard({ rider, onClick }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: rider.orderId,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      {...attributes}
    >
      <div {...listeners}>
        <Riders rider={rider} onClick={() => onClick(rider.orderId)} />
      </div>
    </div>
  );
}
