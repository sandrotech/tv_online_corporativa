"use client";

import { useEffect, useState, startTransition } from "react";
import MarketingLayout from "@/app/marketing-layout";
import StoreCard from "@/components/StoreCard";
import SelectVideo from "@/components/SelectVideo";
import { motion, AnimatePresence } from "framer-motion";

export default function StoresPage() {
    type Store = { id: number; name: string; video: string };

    const [stores, setStores] = useState<Store[]>([]);
    const [configId, setConfigId] = useState<number | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStoreName, setNewStoreName] = useState("");
    const [animate, setAnimate] = useState(false);

    const accent = "#7b5cff";

    useEffect(() => {
        setTimeout(() => setAnimate(true), 120);
    }, []);

    // carregar lojas
    useEffect(() => {
        (async () => {
            const res = await fetch("/api/lojas");
            const data: Store[] = await res.json();
            startTransition(() => setStores(data));
        })();
    }, []);

    // Criar loja e recarregar
    async function addStore() {
        if (!newStoreName.trim()) return;

        await fetch("/api/lojas", {
            method: "POST",
            body: JSON.stringify({ name: newStoreName }),
        });

        window.location.reload(); // 🔥 recarrega a página
    }

    return (
        <MarketingLayout>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="px-6 md:px-12 py-10 font-inter"
            >
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-10"
                >
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#7b5cff] to-[#b38cff] bg-clip-text text-transparent">
                        🏬 Lojas
                    </h1>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 rounded-xl text-white shadow-lg transition transform hover:scale-105"
                        style={{ background: accent }}
                    >
                        ➕ Adicionar Loja
                    </button>
                </motion.div>

                {/* LISTA DE LOJAS */}
                <div className="flex flex-wrap gap-6">
                    {stores.map((store, i) => (
                        <motion.div
                            key={store.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{
                                opacity: animate ? 1 : 0,
                                y: animate ? 0 : 25,
                            }}
                            transition={{ duration: 0.45, delay: i * 0.09 }}
                        >
                            <StoreCard store={store} onConfig={() => setConfigId(store.id)} />
                        </motion.div>
                    ))}
                </div>

                {/* MODAL CONFIGURAR LOJA */}
                <AnimatePresence>
                    {configId !== null && (
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[2000]"
                            onClick={() => setConfigId(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white/95 rounded-2xl shadow-2xl p-7 w-full max-w-xl flex flex-col gap-5"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">
                                        {stores.find((s) => s.id === configId)?.name}
                                    </h2>

                                    <button
                                        onClick={() => setConfigId(null)}
                                        className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <p className="text-gray-600">
                                    Vídeo atual:{" "}
                                    <b>
                                        {stores.find((s) => s.id === configId)?.video ||
                                            "Nenhum definido"}
                                    </b>
                                </p>

                                {/* 🔥 QUANDO O VÍDEO É SALVO → RECARREGA */}
                                <SelectVideo
                                    storeId={String(configId)}
                                    currentVideo={
                                        stores.find((s) => s.id === configId)?.video || ""
                                    }
                                    onSaved={() => window.location.reload()}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MODAL ADICIONAR LOJA */}
                <AnimatePresence>
                    {showAddModal && (
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[3000]"
                            onClick={() => setShowAddModal(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white/95 rounded-2xl shadow-2xl p-7 w-full max-w-md flex flex-col gap-5"
                            >
                                <h2 className="text-xl font-bold">🏬 Nova Loja</h2>

                                <label className="text-gray-700 text-sm">Nome da loja</label>

                                <input
                                    autoFocus
                                    value={newStoreName}
                                    onChange={(e) => setNewStoreName(e.target.value)}
                                    placeholder="Digite o nome da loja..."
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7b5cff]"
                                />

                                <div className="flex justify-end gap-3 mt-2">
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        onClick={addStore}
                                        className="px-4 py-2 rounded-xl text-white shadow-md"
                                        style={{ background: accent }}
                                    >
                                        Criar Loja
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </MarketingLayout>
    );
}
