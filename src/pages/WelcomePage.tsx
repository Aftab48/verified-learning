
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/feed");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-4 pt-12 pb-20">
      {/* Logo and Branding */}
      <div className="w-full text-center">
        <div className="text-4xl font-bold mb-2 text-primary">VerifiedLearn</div>
        <div className="flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Verified Trading Education</span>
        </div>
      </div>

      {/* Feature Illustration */}
      <div className="flex flex-col items-center justify-center w-full flex-grow py-8">
        <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden mb-8 bg-muted relative">
          {/* Hero image showing the app in use */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1404&q=80" 
            alt="Trading Education" 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay text */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <h1 className="text-2xl font-bold mb-4">Learn from<br />Verified Experts</h1>
            <p className="text-sm px-8 text-center text-muted-foreground">
              Access trading education from verified professionals with proven track records
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-4 max-w-xs">
        <Button 
          className="w-full py-6"
          onClick={() => navigate("/register")}
        >
          Create Account
        </Button>
        <Button 
          variant="outline" 
          className="w-full py-6"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
