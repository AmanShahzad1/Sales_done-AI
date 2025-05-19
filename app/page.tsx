import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/App Name */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Salesdone<span className="text-blue-600">AI</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Power your sales with an AI-driven platform for lead management, agent automation, and multi-channel engagement.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-indigo-700">AI Agent Builder</h3>
            <p className="text-sm text-gray-600">Create custom agents with tone, logic, and multichannel capability.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-indigo-700">Lead Management</h3>
            <p className="text-sm text-gray-600">Upload, tag, and trigger smart flows with CSV or manual input.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-indigo-700">Real-Time Dashboard</h3>
            <p className="text-sm text-gray-600">Monitor performance with visual insights and real-time stats.</p>
          </div>
        </div>

        {/* Login Button */}
        <Link 
          href="/pages/login" 
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Login to Manage Your Sales
        </Link>
      </div>
    </main>
  );
}
