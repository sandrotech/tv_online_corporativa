"use client";

type Store = { id: number; name: string; video: string };

export default function StoreCard({ store, onConfig }: { store: Store; onConfig: () => void }) {
    return (
        <div
            style={{
                width: 260,
                padding: 20,
                background: "white",
                borderRadius: 10,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "transform 160ms ease, box-shadow 160ms ease"
            }}
        >
            <h3>{store.name}</h3>
            <p><b>Vídeo:</b> {store.video || "Nenhum definido"}</p>

            <button
                onClick={onConfig}
                style={{
                    marginTop: 10,
                    display: "inline-block",
                    background: "black",
                    color: "white",
                    padding: "8px 14px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Configurar
            </button>
        </div>
    );
}
