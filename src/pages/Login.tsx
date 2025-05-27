
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "company@example.com",
    password: "password123"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      toast({
        title: "Login Successful",
        description: "Welcome to ERPGO!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              <span className="text-black">ERP</span>
              <span className="text-primary">GO</span>
            </div>
            <p className="text-sm text-gray-500">Powered by WORKDO</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>

                <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-primary">
                  Forgot Your Password?
                </Link>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
                >
                  Login
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link to="/register" className="text-primary hover:underline">
                    Register
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500">
            Copyright ERPGO 2025
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 green-gradient items-center justify-center text-white p-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">"Attention is the new currency"</h2>
            <p className="text-xl">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
          </div>
          
          {/* Placeholder for illustration */}
          <div className="w-96 h-96 bg-white/10 rounded-lg flex items-center justify-center">
            <div className="text-6xl">👨‍💼</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
