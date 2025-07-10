
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Bell, Settings, LogOut, User, BarChart3, PieChart, Activity, DollarSign, ArrowUpRight, ArrowDownRight, Eye, Star, ShoppingCart, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import StockDetailModal from "@/components/StockDetailModal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  user: string | null;
  onLogout: () => void;
}

interface Stock {
  id: string;
  symbol: string;
  name: string;
  buyPrice: number;
  currentPrice: number;
  date: string;
  reason: string;
  breakoutScore: number;
  userPurchasePrice?: number;
  purchased?: boolean;
}

interface UserData {
  subscription: 'free' | 'paid';
  stocksPicked: number;
  purchasedStocks: string[];
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [userData, setUserData] = useState<UserData>({
    subscription: 'free',
    stocksPicked: 0,
    purchasedStocks: []
  });

  useEffect(() => {
    if (!user) return;
    
    // Load admin stocks
    const adminStocks = JSON.parse(localStorage.getItem('adminStocks') || '[]');
    
    // Load user data
    const savedUserData = JSON.parse(localStorage.getItem(`userData_${user}`) || '{}');
    const defaultUserData = {
      subscription: 'free',
      stocksPicked: 0,
      purchasedStocks: []
    };
    const currentUserData = { ...defaultUserData, ...savedUserData };
    
    // Load user purchased stocks
    const userPurchases = JSON.parse(localStorage.getItem(`userPurchases_${user}`) || '{}');
    
    // Merge admin stocks with user purchase data
    const stocksWithUserData = adminStocks.map((stock: Stock) => ({
      ...stock,
      purchased: currentUserData.purchasedStocks.includes(stock.id),
      userPurchasePrice: userPurchases[stock.id]?.purchasePrice || stock.currentPrice
    }));
    
    setStocks(stocksWithUserData);
    setUserData(currentUserData);
  }, [user]);

  const canPickMore = () => {
    if (userData.subscription === 'paid') return userData.stocksPicked < 5; // 5 stocks daily for paid users
    return userData.stocksPicked < 3; // 3 stocks per week for free users
  };

  const purchaseStock = (stock: Stock) => {
    if (!canPickMore()) {
      toast.error(userData.subscription === 'paid' 
        ? 'Daily limit reached! Come back tomorrow.' 
        : 'Weekly limit reached! Upgrade to Pro for daily picks.');
      return;
    }

    const updatedUserData = {
      ...userData,
      stocksPicked: userData.stocksPicked + 1,
      purchasedStocks: [...userData.purchasedStocks, stock.id]
    };

    const userPurchases = JSON.parse(localStorage.getItem(`userPurchases_${user}`) || '{}');
    userPurchases[stock.id] = {
      purchasePrice: stock.currentPrice,
      purchaseDate: new Date().toISOString().split('T')[0]
    };

    localStorage.setItem(`userData_${user}`, JSON.stringify(updatedUserData));
    localStorage.setItem(`userPurchases_${user}`, JSON.stringify(userPurchases));

    setUserData(updatedUserData);
    setStocks(stocks.map(s => 
      s.id === stock.id 
        ? { ...s, purchased: true, userPurchasePrice: stock.currentPrice }
        : s
    ));

    toast.success(`Successfully picked ${stock.symbol}!`);
  };

  const calculateUserReturn = (stock: Stock) => {
    if (!stock.purchased || !stock.userPurchasePrice) return 0;
    return ((stock.currentPrice - stock.userPurchasePrice) / stock.userPurchasePrice) * 100;
  };

  // Get purchased and unpurchased stocks
  const purchasedStocks = stocks.filter(s => s.purchased);
  const availableStocks = stocks.filter(s => !s.purchased);

