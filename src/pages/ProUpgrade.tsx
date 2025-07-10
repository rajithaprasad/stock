import { useState } from 'react';
import { Check, Star, Zap, TrendingUp, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProUpgrade = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgrade = (plan: string) => {
    // Get current user from localStorage
    const currentUser = localStorage.getItem('breakoutEdgeUser');
    
    if (currentUser) {
      // Update user's subscription status to paid
      const userData = JSON.parse(localStorage.getItem(`userData_${currentUser}`) || '{}');
      const updatedUserData = {
        ...userData,
        subscription: 'paid',
        stocksPicked: 0, // Reset daily limit
        purchasedStocks: userData.purchasedStocks || []
      };
      
      localStorage.setItem(`userData_${currentUser}`, JSON.stringify(updatedUserData));
      
      toast({
        title: "Welcome to Pro! 🎉",
        description: `Successfully upgraded to ${plan} plan. You now have access to daily stock picks!`,
      });
      
      // Redirect to portfolio to see the changes
      setTimeout(() => {
        navigate('/portfolio');
      }, 2000);
    } else {
      toast({
        title: "Please log in first",
        description: "You need to be logged in to upgrade your plan.",
      });
      navigate('/login');
    }
    
    console.log(`Upgrading to ${plan} plan`);
  };

  const features = {
    free: [
      "3-5 weekly stock picks",
      "Basic breakout scores", 
      "Email delivery",
      "Performance tracking"
    ],
    pro: [
      "Daily breakout alerts",
      "Advanced AI analysis",
      "Detailed stock reports",
      "Risk assessment scores",
      "Entry/exit strategies",
      "Discord community access",
      "Portfolio optimization",
      "Mobile app access",
      "Priority email support"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">BreakoutEdge</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            PRO Features
          </Badge>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Supercharge Your 
            <span className="text-emerald-400"> Investment Strategy</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Get daily breakout alerts, advanced AI analysis, and exclusive access to our 
            professional trading community. Join the top 1% of investors.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800 p-1 rounded-lg flex">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedPlan === 'monthly' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-2 rounded-md transition-all relative ${
                selectedPlan === 'yearly' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs px-1.5 py-0.5">
                Save 30%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
                  <p className="text-slate-400 mt-2">Perfect for getting started</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">$0</div>
                  <div className="text-slate-400 text-sm">forever</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  Current Plan
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-500/50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-emerald-500 text-white px-4 py-1">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </Badge>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    PRO Plan
                    <Crown className="w-6 h-6 text-amber-400 ml-2" />
                  </CardTitle>
                  <p className="text-slate-400 mt-2">For serious investors</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    ${selectedPlan === 'monthly' ? '49' : '34'}
                  </div>
                  <div className="text-slate-400 text-sm">
                    per {selectedPlan === 'monthly' ? 'month' : 'month (billed yearly)'}
                  </div>
                  {selectedPlan === 'yearly' && (
                    <div className="text-emerald-400 text-xs font-medium">
                      Save $180/year
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleUpgrade(selectedPlan)}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Upgrade to PRO
              </Button>
              <p className="text-xs text-slate-400 text-center mt-3">
                Cancel anytime • 30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Value Propositions */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why PRO Members Outperform</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Daily Opportunities</h3>
              <p className="text-slate-300">
                Don't wait for weekly picks. Get real-time breakout alerts as they happen, 
                giving you first-mover advantage in the market.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Management</h3>
              <p className="text-slate-300">
                Advanced risk assessment scores and clear entry/exit strategies 
                help you maximize gains while minimizing losses.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Access</h3>
              <p className="text-slate-300">
                Join our exclusive Discord community of successful traders. 
                Share insights, ask questions, and learn from the best.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-20 bg-slate-800/50 rounded-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-2xl mb-4">⭐⭐⭐⭐⭐</div>
            <blockquote className="text-xl text-slate-300 mb-6 italic">
              "Since upgrading to PRO, my portfolio has grown 47% in just 6 months. 
              The daily alerts and risk management features are game-changers."
            </blockquote>
            <div className="text-emerald-400 font-semibold">Sarah M., PRO Member</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProUpgrade;
