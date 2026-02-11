import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { OrdersProvider } from "@/contexts/Orders.context";
import { ThemeProvider } from "@/contexts/Theme.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <OrdersProvider>
        <Component {...pageProps} />
      </OrdersProvider>
    </ThemeProvider>
  );
}
