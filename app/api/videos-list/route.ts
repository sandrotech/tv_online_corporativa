import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const videosDir = path.join(process.cwd(), "public/videos");
  if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir);

  const files = fs
    .readdirSync(videosDir)
    .filter((f) => /\.(mp4|mkv)$/i.test(f));

  return NextResponse.json(files);
}

