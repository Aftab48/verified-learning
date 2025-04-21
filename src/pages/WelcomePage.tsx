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
      <div className="w-full text-center flex flex-col items-center">
        <img src="/public/lovable-uploads/a16517d7-3abc-4a29-ba26-ad81823fbb6a.png" alt="Hard Knock Club Logo" style={{
        filter: "drop-shadow(0 2px 12px #9b87f555)"
      }} className="w-32 h-32 mx-auto mb-2 object-scale-down" />
        <div className="text-4xl font-bold mb-2 text-primary">VerifiedLearn</div>
        <div className="flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Verified Education</span>
        </div>
      </div>

      {/* Feature Illustration */}
      <div className="flex flex-col items-center justify-center w-full flex-grow py-8">
        <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden mb-8 bg-muted relative">
          <img src="/public/lovable-uploads/0a413cf5-f062-4890-ad15-8908615bb7a5.png" alt="Educational Courses by Verified Professionals" className="w-full h-full object-cover" />
          {/* Overlay for illustration */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-background/80" />
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center px-8"></div>
        </div>
      </div>

      {/* Action Buttons and Tagline */}
      <div className="w-full space-y-4 max-w-xs text-center">
        <p className="text-muted-foreground drop-shadow text-center text-sm mb-2">
          Access education from verified professionals with proven track records
        </p>
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