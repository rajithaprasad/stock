
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  buyPrice: number;
  currentPrice: number;
  date: string;
  reason: string;
  breakoutScore: number;
}

const AdminAddStock = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    buyPrice: '',
    currentPrice: '',
    date: '',
    reason: '',
    breakoutScore: ''
  });

  useEffect(() => {
    const savedStocks = JSON.parse(localStorage.getItem('adminStocks') || '[]');
    setStocks(savedStocks);
  }, []);

  const saveStocks = (updatedStocks: Stock[]) => {
    localStorage.setItem('adminStocks', JSON.stringify(updatedStocks));
    setStocks(updatedStocks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const stockData: Stock = {
      id: editingStock?.id || Date.now().toString(),
      symbol: formData.symbol.toUpperCase(),
      name: formData.name,
      buyPrice: parseFloat(formData.buyPrice),
      currentPrice: parseFloat(formData.currentPrice),
      date: formData.date,
      reason: formData.reason,
      breakoutScore: parseInt(formData.breakoutScore)
    };

    let updatedStocks;
    if (editingStock) {
      updatedStocks = stocks.map(stock => 
        stock.id === editingStock.id ? stockData : stock
      );
      toast.success('Stock updated successfully!');
    } else {
      updatedStocks = [...stocks, stockData];
      toast.success('Stock added successfully!');
    }

    saveStocks(updatedStocks);
    setIsModalOpen(false);
    setEditingStock(null);
    setFormData({
      symbol: '',
      name: '',
      buyPrice: '',
      currentPrice: '',
      date: '',
      reason: '',
      breakoutScore: ''
    });
  };

  const handleEdit = (stock: Stock) => {
    setEditingStock(stock);
    setFormData({
      symbol: stock.symbol,
      name: stock.name,
      buyPrice: stock.buyPrice.toString(),
      currentPrice: stock.currentPrice.toString(),
      date: stock.date,
      reason: stock.reason,
      breakoutScore: stock.breakoutScore.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = (stockId: string) => {
    const updatedStocks = stocks.filter(stock => stock.id !== stockId);
    saveStocks(updatedStocks);
    toast.success('Stock deleted successfully!');
  };

  const calculateReturn = (buyPrice: number, currentPrice: number) => {
    const returnPercent = ((currentPrice - buyPrice) / buyPrice) * 100;
    return returnPercent;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Stock Management</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Stock
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingStock ? 'Edit Stock' : 'Add New Stock'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="symbol" className="text-slate-300">Stock Symbol</Label>
                  <Input
                    id="symbol"
                    value={formData.symbol}
                    onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="e.g., AAPL"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-slate-300">Company Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="e.g., Apple Inc."
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buyPrice" className="text-slate-300">Buy Price ($)</Label>
                  <Input
                    id="buyPrice"
                    type="number"
                    step="0.01"
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({...formData, buyPrice: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currentPrice" className="text-slate-300">Current Price ($)</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    step="0.01"
                    value={formData.currentPrice}
                    onChange={(e) => setFormData({...formData, currentPrice: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-slate-300">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="breakoutScore" className="text-slate-300">Breakout Score (1-100)</Label>
                  <Input
                    id="breakoutScore"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.breakoutScore}
                    onChange={(e) => setFormData({...formData, breakoutScore: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="reason" className="text-slate-300">Reason to Buy</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Why should investors consider this stock?"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {editingStock ? 'Update Stock' : 'Add Stock'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Stocks Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {stocks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Stock</TableHead>
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Buy Price</TableHead>
                  <TableHead className="text-slate-300">Current Price</TableHead>
                  <TableHead className="text-slate-300">Return</TableHead>
                  <TableHead className="text-slate-300">Score</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.map((stock) => {
                  const returnPercent = calculateReturn(stock.buyPrice, stock.currentPrice);
                  return (
                    <TableRow key={stock.id} className="border-slate-700">
                      <TableCell className="text-white">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-slate-400">{stock.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{stock.date}</TableCell>
                      <TableCell className="text-slate-300">${stock.buyPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-slate-300">${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className={returnPercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-slate-300">{stock.breakoutScore}/100</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(stock)}
                            className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(stock.id)}
                            className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No stocks added yet. Click "Add New Stock" to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddStock;
