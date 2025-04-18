
import { useState, useRef, useEffect } from "react";
import VideoCard from "./VideoCard";
import { useSwipeable } from "react-swipeable";

// Mock data for our MVP
const MOCK_VIDEOS = [
  {
    id: "1",
    creatorName: "TradingMaster",
    creatorImage: "https://i.pravatar.cc/150?img=1",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-trader-working-on-his-laptop-18050-large.mp4",
    caption: "Learn the basics of swing trading in this 5-minute tutorial",
    isVerified: true,
    courseLink: "https://example.com/course/1",
    likes: 1248,
    dislikes: 24,
    comments: 89,
  },
  {
    id: "2",
    creatorName: "FinanceGuru",
    creatorImage: "https://i.pravatar.cc/150?img=2",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-book-and-taking-notes-4838-large.mp4",
    caption: "3 essential strategies for market analysis",
    isVerified: true,
    courseLink: "https://example.com/course/2",
    likes: 3421,
    dislikes: 121,
    comments: 213,
  },
  {
    id: "3",
    creatorName: "StockPro",
    creatorImage: "https://i.pravatar.cc/150?img=3",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-woman-using-her-laptop-while-enjoying-coffee-676-large.mp4",
    caption: "How to identify reliable trading patterns",
    isVerified: true,
    courseLink: "https://example.com/course/3",
    likes: 2765,
    dislikes: 85,
    comments: 178,
  },
  {
    id: "4",
    creatorName: "CryptoEducator",
    creatorImage: "https://i.pravatar.cc/150?img=4",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-man-working-with-a-laptop-15029-large.mp4",
    caption: "Understanding market cycles in cryptocurrency",
    isVerified: true,
    courseLink: "https://example.com/course/4",
    likes: 1859,
    dislikes: 43,
    comments: 126,
  },
  {
    id: "5",
    creatorName: "ForexExpert",
    creatorImage: "https://i.pravatar.cc/150?img=5",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-keyboard-with-an-animated-screen-9745-large.mp4",
    caption: "Risk management techniques for forex trading",
    isVerified: true,
    courseLink: "https://example.com/course/5",
    likes: 2143,
    dislikes: 57,
    comments: 145,
  },
];

const VideoFeed = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentVideoIndex < MOCK_VIDEOS.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else if (direction === 'down' && currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
        setCurrentVideoIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentVideoIndex < MOCK_VIDEOS.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    // Pause all videos except the current one
    const videos = document.querySelectorAll('video');
    videos.forEach((video, index) => {
      if (index === currentVideoIndex) {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        video.pause();
      }
    });
  }, [currentVideoIndex]);

  return (
    <div 
      ref={videoContainerRef}
      className="w-full video-feed-height overflow-hidden relative"
      {...handlers}
    >
      <div 
        className="w-full h-full transition-transform duration-300"
        style={{ transform: `translateY(-${currentVideoIndex * 100}%)` }}
      >
        {MOCK_VIDEOS.map((video, index) => (
          <div key={video.id} className="w-full h-full shrink-0">
            <VideoCard {...video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
