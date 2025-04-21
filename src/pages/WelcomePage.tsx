
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
  return <div className="min-h-screen bg-background flex flex-col items-center justify-between p-4 pt-12 pb-20">
      {/* Logo and Branding */}
      <div className="w-full text-center">
        <div className="text-4xl font-bold mb-2 text-primary">VerifiedLearn</div>
        <div className="flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Verified Education</span>
        </div>
      </div>

      {/* Feature Illustration */}
      <div className="flex flex-col items-center justify-center w-full flex-grow py-8">
        <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden mb-8 bg-muted relative">
          {/* Hero image showing the app in use */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
          <img
            src="/public/lovable-uploads/0a413cf5-f062-4890-ad15-8908615bb7a5.png"
            alt="Educational Courses by Verified Professionals"
            className="w-full h-full object-cover"
          />

          {/* Overlay text - REMOVED because image already has branded text */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-4 max-w-xs">
        <Button className="w-full py-6" onClick={() => navigate("/register")}>
          Create Account
        </Button>
        <Button variant="outline" className="w-full py-6" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>;
};
export default WelcomePage;
