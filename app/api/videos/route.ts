import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const videosDir = path.join(process.cwd(), "public", "videos");

    try {
        const files = fs.readdirSync(videosDir);

        const mp4Videos = files.filter((file) => file.endsWith(".mp4"));

        return NextResponse.json(mp4Videos);
    } catch (error) {
        console.error("Erro ao listar vídeos:", error);
        return NextResponse.json([], { status: 500 });
    }
}
