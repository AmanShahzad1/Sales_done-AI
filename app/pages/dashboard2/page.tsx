// app/pages/dashboard2/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ProtectedRoute from '../RouteProtected/RouteProtected';
import {
  fetchDashboardMetrics,
  fetchDemoPipeline,
  fetchLeadSources,
  fetchRecentDemos
} from '@/utils/dashboardData';

const pieColors = ['#0d9488', '#14b8a6', '#2dd4bf'];

interface DashboardMetrics {
  demoRequests: number;
  demosBooked: number;
  newNurseries: number;
  crmSignups: number;
}

interface DemoPipeline {
  requested: number;
  scheduled: number;
  completed: number;
  converted: number;
}

interface LeadSource {
  name: string;
  value: number;
}

interface RecentDemo {
  id: string;
  nursery: string;
  contact: string;
  location: string;
  date: string;
  status: string;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [pipeline, setPipeline] = useState<DemoPipeline | null>(null);
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [recentDemos, setRecentDemos] = useState<RecentDemo[]>([]);
  const [conversionRate, setConversionRate] = useState(0);

  // This should come from your auth system or context
  const companyId = 'parenta-group-company-id'; 

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          metricsData,
          pipelineData,
          sourcesData,
          demosData
        ] = await Promise.all([
          fetchDashboardMetrics(companyId),
          fetchDemoPipeline(companyId),
          fetchLeadSources(companyId),
          fetchRecentDemos(companyId)
        ]);

        setMetrics(metricsData);
        setPipeline(pipelineData);
        setLeadSources(sourcesData);
        setRecentDemos(demosData);

        // Calculate conversion rate
        if (pipelineData) {
          const rate = pipelineData.completed > 0 
            ? Math.round((pipelineData.converted / pipelineData.completed) * 100)
            : 0;
          setConversionRate(rate);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [companyId]);

  if (loading) return (
    <div className="p-6 text-gray-600">Loading dashboard...</div>
  );

  const client = {
    clientId: 'parenta-group',
    clientName: 'Parenta Group',
  };

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
            {metrics && [
              { label: 'Demo Requests', value: metrics.demoRequests, icon: '📱' },
              { label: 'Demos Booked', value: metrics.demosBooked, icon: '📅' },
              { label: 'New Nurseries', value: metrics.newNurseries, icon: '🏫' },
              { label: 'CRM Signups', value: metrics.crmSignups, icon: '📝' },
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
          {pipeline && (
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Software Demo Pipeline</h2>
                <button className="text-sm text-teal-600 hover:text-teal-800">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { stage: 'Requested', count: pipeline.requested, color: 'bg-gray-200' },
                  { stage: 'Scheduled', count: pipeline.scheduled, color: 'bg-amber-200' },
                  { stage: 'Completed', count: pipeline.completed, color: 'bg-blue-200' },
                  { stage: 'Converted', count: pipeline.converted, color: 'bg-green-200' },
                ].map((stage, idx) => (
                  <div key={idx} className="p-3 border border-gray-100 rounded-lg">
                    <div className="text-lg font-bold">{stage.count}</div>
                    <div className="text-sm text-gray-500 mt-1">{stage.stage}</div>
                    <div className={`${stage.color} h-2 w-full rounded-full mt-2`}></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Demo Conversion Rate</h2>
              <div className="h-60 bg-gradient-to-r from-teal-50 to-cyan-50 rounded flex flex-col items-center justify-center text-center p-4">
                <div className="text-5xl font-bold text-teal-700 mb-2">{conversionRate}%</div>
                <p className="text-gray-600">of scheduled demos completed</p>
                <div className="mt-4 w-full max-w-xs">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Last week: {Math.max(0, conversionRate - 6)}%</span>
                    <span>+6%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: `${conversionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Lead Sources</h2>
              {leadSources.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={leadSources}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-60 flex items-center justify-center text-gray-500">
                  No lead source data available
                </div>
              )}
            </div>
          </div>

          {/* Recent Demos */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-3">Recent Demo Requests</h2>
            {recentDemos.length > 0 ? (
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
                    {recentDemos.map((demo) => (
                      <tr key={demo.id} className="border-b hover:bg-gray-50">
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
            ) : (
              <div className="py-6 text-center text-gray-500">
                No recent demo requests found
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}