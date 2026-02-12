"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import SafeImage from "../common/SafeImage";
import Image from "next/image";
import Link from "next/link";
import { 
  FaArrowRight, 
  FaPlay, 
  FaCube, 
  FaFilter, 
  FaMapMarkerAlt,
  FaRuler,
  FaCog,
  FaSearch
} from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [displayProjects, setDisplayProjects] = useState([]);
  const projectsPerPage = 9;
  const filterBarRef = useRef(null);

  // Debounce search input to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch category counts separately (always fetch all, no filter) - for filter buttons
  const { 
    categoryCounts: apiCategoryCounts,
    completionCounts: apiCompletionCounts,
    pagination: countsPagination
  } = useProjects({
    featured: false,
    category: 'all', // Always fetch all for counts
    search: '', // No search for counts
    limit: 1, // Minimal limit, we only need counts
    page: 1,
    sort: 'createdAt',
    order: 'desc'
  });

  // Fetch featured projects using the same hook as ProjectsSection
  const { 
    projects: featuredProjects = [], 
    loading: featuredLoading, 
    error: featuredError 
  } = useProjects({
    featured: true,
    category: 'all', // Fetch all, filter client-side
    search: debouncedSearchTerm,
    limit: 100,
    page: 1,
    sort: 'createdAt',
    order: 'desc'
  });

  // Fetch all projects as fallback
  const { 
    projects: allProjectsFallback = [], 
    loading: fallbackLoading, 
    error: fallbackError,
    pagination: fallbackPagination
  } = useProjects({
    featured: false,
    category: 'all', // Fetch all, filter client-side
    search: debouncedSearchTerm,
    limit: 100,
    page: 1,
    sort: 'createdAt',
    order: 'desc'
  });

  // Keep legacy state update (no harm), but source for rendering will prefer full dataset
  useEffect(() => {
    if (!featuredLoading && featuredProjects.length > 0) {
      setDisplayProjects(featuredProjects);
    } 
    if (!fallbackLoading && allProjectsFallback.length > 0) {
      setDisplayProjects(allProjectsFallback);
    }
  }, [featuredProjects, allProjectsFallback, featuredLoading, fallbackLoading]);

  // Source for rendering: prefer full dataset from API over featured
  const projectsForView = useMemo(() => {
    if (!fallbackLoading && allProjectsFallback && allProjectsFallback.length > 0) {
      return allProjectsFallback;
    }
    return featuredProjects || [];
  }, [allProjectsFallback, featuredProjects, fallbackLoading]);

  const allProjects = projectsForView;
  const loading = featuredLoading || (featuredProjects.length === 0 && fallbackLoading);
  const error = featuredError || (featuredProjects.length === 0 && fallbackError);

  // Build counts from API response when available
  const countsFromApi = useMemo(() => {
    const mapCategoryCounts = {};
    if (apiCategoryCounts && Array.isArray(apiCategoryCounts)) {
      apiCategoryCounts.forEach(item => {
        if (item && item._id) {
          mapCategoryCounts[item._id] = item.count || 0;
        }
      });
    }
    const mapCompletionCounts = {};
    if (apiCompletionCounts && Array.isArray(apiCompletionCounts)) {
      apiCompletionCounts.forEach(item => {
        if (item && item._id) {
          mapCompletionCounts[item._id] = item.count || 0;
        }
      });
    }
    // Use countsPagination for total count (from the separate counts API call)
    const totalAll = countsPagination?.count ?? (allProjectsFallback?.length || 0);
    return { category: mapCategoryCounts, completion: mapCompletionCounts, totalAll };
  }, [apiCategoryCounts, apiCompletionCounts, countsPagination, allProjectsFallback]);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter(project =>
      project.category &&
      project.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, allProjects]);

  // Pagination logic (client-side since we fetch limit=100)
  // Use filteredProjects for pagination
  const projectsToPaginate = filteredProjects;
  const totalPages = Math.ceil(projectsToPaginate.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = projectsToPaginate.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, debouncedSearchTerm]);

  // Scroll to filter bar when page changes
  useEffect(() => {
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Create filter categories from API data
  const filterCategories = [
    { id: "all", name: "Tất cả dự án", count: countsFromApi.totalAll, color: "gray" },
    { id: "villa", name: "Biệt thự - vila", count: countsFromApi.category['villa'] || 0, color: "blue" },
    { id: "townhouse", name: "Nhà phố", count: countsFromApi.category['townhouse'] || 0, color: "purple" },
    { id: "apartment", name: "Căn hộ", count: countsFromApi.category['apartment'] || 0, color: "green" },
    { id: "commercial", name: "Văn phòng", count: countsFromApi.category['commercial'] || countsFromApi.category['office'] || 0, color: "orange" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner2.jpg"
            alt="Q8 Design Projects"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-2">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-q8-primary-900/30 to-q8-primary-600/30 backdrop-blur-sm rounded-full border border-q8-primary-600/40 text-q8-primary-100 font-bold shadow-lg">
              Portfolio của chúng tôi
            </span>
          </div>
          <h2 className="text-2xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-q8-primary-50 via-white to-q8-primary-100 bg-clip-text text-transparent">Kiệt tác</span> Kiến trúc & 
            Không gian sống
          </h2>
          <p className="text-xl text-q8-primary-50 max-w-3xl mx-auto leading-relaxed">
            Mỗi dự án tại Q8 Design là một hành trình sáng tạo, nơi chúng tôi biến ý tưởng của bạn 
            thành một không gian sống độc đáo. Khám phá các công trình đã hoàn thiện của chúng tôi.
          </p>
        </div>
      </section>


      {/* All Projects */}
      <section className="py-8 bg-q8-primary-50 relative">
        <div className="container mx-auto px-4">

          {/* Filter Bar */}
          <div ref={filterBarRef} className="bg-gradient-to-br from-white via-q8-primary-50 to-white rounded-2xl p-6 shadow-lg mb-12 border border-q8-primary-200/50">
            {/* Search Input */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-q8-primary-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm dự án..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-q8-primary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-q8-primary-900 focus:border-transparent transition-all"
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setCurrentPage(1); // Reset page immediately for instant feedback
                  }}
                  disabled={loading && activeFilter !== category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-q8-primary-900 to-q8-primary-700 text-white shadow-lg transform scale-105'
                      : 'bg-gradient-to-r from-q8-primary-100 to-q8-primary-200 text-q8-primary-600 hover:from-q8-primary-200 hover:to-q8-primary-300 hover:text-q8-primary-800 shadow-sm disabled:opacity-50 disabled:cursor-wait'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-q8-primary-900"></div>
              <p className="mt-4 text-q8-primary-600">Đang tải dự án...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && paginatedProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {paginatedProjects.map((project) => (
                <Link 
                  key={project.slug || project._id || project.id} 
                  href={`/du-an/${project.slug}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <SafeImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={false}
                      />
                    </div>

                    {/* Overlay - appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/80 transition-all duration-300"></div>

                    {/* Category Badge - top left */}
                    <div className="absolute top-4 left-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full text-sm font-medium shadow-lg">
                        {filterCategories.find(cat => cat.id === project.category)?.name || project.category}
                      </span>
                    </div>

                    {/* Center Content - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-center px-6 max-w-sm">
                        {/* Project Title */}
                        <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-2xl">
                          {project.title}
                        </h3>
                        
                        {/* Project Info */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-center text-white/90 text-sm space-x-4">
                            <span className="flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-q8-primary-400" />
                              {project.location}
                            </span>
                            <span className="flex items-center">
                              <FaRuler className="mr-2 text-q8-primary-400" />
                              {project.area}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3D Badge - top right */}
                    {project.has3D && (
                      <div className="absolute top-4 right-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <FaCube className="text-q8-primary-900 text-lg" />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Projects State */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Không có dự án nào được tìm thấy.</p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchTerm("");
                }}
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Xem tất cả dự án
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => {
                setCurrentPage(Math.max(1, currentPage - 1));
                if (filterBarRef.current) {
                  filterBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-sm font-medium text-q8-primary-500 bg-white border border-q8-primary-300 rounded-lg hover:bg-q8-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Trước
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current page
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        if (filterBarRef.current) {
                          filterBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-q8-primary-900 to-q8-primary-700 text-white shadow-lg transform scale-105'
                          : 'text-q8-primary-700 bg-gradient-to-r from-white to-q8-primary-50 border border-q8-primary-300 hover:from-q8-primary-50 hover:to-q8-primary-100 shadow-sm'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="px-2 text-q8-primary-500">...</span>;
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                setCurrentPage(Math.min(totalPages, currentPage + 1));
                if (filterBarRef.current) {
                  filterBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-sm font-medium text-q8-primary-500 bg-white border border-q8-primary-300 rounded-lg hover:bg-q8-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sau
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
    
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-br from-q8-primary-50 via-white to-q8-primary-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-q8-primary-900 via-q8-primary-700 to-q8-primary-900 bg-clip-text text-transparent mb-4">
            Bạn có dự án mới?
          </h2>
          <p className="text-xl text-q8-primary-600 mb-8 max-w-2xl mx-auto">
            Hãy để Q8 Design biến ý tưởng của bạn thành hiện thực. 
            Liên hệ ngay để được tư vấn miễn phí và báo giá chi tiết.
          </p>
          <div className="flex flex-row gap-2 sm:gap-4 justify-center flex-wrap">
            <Link 
              href="/lien-he" 
              className="inline-flex items-center px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-q8-primary-900 to-q8-primary-700 hover:from-q8-primary-700 hover:to-q8-primary-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Tư vấn miễn phí
              <FaArrowRight className="ml-2" />
            </Link>
            <Link 
              href="/dich-vu" 
              className="inline-flex items-center px-4 sm:px-8 py-3 sm:py-4 border-2 border-q8-primary-900 text-q8-primary-900 hover:bg-gradient-to-r hover:from-q8-primary-900 hover:to-q8-primary-700 hover:text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Xem dịch vụ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}