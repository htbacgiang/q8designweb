import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FaCalendarAlt, FaUser, FaArrowRight, FaClock } from "react-icons/fa";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/posts?includeDrafts=false');
        
        if (response.data && response.data.posts) {
          // Take first 3 posts for homepage
          setBlogPosts(response.data.posts.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  // Use all blog posts (already limited to 3)
  const featuredPosts = blogPosts;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-q8-primary-900"></div>
            <span className="ml-3 text-q8-primary-600">Đang tải bài viết...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-q8-primary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-q8-primary-100 text-q8-primary-700 rounded-full text-sm font-medium uppercase tracking-wider">
              Tin tức & Kiến thức
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl  font-bold text-q8-primary-900 mb-6">
            Blog & Cảm hứng thiết kế
          </h2>
    
        </div>


        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map((post, index) => (
            <article 
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Post Image */}
              <div className="relative h-64 overflow-hidden">
                {post.thumbnail ? (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">📝</span>
                  </div>
                )}
                
                {/* Category Badge */}
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-q8-primary-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                )}

                {/* Featured Badge - First 3 are featured */}
                <div className="absolute top-4 right-4">
                  <span className="bg-q8-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Nổi bật
                  </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-q8-primary-100 text-q8-primary-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-q8-primary-900 mb-3 leading-tight group-hover:text-q8-primary-700 transition-colors line-clamp-2">
                  <Link href={`/bai-viet/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-q8-primary-600 leading-relaxed mb-4 line-clamp-3">
                  {post.meta || "Không có mô tả"}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-q8-primary-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaUser className="mr-1" />
                      <span>Q8 Design Team</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>

                {/* Read More */}
                <Link 
                  href={`/bai-viet/${post.slug}`}
                  className="inline-flex items-center text-q8-primary-700 hover:text-q8-primary-900 font-medium transition-colors group/link"
                >
                  Đọc thêm
                  <FaArrowRight className="ml-2 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link 
            href="/bai-viet"
            className="inline-flex items-center px-8 py-4 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-colors duration-300 group"
          >
            Xem tất cả bài viết
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
