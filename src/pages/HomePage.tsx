import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import ProfileSidebar from "../components/feed/ProfileSidebar";
import CreatePost from "../components/feed/CreatePost";
import PostCard from "../components/feed/PostCard";
import NewsSidebar from "../components/feed/NewsSidebar";
import { usePost } from "../hooks/usePost";
import { Loader2 } from "lucide-react";

const HomePage: React.FC = () => {
  const { posts, loading, error, refreshFeed, likePost, deletePost, repostPost } = usePost();

  useEffect(() => {
    refreshFeed();
  }, [refreshFeed]);

  const demoPosts = [
    {
      id: "demo-1",
      author: {
        name: "Sarah Chen",
        title: "Creative Director at DesignStudio",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      content: "Extremely excited to announce our new Design System is finally live! 🎨 We've spent the last 6 months refining every token, component, and interaction to ensure a seamless professional experience. Check out the case study below.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563de4c?auto=format&fit=crop&q=80&w=1000",
      createdAt: "2h",
      likesCount: 1284,
      commentsCount: 142,
      repostsCount: 45,
      isLiked: false,
    },
    {
      id: "demo-2",
      author: {
        name: "Marcus Wright",
        title: "Chief Technology Officer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      },
      content: "Minimalism in enterprise software isn't just about \"less stuff.\" It's about reducing cognitive load to increase high-value output. Focus on signal, not noise. 🚀",
      createdAt: "5h",
      likesCount: 892,
      commentsCount: 34,
      repostsCount: 12,
      isLiked: false,
    },
  ];

  const displayPosts = posts.length > 0 ? posts : demoPosts;

  return (
    <div className="min-h-screen bg-[#f4f2ee] font-sans selection:bg-[#0a66c2]/20">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto pt-[72px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
          
          
          <div className="hidden lg:block lg:col-span-3">
            <ProfileSidebar />
          </div>

          
          <div className="col-span-1 lg:col-span-6">
            <CreatePost />
            
            <div className="flex flex-col">
              {loading && posts.length === 0 ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-10 h-10 text-[#0a66c2] animate-spin" />
                </div>
              ) : error && posts.length === 0 ? (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm mb-4">
                  {error}. Displaying demo content.
                </div>
              ) : null}

              <div className="space-y-3">
                {displayPosts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onLike={likePost}
                    onDelete={deletePost}
                    onRepost={repostPost}
                  />
                ))}
              </div>
            </div>
            
            <div className="py-8 text-center">
              <button 
                onClick={refreshFeed}
                className="px-6 py-1.5 bg-white border-2 border-[#0a66c2] text-[#0a66c2] rounded-full font-bold hover:bg-[#0a66c2]/5 transition-all text-[15px]"
              >
                Show more posts
              </button>
            </div>
          </div>

          
          <div className="hidden lg:block lg:col-span-3">
            <NewsSidebar />
          </div>

        </div>
      </main>
    </div>
  );
};

export default HomePage;