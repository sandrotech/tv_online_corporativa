import MarketingLayout from "@/app/marketing-layout";
import PageAnimatedWrapper from "./PageAnimatedWrapper";
import fs from "fs";
import path from "path";

export default function PainelPage() {
    const videosPath = path.join(process.cwd(), "public/videos");

    // Garante que a pasta exista
    if (!fs.existsSync(videosPath)) {
        fs.mkdirSync(videosPath);
    }

    // Pega os arquivos (SERVER SIDE)
    const files = fs.readdirSync(videosPath);

    return (
        <MarketingLayout>
            {/* Aqui enviamos os arquivos para o Client Component */}
            <PageAnimatedWrapper files={files} />
        </MarketingLayout>
    );
}
