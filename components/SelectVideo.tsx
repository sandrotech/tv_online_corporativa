"use client";

import { useEffect, useState, startTransition } from "react";

type Props = { storeId: string; currentVideo: string };

export default function SelectVideo({ storeId, currentVideo }: Props) {
    const [videos, setVideos] = useState<string[]>([]);
    const [selected, setSelected] = useState(currentVideo);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/videos-list");
                const data: string[] = await res.json();
                startTransition(() => setVideos(data));
            } catch {
                startTransition(() => setVideos([]));
            }
        })();
    }, []);

    async function saveVideo() {
        await fetch(`/api/lojas/${storeId}`, {
            method: "PUT",
            body: JSON.stringify({ video: selected })
        });

        alert("Vídeo atualizado com sucesso!");
    }

    return (
        <div>
            <h3>Escolher vídeo</h3>

            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                style={{ padding: 10, marginBottom: 20, minWidth: 220 }}
            >
                <option value="">Nenhum</option>

                {videos.map((v: string) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>

            <br />

            <button onClick={saveVideo} style={{ padding: 10 }}>
                Salvar vídeo da loja
            </button>
        </div>
    );
}
