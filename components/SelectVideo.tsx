"use client";

import { useEffect, useState } from "react";

export default function SelectVideo({ storeId, currentVideo, onSaved }) {
    const [video, setVideo] = useState(currentVideo);
    const [videos, setVideos] = useState<string[]>([]);

    useEffect(() => {
        async function loadVideos() {
            const res = await fetch("/api/videos");
            const list = await res.json();
            setVideos(list);
        }
        loadVideos();
    }, []);

    async function saveVideo() {
        await fetch(`/api/lojas/${storeId}/video`, {
            method: "POST",
            body: JSON.stringify({ video }),
        });

        alert("Vídeo atualizado com sucesso!");
        if (onSaved) onSaved();
    }

    return (
        <div className="flex flex-col gap-4">

            <label className="text-gray-700 text-sm">Escolher vídeo</label>

            <select
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className="border p-2 rounded-lg"
            >
                {videos.map((v) => (
                    <option key={v} value={v}>
                        {v.replace(".mp4", "")}
                    </option>
                ))}
            </select>

            <button
                onClick={saveVideo}
                className="mt-4 px-4 py-2 rounded-xl text-white"
                style={{ background: "#7b5cff" }}
            >
                Salvar vídeo da loja
            </button>
        </div>
    );
}
