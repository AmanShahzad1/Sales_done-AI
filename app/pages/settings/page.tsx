'use client';
import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiGlobe, FiSave } from 'react-icons/fi';
import ProtectedRoute from '../RouteProtected/RouteProtected';

// Define allowed tab ids
type TabId = 'profile' | 'security' | 'integrations' | 'billing';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [userData, setUserData] = useState({
    name: 'Alex Morgan',
    email: 'alex@parenta.com',
    phone: '+44 7123 456789',
    company: 'Parenta Training',
    timezone: 'Europe/London',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Tab definition with correct type!
  const tabs: { id: TabId; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'billing', label: 'Billing' },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-6 space-y-6">
          <h2 className="text-2xl font-bold">Salesdone AI</h2>
          <nav className="space-y-4 text-sm">
            <a href="/pages/dashboard" className="block hover:text-gray-200">Dashboard</a>
            <a href="/pages/leads" className="block hover:text-gray-200">Leads</a>
            <a href="/pages/agents" className="block hover:text-gray-200">Agents</a>
            <a href="/pages/inbox" className="block hover:text-gray-200">Inbox</a>
            <a href="/pages/settings" className="block text-blue-300 font-medium">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences and security</p>
            </header>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-b hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded-xl" />
                    <div className="ml-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Upload new photo
                      </button>
                      <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-3 text-gray-400" />
                        <input
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-3 text-gray-400" />
                        <input
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        name="company"
                        value={userData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <div className="relative">
                        <FiGlobe className="absolute left-3 top-3 text-gray-400" />
                        <select
                          name="timezone"
                          value={userData.timezone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Europe/London">London (GMT+1)</option>
                          <option value="Europe/Dublin">Dublin (GMT+1)</option>
                          <option value="Europe/Paris">Paris (GMT+2)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center">
                      <FiSave className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Password</h3>
                    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-500">Last changed: 15 Mar 2023</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Two-Factor Authentication</h3>
                    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-500">Add extra security to your account</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Active Sessions</h3>
                    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">London, UK • Chrome on macOS</div>
                          <div className="text-sm text-gray-500">Current session • Last active: Just now</div>
                        </div>
                        <button className="text-red-600 hover:text-red-800 font-medium">
                          Log out other sessions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* You can add more tabs similarly... */}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
