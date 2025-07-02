import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Insights = () => {
  const navigate = useNavigate();

  // Sample data for charts
  const expenseData = [
    { date: '1', amount: 1200 },
    { date: '5', amount: 800 },
    { date: '10', amount: 1500 },
    { date: '15', amount: 900 },
    { date: '20', amount: 1800 },
    { date: '25', amount: 1100 },
    { date: '30', amount: 1400 },
  ];

  const categoryData = [
    { name: 'Food', amount: 4500, emoji: '🍕' },
    { name: 'Travel', amount: 2300, emoji: '✈️' },
    { name: 'Shopping', amount: 1800, emoji: '🛍️' },
    { name: 'Bills', amount: 3200, emoji: '📄' },
    { name: 'Entertainment', amount: 1200, emoji: '🎬' },
  ];

  // Habit tracking data
  const habitStreaks = [
    { habit: "No impulse buying", streak: 7, target: 30, emoji: "🛡️" },
    { habit: "Daily expense logging", streak: 15, target: 30, emoji: "📝" },
    { habit: "Budget review", streak: 3, target: 7, emoji: "📊" },
  ];

  // Challenges
  const challenges = [
    { 
      title: "Save ₹500 in 7 days", 
      progress: 60, 
      current: 300, 
      target: 500,
      emoji: "💰",
      daysLeft: 4
    },
    { 
      title: "No dining out for 5 days", 
      progress: 80, 
      current: 4, 
      target: 5,
      emoji: "🍽️",
      daysLeft: 1
    }
  ];

  return (
    <div className="min-h-screen p-4 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Insights & Progress</h1>
            <p className="text-muted-foreground">Track your financial habits and achievements</p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-white/30"
          >
            ← Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Expense Chart */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 Monthly Expense Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="amount" fill="hsl(var(--secondary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Habit Tracker */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏆 Habit Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {habitStreaks.map((habit, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habit.emoji}</span>
                    <div>
                      <h3 className="font-semibold">{habit.habit}</h3>
                      <p className="text-sm text-muted-foreground">
                        {habit.streak}/{habit.target} days
                      </p>
                    </div>
                  </div>
                  <Progress value={(habit.streak / habit.target) * 100} className="h-2" />
                  <div className="text-sm font-medium text-primary">
                    🔥 {habit.streak} day streak!
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <Card key={index} className="glass-card relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="text-3xl animate-bounce">{challenge.emoji}</span>
                  <div>
                    <div className="font-semibold">{challenge.title}</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {challenge.progress >= 100 ? "🎉 Goal completed!" : 
                       challenge.progress >= 80 ? `You're ${challenge.progress}% there! 💪` :
                       `🔥 ${challenge.daysLeft} days left to hit your goal!`}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Target Amount</span>
                    <span className="text-lg font-bold text-primary">₹{challenge.target}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Amount</span>
                    <span className="text-lg font-semibold text-secondary">₹{challenge.current}</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={challenge.progress} 
                      className="h-4 bg-muted/30 overflow-hidden rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-pulse opacity-50"></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      {challenge.daysLeft} days remaining
                    </span>
                    <span className="font-bold text-accent">
                      {challenge.progress}%
                    </span>
                  </div>
                </div>
                
                {challenge.progress >= 100 && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 blur-lg"></div>
                    <div className="relative bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-4 text-center border border-secondary/20 backdrop-blur-sm">
                      <div className="text-2xl mb-2 animate-bounce">🏅</div>
                      <span className="text-secondary font-bold text-lg">
                        Badge Unlocked!
                      </span>
                      <div className="text-sm text-muted-foreground mt-1">
                        Challenge Master
                      </div>
                    </div>
                  </div>
                )}
                
                {challenge.progress < 100 && challenge.progress >= 80 && (
                  <div className="bg-accent/10 rounded-lg p-3 text-center border border-accent/20">
                    <span className="text-accent font-semibold">
                      🚀 Almost there! Keep pushing!
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;