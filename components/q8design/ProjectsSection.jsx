"use client";
import { useState, useMemo, useEffect } from "react";
import SafeImage from "../common/SafeImage";
import Link from "next/link";
import { FaArrowRight, FaCube, FaMapMarkerAlt, FaRuler } from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayProjects, setDisplayProjects] = useState([]);
  
  // Fetch featured projects using the same hook as ProjectsPage
  const { 
    projects: featuredProjects = [], 
    loading: featuredLoading, 
    error: featuredError 
  } = useProjects({
    featured: true,
    limit: 50,
    page: 1,
    sort: 'createdAt',
    order: 'desc'
  });

  // Fetch all projects as fallback
  const { 
    projects: allProjectsFallback = [], 
    loading: fallbackLoading, 
    error: fallbackError,
    pagination: fallbackPagination,
    categoryCounts: apiCategoryCounts,
    completionCounts: apiCompletionCounts
  } = useProjects({
    featured: false,
    limit: 50,
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
    const totalAll = fallbackPagination?.count ?? (allProjectsFallback?.length || 0);
    return { category: mapCategoryCounts, completion: mapCompletionCounts, totalAll };
  }, [apiCategoryCounts, apiCompletionCounts, fallbackPagination, allProjectsFallback]);

  // Create filter categories from API data
  const filterCategories = [
    { id: "all", name: "Tất cả dự án", count: countsFromApi.totalAll, color: "gray" },
    { id: "apartment", name: "Căn hộ", count: countsFromApi.category['apartment'] || 0, color: "green" },
    { id: "townhouse", name: "Nhà phố", count: countsFromApi.category['townhouse'] || 0, color: "purple" },
    { id: "villa", name: "Biệt thự - vila", count: countsFromApi.category['villa'] || 0, color: "blue" },
    { id: "office", name: "Văn phòng", count: countsFromApi.category['office'] || 0, color: "orange" }
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter(project =>
      project.category &&
      project.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, allProjects]);

  // Mobile: 6 projects in grid (1 column), Desktop: 9 projects in grid (3 columns)
  const displayProjectsListMobile = filteredProjects.slice(0, 6);
  const displayProjectsListDesktop = filteredProjects.slice(0, 9);

  return (
    <section className="py-10 bg-q8-primary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="inline-block mb-0">
            <h2 className="px-4 py-2 bg-q8-primary-100 text-q8-primary-700 rounded-full text-base font-medium uppercase tracking-wider">
              Dự án đã hoàn thành
            </h2>
          </div>
          
          <p className="text-lg text-q8-primary-600 max-w-5xl mx-auto leading-relaxed">
            Khám phá gallery gồm những dự án tiêu biểu nhất của Q8 Design. 
            Mỗi dự án là một câu chuyện thiết kế độc đáo, phản ánh dấu ấn cá nhân và phong cách sống của gia chủ.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-q8-primary-900 to-q8-primary-700 text-white shadow-lg transform scale-105'
                  : 'bg-gradient-to-r from-q8-primary-100 to-q8-primary-200 text-q8-primary-600 hover:from-q8-primary-200 hover:to-q8-primary-300 hover:text-q8-primary-800 shadow-sm'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
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

        {/* Featured Projects - Grid 1 column on mobile, Grid 3 columns on desktop */}
        {!loading && !error && (displayProjectsListMobile.length > 0 || displayProjectsListDesktop.length > 0) && (
          <>
            {/* Mobile Grid - 1 column, 6 projects */}
            <div className="md:hidden grid grid-cols-1 gap-3 mb-16">
              {displayProjectsListMobile.map((project, index) => (
                <Link 
                  key={project._id || project.id} 
                  href={`/du-an/${project.slug}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <SafeImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index < 4}
                      />
                    </div>

                    {/* Overlay - appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/80 transition-all duration-500"></div>

                    {/* Category Badge - top left */}
                    <div className="absolute top-2 left-2 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full text-xs font-semibold shadow-lg">
                        {filterCategories.find(cat => cat.id === project.category)?.name || project.category}
                      </span>
                    </div>

                    {/* Center Content - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-center px-4 max-w-sm">
                        {/* Project Title */}
                        <h3 className="text-white font-bold text-lg mb-2 drop-shadow-2xl">
                          {project.title}
                        </h3>
                        
                        {/* Project Info */}
                        <div className="space-y-3">
                          <div className="flex flex-col items-center justify-center text-white/90 text-xs space-y-1">
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
                      <div className="absolute top-2 right-2 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <FaCube className="text-q8-primary-900 text-sm" />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Grid - 3 columns, 6 projects */}
            <div className="hidden md:grid md:grid-cols-3 gap-3 mb-16">
              {displayProjectsListDesktop.map((project, index) => (
                <Link 
                  key={project._id || project.id} 
                  href={`/du-an/${project.slug}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <SafeImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index < 3}
                      />
                    </div>

                    {/* Overlay - appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/80 transition-all duration-500"></div>

                    {/* Category Badge - top left */}
                    <div className="absolute top-4 left-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full text-sm font-semibold shadow-lg">
                        {filterCategories.find(cat => cat.id === project.category)?.name || project.category}
                      </span>
                    </div>

                    {/* Center Content - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
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
          </>
        )}

        {/* No Projects State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Không có dự án nào được tìm thấy.</p>
            <Link 
              href="/du-an"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Xem tất cả dự án
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
      
          <Link 
            href="/du-an"
            className="inline-flex items-center px-8 py-2 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-colors duration-300 group"
          >
            Khám phá thêm dự án
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
