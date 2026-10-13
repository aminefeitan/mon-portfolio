import { ImageResponse } from "next/og";


export const alt = "Amine Rachidi — Élève en Ingénierie Logicielle";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.25) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #06b6d4, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            AR
          </div>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            Amine Rachidi<span style={{ color: "#06b6d4" }}>.</span>
          </span>
        </div>

        {/* Center content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "99px",
              backgroundColor: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              color: "#67e8f9",
              fontSize: "16px",
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#06b6d4",
              }}
            />
            ENSIASD Taroudannt · 2ème Année
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Élève en Ingénierie Logicielle
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #22d3ee, #22d3ee)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Full Stack & Solutions Numériques
            </span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              margin: 0,
              maxWidth: "800px",
              lineHeight: 1.5,
            }}
          >
            React, Next.js, Spring Boot, FastAPI, Python, PostgreSQL.
          </p>
        </div>

        {/* Bottom tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(6, 182, 212, 0.2)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#64748b", fontWeight: 500 }}>
            amine-rachidi.dev · Portfolio 2026
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            {["Next.js", "Spring Boot", "FastAPI", "React"].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
