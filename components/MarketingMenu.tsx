"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { collapsed: boolean; onToggle: () => void };

export default function MarketingMenu({ collapsed, onToggle }: Props) {
    const pathname = usePathname();

    const menu = [
        { name: "Painel de Vídeos", path: "/painel", icon: "🎞️" },
        { name: "Lojas", path: "/lojas", icon: "🏬" },
        { name: "Visualizar TV", path: "/tv", icon: "📺" },
    ];

    return (
        <aside
            style={{
                width: collapsed ? 72 : 240,
                background: "#111",
                color: "#fff",
                padding: collapsed ? "20px 12px" : "30px 20px",
                paddingTop: collapsed ? 68 : 88,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                transition: "width 240ms ease, padding 240ms ease",
                boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
                zIndex: 1000,
            }}
        >
            <button
                aria-label={collapsed ? "Abrir menu" : "Fechar menu"}
                onClick={onToggle}
                style={{
                    position: "absolute",
                    right: 10,
                    top: 12,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#1f1f1f",
                    color: "#fff",
                    border: "1px solid #2a2a2a",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    transition: "transform 160ms ease, background 160ms ease",
                }}
            >
                ☰
            </button>

            {!collapsed && (
                <h2 style={{ marginBottom: 40, fontSize: "1.3rem" }}>📢 Marketing</h2>
            )}

            {menu.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    title={item.name}
                    style={{
                        padding: collapsed ? "10px" : "12px 10px",
                        borderRadius: 6,
                        background: pathname === item.path ? "#444" : "transparent",
                        marginBottom: 10,
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1rem",
                        transition: "background 200ms ease, transform 160ms ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: collapsed ? "center" : "flex-start",
                        gap: collapsed ? 0 : 10,
                    }}
                >
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    {!collapsed && <span>{item.name}</span>}
                </Link>
            ))}
        </aside>
    );
}
