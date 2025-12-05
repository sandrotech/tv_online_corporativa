"use client";

import { useEffect, useState } from "react";

type Props = { storeId: string; currentVideo: string; onSaved?: (video?: string) => void };

export default function SelectVideo({ storeId, currentVideo, onSaved }: Props) {
    const [video, setVideo] = useState(currentVideo);
    const [videos, setVideos] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setVideo(currentVideo);
    }, [currentVideo]);

    useEffect(() => {
        async function loadVideos() {
            const res = await fetch("/api/videos");
            const list = await res.json();
            setVideos(list);
        }
        loadVideos();
    }, []);

    async function saveVideo() {
        if (saving) return;
        setSaving(true);
        await fetch(`/api/lojas/${storeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ video }),
        });
        if (onSaved) onSaved(video);
        setSaving(false);
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
                disabled={saving}
                className="mt-4 px-4 py-2 rounded-xl text-white"
                style={{ background: "#7b5cff", opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}
            >
                {saving ? "Salvando..." : "Salvar vídeo da loja"}
            </button>
        </div>
    );
}
