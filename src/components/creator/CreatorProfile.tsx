
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  link: string;
}

interface CreatorProfileProps {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  isVerified: boolean;
  followers: number;
  coursesCount: number;
  featuredCourse?: Course;
  courses: Course[];
}

const CreatorProfile = ({ 
  id,
  name,
  avatar,
  bio,
  isVerified,
  followers,
  coursesCount,
  featuredCourse,
  courses 
}: CreatorProfileProps) => {
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent p-6 pt-10">
        <div className="flex items-center">
          <Avatar className="h-20 w-20 border-4 border-background">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">{name}</h2>
              {isVerified && (
                <CheckCircle className="ml-2 h-5 w-5 text-verified fill-verified" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{bio}</p>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div className="text-center">
            <p className="font-bold">{followers.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{coursesCount}</p>
            <p className="text-xs text-muted-foreground">Courses</p>
          </div>
          <div>
            <Button>Follow</Button>
          </div>
        </div>
      </div>

      {/* Featured Course */}
      {featuredCourse && (
        <div className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Featured Course</h3>
          <Card className="overflow-hidden">
            <div className="aspect-video w-full">
              <img 
                src={featuredCourse.thumbnail} 
                alt={featuredCourse.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-3">
              <h4 className="font-bold">{featuredCourse.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {featuredCourse.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <p className="font-bold text-primary">₹{featuredCourse.price.toLocaleString()}</p>
                <Button 
                  size="sm"
                  onClick={() => window.open(featuredCourse.link, '_blank')}
                >
                  View Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Courses */}
      <Tabs defaultValue="courses" className="px-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-bold text-sm">{course.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {course.description}
                  </p>
                  <div className="mt-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => window.open(course.link, '_blank')}
                    >
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos" className="mt-4">
          <div className="text-center py-10 text-muted-foreground">
            Videos coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorProfile;
