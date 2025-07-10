
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Crown, User } from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  subscription: 'free' | 'paid';
  joinDate: string;
  stocksPicked: number;
  lastActive: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    // Initialize with dummy users if none exist
    const savedUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    if (savedUsers.length === 0) {
      const dummyUsers: AdminUser[] = [
        {
          id: '1',
          username: 'john_trader',
          email: 'john@example.com',
          subscription: 'paid',
          joinDate: '2024-01-15',
          stocksPicked: 12,
          lastActive: '2024-01-20'
        },
        {
          id: '2',
          username: 'sarah_investor',
          email: 'sarah@example.com',
          subscription: 'free',
          joinDate: '2024-01-10',
          stocksPicked: 3,
          lastActive: '2024-01-19'
        },
        {
          id: '3',
          username: 'mike_stocks',
          email: 'mike@example.com',
          subscription: 'paid',
          joinDate: '2024-01-05',
          stocksPicked: 25,
          lastActive: '2024-01-20'
        },
        {
          id: '4',
          username: 'lisa_market',
          email: 'lisa@example.com',
          subscription: 'free',
          joinDate: '2024-01-12',
          stocksPicked: 2,
          lastActive: '2024-01-18'
        },
        {
          id: '5',
          username: 'david_portfolio',
          email: 'david@example.com',
          subscription: 'paid',
          joinDate: '2024-01-08',
          stocksPicked: 18,
          lastActive: '2024-01-20'
        }
      ];
      localStorage.setItem('adminUsers', JSON.stringify(dummyUsers));
      setUsers(dummyUsers);
    } else {
      setUsers(savedUsers);
    }
  }, []);

  const toggleSubscription = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newSubscription: 'free' | 'paid' = user.subscription === 'free' ? 'paid' : 'free';
        toast.success(`User subscription changed to ${newSubscription}`);
        return { ...user, subscription: newSubscription };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
  };

  const totalUsers = users.length;
  const paidUsers = users.filter(user => user.subscription === 'paid').length;
  const freeUsers = users.filter(user => user.subscription === 'free').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
            <User className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Paid Users</CardTitle>
            <Crown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{paidUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Free Users</CardTitle>
            <UserPlus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{freeUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">User</TableHead>
                <TableHead className="text-slate-300">Subscription</TableHead>
                <TableHead className="text-slate-300">Join Date</TableHead>
                <TableHead className="text-slate-300">Stocks Picked</TableHead>
                <TableHead className="text-slate-300">Last Active</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-slate-700">
                  <TableCell className="text-white">
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.subscription === 'paid' ? 'default' : 'secondary'}
                      className={user.subscription === 'paid' 
                        ? 'bg-yellow-600 text-white' 
                        : 'bg-slate-600 text-slate-300'
                      }
                    >
                      {user.subscription === 'paid' ? 'Premium' : 'Free'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{user.joinDate}</TableCell>
                  <TableCell className="text-slate-300">
                    {user.stocksPicked} / {user.subscription === 'paid' ? '∞' : '3'}
                  </TableCell>
                  <TableCell className="text-slate-300">{user.lastActive}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleSubscription(user.id)}
                      className={user.subscription === 'paid' 
                        ? 'bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white'
                        : 'bg-transparent border-green-600 text-green-400 hover:bg-green-600 hover:text-white'
                      }
                    >
                      {user.subscription === 'paid' ? 'Downgrade' : 'Upgrade'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
