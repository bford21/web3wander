"use client"; // Ensure this file is treated as a Client Component

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [randomUrl, setRandomUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.pentacle.xyz/api/projects', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WELCOME_ONCHAIN_API_KEY}`, // Use Bearer token for authentication
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        // Pick a random URL from the data array
        const randomIndex = Math.floor(Math.random() * result.data.length);
        const selectedItem = result.data[randomIndex].attributes.website_url;
        setRandomUrl(selectedItem);
      } else {
        setError('No data available');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen w-screen">
      {randomUrl ? (
        // When a site is being rendered
        <>
          {/* Banner */}
          <div className="w-full bg-white shadow-lg py-4 px-8 flex items-center justify-between border-b-2 border-gray-700">
            <h1 className="text-3xl font-bold text-black font-mono">
              🚶‍♂️  <a href="/">Web3 Wander</a>
            </h1>
            <button
              onClick={handleClick}
              className="text-white py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600"
            >
              {loading ? 'Loading...' : 'Wander'}
            </button>
          </div>

          {/* Fullscreen Iframe */}
          <iframe
            src={randomUrl}
            title="Random Web3 Site"
            className="flex-1 w-full border-0"
            style={{ height: 'calc(100vh - 64px)' }} // Full height minus banner height
            allowFullScreen
          ></iframe>
        </>
      ) : (
        // When no site is being rendered (full-screen centered content)
        <div className="flex flex-col items-center justify-center flex-1 relative">
          <h1 className="text-6xl font-bold text-black mb-8 font-mono">
            🚶‍♂️ Web3 Wander
          </h1>
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            {loading ? 'Loading...' : 'Start Wandering'}
          </button>
          {/* Fixed at the bottom */}
          <div className="absolute bottom-4 w-full text-center">
            <p className="text-black">
              Powered By <a href="https://www.welcomeonchain.xyz/" className="text-blue-500 underline">Welcome Onchain</a> | <a href="https://github.com/bford21/web3wander" className="text-blue-500 underline">Github</a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
