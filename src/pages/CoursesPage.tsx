import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Mock data for courses
const FEATURED_COURSES = [
  {
    id: "1",
    title: "Advanced Swing Trading Masterclass",
    thumbnail: "https://source.unsplash.com/random/600x400/?trading",
    creator: {
      name: "TradingMaster",
      avatar: "https://i.pravatar.cc/150?img=1",
      isVerified: true
    },
    rating: 4.8,
    reviewCount: 1248,
    price: 4999
  },
  {
    id: "2",
    title: "Options Trading: From Beginner to Pro",
    thumbnail: "https://source.unsplash.com/random/600x400/?finance",
    creator: {
      name: "FinanceGuru",
      avatar: "https://i.pravatar.cc/150?img=2",
      isVerified: true
    },
    rating: 4.7,
    reviewCount: 856,
    price: 3499
  },
  {
    id: "3",
    title: "Technical Analysis Fundamentals",
    thumbnail: "https://source.unsplash.com/random/600x400/?stock",
    creator: {
      name: "StockPro",
      avatar: "https://i.pravatar.cc/150?img=3",
      isVerified: true
    },
    rating: 4.9,
    reviewCount: 2103,
    price: 2999
  }
];

const CATEGORIES = ["Trading", "Technical Analysis", "Fundamental Analysis", "Forex", "Options", "Strategies"];

const CoursesPage = () => {
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
        <h1 className="text-xl font-semibold">Courses</h1>
        <p className="text-sm text-muted-foreground">Verified educational content</p>
      </header>
      
      {/* Categories */}
      <ScrollArea className="pb-4">
        <div className="flex space-x-2 px-4 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <Button 
              key={category} 
              variant="outline" 
              className="whitespace-nowrap rounded-full"
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <Tabs defaultValue="featured" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="p-4">
          <div className="space-y-6">
            {FEATURED_COURSES.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  
                  <div className="flex items-center mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={course.creator.avatar} />
                      <AvatarFallback>{course.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center ml-2">
                      <span className="text-sm">{course.creator.name}</span>
                      {course.creator.isVerified && (
                        <CheckCircle className="ml-1 h-3 w-3 text-verified fill-verified" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm">{course.rating}</span>
                    </div>
                    <span className="mx-2 text-xs text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">{course.reviewCount} reviews</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-bold text-lg">₹{course.price}</div>
                    <Button>View Course</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
            <p>Coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
            <p>Coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <BottomNav />
    </div>
  );
};

export default CoursesPage;
