import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Store = { id: number; name: string; video: string };

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const filePath = path.join(process.cwd(), "data/stores.json");
    const stores = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Store[];

    const store = stores.find((s) => s.id === Number(id));

    return NextResponse.json({
        loja: store.name,
        video: store.video
    });
}
