import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, validate credentials
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/20 animate-float"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-secondary/20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent/20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <Card className="w-full max-w-md glass-card relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-gradient mb-2">MoneyMentor</h1>
            <p className="text-muted-foreground text-lg">Master your money habits</p>
          </div>
          <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your financial journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <span>📧</span> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50 backdrop-blur-sm border-white/30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <span>🔒</span> Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50 backdrop-blur-sm border-white/30"
                required
              />
            </div>
            <Button type="submit" className="w-full btn-gradient text-lg py-6 font-semibold">
              Sign In ✨
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </p>
            <button className="text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;