// components/CopyButton.js
"use client";
import { useState } from "react";

// Changed from a named export to a default export
export default function CopyButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className={`
        w-full rounded-md px-4 py-2 font-semibold text-white
        transition-colors duration-200
        ${isCopied ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}
      `}
    >
      {isCopied ? "Copied!" : "Copy Link"}
    </button>
  );
}
