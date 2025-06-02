'use client';

import { useState } from 'react';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import ProtectedRoute from '../RouteProtected/RouteProtected';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'booked';
  lastContact: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+44 7123 456789', source: 'Meta Ads', status: 'new', lastContact: '2023-06-15' },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', phone: '+44 7987 654321', source: 'Google Ads', status: 'contacted', lastContact: '2023-06-14' },
    { id: '3', name: 'Emma Wilson', email: 'emma@example.com', phone: '+44 7456 789123', source: 'Organic', status: 'qualified', lastContact: '2023-06-12' },
    { id: '4', name: 'David Brown', email: 'david@example.com', phone: '+44 7123 987654', source: 'Referral', status: 'booked', lastContact: '2023-06-10' },
  ]);

  // Add Lead example
  const addLead = () => {
    const nextId = (parseInt(leads[leads.length - 1]?.id || '0') + 1).toString();
    setLeads([
      ...leads,
      {
        id: nextId,
        name: 'New Lead',
        email: 'new@example.com',
        phone: '+44 7000 000000',
        source: 'Organic',
        status: 'new',
        lastContact: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  // Delete Lead
  const deleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    booked: 'bg-green-100 text-green-800',
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-6 space-y-6">
          <h2 className="text-2xl font-bold">Salesdone AI</h2>
          <nav className="space-y-4 text-sm">
            <a href="/pages/dashboard" className="block hover:text-gray-200">Dashboard</a>
            <a href="/pages/leads" className="block text-blue-300 font-medium">Leads</a>
            <a href="/pages/agents" className="block hover:text-gray-200">Agents</a>
            <a href="/pages/inbox" className="block hover:text-gray-200">Inbox</a>
            <a href="/pages/settings" className="block hover:text-gray-200">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Lead Management</h1>
                <p className="text-gray-600">Track and manage all incoming leads</p>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
                onClick={addLead}
              >
                <FiPlus className="mr-2" />
                Add Lead
              </button>
            </header>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <select className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Sources</option>
                    <option>Meta Ads</option>
                    <option>Google Ads</option>
                    <option>Organic</option>
                    <option>Referral</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Statuses</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Booked</option>
                  </select>
                  <button className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50">
                    <FiFilter />
                    More Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">{leads.length} leads found</p>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                <FiDownload />
                Export CSV
              </button>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 border-b">
                  <tr>
                    <th className="py-3 px-4 font-medium">Lead</th>
                    <th className="py-3 px-4 font-medium">Contact</th>
                    <th className="py-3 px-4 font-medium">Source</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Last Contact</th>
                    <th className="py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                        <div className="text-gray-500 text-xs">ID: {lead.id}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div>{lead.email}</div>
                        <div className="text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="py-4 px-4">{lead.source}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">{lead.lastContact}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit (not implemented yet)"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => deleteLead(lead.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-600">Showing 1–{leads.length} of {leads.length} leads</p>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiChevronLeft />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
