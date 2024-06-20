import { Centrifuge, PublicationContext, Subscription } from "centrifuge";
import { createContext, useContext, useEffect, useState } from "react";

const env = process.env as any;
const endpoint = env.REACT_APP_WEBSOCKET_URL;
const token = env.REACT_APP_ACCESS_TOKEN;

const SwContext = createContext<Centrifuge | null>(null);

export const SwProvider = ({ children }: { children: React.ReactNode }) => {
  const [centrifuge, setCentrifuge] = useState<Centrifuge | null>(null);

  const initCentrifuge = () => {
    const centrifuge = new Centrifuge(endpoint, {
      token,
    });
    centrifuge.on("error", function (ctx) {
      console.log(ctx);
    });
    setCentrifuge(centrifuge);
  };

  useEffect(() => {
    if (!centrifuge) {
      initCentrifuge();
    }

    return () => {
      if (centrifuge) {
        centrifuge.disconnect();
      }
    };
  }, [centrifuge]);

  return <SwContext.Provider value={centrifuge}>{children}</SwContext.Provider>;
};

function useSw<T extends PublicationContext>(
  type: string,
  callback: (ctx: T) => void
): [Subscription | null] {
  const centrifuge = useContext(SwContext);
  const [subscription, setSub] = useState<Subscription | null>(null);

  useEffect(() => {
    if (centrifuge) {
      const sub = centrifuge.newSubscription(type);
      sub.on(
        "publication",
        callback as unknown as (ctx: PublicationContext) => void
      );
      sub.subscribe();
      setSub(sub);

      centrifuge.connect();
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [centrifuge]);

  return [subscription];
}

export { useSw };
