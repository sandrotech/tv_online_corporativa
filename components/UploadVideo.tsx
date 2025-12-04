"use client";

import React, { useState } from "react";

export default function UploadVideo() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("video", file);

        setUploading(true);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setUploading(false);

        setMessage(data.message);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Enviar novo vídeo</h2>

            <label
                htmlFor="video-input"
                style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
            >
                Arquivo de vídeo
            </label>

            <input
                id="video-input"
                type="file"
                accept="video/mp4,video/mkv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "2px solid #d1d5db",
                    background: "#f8fafc",
                }}
            />

            <button
                style={{
                    marginLeft: 10,
                    padding: "8px 14px",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: 6,
                    border: "none",
                    cursor: !file || uploading ? "not-allowed" : "pointer",
                    opacity: !file || uploading ? 0.6 : 1,
                    transition: "opacity 160ms ease, transform 160ms ease",
                }}
                disabled={!file || uploading}
                onClick={handleUpload}
            >
                {uploading ? "Enviando..." : "Enviar"}
            </button>

            {message && <p style={{ marginTop: 12 }}>{message}</p>}
        </div>
    );
}
