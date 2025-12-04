"use client";

import { useEffect, useState, startTransition } from "react";
import StoreCard from "@/components/StoreCard";
import MarketingLayout from "@/app/marketing-layout";
import SelectVideo from "@/components/SelectVideo";

export default function StoresPage() {
    type Store = { id: number; name: string; video: string };
    const [stores, setStores] = useState<Store[]>([]);
    const [configId, setConfigId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/lojas");
            const data: Store[] = await res.json();
            startTransition(() => setStores(data));
        })();
    }, []);

    async function addStore() {
        const name = prompt("Nome da nova loja:");
        if (!name) return;

        await fetch("/api/lojas", {
            method: "POST",
            body: JSON.stringify({ name })
        });

        const res = await fetch("/api/lojas");
        const data: Store[] = await res.json();
        startTransition(() => setStores(data));
    }

    return (
        <MarketingLayout>
            <div style={{ padding: "clamp(16px, 3vw, 40px)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <h1 style={{ fontSize: "1.8rem" }}>Lojas</h1>
                    <button
                        onClick={addStore}
                        style={{
                            padding: "10px 14px",
                            background: "#111",
                            color: "white",
                            borderRadius: 8,
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                            transition: "transform 160ms ease, box-shadow 160ms ease",
                        }}
                    >
                        ➕ Adicionar Loja
                    </button>
                </div>

                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {stores.map((store) => (
                        <StoreCard key={store.id} store={store} onConfig={() => setConfigId(store.id)} />
                    ))}
                </div>

                {configId !== null && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2000,
                        }}
                        onClick={() => setConfigId(null)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: "min(640px, 92vw)",
                                background: "white",
                                borderRadius: 12,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                padding: 24,
                                transform: "translateY(0)",
                                transition: "transform 200ms ease, opacity 200ms ease",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                <h2 style={{ fontSize: "1.4rem" }}>
                                    {stores.find((s) => s.id === configId)?.name}
                                </h2>
                                <button
                                    onClick={() => setConfigId(null)}
                                    aria-label="Fechar"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        border: "none",
                                        background: "#eee",
                                        cursor: "pointer",
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            <p style={{ marginBottom: 12 }}>
                                Vídeo atual: <b>{stores.find((s) => s.id === configId)?.video || "Nenhum definido"}</b>
                            </p>

                            <div>
                                <SelectVideo storeId={String(configId)} currentVideo={stores.find((s) => s.id === configId)?.video || ""} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MarketingLayout>
    );
}
