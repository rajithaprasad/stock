
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  Users, 
  LogOut, 
  Shield,
  TrendingUp,
  DollarSign,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboardContent from "@/components/admin/AdminDashboardContent";
import AdminAddStock from "@/components/admin/AdminAddStock";
import AdminUsers from "@/components/admin/AdminUsers";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-stock', label: 'Add Stock', icon: Plus },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardContent />;
      case 'add-stock':
        return <AdminAddStock />;
      case 'users':
        return <AdminUsers />;
      default:
        return <AdminDashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-red-600 text-white border-r-2 border-red-400'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-slate-700">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h1>
          <p className="text-slate-400">Manage your BreakoutEdge platform</p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
