
import { CheckCircle, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-emerald-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Welcome to BreakoutEdge!</h1>
        <p className="text-xl text-slate-300 mb-8">
          You've successfully joined our weekly stock picks email list. 
          Your first breakout recommendations will arrive this Sunday.
        </p>

        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-emerald-400">
              <Mail className="w-5 h-5 mr-2" />
              What to Expect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Weekly Stock Picks</h3>
                <p className="text-slate-300 text-sm">3-5 carefully selected breakout stocks every Sunday</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Breakout Edge Score</h3>
                <p className="text-slate-300 text-sm">Our proprietary 1-100 scoring system for each pick</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Performance Tracking</h3>
                <p className="text-slate-300 text-sm">Weekly updates on how our previous picks are performing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-slate-300">
            Want even more? Upgrade to PRO for daily picks, detailed analysis, and exclusive market insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/portfolio">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                View Sample Portfolio
              </Button>
            </Link>
            <Link to="/pro-upgrade">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Upgrade to PRO <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-400">
            Didn't receive a confirmation email? Check your spam folder or 
            <a href="mailto:support@breakoutedge.com" className="text-emerald-400 hover:underline ml-1">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
