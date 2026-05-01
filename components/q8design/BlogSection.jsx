import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

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
      <section className="py-6 md:py-12  bg-q8-primary-50">
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
    <section className="py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className=" mb-8">

          <div className="flex items-center gap-2 text-[var(--q8-primary-600)] text-sm font-bold uppercase mb-2">
            <h2 className="inline-flex items-center gap-1">
              Tin tức & Kiến thức
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </h2>
          </div>

          <p className="text-xl font-bold text-[var(--q8-cod-gray)] leading-tight tracking-tight">
            Tin tức công ty &
            <span className="text-[#c4a77d]">  Cảm hứng thiết kế </span>
          </p>
        </div>


        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-white overflow-hidden transition-all duration-500 transform hover:-translate-y-2"
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

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Post Content */}
              <div className="py-6 px-0">

                {/* Title */}
                <h3 className="text-xl font-bold text-q8-primary-900 mb-3 leading-tight group-hover:text-q8-primary-700 transition-colors line-clamp-2">
                  <Link href={`/bai-viet/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>


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
              className="btn-default inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c4a77d] to-[#a88963] hover:from-[#b99b71] hover:to-[#9f7f59] text-white font-semibold transition-colors"
          >
            Xem tất cả bài viết
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
