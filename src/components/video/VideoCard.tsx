
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageSquare, Bookmark, MoreVertical, CheckCircle, ExternalLink, Flag, BookmarkCheck } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface VideoCardProps {
  id: string;
  creatorName: string;
  creatorImage?: string;
  videoSrc: string;
  caption: string;
  isVerified?: boolean;
  courseLink?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  onVideoEnter?: () => void;
}

const VideoCard = ({
  id,
  creatorName,
  creatorImage,
  videoSrc,
  caption,
  isVerified = true,
  courseLink = "#",
  likes = 0,
  dislikes = 0,
  comments = 0,
  onVideoEnter
}: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const { toast } = useToast();

  const handleVideoClick = () => {
    const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    if (onVideoEnter) onVideoEnter();
  };

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount(prev => prev - 1);
    }
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
    if (!disliked) {
      setDisliked(true);
      setDislikeCount(prev => prev + 1);
    } else {
      setDisliked(false);
      setDislikeCount(prev => prev - 1);
    }
  };

  const handleSaveVideo = () => {
    setBookmarked(true);
    toast({
      title: "Video saved",
      description: "This video has been added to your saved videos.",
    });
  };

  const handleSaveCourse = () => {
    toast({
      title: "Course saved",
      description: "This course has been added to your saved courses.",
    });
  };

  return (
    <Card className="h-full w-full border-0 bg-background rounded-none overflow-hidden">
      <CardContent className="p-0 relative h-full">
        <div 
          className="relative w-full h-full flex items-center justify-center"
          onClick={handleVideoClick}
        >
          <video
            id={`video-${id}`}
            src={videoSrc}
            className="w-full h-full object-cover"
            loop
            playsInline
            onPlay={handleVideoPlay}
            muted={true}
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex items-center mb-2">
            <Avatar className="h-10 w-10 mr-3 border-2 border-white">
              <AvatarImage src={creatorImage} />
              <AvatarFallback>{creatorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <p className="font-medium text-sm">{creatorName}</p>
                {isVerified && <CheckCircle className="h-4 w-4 ml-1 text-verified fill-verified" />}
              </div>
              <p className="text-xs text-gray-300">{caption}</p>
            </div>
          </div>
          
          <Button 
            variant="default" 
            className="w-full bg-action hover:bg-action/90 text-action-foreground mt-2"
            onClick={() => window.open(courseLink, '_blank')}
          >
            View Course <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <Button 
              size="icon" 
              variant={liked ? "default" : "secondary"} 
              className={`rounded-full ${liked ? 'bg-primary' : 'bg-black/50 backdrop-blur-md'}`}
              onClick={handleLike}
            >
              <ThumbsUp className={`h-5 w-5 ${liked ? 'fill-white' : ''}`} />
            </Button>
            <span className="text-xs text-white mt-1">{likeCount}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              size="icon" 
              variant={disliked ? "default" : "secondary"} 
              className={`rounded-full ${disliked ? 'bg-primary' : 'bg-black/50 backdrop-blur-md'}`}
              onClick={handleDislike}
            >
              <ThumbsDown className={`h-5 w-5 ${disliked ? 'fill-white' : ''}`} />
            </Button>
            <span className="text-xs text-white mt-1">{dislikeCount}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-black/50 backdrop-blur-md"
              onClick={() => {}}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <span className="text-xs text-white mt-1">{comments}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  variant={bookmarked ? "default" : "secondary"}
                  className={`rounded-full ${bookmarked ? 'bg-primary' : 'bg-black/50 backdrop-blur-md'}`}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-white' : ''}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 text-white border-white/20 backdrop-blur-lg">
                <DropdownMenuItem 
                  className="flex items-center cursor-pointer hover:bg-white/10"
                  onClick={handleSaveVideo}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Save video</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center cursor-pointer hover:bg-white/10"
                  onClick={handleSaveCourse}
                >
                  <BookmarkCheck className="mr-2 h-4 w-4" />
                  <span>Save related course</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-xs text-white mt-1">Save</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full bg-black/50 backdrop-blur-md"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 text-white border-white/20 backdrop-blur-lg">
              <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-white/10">
                <Flag className="mr-2 h-4 w-4" />
                <span>Report content</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
