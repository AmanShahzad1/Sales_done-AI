'use client';
import { useState } from 'react';
import { FiSearch, FiPaperclip, FiSend, FiTrash2 } from 'react-icons/fi';
import ProtectedRoute from '../RouteProtected/RouteProtected';

interface Conversation {
    id: string;
    name: string;
    phone: string;
    lastMessage: string;
    time: string;
    unread: boolean;
    status: 'new' | 'active' | 'closed';
}

interface Message {
    id: string;
    content: string;
    sender: 'lead' | 'agent';
    timestamp: string;
    attachments?: string[];
}

export default function InboxPage() {
    const [conversations, setConversations] = useState<Conversation[]>([
        { id: 'C1', name: 'Sarah Johnson', phone: '+44 7123 456789', lastMessage: 'Thanks! I received the payment link', time: '10:30 AM', unread: true, status: 'active' },
        { id: 'C2', name: 'Michael Chen', phone: '+44 7987 654321', lastMessage: 'Can we schedule for next week?', time: 'Yesterday', unread: false, status: 'active' },
        { id: 'C3', name: 'Emma Wilson', phone: '+44 7456 789123', lastMessage: 'Which courses start in July?', time: 'Jun 12', unread: false, status: 'active' },
        { id: 'C4', name: 'David Brown', phone: '+44 7123 987654', lastMessage: 'Payment confirmed!', time: 'Jun 10', unread: false, status: 'closed' },
    ]);

    const [activeConversation, setActiveConversation] = useState<string>('C1');
    const [message, setMessage] = useState<string>('');

    // We'll keep messages as a plain object for now, since you didn't use setState for this.
    const messages: Record<string, Message[]> = {
        C1: [
            { id: 'M1', content: 'Hi Sarah, I can help with your Level 3 course enrollment', sender: 'agent', timestamp: '10:15 AM' },
            { id: 'M2', content: 'Great! What documents do I need?', sender: 'lead', timestamp: '10:18 AM' },
            { id: 'M3', content: 'Just ID and proof of address. Here\'s the payment link: [link]', sender: 'agent', timestamp: '10:20 AM' },
            { id: 'M4', content: 'Thanks! I received the payment link', sender: 'lead', timestamp: '10:30 AM' },
        ],
        C2: [
            { id: 'M5', content: 'Hi Michael, ready for your nursery software demo?', sender: 'agent', timestamp: '09:30 AM' },
            { id: 'M6', content: 'Can we schedule for next week?', sender: 'lead', timestamp: '09:45 AM' },
        ],
        C3: [
            { id: 'M7', content: 'Hi Emma, which construction courses interest you?', sender: 'agent', timestamp: 'Jun 12, 2:30 PM' },
            { id: 'M8', content: 'Which courses start in July?', sender: 'lead', timestamp: 'Jun 12, 3:15 PM' },
        ],
        C4: [
            { id: 'M9', content: 'David, your bricklaying course starts Monday', sender: 'agent', timestamp: 'Jun 10, 11:30 AM' },
            { id: 'M10', content: 'Payment confirmed!', sender: 'lead', timestamp: 'Jun 10, 12:45 PM' },
        ]
    };

    // Example: Mark as read when opening a conversation
    const handleSetActiveConversation = (id: string) => {
        setActiveConversation(id);
        setConversations(convs =>
            convs.map(conv =>
                conv.id === id ? { ...conv, unread: false } : conv
            )
        );
    };

    // Example: Delete conversation (removes from list)
    const handleDeleteConversation = (id: string) => {
        setConversations(convs => convs.filter(conv => conv.id !== id));
        // If deleting the current conversation, switch to another one
        if (id === activeConversation && conversations.length > 1) {
            const nextConv = conversations.find(conv => conv.id !== id);
            if (nextConv) setActiveConversation(nextConv.id);
        }
    };

    const sendMessage = () => {
        if (message.trim() === '') return;
        // In a real app, this would add message to backend and refresh.
        setMessage('');
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
                        <a href="/pages/agents" className="block hover:text-gray-200">Agents</a>
                        <a href="/pages/inbox" className="block text-blue-300 font-medium">Inbox</a>
                        <a href="/pages/settings" className="block hover:text-gray-200">Settings</a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-gray-50 flex">
                    {/* Conversation List */}
                    <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <h1 className="text-xl font-bold text-gray-800">Conversations</h1>
                            <div className="relative mt-3">
                                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1">
                            {conversations.map(conv => (
                                <div
                                    key={conv.id}
                                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-blue-50 ${activeConversation === conv.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                        }`}
                                    onClick={() => handleSetActiveConversation(conv.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="font-medium text-gray-900">{conv.name}</div>
                                        <div className="text-sm text-gray-500">{conv.time}</div>
                                        {/* Delete Button */}
                                        <button
                                            className="ml-2 text-red-600 hover:text-red-800 p-1 rounded-full"
                                            title="Delete Conversation"
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleDeleteConversation(conv.id);
                                            }}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        {conv.unread && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        )}
                                        <div className={`text-sm truncate ${conv.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                            {conv.lastMessage}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message Panel */}
                    <div className="flex-1 flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200 bg-white flex items-center">
                            <div>
                                <h2 className="font-bold text-gray-800">
                                    {conversations.find(c => c.id === activeConversation)?.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {conversations.find(c => c.id === activeConversation)?.phone}
                                </p>
                            </div>
                            <div className="ml-auto">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {conversations.find(c => c.id === activeConversation)?.status === 'closed'
                                        ? 'Closed'
                                        : 'Active'}
                                </span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            <div className="max-w-3xl mx-auto space-y-4">
                                {messages[activeConversation]?.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-xs md:max-w-md rounded-xl p-4 ${msg.sender === 'agent'
                                                ? 'bg-blue-500 text-white rounded-br-none'
                                                : 'bg-white border border-gray-200 rounded-bl-none'
                                            }`}>
                                            <div className="whitespace-pre-wrap">{msg.content}</div>
                                            {msg.attachments && (
                                                <div className="mt-2 flex gap-2">
                                                    {msg.attachments.map((att, i) => (
                                                        <div key={i} className="flex items-center text-sm p-2 bg-blue-100/20 rounded-lg">
                                                            <FiPaperclip className="mr-1" /> {att}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {msg.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex items-end">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[60px]"
                                />
                                <div className="ml-3 flex">
                                    <button className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100">
                                        <FiPaperclip />
                                    </button>
                                    <button
                                        onClick={sendMessage}
                                        className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        disabled={message.trim() === ''}
                                    >
                                        <FiSend />
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
