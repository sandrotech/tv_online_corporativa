"use client";

import { useEffect, useMemo, useState } from "react";
import MarketingLayout from "@/app/marketing-layout";

type Store = { id: number; name: string; video: string };

export default function TVPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/lojas");
      const data = await res.json();
      setStores(data);
      setSelectedId(data[0]?.id ?? null);
    }
    load();
  }, []);

  const current = stores.find((s) => s.id === selectedId);
  const currentVideo = current?.video || "";
  const shareUrl = useMemo(() => {
    if (selectedId == null) return "";
    const isBrowser = typeof window !== "undefined";
    const localHosts = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];
    if (isBrowser) {
      const host = window.location.hostname;
      const isLocal = localHosts.includes(host) || host.endsWith(".local");
      const base = isLocal
        ? window.location.origin
        : process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      return `${String(base).replace(/\/$/, "")}/tv/${selectedId}`;
    }
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return `${String(base).replace(/\/$/, "")}/tv/${selectedId}`;
  }, [selectedId]);

  return (
    <MarketingLayout>
      <div style={{ padding: 40 }}>
        <h1 style={{ marginBottom: 12, fontSize: "1.8rem" }}>Visualizar TV</h1>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <label style={{ marginRight: 10 }}>Loja:</label>
            <select
              value={selectedId ?? ""}
              onChange={(e) => setSelectedId(Number(e.target.value))}
              style={{ padding: 8, borderRadius: 8, border: "1px solid #d1d5db", background: "#fff" }}
            >
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedId != null && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
            background: "#fff",
            padding: 12,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <input
              readOnly
              value={shareUrl}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                background: "#f8fafc"
              }}
            />
            <button
              onClick={() => shareUrl && navigator.clipboard.writeText(shareUrl)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "none",
                background: "#111",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                transition: "transform 160ms ease"
              }}
            >
              Copiar link
            </button>
          </div>
        )}

        {currentVideo ? (
          <video
            src={`/videos/${currentVideo}`}
            autoPlay
            muted
            loop
            controls
            style={{ width: "100%", borderRadius: 12, background: "black", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
          />
        ) : (
          <p>Nenhum vídeo definido para esta loja.</p>
        )}
      </div>
    </MarketingLayout>
  );
}
