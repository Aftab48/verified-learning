
// Only the relevant section changes; rest stays the same.

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
          <span className="text-sm text-muted-foreground">Verified Education</span>
        </div>
      </div>

      {/* Feature Illustration */}
      <div className="flex flex-col items-center justify-center w-full flex-grow py-8">
        <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden mb-8 bg-muted relative">
          <img
            src="/public/lovable-uploads/0a413cf5-f062-4890-ad15-8908615bb7a5.png"
            alt="Educational Courses by Verified Professionals"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-background/80" />
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center px-8">
            <h1 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
              Learn from
              <br />
              Verified Experts
            </h1>
          </div>
        </div>
      </div>

      {/* Action Buttons and Moved Text */}
      <div className="w-full space-y-4 max-w-xs text-center">
        <p className="text-muted-foreground drop-shadow text-center text-sm">
          Access education from verified professionals with proven track records
        </p>
        <Button className="w-full py-6" onClick={() => navigate("/register")}>
          Create Account
        </Button>
        <Button variant="outline" className="w-full py-6" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;

