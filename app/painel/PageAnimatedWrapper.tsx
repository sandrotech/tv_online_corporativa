"use client";

import { useEffect, useState } from "react";
import UploadVideo from "@/components/UploadVideo";
import VideoCard from "@/components/VideoCard";

export default function PageAnimatedWrapper({ files }: { files: string[] }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimate(true), 150);
    }, []);

    const accent = "#7b5cff";

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #f8f9fc, #eef1f7)",
                padding: "30px 0",
                fontFamily: "Inter, sans-serif",
                opacity: animate ? 1 : 0,
                transition: "opacity 300ms ease",
            }}
        >
            {/* HEADER */}
            <header
                style={{
                    marginBottom: 50,
                    paddingBottom: 25,
                    borderBottom: "2px solid rgba(0,0,0,0.08)",
                    opacity: animate ? 1 : 0,
                    transform: animate ? "translateY(0)" : "translateY(-14px)",
                    transition: "all 480ms ease",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.2rem",
                        fontWeight: 800,
                        marginBottom: 10,
                        background: `linear-gradient(90deg, ${accent}, #b38cff)`,
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    🎞️ Painel de Vídeos
                </h1>

                <p style={{ color: "#555", fontSize: "1.1rem" }}>
                    Gerencie os vídeos que serão exibidos nas TVs das lojas.
                </p>
            </header>

            {/* UPLOAD */}
            <section
                style={{
                    background: "rgba(255,255,255,0.9)",
                    padding: 30,
                    borderRadius: 16,
                    boxShadow: "0 8px 26px rgba(0,0,0,0.08)",
                    marginBottom: 60,
                    maxWidth: 650,
                    backdropFilter: "blur(6px)",
                    marginLeft: 0,
                    opacity: animate ? 1 : 0,
                    transform: animate ? "translateY(0)" : "translateY(20px)",
                    transition: "all 500ms ease",
                }}
            >
                <h2
                    style={{
                        marginBottom: 18,
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: accent,
                    }}
                >
                    ⬆️ Enviar novo vídeo
                </h2>

                <UploadVideo />
            </section>

            {/* LISTA DE VIDEOS */}
            <section>
                <h2
                    style={{
                        marginBottom: 20,
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#333",
                        opacity: animate ? 1 : 0,
                        transform: animate ? "translateY(0)" : "translateY(10px)",
                        transition: "all 500ms ease",
                    }}
                >
                    📂 Vídeos cadastrados
                </h2>

                {files.length === 0 ? (
                    <p style={{ color: "#777" }}>Nenhum vídeo cadastrado ainda.</p>
                ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 25 }}>
                        {files.map((file, idx) => (
                            <div
                                key={file}
                                style={{
                                    opacity: animate ? 1 : 0,
                                    transform: animate
                                        ? "translateY(0)"
                                        : "translateY(25px)",
                                    transition: "all 420ms ease",
                                    transitionDelay: `${idx * 90}ms`,
                                }}
                            >
                                <VideoCard file={file} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
