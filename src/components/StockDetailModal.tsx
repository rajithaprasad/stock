
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calendar, DollarSign, BarChart3, Target } from "lucide-react";

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

interface StockDetailModalProps {
  stock: Stock | null;
  isOpen: boolean;
  onClose: () => void;
}

const StockDetailModal = ({ stock, isOpen, onClose }: StockDetailModalProps) => {
  if (!stock) return null;

  const adminReturn = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm">{stock.symbol}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{stock.symbol}</h2>
              <p className="text-slate-400">{stock.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price and Performance */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Current Price</p>
                    <p className="text-2xl font-bold">${stock.currentPrice.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Change</p>
                    <div className={`flex items-center text-lg font-bold ${
                      adminReturn > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {adminReturn > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {adminReturn >= 0 ? '+' : ''}{adminReturn.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Breakout Score */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Breakout Edge Score</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-lg px-3 py-1 ${
                      stock.breakoutScore >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      stock.breakoutScore >= 80 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {stock.breakoutScore}/100
                    </Badge>
                    <span className="text-slate-300">
                      {stock.breakoutScore >= 90 ? 'Excellent' : stock.breakoutScore >= 80 ? 'Good' : 'Fair'}
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          {/* Buy Price */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Buy Price</p>
                  <p className="text-xl font-bold text-blue-400">${stock.buyPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Date Added</p>
                  <div className="flex items-center text-slate-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    {stock.date}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis */}
          <Card className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-blue-400">Analysis</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                {stock.reason}
              </p>
              <p className="text-slate-300 text-sm">
                This stock shows strong breakout potential with a {stock.breakoutScore}/100 score. 
                The {stock.breakoutScore >= 90 ? 'exceptional' : 'solid'} rating indicates 
                {stock.breakoutScore >= 90 ? ' exceptional' : ' good'} probability for continued upward momentum.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockDetailModal;
