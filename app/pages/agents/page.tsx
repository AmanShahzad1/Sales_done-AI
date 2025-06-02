// app/pages/agents/page.tsx
'use client';
import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiActivity, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import ProtectedRoute from '../RouteProtected/RouteProtected';

interface Agent {
  id: string;
  name: string;
  channel: string;
  status: 'active' | 'paused';
  leadsProcessed: number;
  bookings: number;
  conversionRate: number;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'A1', name: 'Enrollment Advisor', channel: 'SMS/WhatsApp', status: 'active', leadsProcessed: 142, bookings: 24, conversionRate: 16.9 },
    { id: 'A2', name: 'Demo Scheduler', channel: 'SMS/Email', status: 'active', leadsProcessed: 87, bookings: 12, conversionRate: 13.8 },
    { id: 'A3', name: 'Course Consultant', channel: 'WhatsApp', status: 'paused', leadsProcessed: 65, bookings: 8, conversionRate: 12.3 },
  ]);

  const toggleStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' } 
        : agent
    ));
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-6 space-y-6">
          <h2 className="text-2xl font-bold">Salesdone AI</h2>
          <nav className="space-y-4 text-sm">
            <a href="/pages/dashboard" className="block hover:text-gray-200">Dashboard</a>
            <a href="/pages/leads" className="block hover:text-gray-200">Leads</a>
            <a href="/pages/agents" className="block text-blue-300 font-medium">Agents</a>
            <a href="/pages/inbox" className="block hover:text-gray-200">Inbox</a>
            <a href="/pages/settings" className="block hover:text-gray-200">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI Agents</h1>
                <p className="text-gray-600">Manage your automated sales agents</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center">
                <FiPlus className="mr-2" />
                Create Agent
              </button>
            </header>

            {/* Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {agents.map(agent => (
                <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{agent.name}</h3>
                        <div className="text-sm text-gray-500 mt-1">{agent.channel}</div>
                      </div>
                      <button 
                        onClick={() => toggleStatus(agent.id)}
                        className={`p-1 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}
                        aria-label={`Toggle ${agent.name} status`}
                      >
                        {agent.status === 'active' ? 
                          <FiToggleRight className="h-5 w-5 text-white" /> : 
                          <FiToggleLeft className="h-5 w-5 text-gray-500" />
                        }
                      </button>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <div>
                        <div className="text-xs text-gray-500">Leads</div>
                        <div className="font-medium">{agent.leadsProcessed}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Bookings</div>
                        <div className="font-medium">{agent.bookings}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Rate</div>
                        <div className="font-medium">{agent.conversionRate}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 px-5 py-3 bg-gray-50">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <FiEdit />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <FiActivity />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Agent Builder Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Agent</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Course Advisor" 
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Channel</label>
                  <select className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>SMS</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>SMS + WhatsApp</option>
                    <option>All Channels</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent Personality</label>
                  <textarea 
                    placeholder="Describe the agent's communication style, tone, and key messages..."
                    className="w-full h-32 border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                    Save Agent Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}