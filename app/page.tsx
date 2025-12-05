"use client";

import { useState, useEffect, FormEvent } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const accent = "#7b5cff";

  useEffect(() => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) window.location.href = "/tv";
    } catch { }
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === "demo" && password === "demo123") {
      try {
        localStorage.setItem("auth_user", username);
        localStorage.setItem("auth_token", "demo-token");
      } catch { }
      window.location.href = "/tv";
    } else {
      setError("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-[#eef2ff] to-[#f8fafc]">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Entrar</h1>
            <p className="mt-1 text-sm text-gray-600">Acesse para gerenciar TVs e lojas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-700">Usuário</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="demo"
                className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:border-[#7b5cff] focus:outline-none focus:ring-2 focus:ring-[#7b5cff]/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo123"
                className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:border-[#7b5cff] focus:outline-none focus:ring-2 focus:ring-[#7b5cff]/30"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#7b5cff] px-4 py-3 text-white shadow hover:brightness-105 transition"
            >
              Entrar
            </button>

            <p className="text-xs text-gray-500">Demo: usuário <b>demo</b> • senha <b>demo123</b></p>
          </form>
        </div>
      </div>
    </div>
  );
}
