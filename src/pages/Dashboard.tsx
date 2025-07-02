import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";

const Dashboard = () => {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [monthlyBudget] = useState(30000);
  const [totalExpenses, setTotalExpenses] = useState(5000);
  
  // Split with Friends state
  const [splitExpense, setSplitExpense] = useState("");
  const [splitDescription, setSplitDescription] = useState("");
  const [friendsInput, setFriendsInput] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [splits, setSplits] = useState<Array<{
    id: string;
    description: string;
    totalAmount: number;
    friends: string[];
    amountPerPerson: number;
    dueDate: string;
    paid: Record<string, boolean>;
    reminderEnabled: boolean;
  }>>([]);
  
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

  const handleSplitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!splitExpense || !splitDescription || !friendsInput) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const friends = friendsInput.split(',').map(name => name.trim()).filter(name => name);
    if (friends.length === 0) {
      toast({
        title: "No Friends Added",
        description: "Please add at least one friend",
        variant: "destructive",
      });
      return;
    }

    const totalAmount = Number(splitExpense);
    const amountPerPerson = totalAmount / (friends.length + 1); // +1 for the user
    
    const newSplit = {
      id: Date.now().toString(),
      description: splitDescription,
      totalAmount,
      friends,
      amountPerPerson,
      dueDate,
      paid: Object.fromEntries(friends.map(friend => [friend, false])),
      reminderEnabled,
    };

    setSplits(prev => [...prev, newSplit]);
    
    toast({
      title: "Expense Split Created! 💸",
      description: `₹${totalAmount} split between ${friends.length + 1} people`,
    });

    // Reset form
    setSplitExpense("");
    setSplitDescription("");
    setFriendsInput("");
    setDueDate(new Date().toISOString().split('T')[0]);
    setReminderEnabled(false);
  };

  const togglePaymentStatus = (splitId: string, friendName: string) => {
    setSplits(prev => prev.map(split => 
      split.id === splitId 
        ? {
            ...split,
            paid: {
              ...split.paid,
              [friendName]: !split.paid[friendName]
            }
          }
        : split
    ));
    
    toast({
      title: "Payment Updated",
      description: `Marked ${friendName}'s payment as ${splits.find(s => s.id === splitId)?.paid[friendName] ? 'unpaid' : 'paid'}`,
    });
  };

  return (
    <div className="min-h-screen p-4 font-inter">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Broke2Boss</h1>
            <p className="text-muted-foreground">Master your money habits</p>
          </div>
          <Button
            onClick={() => navigate("/insights")}
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-white/30"
          >
            View Insights 📊
          </Button>
        </div>

        <Tabs defaultValue="expense-tracker" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="expense-tracker">💰 Expense Tracker</TabsTrigger>
            <TabsTrigger value="split-friends">💸 Split with Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="expense-tracker">
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
          </TabsContent>

          <TabsContent value="split-friends">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Split Form */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    💸 Split New Expense
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSplitExpense} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="split-description" className="flex items-center gap-2">
                        <span>📝</span> Description
                      </Label>
                      <Input
                        id="split-description"
                        placeholder="e.g., Trip to Goa, Dinner at restaurant"
                        value={splitDescription}
                        onChange={(e) => setSplitDescription(e.target.value)}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="split-amount" className="flex items-center gap-2">
                        <span>💰</span> Total Amount (₹)
                      </Label>
                      <Input
                        id="split-amount"
                        type="number"
                        placeholder="Enter total expense amount"
                        value={splitExpense}
                        onChange={(e) => setSplitExpense(e.target.value)}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="friends" className="flex items-center gap-2">
                        <span>👥</span> Friends (comma separated)
                      </Label>
                      <Input
                        id="friends"
                        placeholder="Riya, Aman, Priya"
                        value={friendsInput}
                        onChange={(e) => setFriendsInput(e.target.value)}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="due-date" className="flex items-center gap-2">
                        <span>📅</span> Due Date
                      </Label>
                      <Input
                        id="due-date"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="reminder"
                        checked={reminderEnabled}
                        onCheckedChange={setReminderEnabled}
                      />
                      <Label htmlFor="reminder" className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Remind me 1 day before due
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-gradient text-lg py-6 font-semibold"
                    >
                      Split Expense 💸
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Dues Summary */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    📊 Dues Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {splits.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="text-4xl mb-4">💸</div>
                      <p>No expenses split yet</p>
                      <p className="text-sm">Create your first split to see the summary</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {splits.map((split) => (
                        <Card key={split.id} className="border border-white/20 bg-white/5">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{split.description}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Total: ₹{split.totalAmount} • Due: {new Date(split.dueDate).toLocaleDateString()}
                                </p>
                              </div>
                              {split.reminderEnabled && (
                                <Bell className="w-4 h-4 text-accent" />
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {split.friends.map((friend) => (
                              <div key={friend} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                <div className="flex-1">
                                  <p className="text-sm font-medium">
                                    {friend} owes you ₹{split.amountPerPerson.toFixed(0)}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    for {split.description}
                                  </p>
                                </div>
                                <Button
                                  variant={split.paid[friend] ? "secondary" : "outline"}
                                  size="sm"
                                  onClick={() => togglePaymentStatus(split.id, friend)}
                                  className="ml-3"
                                >
                                  {split.paid[friend] ? "✅ Paid" : "💰 Mark Paid"}
                                </Button>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;