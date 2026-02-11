import Logo from "@/bases/Logo/Logo";
import s from "./OrdersLayout.module.scss";
import Kanban from "@/components/Kanban/Kanban";
import ThemeSwitch from "@/components/theme/ThemeSwitch";

export default function OrdersLayout() {
  return (
    <main className={s["pk-layout"]}>
      <nav className={s["pk-layout__navbar"]}>
        <div className={s["pk-layout__navbar-left"]}>
          <Logo size="M" />
          <div className={s["pk-layout__brand"]}>
            <span className={s["pk-layout__title"]}>
              KDS: Krazy Display Service
            </span>
            <span className={s["pk-layout__subtitle"]}>
              Kitchen Dashboard System
            </span>
          </div>
        </div>

        <div className={s["pk-layout__navbar-right"]}>
          <ThemeSwitch />
        </div>
      </nav>

      <article className={s["pk-layout__app"]}>
        <Kanban />
      </article>
    </main>
  );
}
