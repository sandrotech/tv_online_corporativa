"use client";

import React from "react";

type Props = {
    src: string;
};

export default function VideoPlayer({ src }: Props) {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "black",
            }}
        >
            <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}
