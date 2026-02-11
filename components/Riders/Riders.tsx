import { memo } from "react";
import clsx from "classnames";

import RiderAvatar from "@/bases/Rider/Rider";
import Card from "@/bases/card/Card";

import type { RiderDto } from "@/dtos/Rider.dto";
import s from "./Riders.module.scss";

type RidersProps = {
  rider: RiderDto;
  onClick?: () => void;
};

function Riders({ rider, onClick }: RidersProps) {
  return (
    <Card
      size="md"
      variant="elevated"
      className={clsx(s.riderCard)}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <div className={s.content}>
        <div className={s.info}>
          <div className={s.partner}>{rider.partnerName}</div>

          <div className={s.orderNumber}>Orden: {rider.displayNumber}</div>

          <div className={s.name}>{rider.name}</div>

          <div className={s.number}>Rider #{rider.riderNumber}</div>
        </div>

        <div className={s.avatar}>
          <RiderAvatar />
        </div>
      </div>
    </Card>
  );
}

export default memo(Riders);
