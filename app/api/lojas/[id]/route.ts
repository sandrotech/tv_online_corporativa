import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/stores.json");

function loadStores() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Store[];
}
function saveStores(data: Store[]) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

type Store = { id: number; name: string; video: string };

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const stores = loadStores();
    const store = stores.find((s) => s.id === Number(id));
    return NextResponse.json(store);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { video } = await req.json();
    const stores = loadStores();
    const storeIndex = stores.findIndex((s) => s.id === Number(id));

    stores[storeIndex].video = video;
    saveStores(stores);

    return NextResponse.json({ message: "Vídeo atualizado com sucesso!" });
}
