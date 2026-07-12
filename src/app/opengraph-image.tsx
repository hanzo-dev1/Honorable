import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#08090A",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "#55585F",
            fontFamily: "monospace",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          David Oganah · AI Automation Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: -4,
            lineHeight: 1,
            backgroundImage:
              "linear-gradient(175deg, #FFFFFF 0%, #C8CCD4 26%, #8E949F 42%, #EDEFF3 55%, #6E747E 72%, #B9BEC7 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Systems that run
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: -4,
            lineHeight: 1,
            color: "#EDECE8",
          }}
        >
          the work.
        </div>
      </div>
    ),
    { ...size },
  );
}
