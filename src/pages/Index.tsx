
import { useState } from 'react';
import { ArrowRight, Mail, CheckCircle, TrendingUp, BarChart3, Shield, Zap, Star, Target, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface IndexProps {
  user: string | null;
  onLogout: () => void;
}

const Index = ({ user, onLogout }: IndexProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const testimonials = [
    {
      name: "Michael Chen",
      title: "Day Trader",
      content: "BreakoutEdge's AI picks have consistently outperformed my manual selections. The scoring system is incredibly accurate.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      title: "Portfolio Manager", 
      content: "I've been using BreakoutEdge for 6 months. The weekly picks and performance tracking have been game-changing.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      title: "Investment Advisor",
      content: "The breakout predictions are spot-on. My clients have seen remarkable returns following these recommendations.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered Analysis", 
      description: "Advanced algorithms analyze market patterns, volume, and technical indicators to identify high-probability breakout stocks."
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Breakout Edge Score",
      description: "Each pick gets a proprietary 1-100 score based on breakout probability, helping you prioritize your investments."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Trader Verified",
      description: "Every AI recommendation is reviewed and verified by experienced professional traders before delivery."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Weekly Delivery",
      description: "Get 3-5 carefully selected breakout stock picks delivered to your inbox every Sunday morning."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "3 weekly stock picks",
        "Basic breakout scores",
        "Email delivery",
        "Performance tracking"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "PRO",
      price: "$29",
      period: "/month", 
      description: "For serious traders",
      features: [
        "Daily stock picks (5-7 per day)",
        "Advanced breakout analysis",
        "Real-time alerts",
        "Portfolio tracking",
        "Exit strategies",
        "Priority support"
      ],
      cta: "Start PRO Trial",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold">BreakoutEdge</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-blue-400 transition-colors">Reviews</a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-200">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={onLogout}
                  variant="ghost" 
                  className="text-slate-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-slate-300 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Background */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Wave Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
          
          {/* Animated Wave Effect */}
          <svg className="absolute bottom-0 left-0 w-full h-64 opacity-20" viewBox="0 0 1200 320" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <path 
              fill="url(#waveGradient)" 
              d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,234.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-pulse"
            />
          </svg>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/70"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
            Join 25,000+ Successful Traders
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Stock
            <span className="text-blue-400"> Breakout</span> Picks
            <br />
            Delivered Weekly
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto relative">
            Get 3-5 AI-generated and trader-verified breakout stock recommendations 
            every week. Each pick includes our proprietary Breakout Edge Score (1-100) 
            to help you make informed investment decisions.
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse rounded-lg"></div>
          </p>

          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Get Free Picks
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            <p className="text-sm text-slate-400 mt-2">
              Free weekly picks • No credit card required • Unsubscribe anytime
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>AI + Trader Verified</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>83% Win Rate</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>25,000+ Subscribers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Stock Background */}
      <section id="features" className="relative py-20 px-4 border-t border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-slate-900/90"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BreakoutEdge?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Our advanced AI technology combined with professional trader expertise 
              delivers consistent, profitable stock recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/80 border-slate-700 text-center backdrop-blur-sm hover:bg-slate-800/90 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Stats Showcase */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-400">83%</div>
              <div className="text-slate-300">Success Rate</div>
              <div className="text-sm text-slate-400">Of our breakout picks hit targets</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">25K+</div>
              <div className="text-slate-300">Active Traders</div>
              <div className="text-sm text-slate-400">Trust our AI recommendations</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">$2.1M</div>
              <div className="text-slate-300">Weekly Volume</div>
              <div className="text-sm text-slate-400">Traded based on our picks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-slate-300 text-lg">
              Start free, upgrade when you're ready for more advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`bg-slate-800 border-slate-700 relative ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                    <p className="text-slate-300">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands of Traders
            </h2>
            <p className="text-slate-300 text-lg">
              See what our community says about BreakoutEdge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-slate-400 text-sm">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Winning?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of traders who rely on BreakoutEdge for consistent, 
            profitable stock recommendations. Get started with our free weekly picks today.
          </p>
          
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold">BreakoutEdge</span>
              </div>
              <p className="text-slate-400">
                AI-powered stock recommendations for smarter trading decisions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><Link to="/pro-upgrade" className="hover:text-white">PRO Plan</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 BreakoutEdge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
