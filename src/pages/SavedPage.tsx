
import BottomNav from "@/components/layout/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkCheck, BookmarkX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SavedPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      navigate("/");
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="p-4 bg-background">
        <h1 className="text-xl font-semibold">Saved Content</h1>
      </header>
      
      <Tabs defaultValue="videos" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="p-4">
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <BookmarkCheck className="h-12 w-12 mb-4" />
            <p className="text-center max-w-xs">
              Your saved videos will appear here. Save videos to watch them later.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="p-4">
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <BookmarkX className="h-12 w-12 mb-4" />
            <p className="text-center max-w-xs">
              No saved courses yet. Bookmark courses that interest you for later.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <BottomNav />
    </div>
  );
};

export default SavedPage;
