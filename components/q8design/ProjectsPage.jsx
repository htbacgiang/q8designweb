"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import SafeImage from "../common/SafeImage";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCube,
  FaMapMarkerAlt,
  FaRuler,
} from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";
import CTABannerSection from './CTABannerSection';
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

  // Helper: scroll to filter bar with offset for fixed header
  const scrollToFilterTop = () => {
    if (typeof window === 'undefined' || !filterBarRef.current) return;
    const headerOffset = 90; // ~80px nav + spacing
    const rect = filterBarRef.current.getBoundingClientRect();
    const top = rect.top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToFilterTop();
  };

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
      <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
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
          <h2 className="text-2xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-q8-primary-50 via-white to-q8-primary-100 bg-clip-text text-transparent">Kiệt tác</span> Kiến trúc &
            Không gian sống
          </h2>
          <p className="text-xl text-q8-primary-50 max-w-4xl mx-auto leading-relaxed">
            Mỗi dự án tại Q8 Design là một hành trình sáng tạo, nơi chúng tôi biến ý tưởng của bạn
            thành một không gian sống độc đáo. Khám phá các công trình đã hoàn thiện của chúng tôi.
          </p>
        </div>
      </section>


      {/* All Projects */}
      <section className="py-8 bg-q8-primary-50 relative">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div ref={filterBarRef} className="bg-gradient-to-br from-white via-q8-primary-50 to-white p-6 shadow-lg mb-12 border border-q8-primary-200/50">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setCurrentPage(1); // Reset page immediately for instant feedback
                    scrollToFilterTop();
                  }}
                  disabled={loading && activeFilter !== category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${activeFilter === category.id
                      ? 'bg-gradient-to-r from-[#c4a77d] to-[#a88963] text-white shadow-lg transform scale-105'
                      : 'bg-gradient-to-r from-[#f9f4ec] to-[#efe2cf] text-[#7a664b] hover:from-[#f3e7d6] hover:to-[#e8d7bf] hover:text-[#5c4b35] shadow-sm disabled:opacity-50 disabled:cursor-wait'
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
                  <div className="relative w-full aspect-[5/3] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
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
          <div className="flex flex-col items-center gap-6 mt-12 px-4 lg:px-12">
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white text-q8-primary-700 rounded-full border border-q8-primary-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-q8-primary-50 hover:text-q8-primary-900 hover:border-q8-primary-300 transition-colors font-medium flex items-center gap-2"
              >
                <FaArrowRight className="rotate-180 text-sm" />
                Trước
              </button>

              <div className="flex items-center gap-1">
                {(() => {
                  const pages = [];
                  const maxVisiblePages = 5;
                  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className="w-10 h-10 bg-white text-q8-primary-700 rounded-full border border-q8-primary-200 hover:bg-q8-primary-50 transition-colors font-medium flex items-center justify-center"
                      >
                        1
                      </button>
                    );

                    if (startPage > 2) {
                      pages.push(
                        <span key="start-ellipsis" className="px-2 text-q8-primary-400">...</span>
                      );
                    }
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`w-10 h-10 rounded-full font-medium transition-colors flex items-center justify-center ${i === currentPage
                            ? "bg-[#c4a77d] text-white shadow-lg"
                            : "bg-white text-q8-primary-700 border border-q8-primary-200 hover:bg-q8-primary-50"
                          }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="end-ellipsis" className="px-2 text-q8-primary-400">...</span>
                      );
                    }

                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className="w-10 h-10 bg-white text-q8-primary-700 rounded-full border border-q8-primary-200 hover:bg-q8-primary-50 transition-colors font-medium flex items-center justify-center"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white text-q8-primary-700 rounded-full border border-q8-primary-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-q8-primary-50 hover:text-q8-primary-900 hover:border-q8-primary-300 transition-colors font-medium flex items-center gap-2"
              >
                Sau
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          </div>
        )}

      </section>

      {/* CTA Section */}
      <CTABannerSection />
    </div>
  );
}
