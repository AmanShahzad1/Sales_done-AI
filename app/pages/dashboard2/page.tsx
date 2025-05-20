'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'SMS', value: 45 },
  { name: 'Email', value: 25 },
  { name: 'WhatsApp', value: 30 },
];

const pieColors = ['#1e3a8a', '#3b82f6', '#93c5fd'];

// Mock function (replace this with Supabase session/user fetch)
function getClientInfo() {
  // Simulate different environments: 'parenta', 'chameleon', 'saas'
  return {
    clientId: 'Saas',
    clientName: 'Saas Training',
  };
}

export default function DashboardPage() {
  const [client, setClient] = useState<{ clientId: string; clientName: string } | null>(null);

  useEffect(() => {
    // In real use: fetch from Supabase session/user metadata
    setClient(getClientInfo());
  }, []);

  if (!client) return <div className="p-6 text-gray-600">Loading dashboard...</div>;

  const greeting = `Hey ${client.clientName?.split(' ')[0]}!`;
  const environmentStyles: Record<string, string> = {
    parenta: 'bg-pink-100',
    chameleon: 'bg-green-100',
    saas: 'bg-indigo-100',
  };

  const bgClass = environmentStyles[client.clientId] || 'bg-gray-100';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Salesdone AI</h2>
        <nav className="space-y-4 text-sm">
          <a href="#" className="block hover:text-gray-200">Dashboard</a>
          <a href="#" className="block hover:text-gray-200">Leads</a>
          <a href="#" className="block hover:text-gray-200">Agents</a>
          <a href="#" className="block hover:text-gray-200">Inbox</a>
          <a href="#" className="block hover:text-gray-200">Settings</a>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className={`flex-1 ${bgClass} p-6`}>
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{greeting} — Welcome to your Sales Dashboard</h1>
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Leads', value: 1200 },
            { label: 'Active Agents', value: 15 },
            { label: 'Bookings Today', value: 32 },
            { label: 'API Requests', value: '9,875' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-sm text-gray-500">{item.label}</div>
              <div className="text-xl font-semibold mt-1">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-2">Booking Trend</h2>
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
              {/* Placeholder - integrate Chart.js or Recharts */}
              Chart Coming Soon
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-2">Channel Distribution</h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-semibold mb-3">Recent Activity</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              New AI agent deployed for booking conversion
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              30 new leads added via Meta campaign
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
              Twilio fallback triggers handled via n8n
            </li>
          </ul>
        </div>

        {/* Agent Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3">Agent Performance</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Agent</th>
                <th>Channel</th>
                <th>Leads Contacted</th>
                <th>Bookings</th>
                <th>Response Rate</th>
              </tr>
            </thead>
            <tbody>
              {[{
                name: 'Qualification Bot',
                channel: 'SMS',
                leads: 100,
                bookings: 20,
                rate: '68%',
              }, {
                name: 'Booking Assistant',
                channel: 'Email',
                leads: 80,
                bookings: 12,
                rate: '52%',
              }].map((agent, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-2">{agent.name}</td>
                  <td>{agent.channel}</td>
                  <td>{agent.leads}</td>
                  <td>{agent.bookings}</td>
                  <td>{agent.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
