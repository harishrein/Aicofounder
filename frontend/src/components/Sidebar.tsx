import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  user: any;
  onLogout: () => void;
}

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'idle' | 'working' | 'completed';
  color: string;
}

const agents: Agent[] = [
  { id: 'alex', name: 'Alex', type: 'Sales', status: 'idle', color: 'agent-alex' },
  { id: 'riley', name: 'Riley', type: 'Marketing', status: 'working', color: 'agent-riley' },
  { id: 'morgan', name: 'Morgan', type: 'Finance', status: 'idle', color: 'agent-morgan' },
  { id: 'jordan', name: 'Jordan', type: 'Operations', status: 'idle', color: 'agent-jordan' },
  { id: 'sam', name: 'Sam', type: 'HR', status: 'idle', color: 'agent-sam' },
  { id: 'taylor', name: 'Taylor', type: 'R&D', status: 'idle', color: 'agent-taylor' },
  { id: 'casey', name: 'Casey', type: 'Customer Success', status: 'idle', color: 'agent-casey' },
];

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { name: 'Chat', href: '/', icon: '💬', current: location.pathname === '/' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊', current: location.pathname === '/dashboard' },
    { name: 'Clients', href: '/clients', icon: '👥', current: location.pathname === '/clients' },
    { name: 'Finance', href: '/finance', icon: '💰', current: location.pathname === '/finance' },
    { name: 'Leads', href: '/leads', icon: '🎯', current: location.pathname === '/leads' },
    { name: 'Projects', href: '/projects', icon: '📋', current: location.pathname === '/projects' },
    { name: 'Settings', href: '/settings', icon: '⚙️', current: location.pathname === '/settings' },
  ];

  return (
    <div className={`flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-lg font-semibold text-gray-900">Co-Founder</span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              item.current
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {!isCollapsed && item.name}
          </Link>
        ))}
      </nav>

      {/* Agent Status Bar */}
      <div className="border-t border-gray-200 p-4">
        <div className={`${isCollapsed ? 'hidden' : 'block'} mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider`}>
          AI Agents
        </div>
        <div className={`grid ${isCollapsed ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors`}
              title={`${agent.name} - ${agent.type} (${agent.status})`}
            >
              <div className="relative">
                <div className={`agent-avatar ${agent.color}`}>
                  {agent.name[0]}
                </div>
                <div className={`status-indicator ${agent.status} absolute bottom-0 right-0`} />
              </div>
              {!isCollapsed && (
                <span className="text-xs text-gray-600 mt-1">{agent.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
            {user?.first_name?.[0] || 'U'}
          </div>
          {!isCollapsed && (
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={onLogout}
            className="mt-3 w-full text-xs text-gray-600 hover:text-gray-900"
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}