import UploadVideo from "@/components/UploadVideo";
import VideoCard from "@/components/VideoCard";
import MarketingLayout from "@/app/marketing-layout";
import fs from "fs";
import path from "path";

export default function PainelPage() {
    const videosPath = path.join(process.cwd(), "public/videos");

    // Garante que a pasta exista para evitar erros
    if (!fs.existsSync(videosPath)) {
        fs.mkdirSync(videosPath);
    }

    const files = fs.readdirSync(videosPath);

    return (
        <MarketingLayout>
            <div
                style={{
                    minHeight: "100vh",
                    background: "#f4f6f8",
                    padding: "20px 0",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Header */}
                <header
                    style={{
                        marginBottom: 40,
                        paddingBottom: 20,
                        borderBottom: "2px solid #ddd",
                    }}
                >
                    <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 10 }}>
                        🎞️ Painel de Vídeos
                    </h1>
                    <p style={{ color: "#555", fontSize: "1rem" }}>
                        Gerencie os vídeos que serão exibidos nas TVs das lojas.
                    </p>
                </header>

                {/* Área de upload */}
                <section
                    style={{
                        background: "white",
                        padding: 25,
                        borderRadius: 10,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        marginBottom: 50,
                        maxWidth: 600,
                    }}
                >
                    <h2 style={{ marginBottom: 20, fontSize: "1.3rem" }}>
                        ⬆️ Enviar novo vídeo
                    </h2>

                    <UploadVideo />
                </section>

                {/* Lista de vídeos */}
                <section>
                    <h2
                        style={{
                            marginBottom: 20,
                            fontSize: "1.3rem",
                            fontWeight: 600,
                        }}
                    >
                        📂 Vídeos cadastrados
                    </h2>

                    {files.length === 0 ? (
                        <p style={{ color: "#777" }}>Nenhum vídeo cadastrado ainda.</p>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 25,
                            }}
                        >
                            {files.map((file) => (
                                <VideoCard key={file} file={file} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </MarketingLayout>
    );
}
