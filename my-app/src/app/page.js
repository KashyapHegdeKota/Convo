// src/app/page.js
import Link from "next/link";
import { Inter } from "next/font/google";

// This is the new way to set the page title and description in the App Router
export const metadata = {
  title: "Convo - The Best Way to Chat",
  description: "A modern chat application homepage.",
};

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    // The main container uses the Inter font class for great typography.
    // A subtle gradient background adds a modern, soft touch.
    <main
      className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 ${inter.className}`}
    >
      <div className="container mx-auto flex flex-col items-center gap-12 text-center md:flex-row md:text-left">
        {/* Left Side: Text and Call-to-Action Button */}
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl">
            <span className="block">Connect Instantly.</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Chat Seamlessly.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-gray-600 md:text-xl">
            Welcome to Convo, the simplest and most beautiful way to stay in
            touch with the people who matter.
          </p>

          {/* 
            CORRECTION 1: The Link component now takes the className directly.
            CORRECTION 2: The href now points to "/create".
            No more <a> tag inside!
          */}
          <div className="mt-10">
            <Link
              href="/create" // Points to your src/app/create/page.js
              className="
                inline-block rounded-full 
                bg-blue-600 px-10 py-4 
                text-lg font-bold text-white 
                shadow-lg shadow-blue-500/30
                transition-all duration-300 ease-in-out
                hover:scale-105 hover:bg-blue-700 hover:shadow-xl
              "
            >
              Get Chatting
            </Link>
          </div>
        </div>

        {/* Right Side: The stylized "App Image" */}
        <div className="flex-1">
          <div
            className="
              relative mx-auto w-full max-w-md transform
              rounded-2xl bg-white p-4 shadow-2xl
              transition-all duration-500
              hover:scale-105 hover:rotate-0
              md:-rotate-3
            "
          >
            {/* Window Header Mockup */}
            <div className="mb-4 flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>

            {/* Fake Chat Bubbles */}
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="w-3/4 rounded-lg bg-gray-200 p-3">
                  <div className="h-3 w-11/12 rounded bg-gray-300"></div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-3/4 rounded-lg bg-blue-500 p-3">
                  <div className="h-3 w-11/12 rounded bg-blue-400"></div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="w-1/2 rounded-lg bg-gray-200 p-3">
                  <div className="h-3 w-10/12 rounded bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
