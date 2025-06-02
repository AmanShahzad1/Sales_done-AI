// app/pages/dashboard2/page.tsx (Parenta)
'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ProtectedRoute from '../RouteProtected/RouteProtected';

const pieData = [
  { name: 'SMS', value: 45 },
  { name: 'Email', value: 25 },
  { name: 'WhatsApp', value: 30 },
];

const pieColors = ['#0d9488', '#14b8a6', '#2dd4bf'];

function getClientInfo() {
  return {
    clientId: 'parenta-group',
    clientName: 'Parenta Group',
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
        <aside className="w-64 bg-teal-800 text-white p-6 space-y-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="bg-teal-700 px-2 py-1 rounded mr-2">PG</span>
            Parenta Group
          </h2>
          <nav className="space-y-4 text-sm">
            <a href="/pages/dashboard2" className="block hover:text-teal-200 font-medium">Dashboard</a>
            {/* <a href="#" className="block hover:text-teal-200">Software Demos</a>
            <a href="#" className="block hover:text-teal-200">Nursery Leads</a>
            <a href="#" className="block hover:text-teal-200">CRM Analytics</a>
            <a href="#" className="block hover:text-teal-200">Settings</a> */}
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{greeting}</h1>
              <p className="text-gray-600">Nursery Software Solutions Dashboard</p>
            </div>
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
          </header>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Demo Requests', value: 42, icon: '📱' },
              { label: 'Demos Booked', value: 28, icon: '📅' },
              { label: 'New Nurseries', value: 9, icon: '🏫' },
              { label: 'CRM Signups', value: 15, icon: '📝' },
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

          {/* Demo Status */}
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Software Demo Pipeline</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { stage: 'Requested', count: 42, color: 'bg-gray-200' },
                { stage: 'Scheduled', count: 28, color: 'bg-amber-200' },
                { stage: 'Completed', count: 18, color: 'bg-blue-200' },
                { stage: 'Converted', count: 9, color: 'bg-green-200' },
              ].map((stage, idx) => (
                <div key={idx} className="p-3 border border-gray-100 rounded-lg">
                  <div className="text-lg font-bold">{stage.count}</div>
                  <div className="text-sm text-gray-500 mt-1">{stage.stage}</div>
                  <div className={`${stage.color} h-2 w-full rounded-full mt-2`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Demo Conversion Rate</h2>
              <div className="h-60 bg-gradient-to-r from-teal-50 to-cyan-50 rounded flex flex-col items-center justify-center text-center p-4">
                <div className="text-5xl font-bold text-teal-700 mb-2">64%</div>
                <p className="text-gray-600">of scheduled demos completed</p>
                <div className="mt-4 w-full max-w-xs">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Last week: 58%</span>
                    <span>+6%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: '64%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Lead Sources</h2>
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

          {/* Recent Demos */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-3">Recent Demo Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-3">Nursery</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { nursery: 'Little Stars', contact: 'Sarah Johnson', location: 'London', date: 'Jun 15', status: 'Scheduled' },
                    { nursery: 'Tiny Treasures', contact: 'Michael Chen', location: 'Manchester', date: 'Jun 14', status: 'Completed' },
                    { nursery: 'Sunshine Kids', contact: 'Emma Wilson', location: 'Birmingham', date: 'Jun 12', status: 'Converted' },
                  ].map((demo, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{demo.nursery}</td>
                      <td>{demo.contact}</td>
                      <td>{demo.location}</td>
                      <td>{demo.date}</td>
                      <td>
                        <span className={`px-2 py-1 rounded text-xs ${
                          demo.status === 'Scheduled' ? 'bg-amber-100 text-amber-800' :
                          demo.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {demo.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}