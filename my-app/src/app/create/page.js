// src/app/create/page.js

// 1. Import the new client component
import CreateChatClient from "../components/CreateChatClient";

export const metadata = {
  title: "Convo - Create Chat",
};

// These functions run on the server, which is perfect.
function makeSessionID() {
  return Math.random().toString(36).substring(2, 15);
}

function buildChatURL(sessionID) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
  return `${baseUrl}/join/${sessionID}`;
}

// This is your Server Component. It stays clean and focused on data.
export default function CreateChatPage() {
  // 2. Generate the data on the server.
  const sessionID = makeSessionID();
  const chatUrl = buildChatURL(sessionID);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* 3. Render the client component and pass the server-generated data as a prop */}
      <CreateChatClient chatUrl={chatUrl} />
    </div>
  );
}
