// src/app/components/CreateChatClient.js

"use client";

import dynamic from "next/dynamic";

// --- FIX ---
// Both components that rely on browser APIs are now dynamically imported
// with Server-Side Rendering (SSR) disabled.

const QRCodeGenerator = dynamic(() => import("./QRCodeGenerator"), {
  ssr: false,
  // Provide a placeholder that matches the final size of the QR code
  loading: () => (
    <div className="w-[256px] h-[256px] bg-gray-200 animate-pulse rounded-lg"></div>
  ),
});

const CopyButton = dynamic(() => import("./CopyButton"), {
  ssr: false,
  loading: () => (
    <button
      disabled
      className="w-full rounded-md px-4 py-2 bg-gray-200 animate-pulse"
    >
      ...
    </button>
  ),
});
// --- END FIX ---

// This component receives the URL generated on the server as a prop
export default function CreateChatClient({ chatUrl }) {
  return (
    <div className="text-center p-8 bg-white shadow-xl rounded-2xl w-full max-w-sm">
      <h1 className="text-3xl font-bold text-gray-900">
        Your Chat Room is Ready!
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Scan or copy the link to join.
      </p>

      <div className="mt-6 inline-block p-4 border rounded-lg">
        {/* This will now correctly render the loading skeleton on the server
            and the actual QR code on the client. */}
        <QRCodeGenerator text={chatUrl} />
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <p className="font-mono text-sm bg-gray-100 p-2 rounded w-full truncate">
          {chatUrl}
        </p>
        <CopyButton textToCopy={chatUrl} />
      </div>
    </div>
  );
}
