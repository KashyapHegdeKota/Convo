// src/app/components/QRCodeGenerator.js

// This is the most important line! It tells Next.js to run this in the browser.
"use client";

import { useQRCode } from "next-qrcode";

export default function QRCodeGenerator({ text }) {
  // useQRCode provides a Canvas component we can use directly.
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={text}
      options={{
        errorCorrectionLevel: "M", // 'M' is a good balance
        margin: 3,
        scale: 4,
        width: 256, // Set the size you want
        color: {
          dark: "#000000", // QR code color
          light: "#FFFFFF", // Background color
        },
      }}
    />
  );
}
