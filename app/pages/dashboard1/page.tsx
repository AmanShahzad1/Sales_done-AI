// app/pages/dashboard1/page.tsx (Primeria)
'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ProtectedRoute from '../RouteProtected/RouteProtected';

const pieData = [
  { name: 'SMS', value: 45 },
  { name: 'Email', value: 25 },
  { name: 'WhatsApp', value: 30 },
];

const pieColors = ['#4f46e5', '#818cf8', '#c7d2fe'];

function getClientInfo() {
  return {
    clientId: 'primeria',
    clientName: 'Primeria Global',
  };
}

export default function DashboardPage() {
  const [client, setClient] = useState<{ clientId: string; clientName: string } | null>(null);

  useEffect(() => {
    setClient(getClientInfo());
  }, []);

  if (!client) return <div className="p-6 text-gray-600">Loading dashboard...</div>;

  const username = client.clientName.split(' ')[0];
  const greeting = `Hey ${username}!`;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="bg-gray-700 px-2 py-1 rounded mr-2">PG</span>
            Primeria Global
          </h2>
          <nav className="space-y-4 text-sm">
            <a href="/pages/dashboard1" className="block hover:text-gray-200 font-medium">Dashboard</a>
            {/* <a href="#" className="block hover:text-gray-200">Client Overview</a>
            <a href="#" className="block hover:text-gray-200">Campaigns</a>
            <a href="#" className="block hover:text-gray-200">Performance</a>
            <a href="#" className="block hover:text-gray-200">Settings</a> */}
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{greeting}</h1>
              <p className="text-gray-600">Agency Performance Dashboard</p>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="font-medium">Adele James</p>
                <p className="text-sm text-gray-500">CEO</p>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                AJ
              </div>
            </div>
          </header>

          {/* Client Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { 
                name: 'Parenta Training', 
                leads: 1420, 
                bookings: 210, 
                status: 'active', 
                color: 'bg-pink-500'
              },
              { 
                name: 'Parenta Group', 
                leads: 980, 
                bookings: 124, 
                status: 'active', 
                color: 'bg-teal-500'
              },
              { 
                name: 'Chameleon Skills', 
                leads: 760, 
                bookings: 95, 
                status: 'active', 
                color: 'bg-green-500'
              }
            ].map((client, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow overflow-hidden">
                <div className={`${client.color} p-4 text-white`}>
                  <h3 className="text-lg font-bold">{client.name}</h3>
                  <p className="text-sm opacity-80">Active Campaign</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Leads</p>
                      <p className="text-xl font-bold">{client.leads}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bookings</p>
                      <p className="text-xl font-bold">{client.bookings}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span>Conversion Rate</span>
                      <span className="font-bold">{(client.bookings / client.leads * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`${client.color} h-2 rounded-full`} 
                        style={{ width: `${(client.bookings / client.leads * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Leads', value: '3,160', icon: '👥' },
              { label: 'Bookings', value: '429', icon: '📅' },
              { label: 'Avg. Conversion', value: '13.6%', icon: '📊' },
              { label: 'Active Agents', value: '9', icon: '🤖' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-start">
                <span className="text-2xl mr-3">{item.icon}</span>
                <div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="text-xl font-semibold mt-1">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Campaign Performance</h2>
              <div className="h-60 bg-gradient-to-r from-gray-50 to-gray-100 rounded flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Performance analytics coming soon</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Channel Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}