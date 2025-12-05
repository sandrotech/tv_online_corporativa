"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = { collapsed: boolean; onToggle: () => void };

export default function MarketingMenu({ collapsed, onToggle }: Props) {
    const pathname = usePathname();
    const [animate, setAnimate] = useState(false);
    function logout() {
        try {
            localStorage.removeItem("auth_user");
            localStorage.removeItem("auth_token");
        } catch { }
        window.location.href = "/";
    }

    const menu = [
        { name: "Painel de Vídeos", path: "/painel", icon: "🎞️" },
        { name: "Lojas", path: "/lojas", icon: "🏬" },
        { name: "Visualizar TV", path: "/tv", icon: "📺" },
    ];

    // Ativa animação quando o menu abre
    useEffect(() => {
        setTimeout(() => setAnimate(true), 150);
        return () => setAnimate(false);
    }, [collapsed]);

    const accent = "#7b5cff";

    return (
        <aside
            style={{
                width: collapsed ? 80 : 260,
                backdropFilter: "blur(14px)",
                background: "rgba(15,15,20,0.85)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                color: "#fff",
                padding: collapsed ? "20px 12px" : "32px 20px",
                paddingTop: collapsed ? 70 : 90,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                transition: "all 280ms ease",
                boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
                zIndex: 1000,
                overflow: "hidden",
            }}
        >
            <button
                aria-label={collapsed ? "Abrir menu" : "Fechar menu"}
                onClick={onToggle}
                style={{
                    position: "absolute",
                    right: collapsed ? 20 : 18,
                    top: 16,
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    transition: "all 200ms ease",
                }}
            >
                ☰
            </button>

            {!collapsed && (
                <h2
                    style={{
                        marginBottom: 30,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        letterSpacing: "0.3px",
                        color: "#e5e7eb",
                        opacity: animate ? 1 : 0,
                        transform: animate ? "translateY(0)" : "translateY(-8px)",
                        transition: "all 420ms ease",
                    }}
                >
                    📢 Marketing
                </h2>
            )}

            {menu.map((item, index) => {
                const active = pathname === item.path;

                return (
                    <Link
                        key={item.path}
                        href={item.path}
                        style={{
                            padding: collapsed ? "12px" : "12px 12px",
                            borderRadius: 12,
                            background: active ? "rgba(255,255,255,0.06)" : "transparent",
                            border: "1px solid rgba(255,255,255,0.08)",
                            marginBottom: 10,
                            color: active ? "#fff" : "rgba(255,255,255,0.85)",
                            textDecoration: "none",
                            fontSize: "1rem",
                            fontWeight: active ? 600 : 500,
                            transition: "all 200ms ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: collapsed ? "center" : "flex-start",
                            gap: collapsed ? 0 : 12,
                            borderLeft: active ? `3px solid ${accent}` : "3px solid transparent",
                            opacity: animate ? 1 : 0,
                            transform: animate ? "translateX(0)" : "translateX(-10px)",
                            transitionDelay: `${index * 80}ms`,
                        }}
                        onMouseEnter={(e) => {
                            if (!active) {
                                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!active) {
                                e.currentTarget.style.background = "transparent";
                            }
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.3rem",
                                filter: active ? "brightness(1.15)" : "brightness(0.9)",
                                transition: "transform 200ms ease",
                            }}
                        >
                            {item.icon}
                        </span>

                        {!collapsed && <span>{item.name}</span>}
                    </Link>
                );
            })}

            <div
                style={{
                    marginTop: "auto",
                    paddingTop: 14,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <a
                    href="https://portfolio.alessandrosantos.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        padding: collapsed ? 6 : 10,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.07)",
                        color: "#e5e7eb",
                        textDecoration: "none",
                        fontWeight: 600,
                        marginBottom: 12,
                        transform: "translateY(0)",
                        transition: "transform 160ms ease, background 160ms ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    }}
                >
                    {!collapsed && "Desenvolvido por Alessandro Santos"}
                    {collapsed && "A. Santos"}
                </a>
                <button
                    onClick={logout}
                    style={{
                        width: "100%",
                        padding: collapsed ? 10 : 12,
                        borderRadius: 10,
                        background: "#e02424",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.12)",
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: "transform 160ms ease, opacity 160ms ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    Sair
                </button>
            </div>
        </aside>
    );
}
