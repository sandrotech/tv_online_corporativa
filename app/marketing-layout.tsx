"use client";

import { useState, useEffect, startTransition, ReactNode } from "react";
import MarketingMenu from "@/components/MarketingMenu";

export default function MarketingLayout({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 900) {
            startTransition(() => setCollapsed(true));
        }
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <MarketingMenu
                collapsed={collapsed}
                onToggle={() => setCollapsed((c) => !c)}
            />

            <main
                style={{
                    marginLeft: collapsed ? 80 : 260,
                    width: "100%",
                    minHeight: "100vh",
                    background: "#f4f6f8",
                    padding: "clamp(16px, 3vw, 40px)",
                    backdropFilter: "saturate(1.2)",
                    transition: "margin-left 240ms ease",
                }}
            >
                {children}
            </main>
        </div>
    );
}
