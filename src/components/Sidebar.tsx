import React from 'react';
import {
  Home,
  Plus,
  ClipboardList,
  FileCheck,
  RefreshCw,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

type TabType = 'dashboard' | 'newQuote' | 'quoteTracking' | 'contractTracking' | 'renewal';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => (
  <div className="w-64 bg-[#1a1f2b] text-white border-r border-gray-700 flex flex-col h-screen">
    <div className="p-6 flex justify-center">
      <img 
        src="https://www.jpme.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjpme_logo.ba26bd43.gif&w=3840&q=75"
        alt="JPME Logo"
        className="h-28 w-auto mb-4"
      />
    </div>
    <div className="flex flex-col flex-grow justify-between px-2">
      <nav className="space-y-1">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
            activeTab === 'dashboard'
              ? 'bg-[#ffc72c] text-[#1a1f2b] font-medium'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Home className="h-5 w-5 mr-3" />
          Tableau de bord
        </button>
        <button
          onClick={() => onTabChange('newQuote')}
          className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
            activeTab === 'newQuote'
              ? 'bg-[#ffc72c] text-[#1a1f2b] font-medium'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Plus className="h-5 w-5 mr-3" />
          Nouvelle cotation
        </button>
        <button
          onClick={() => onTabChange('quoteTracking')}
          className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
            activeTab === 'quoteTracking'
              ? 'bg-[#ffc72c] text-[#1a1f2b] font-medium'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <ClipboardList className="h-5 w-5 mr-3" />
          Suivi des cotations
        </button>
        <button
          onClick={() => onTabChange('contractTracking')}
          className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
            activeTab === 'contractTracking'
              ? 'bg-[#ffc72c] text-[#1a1f2b] font-medium'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <FileCheck className="h-5 w-5 mr-3" />
          Suivi des contrats
        </button>
        <button
          onClick={() => onTabChange('renewal')}
          className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
            activeTab === 'renewal'
              ? 'bg-[#ffc72c] text-[#1a1f2b] font-medium'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <RefreshCw className="h-5 w-5 mr-3" />
          Renouvellements
        </button>
      </nav>
      
      <div className="mb-6 space-y-1">
        <div className="border-t border-gray-700 my-2"></div>
        <button className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
          <Settings className="h-5 w-5 mr-3" />
          Paramètres
        </button>
        <button className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
          <HelpCircle className="h-5 w-5 mr-3" />
          Aide
        </button>
        <button className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </button>
      </div>
    </div>
  </div>
);