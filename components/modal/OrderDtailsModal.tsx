import { useMemo } from "react";
import { Modal } from "@/bases/modal/Modal";
import { useOrderDetail } from "@/application/hook/use-order-detail";
import s from "./OrderDetailsModal.module.scss";

type Props = {
  orderId: string;
  onClose: () => void;
};

export const OrderDetailModal = ({ orderId, onClose }: Props) => {
  const { detail, isLoading, error } = useOrderDetail(orderId);

  const total = useMemo(() => {
    if (!detail?.items) return 0;

    return detail.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [detail]);

  return (
    <Modal onClose={onClose} maxWidth={700}>
      {isLoading && <p>Cargando...</p>}

      {error && <p className={s.error}>{error}</p>}

      {detail && (
        <>
          <h2 className={s.title}>Detalle de Orden</h2>

          <div className={s.customerInfo}>
            <div>
              <span>Cliente</span>
              <p>{detail.customerName}</p>
            </div>

            <div>
              <span>Teléfono</span>
              <p>{detail.customerPhone}</p>
            </div>

            <div>
              <span>Dirección</span>
              <p>{detail.deliveryAddress}</p>
            </div>

            {detail.notes && (
              <div>
                <span>Notas</span>
                <p>{detail.notes}</p>
              </div>
            )}
          </div>

          <div className={s.divider} />

          <div className={s.items}>
            {detail.items.map((item) => (
              <div key={item.id} className={s.item}>
                <img src={item.image} alt={item.name} loading="lazy" />

                <div className={s.itemInfo}>
                  <h4>{item.name}</h4>
                  <p>
                    {item.qty} × {item.price.toFixed(2)} {item.currency}
                  </p>
                </div>

                <div className={s.itemTotal}>
                  {(item.price * item.qty).toFixed(2)} {item.currency}
                </div>
              </div>
            ))}
          </div>

          <div className={s.totalSection}>
            <span>Total</span>
            <span>
              {total.toFixed(2)} {detail.items[0]?.currency ?? ""}
            </span>
          </div>
        </>
      )}
    </Modal>
  );
};
