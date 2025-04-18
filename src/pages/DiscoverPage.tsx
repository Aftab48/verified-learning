
import BottomNav from "@/components/layout/BottomNav";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Mock data
const POPULAR_CREATORS = [
  {
    id: "1",
    name: "TradingMaster",
    avatar: "https://i.pravatar.cc/150?img=1",
    followers: 125000,
    isVerified: true
  },
  {
    id: "2",
    name: "FinanceGuru",
    avatar: "https://i.pravatar.cc/150?img=2",
    followers: 98000,
    isVerified: true
  },
  {
    id: "3",
    name: "StockPro",
    avatar: "https://i.pravatar.cc/150?img=3",
    followers: 78000,
    isVerified: true
  },
  {
    id: "4",
    name: "CryptoEducator",
    avatar: "https://i.pravatar.cc/150?img=4",
    followers: 210000,
    isVerified: true
  },
];

const TRENDING_VIDEOS = [
  {
    id: "1",
    thumbnail: "https://source.unsplash.com/random/300x150/?trading",
    title: "3 Essential Trading Patterns",
    creator: "TradingMaster",
    views: 125000
  },
  {
    id: "2",
    thumbnail: "https://source.unsplash.com/random/300x150/?finance",
    title: "Market Volatility Explained",
    creator: "FinanceGuru",
    views: 98000
  },
  {
    id: "3",
    thumbnail: "https://source.unsplash.com/random/300x150/?stock",
    title: "Risk Management Tutorial",
    creator: "StockPro",
    views: 78000
  },
  {
    id: "4",
    thumbnail: "https://source.unsplash.com/random/300x150/?crypto",
    title: "Bitcoin Price Analysis",
    creator: "CryptoEducator",
    views: 210000
  },
];

const DiscoverPage = () => {
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
        <h1 className="text-xl font-semibold mb-4">Discover</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search creators or topics" className="pl-9" />
        </div>
      </header>
      
      <Tabs defaultValue="creators" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creators" className="p-4">
          <h2 className="text-lg font-medium mb-3">Popular Verified Creators</h2>
          <div className="space-y-4">
            {POPULAR_CREATORS.map((creator) => (
              <Card key={creator.id} className="overflow-hidden">
                <CardContent className="p-3 flex items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{creator.name}</span>
                      {creator.isVerified && (
                        <CheckCircle className="ml-1 h-3 w-3 text-verified fill-verified" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(creator.followers / 1000).toFixed(0)}K followers
                    </p>
                  </div>
                  
                  <Button size="sm" variant="outline">Follow</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="p-4">
          <h2 className="text-lg font-medium mb-3">Trending Videos</h2>
          <div className="grid grid-cols-2 gap-3">
            {TRENDING_VIDEOS.map((video) => (
              <div key={video.id} className="overflow-hidden rounded-lg border">
                <div className="aspect-video w-full relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-sm line-clamp-1">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{video.creator}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {(video.views / 1000).toFixed(0)}K views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <BottomNav />
    </div>
  );
};

export default DiscoverPage;
