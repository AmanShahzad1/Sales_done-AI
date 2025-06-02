// app/pages/dashboard/page.tsx (default)
'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from '../RouteProtected/RouteProtected';
import { fetchClientData } from '../../../api/auth';

interface User {
  id: string;
  email: string;
}

interface ClientData {
  totalLeads: number;
  activeAgents: number;
  bookingsToday: number;
  apiRequests: number;
  agents?: {
    name: string;
    channel: string;
    leads: number;
    bookings: number;
    rate: string;
  }[];
}

const pieData = [
  { name: 'SMS', value: 45 },
  { name: 'Email', value: 25 },
  { name: 'WhatsApp', value: 30 },
];

interface JwtToken {
  sub: string;
  email?: string;
  exp?: number;
}

const pieColors = ['#1e3a8a', '#3b82f6', '#93c5fd'];

const environmentStyles: Record<string, string> = {
  parenta: 'bg-pink-100',
  chameleon: 'bg-green-100',
  saas: 'bg-indigo-100',
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getClientInfo = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const decoded = jwtDecode<JwtToken>(token);
        
        if (!decoded.sub) {
          throw new Error('Invalid token: missing user identification');
        }

        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error('User information not found');
        }

        const userData: User = JSON.parse(userString);
        setUser(userData);

        const data = await fetchClientData(decoded.sub);
        setClientData(data);

      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error.message);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        router.push('/pages/login');
      } finally {
        setLoading(false);
      }
    };

    getClientInfo();
  }, [router]);

  if (loading) return <div className="p-6 text-gray-600">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!user) return <div className="p-6 text-red-500">User information not available</div>;

  const username = user.email.split('@')[0];
  const greeting = `Hey ${username}!`;
  const bgClass = environmentStyles[user.id] || 'bg-gray-100';

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/pages/login');
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-800 text-white p-6 space-y-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="bg-indigo-600 px-2 py-1 rounded mr-2">SD</span>
            Salesdone AI
          </h2>
          <nav className="space-y-4 text-sm">
            <a href="/pages/dashboard" className="block hover:text-indigo-200 font-medium">Dashboard</a>
            <a href="/pages/leads" className="block hover:text-indigo-200">Leads</a>
            <a href="/pages/agents" className="block hover:text-indigo-200">Agents</a>
            <a href="/pages/inbox" className="block hover:text-indigo-200">Inbox</a>
            <a href="/pages/settings" className="block hover:text-indigo-200">Settings</a>

            <button 
              onClick={handleLogout}
              className="block w-full text-left hover:text-indigo-200 mt-8 pt-4 border-t border-indigo-700"
              aria-label="Logout"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className={`flex-1 ${bgClass} p-6`}>
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{greeting}</h1>
              <p className="text-gray-600">Welcome to your Sales Dashboard</p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
          </header>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {clientData ? (
              [
                { label: 'Total Leads', value: clientData.totalLeads, icon: '👥' },
                { label: 'Active Agents', value: clientData.activeAgents, icon: '🤖' },
                { label: 'Bookings Today', value: clientData.bookingsToday, icon: '📅' },
                { label: 'API Requests', value: clientData.apiRequests, icon: '🔌' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-start">
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-xl font-semibold mt-1">{item.value}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-4">No data available</div>
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Booking Trend</h2>
              <div className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 rounded flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p>Chart coming soon</p>
                </div>
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
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <span>✅</span>
                </div>
                <div>
                  <p className="font-medium">New AI agent deployed</p>
                  <p className="text-sm text-gray-500">Booking conversion workflow activated</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <span>📥</span>
                </div>
                <div>
                  <p className="font-medium">30 new leads added</p>
                  <p className="text-sm text-gray-500">Via Meta advertising campaign</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                  <span>⚙️</span>
                </div>
                <div>
                  <p className="font-medium">Fallback triggers handled</p>
                  <p className="text-sm text-gray-500">Via n8n automation workflows</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Agent Table */}
          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Agent Performance</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View Details →
              </button>
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3">Agent</th>
                  <th>Channel</th>
                  <th>Leads</th>
                  <th>Bookings</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {clientData?.agents?.map((agent, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{agent.name}</td>
                    <td><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{agent.channel}</span></td>
                    <td>{agent.leads}</td>
                    <td><span className="font-medium">{agent.bookings}</span></td>
                    <td><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{agent.rate}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}