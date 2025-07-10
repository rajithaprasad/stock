
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

const AdminDashboardContent = () => {
  const [stats, setStats] = useState({
    totalStocks: 0,
    totalUsers: 0,
    paidSubscriptions: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const stocks = JSON.parse(localStorage.getItem('adminStocks') || '[]');
    const users = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    const paidUsers = users.filter((user: any) => user.subscription === 'paid');
    
    setStats({
      totalStocks: stocks.length,
      totalUsers: users.length,
      paidSubscriptions: paidUsers.length,
      totalRevenue: paidUsers.length * 29.99 // Assuming $29.99 per subscription
    });
  }, []);

  const statCards = [
    {
      title: "Total Stocks",
      value: stats.totalStocks,
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Paid Subscriptions",
      value: stats.paidSubscriptions,
      icon: Target,
      color: "text-purple-500"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
              <span className="text-slate-300">New user registration</span>
              <span className="text-slate-400 text-sm">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
              <span className="text-slate-300">Stock added: TSLA</span>
              <span className="text-slate-400 text-sm">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
              <span className="text-slate-300">Premium subscription purchased</span>
              <span className="text-slate-400 text-sm">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardContent;
