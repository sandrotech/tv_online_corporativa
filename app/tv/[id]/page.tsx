"use client";

import { useEffect, useState, startTransition, use } from "react";
import MarketingLayout from "@/app/marketing-layout";

type Props = { params: Promise<{ id: string }> };
type Store = { id: number; name: string; video: string };

export default function TVStorePage({ params }: Props) {
  const { id } = use(params);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/lojas/${id}`);
      const data: Store = await res.json();
      startTransition(() => setStore(data));
    })();
  }, [id]);

  const src = store?.video ? `/videos/${store.video}` : "";

  return (
    <MarketingLayout>
      <div style={{ padding: 40 }}>
        <h1 style={{ marginBottom: 12 }}>{store?.name || "Carregando..."}</h1>

        {src ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            controls
            style={{ width: "100%", borderRadius: 8, background: "black" }}
          />
        ) : (
          <p>Vídeo não definido para esta loja.</p>
        )}
      </div>
    </MarketingLayout>
  );
}

