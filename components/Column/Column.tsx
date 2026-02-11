import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import clsx from "classnames";
import { OrderStatus } from "@/domain/order/order-status";
import s from "./Column.module.scss";

type ColumnProps = {
  status: OrderStatus;
  title: string;
  count: number;
  children: React.ReactNode;
};

function Column({ status, title, count, children }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>
          {title} ({count})
        </h3>
      </div>

      <div
        ref={setNodeRef}
        className={clsx(
          s["pk-column__content"],
          isOver && s["pk-column__content--over"]
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default memo(Column);