  const filteredStocks = availableStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewStock = (stock: Stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  // Portfolio stats calculation
  const portfolioStats = {
    totalValue: purchasedStocks.reduce((sum, s) => sum + (s.userPurchasePrice || 0), 0).toFixed(2),
    dayChange: purchasedStocks.reduce((sum, s) => sum + calculateUserReturn(s), 0).toFixed(2),
    dayChangePercent: purchasedStocks.length > 0 
      ? (purchasedStocks.reduce((sum, s) => sum + calculateUserReturn(s), 0) / purchasedStocks.length).toFixed(2)
      : '0.00',
    winRate: purchasedStocks.length > 0 
      ? ((purchasedStocks.filter(s => calculateUserReturn(s) > 0).length / purchasedStocks.length) * 100).toFixed(1)
      : '0.0',
    totalTrades: purchasedStocks.length,
    activePicks: purchasedStocks.length
  };

  // Chart data for portfolio performance
  const performanceChartData = {
    labels: purchasedStocks.map(s => s.symbol),
    datasets: [
      {
        label: 'Your Return (%)',
        data: purchasedStocks.map(s => calculateUserReturn(s)),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for stock distribution
  const distributionData = {
    labels: ['Profitable', 'Loss', 'Break Even'],
    datasets: [
      {
        data: [
          purchasedStocks.filter(s => calculateUserReturn(s) > 0).length,
          purchasedStocks.filter(s => calculateUserReturn(s) < 0).length,
          purchasedStocks.filter(s => calculateUserReturn(s) === 0).length,
        ],
        backgroundColor: ['#22c55e', '#ef4444', '#6b7280'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white'
        }
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">BreakoutEdge</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-white font-medium">
                Dashboard
              </Link>
              <Link to="/portfolio" className="text-slate-300 hover:text-white transition-colors">
                Portfolio
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Badge 
                variant={userData.subscription === 'paid' ? 'default' : 'secondary'}
                className={userData.subscription === 'paid' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-slate-600 text-slate-300'
                }
              >
                <Crown className="h-3 w-3 mr-1" />
                {userData.subscription === 'paid' ? 'Pro' : 'Free'}
              </Badge>
              <Bell className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
              <Settings className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span>Welcome, {user}</span>
              </div>
              <Button 
                onClick={onLogout}
                variant="ghost" 
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Current Plan Section */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${userData.subscription === 'paid' ? 'bg-yellow-600' : 'bg-slate-600'}`}>
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {userData.subscription === 'paid' ? 'Pro Plan' : 'Free Plan'}
                  </h2>
                  <p className="text-slate-300">
                    {userData.subscription === 'paid' 
                      ? 'Pick up to 5 stocks daily' 
                      : 'Pick up to 3 stocks per week'
                    }
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Stocks picked: {userData.stocksPicked} / {userData.subscription === 'paid' ? '5' : '3'}
                  </p>
                </div>
              </div>
              {userData.subscription === 'free' && (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Upgrade for daily picks</p>
                    <p className="text-lg font-semibold text-white">5 stocks/day</p>
                  </div>
                  <Link to="/pro-upgrade">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Star className="h-4 w-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <BarChart3 className="mr-3 h-8 w-8 text-blue-500" />
            Trading Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Portfolio Value</p>
                    <p className="text-2xl font-bold">${portfolioStats.totalValue}</p>
                    <p className="text-green-400 text-sm">+{portfolioStats.dayChangePercent}%</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Picks</p>
                    <p className="text-xl font-bold">{portfolioStats.activePicks}</p>
                    <p className="text-slate-400 text-sm">Breakout stocks</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Win Rate</p>
                    <p className="text-2xl font-bold text-blue-400">{portfolioStats.winRate}%</p>
                    <p className="text-slate-400 text-sm">{portfolioStats.totalTrades} total trades</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Available Stocks</p>
                    <p className="text-2xl font-bold">{availableStocks.length}</p>
                    <p className="text-slate-400 text-sm">Ready to pick</p>
                  </div>
                  <PieChart className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        {purchasedStocks.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={performanceChartData} options={chartOptions} />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Doughnut data={distributionData} options={doughnutOptions} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* User Purchased Stocks Section */}
        {purchasedStocks.length > 0 && (
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Your Picked Stocks ({purchasedStocks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">STOCK</TableHead>
                    <TableHead className="text-slate-300">DATE PICKED</TableHead>
                    <TableHead className="text-slate-300">PURCHASE PRICE</TableHead>
                    <TableHead className="text-slate-300">CURRENT PRICE</TableHead>
                    <TableHead className="text-slate-300">YOUR RETURN</TableHead>
                    <TableHead className="text-slate-300">SCORE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchasedStocks.map((stock) => {
                    const userReturn = calculateUserReturn(stock);
                    return (
                      <TableRow key={stock.id} className="border-slate-700">
                        <TableCell className="text-white">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-slate-400">{stock.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">{stock.date}</TableCell>
                        <TableCell className="text-slate-300">${(stock.userPurchasePrice || 0).toFixed(2)}</TableCell>
                        <TableCell className="text-slate-300">${stock.currentPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className={userReturn >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {userReturn >= 0 ? '+' : ''}{userReturn.toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">{stock.breakoutScore}/100</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Admin-Created Stocks Section */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-yellow-400" />
              Available Breakout Picks ({filteredStocks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStocks.length > 0 ? (
              <div className="space-y-4">
                {filteredStocks.map((stock) => {
                  const adminReturn = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
                  return (
                    <div key={stock.id} className="border border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                        <div className="lg:col-span-3 flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-xs">{stock.symbol}</span>
                          </div>
                          <div>
                            <h3 className="font-bold">{stock.symbol}</h3>
                            <p className="text-slate-400 text-sm">{stock.name}</p>
                          </div>
                        </div>

                        <div className="lg:col-span-2">
                          <p className="text-lg font-bold">${stock.currentPrice.toFixed(2)}</p>
                          <div className={`flex items-center text-sm ${
                            adminReturn > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {adminReturn > 0 ? (
                              <ArrowUpRight className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 mr-1" />
                            )}
                            {adminReturn >= 0 ? '+' : ''}{adminReturn.toFixed(2)}%
                          </div>
                        </div>

                        <div className="lg:col-span-1">
                          <Badge className={`${
                            stock.breakoutScore >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            stock.breakoutScore >= 80 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {stock.breakoutScore}
                          </Badge>
                        </div>

                        <div className="lg:col-span-2">
                          <p className="text-slate-400 text-sm">Buy Price</p>
                          <p className="font-semibold">${stock.buyPrice.toFixed(2)}</p>
                        </div>

                        <div className="lg:col-span-2">
                          <p className="text-slate-400 text-sm">Date Added</p>
                          <p className="font-semibold">{stock.date}</p>
                        </div>

                        <div className="lg:col-span-2 flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                                onClick={() => setSelectedStock(stock)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-white">{selectedStock?.symbol} - {selectedStock?.name}</DialogTitle>
                              </DialogHeader>
                              {selectedStock && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-slate-400">Buy Price</p>
                                      <p className="text-2xl font-bold text-green-400">${selectedStock.buyPrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-400">Current Price</p>
                                      <p className="text-2xl font-bold text-white">${selectedStock.currentPrice.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Breakout Score</p>
                                    <p className="text-xl font-bold text-blue-400">{selectedStock.breakoutScore}/100</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Reason to Buy</p>
                                    <p className="text-slate-300">{selectedStock.reason}</p>
                                  </div>
                                  <Button
                                    onClick={() => purchaseStock(selectedStock)}
                                    disabled={!canPickMore()}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-slate-600"
                                  >
                                    {!canPickMore() ? 'Limit Reached' : 'Pick This Stock'}
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            onClick={() => purchaseStock(stock)}
                            disabled={!canPickMore()}
                            className="bg-green-600 hover:bg-green-700 text-white disabled:bg-slate-600"
                          >
                            {!canPickMore() ? 'Limit Reached' : 'Pick Stock'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No stocks available yet. Admin needs to add stocks first.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stock Detail Modal */}
      <StockDetailModal 
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
