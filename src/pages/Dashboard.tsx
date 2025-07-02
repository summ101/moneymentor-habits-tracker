import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [monthlyBudget] = useState(30000);
  const [totalExpenses, setTotalExpenses] = useState(5000);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const budgetUsage = (totalExpenses / monthlyBudget) * 100;
  const remainingBudget = monthlyBudget - totalExpenses;

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (income) {
      setCurrentBalance(prev => prev + Number(income));
      toast({
        title: "Income Added! 💰",
        description: `Added ₹${income} to your balance`,
      });
    }
    
    if (expense) {
      setCurrentBalance(prev => prev - Number(expense));
      setTotalExpenses(prev => prev + Number(expense));
      toast({
        title: "Expense Recorded 📝",
        description: `₹${expense} spent on ${category || 'expense'}`,
      });
    }
    
    // Reset form
    setIncome("");
    setExpense("");
    setCategory("");
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen p-4 font-inter">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gradient">MoneyMentor</h1>
            <p className="text-muted-foreground">Track your financial journey</p>
          </div>
          <Button
            onClick={() => navigate("/insights")}
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-white/30"
          >
            View Insights 📊
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  💰 Current Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  ₹{currentBalance.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  🎯 Budget Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>₹{totalExpenses.toLocaleString()} / ₹{monthlyBudget.toLocaleString()}</span>
                </div>
                <Progress value={budgetUsage} className="h-3" />
                <div className="text-sm text-muted-foreground">
                  ₹{remainingBudget.toLocaleString()} remaining this month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Input Form */}
          <Card className="lg:col-span-2 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                ➕ Add New Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEntry} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="income" className="flex items-center gap-2">
                      <span>💵</span> Income (₹)
                    </Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter income amount"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="bg-white/50 backdrop-blur-sm border-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expense" className="flex items-center gap-2">
                      <span>💸</span> Expense (₹)
                    </Label>
                    <Input
                      id="expense"
                      type="number"
                      placeholder="Enter expense amount"
                      value={expense}
                      onChange={(e) => setExpense(e.target.value)}
                      className="bg-white/50 backdrop-blur-sm border-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <span>🛒</span> Category
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">🍕 Food</SelectItem>
                        <SelectItem value="travel">✈️ Travel</SelectItem>
                        <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                        <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                        <SelectItem value="bills">📄 Bills</SelectItem>
                        <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                        <SelectItem value="other">📦 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <span>📅</span> Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-white/50 backdrop-blur-sm border-white/30"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-success text-lg py-6 font-semibold"
                  disabled={!income && !expense}
                >
                  Add Entry ✨
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;