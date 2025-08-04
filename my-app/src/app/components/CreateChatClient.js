// src/app/components/CreateChatClient.js
"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // 1. Import the router

const QRCodeGenerator = dynamic(() => import("./QRCodeGenerator"), {
  ssr: false,
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

export default function CreateChatClient({ chatUrl }) {
  // 2. Initialize the router
  const router = useRouter();

  // 3. Create a handler function for the new button
  const handleJoin = () => {
    router.push(chatUrl);
  };

  return (
    <div className="text-center p-8 bg-white shadow-xl rounded-2xl w-full max-w-sm">
      <h1 className="text-3xl font-bold text-gray-900">
        Your Chat Room is Ready!
      </h1>
      <p className="mt-2 text-lg text-gray-600">Share the link, or join now.</p>

      <div className="mt-6 inline-block p-4 border rounded-lg">
        <QRCodeGenerator text={chatUrl} />
      </div>

      <div className="mt-4 flex flex-col items-center gap-4">
        {" "}
        {/* Increased gap for spacing */}
        <div className="w-full">
          <p className="font-mono text-sm bg-gray-100 p-2 rounded w-full truncate mb-2">
            {chatUrl}
          </p>
          <CopyButton textToCopy={chatUrl} />
        </div>
        {/* 4. Add the new "Join" button */}
        <button
          onClick={handleJoin}
          className="w-full rounded-md px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Enter Chat Room
        </button>
      </div>
    </div>
  );
}
