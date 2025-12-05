"use client";

import { useEffect, useState, startTransition, use } from "react";
import SelectVideo from "@/components/SelectVideo";
import MarketingLayout from "@/app/marketing-layout";

type Props = { params: Promise<{ id: string }> };
type Store = { id: number; name: string; video: string };

export default function StorePage({ params }: Props) {
    const { id } = use(params);

    const [store, setStore] = useState<Store | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/lojas/${id}`);
            const data: Store = await res.json();
            startTransition(() => setStore(data));
        })();
    }, [id]);

    if (!store) return <p>Carregando...</p>;

    return (
        <MarketingLayout>
            <div style={{ padding: "clamp(16px, 3vw, 40px)" }}>
                <h1>{store.name}</h1>
                <p>Vídeo atual: <b>{store.video || "Nenhum definido"}</b></p>

                <SelectVideo
                    storeId={id}
                    currentVideo={store.video}
                    onSaved={(newVideo) => startTransition(() => setStore((s) => (s ? { ...s, video: newVideo || "" } : s)))}
                />

                <button
                    onClick={() => (window.location.href = "/lojas")}
                    style={{ marginTop: 30 }}
                >
                    ← Voltar
                </button>
            </div>
        </MarketingLayout>
    );
}
