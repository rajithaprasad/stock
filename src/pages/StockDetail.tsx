
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TrendingUp, ArrowLeft, LogOut, User, ArrowUpRight, ArrowDownRight, Calendar, DollarSign, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockDetailProps {
  user: string;
  onLogout: () => void;
}

const StockDetail = ({ user, onLogout }: StockDetailProps) => {
  const { symbol } = useParams();
  
  // Mock data - in real app this would come from API
  const stockData = {
    symbol: symbol?.toUpperCase() || "AAPL",
    name: "Apple Inc.",
    price: 178.25,
    change: 4.32,
    changePercent: 2.48,
    breakoutScore: 87,
    volume: 52483921,
    marketCap: "2.84T",
    peRatio: 28.4,
    dividend: 0.96,
    week52High: 198.23,
    week52Low: 124.17
  };

  const analysis = {
    recommendation: "STRONG BUY",
    targetPrice: 195.00,
    stopLoss: 165.00,
    reasoning: "Strong breakout pattern with high volume confirmation. RSI shows momentum without overbought conditions. Institutional buying detected.",
    keyLevels: {
      resistance: [185.50, 192.30, 198.20],
      support: [172.40, 168.20, 162.90]
    }
  };

  const news = [
    {
      title: "Apple Reports Strong Q4 Earnings Beat",
      summary: "Apple exceeded analyst expectations with robust iPhone sales and services growth.",
      time: "2 hours ago",
      sentiment: "positive"
    },
    {
      title: "New iPhone Launch Drives Pre-Order Surge",
      summary: "Latest iPhone model sees record pre-orders in first 24 hours.",
      time: "1 day ago", 
      sentiment: "positive"
    },
    {
      title: "Supply Chain Concerns Ease for Tech Giant",
      summary: "Apple successfully navigates global supply chain challenges.",
      time: "3 days ago",
      sentiment: "neutral"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold">BreakoutEdge</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
            <Link to="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <User className="w-4 h-4 mr-2" />
              {user}
            </Button>
            <Button 
              onClick={onLogout}
              variant="ghost" 
              className="text-slate-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/portfolio" className="inline-flex items-center text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Stock Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{stockData.symbol}</h1>
              <p className="text-slate-400">{stockData.name}</p>
            </div>
            <Badge 
              className={`
                ${stockData.breakoutScore >= 90 ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                ${stockData.breakoutScore >= 80 && stockData.breakoutScore < 90 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                ${stockData.breakoutScore < 80 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
              `}
            >
              Breakout Score: {stockData.breakoutScore}
            </Badge>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-4xl font-bold">${stockData.price.toFixed(2)}</div>
            <div className={`flex items-center text-lg ${stockData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stockData.change >= 0 ? <ArrowUpRight className="w-5 h-5 mr-1" /> : <ArrowDownRight className="w-5 h-5 mr-1" />}
              {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%)
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Volume</div>
              <div className="text-lg font-bold">{stockData.volume.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Market Cap</div>
              <div className="text-lg font-bold">{stockData.marketCap}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">P/E Ratio</div>
              <div className="text-lg font-bold">{stockData.peRatio}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Dividend</div>
              <div className="text-lg font-bold">${stockData.dividend}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">52W High</div>
              <div className="text-lg font-bold">${stockData.week52High}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">52W Low</div>
              <div className="text-lg font-bold">${stockData.week52Low}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="levels">Key Levels</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>BreakoutEdge Analysis</span>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    {analysis.recommendation}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Target Price</div>
                    <div className="text-2xl font-bold text-green-400">${analysis.targetPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Stop Loss</div>
                    <div className="text-2xl font-bold text-red-400">${analysis.stopLoss.toFixed(2)}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Analysis</div>
                  <p className="text-slate-300">{analysis.reasoning}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="levels" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-red-400">Resistance Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.keyLevels.resistance.map((level, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0">
                        <span className="text-slate-400">R{index + 1}</span>
                        <span className="font-bold">${level.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Support Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.keyLevels.support.map((level, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0">
                        <span className="text-slate-400">S{index + 1}</span>
                        <span className="font-bold">${level.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            {news.map((item, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <Badge 
                      className={`
                        ${item.sentiment === 'positive' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                        ${item.sentiment === 'negative' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                        ${item.sentiment === 'neutral' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : ''}
                      `}
                    >
                      {item.sentiment}
                    </Badge>
                  </div>
                  <p className="text-slate-300 mb-2">{item.summary}</p>
                  <div className="text-sm text-slate-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StockDetail;
