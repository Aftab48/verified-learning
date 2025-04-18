
import { Home, Search, User, Plus, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center z-50">
      <div className="w-full max-w-md mx-auto flex justify-between px-6">
        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center justify-center h-14 w-12 rounded-none ${
            currentPath === "/feed" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => navigate("/feed")}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center justify-center h-14 w-12 rounded-none ${
            currentPath === "/discover" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => navigate("/discover")}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Discover</span>
        </Button>

        <Button
          variant="default"
          size="icon"
          className="flex flex-col items-center justify-center h-14 w-12 bg-primary text-primary-foreground rounded-full"
          onClick={() => navigate("/courses")}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">Courses</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center justify-center h-14 w-12 rounded-none ${
            currentPath === "/saved" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => navigate("/saved")}
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">Saved</span>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center justify-center h-14 w-12 rounded-none ${
            currentPath === "/profile" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => navigate("/profile")}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNav;
