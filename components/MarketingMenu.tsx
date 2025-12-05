"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = { collapsed: boolean; onToggle: () => void };

export default function MarketingMenu({ collapsed, onToggle }: Props) {
    const pathname = usePathname();
    const [animate, setAnimate] = useState(false);

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
                        marginBottom: 40,
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        background: `linear-gradient(90deg, ${accent}, #b38cff)`,
                        WebkitBackgroundClip: "text",
                        color: "transparent",
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
                            padding: collapsed ? "12px" : "14px 12px",
                            borderRadius: 10,
                            background: active
                                ? `linear-gradient(90deg, ${accent}, #9b79ff)`
                                : "transparent",
                            border: active
                                ? "1px solid rgba(255,255,255,0.15)"
                                : "1px solid transparent",
                            marginBottom: 12,
                            color: active ? "#fff" : "rgba(255,255,255,0.8)",
                            textDecoration: "none",
                            fontSize: "1.05rem",
                            fontWeight: active ? 600 : 500,
                            transition: "all 240ms ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: collapsed ? "center" : "flex-start",
                            gap: collapsed ? 0 : 12,
                            boxShadow: active ? "0 4px 14px rgba(123,92,255,0.25)" : "none",

                            // ANIMAÇÃO DE ENTRADA EM CASCATA
                            opacity: animate ? 1 : 0,
                            transform: animate
                                ? "translateX(0)"
                                : "translateX(-14px)",
                            transitionDelay: `${index * 90}ms`,

                            // ANIMAÇÃO NO HOVER
                            ...(active
                                ? {
                                    transform: animate
                                        ? "translateX(0)"
                                        : "translateX(-14px)",
                                }
                                : {
                                    ":hover": {
                                        background: "rgba(255,255,255,0.06)",
                                    },
                                }),
                        }}
                        onMouseEnter={(e) => {
                            if (!active) {
                                e.currentTarget.style.transform = "scale(1.04)";
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.08)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!active) {
                                e.currentTarget.style.transform = "scale(1)";
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
        </aside>
    );
}
