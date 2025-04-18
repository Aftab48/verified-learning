
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: For MVP we'll mock the login process
    // In a real implementation, this would connect to an authentication service
    setTimeout(() => {
      // Demo account for easy testing
      if (formData.email === "demo@verifiedlearn.com" && formData.password === "demo1234") {
        toast({
          title: "Login successful!",
          description: "Welcome back to VerifiedLearn",
        });
        localStorage.setItem("user", JSON.stringify({ name: "Demo User", email: formData.email }));
        localStorage.setItem("isAuthenticated", "true");
        navigate("/feed");
      } else {
        toast({
          title: "Login failed",
          description: "For demo, use demo@verifiedlearn.com / demo1234",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Access your VerifiedLearn account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email" 
              placeholder="Enter your email" 
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              name="password"
              type="password" 
              placeholder="Enter your password" 
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="text-right">
            <Button variant="link" className="h-auto p-0 text-sm">
              Forgot password?
            </Button>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary"
            onClick={() => navigate("/register")}
          >
            Register now
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
