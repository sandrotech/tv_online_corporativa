import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/stores.json");

function loadStores() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

type Store = { id: number; name: string; video: string };

function saveStores(data: Store[]) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
    const stores = loadStores();
    return NextResponse.json(stores);
}

export async function POST(req: Request) {
    const { name } = await req.json();
    const stores = loadStores();

    const newStore = {
        id: stores.length + 1,
        name,
        video: ""
    };

    stores.push(newStore);
    saveStores(stores);

    return NextResponse.json({ message: "Loja cadastrada com sucesso!", store: newStore });
}
