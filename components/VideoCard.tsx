"use client";

import React from "react";

type Props = {
    file: string;
};

export default function VideoCard({ file }: Props) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                marginBottom: 20,
                padding: 10,
                width: 300,
            }}
        >
            <video
                src={`/videos/${file}`}
                controls
                style={{ width: "100%", borderRadius: 8 }}
            />

            <p style={{ marginTop: 10 }}>{file}</p>
        </div>
    );
}
