import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("video") as File;

    if (!file) {
        return NextResponse.json({ message: "Nenhum arquivo enviado." });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const videosDir = path.join(process.cwd(), "public/videos");
    if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir);

    const filePath = path.join(videosDir, file.name);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ message: "Vídeo enviado com sucesso!" });
}
