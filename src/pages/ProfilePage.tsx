
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, Heart, BookmarkCheck, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreatorApplicationForm from "@/components/creator/CreatorApplicationForm";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreatorFormOpen, setIsCreatorFormOpen] = useState(false);
  
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      navigate("/");
    } else {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleApplyAsCreator = () => {
    setIsCreatorFormOpen(true);
  };

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="flex items-center justify-between p-4 bg-background">
        <h1 className="text-xl font-semibold">Profile</h1>
        <div className="flex">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleApplyAsCreator}
          >
            <UserPlus className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {}}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="p-4">
        <div className="flex items-center">
          <Avatar className="h-16 w-16">
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="saved" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="p-4">
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <BookmarkCheck className="h-12 w-12 mb-4" />
            <p>Your saved videos will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="p-4">
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Heart className="h-12 w-12 mb-4" />
            <p>Your courses will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <CreatorApplicationForm 
        isOpen={isCreatorFormOpen}
        onClose={() => setIsCreatorFormOpen(false)}
      />
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
