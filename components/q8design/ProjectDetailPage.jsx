import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import SafeImage from "../common/SafeImage";
import Link from "next/link";
import parse from "html-react-parser";
import Gallery from "react-photo-gallery";
import {
  FaMapMarkerAlt,
  FaRuler,
  FaCog,
  FaCalendarAlt,
  FaUser,
  FaPalette,
  FaDollarSign,
  FaArrowRight,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
// import { getProjectBySlug, projects } from "../../data/projects";
import NoiThatViewer from "./NoiThatViewer";
import ContactForm from "../header/ContactForm";

export default function ProjectDetailPage({ project }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [targetRowHeight, setTargetRowHeight] = useState(350);
  const galleryContainerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [limitNodeSearch, setLimitNodeSearch] = useState(6);
  const galleryPhotosRef = useRef([]);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [hasMoreSummary, setHasMoreSummary] = useState(false);
  const summaryContentRef = useRef(null);
  const [summaryMaxHeight, setSummaryMaxHeight] = useState(0);
  const [collapsedMaxHeight, setCollapsedMaxHeight] = useState(600);
  const summaryToggleRef = useRef(null);
  const summaryTitleRef = useRef(null);
  const summarySectionRef = useRef(null);
  const rawSummaryHtml = (project?.overview || project?.description || "");
  const collapsedSummaryHtml = useMemo(() => {
    if (!rawSummaryHtml) return "";
    // Try to extract first paragraph
    const pCloseIdx = rawSummaryHtml.toLowerCase().indexOf("</p>");
    if (pCloseIdx > 0) {
      const firstPara = rawSummaryHtml.slice(0, pCloseIdx + 4);
      // If the first paragraph is too short, include the second one as well
      const secondEnd = rawSummaryHtml.toLowerCase().indexOf("</p>", pCloseIdx + 4);
      if (firstPara.replace(/<[^>]*>/g, "").trim().length < 120 && secondEnd > 0) {
        return rawSummaryHtml.slice(0, secondEnd + 4);
      }
      return firstPara;
    }
    // Fallback: trim to 300 characters without breaking HTML tags too much
    const textOnly = rawSummaryHtml.replace(/<[^>]*>/g, "");
    const trimmed = textOnly.slice(0, 400);
    return `<p>${trimmed}${textOnly.length > 400 ? "..." : ""}</p>`;
  }, [rawSummaryHtml]);

  // Toggle form visibility
  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  // Normalize gallery to array of objects with src, aspectRatio, width, and height
  const normalizeGallery = useCallback((gallery) => {
    if (!gallery || gallery.length === 0) return [];
    
    return gallery.map(item => {
      // Handle string items
      if (typeof item === 'string') {
        return { src: item, aspectRatio: 'landscape', width: 16, height: 9 };
      }
      
      // Handle object items - could be Mongoose document or plain object
      // Convert Mongoose document to plain object if needed
      const plainItem = item.toObject ? item.toObject() : item;
      
      // Extract src
      const src = plainItem.src || plainItem.url || (typeof plainItem === 'string' ? plainItem : '');
      
      // Extract aspectRatio
      const aspectRatio = plainItem.aspectRatio || 'landscape';
      
      // Extract width and height - check if they are valid numbers
      let width = plainItem.width;
      let height = plainItem.height;
      
      // Convert to number if they are strings
      if (typeof width === 'string') width = parseInt(width, 10);
      if (typeof height === 'string') height = parseInt(height, 10);
      
      // Convert to number if they are not already
      width = Number(width);
      height = Number(height);
      
      // Validate width and height - must be positive numbers
      if (!width || isNaN(width) || width <= 0) {
        width = aspectRatio === 'square' ? 1 : aspectRatio === 'portrait' ? 3 : aspectRatio === 'landscape-3-4' ? 4 : 16;
      }
      if (!height || isNaN(height) || height <= 0) {
        height = aspectRatio === 'square' ? 1 : aspectRatio === 'portrait' ? 4 : aspectRatio === 'landscape-3-4' ? 3 : 9;
      }
      
      return { 
        src: src, 
        aspectRatio: aspectRatio,
        width: width,
        height: height
      };
    });
  }, []);

  // Close form with Escape key
  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleForm();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFormOpen, toggleForm]);

  // Lightbox functions - defined early, will use galleryPhotos when available
  const openLightbox = useCallback((event, { photo, index }) => {
    setSelectedImage(photo);
    setCurrentIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Lightbox navigation functions - using ref to access latest galleryPhotos
  const nextImage = useCallback(() => {
    const photos = galleryPhotosRef.current;
    if (photos.length === 0) return;
    setCurrentIndex((prevIndex) => {
      const nextIdx = (prevIndex + 1) % photos.length;
      setSelectedImage(photos[nextIdx]);
      return nextIdx;
    });
  }, []);

  const prevImage = useCallback(() => {
    const photos = galleryPhotosRef.current;
    if (photos.length === 0) return;
    setCurrentIndex((prevIndex) => {
      const prevIdx = (prevIndex - 1 + photos.length) % photos.length;
      setSelectedImage(photos[prevIdx]);
      return prevIdx;
    });
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, closeLightbox, nextImage, prevImage]);

  // State to track galleryPhotos length for triggering calculation
  const [galleryPhotosLength, setGalleryPhotosLength] = useState(0);
  const hasCalculatedRef = useRef(false);

  // Calculate targetRowHeight to limit max photos per row (2 on mobile, 6 on desktop)
  // Calculate once and keep it stable to prevent "shaking" effect
  useEffect(() => {
    const photos = galleryPhotosRef.current;
    if (photos.length === 0 || hasCalculatedRef.current) return;

    const calculateTargetRowHeight = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      const maxPhotosPerRow = isMobile ? 2 : 6;
      
      // Use a fixed calculation based on typical container width
      const containerWidth = galleryContainerRef.current?.offsetWidth || Math.min(window.innerWidth - 64, 1200);
      const margin = 4 * 2; // margin on both sides
      const padding = 8 * 2; // padding on both sides
      const totalSpacing = (maxPhotosPerRow - 1) * margin + maxPhotosPerRow * padding;
      const availableWidth = containerWidth - totalSpacing;
      const minPhotoWidth = availableWidth / maxPhotosPerRow;
      
      // Calculate height for landscape photos (16:9 ratio)
      const calculatedHeight = (minPhotoWidth * 9) / 16;
      
      // Use a stable buffer to ensure consistent sizing
      const buffer = isMobile ? 2.5 : 1.3;
      const newHeight = Math.max(400, Math.round(calculatedHeight * buffer));
      
      // Set once and don't recalculate unless window is resized significantly
      setTargetRowHeight(newHeight);
      
      // Update limitNodeSearch based on screen size
      setLimitNodeSearch(isMobile ? 2 : 6);
      
      hasCalculatedRef.current = true;
    };

    // Calculate after container is rendered
    const timeoutId = setTimeout(calculateTargetRowHeight, 500);
    
    // Only recalculate on significant window resize (more than 200px difference)
    let lastWidth = window.innerWidth;
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        // Only recalculate if width changed significantly
        if (Math.abs(currentWidth - lastWidth) > 200) {
          hasCalculatedRef.current = false;
          lastWidth = currentWidth;
          calculateTargetRowHeight();
        }
      }, 500);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
    };
  }, [galleryPhotosLength]); // Only trigger when gallery length changes

  // Reset calculation flag when project changes
  useEffect(() => {
    hasCalculatedRef.current = false;
  }, [project]);

  // Update galleryPhotosLength state when project changes
  // This will trigger the targetRowHeight calculation
  useEffect(() => {
    if (project && project.gallery) {
      // Calculate gallery length from project.gallery
      const gallery = project.gallery || [];
      const length = Array.isArray(gallery) ? gallery.length : 0;
      if (length > 0) {
        setGalleryPhotosLength(length);
      }
    }
  }, [project]);

  // Decide if we should show the toggle button
  useEffect(() => {
    if (!rawSummaryHtml) {
      setHasMoreSummary(false);
      return;
    }
    // Compare raw vs collapsed to infer if we have more content
    const rawTextLen = rawSummaryHtml.replace(/<[^>]*>/g, "").trim().length;
    const collapsedTextLen = collapsedSummaryHtml.replace(/<[^>]*>/g, "").trim().length;
    setHasMoreSummary(rawTextLen > collapsedTextLen + 20);
  }, [rawSummaryHtml, collapsedSummaryHtml]);

  // Measure content height for smooth expand/collapse animation
  useEffect(() => {
    const measure = () => {
      const el = summaryContentRef.current;
      if (!el) return;
      
      if (showFullSummary) {
        // Measure full content height
        setSummaryMaxHeight(el.scrollHeight);
      } else {
        // Measure collapsed content height
        const collapsedHeight = el.scrollHeight;
        // Set collapsed max height to actual content height + some padding, but cap at reasonable max
        setCollapsedMaxHeight(Math.min(collapsedHeight + 50, 1500)); // Allow up to 1500px for collapsed content
      }
    };
    // Measure after content parsed and rendered
    const t = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [showFullSummary, rawSummaryHtml, collapsedSummaryHtml]);

  // Transform function for html-react-parser to wrap images with figure and caption
  const transformImage = (domNode) => {
    if (domNode.name === 'img') {
      const alt = domNode.attribs?.alt || '';
      const src = domNode.attribs?.src || '';
      const className = domNode.attribs?.class || '';
      const showCaption = domNode.attribs?.['data-show-caption'] !== 'false'; // Mặc định true nếu không có attribute
      
      return (
        <figure className="my-6 relative w-full" style={{ aspectRatio: 'auto' }}>
          <Image 
            src={src} 
            alt={alt} 
            className={className}
            width={800}
            height={600}
            style={{ width: '100%', height: 'auto' }}
          />
          {alt && showCaption && (
            <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }
  };

  // Related projects will be passed as prop from getServerSideProps
  const relatedProjects = project?.relatedProjects || [];

  // Category names mapping
  const categoryNames = {
    villa: 'Biệt thự - vila',
    apartment: 'Căn hộ',
    townhouse: 'Nhà phố',
    commercial: 'Văn phòng'
  };

  // Helper function to detect aspect ratio
  const getAspectRatio = (imageUrl) => {
    if (!imageUrl) return 'landscape';
    
    // If gallery item has aspectRatio property, use it
    if (typeof imageUrl === 'object' && imageUrl.aspectRatio) {
      return imageUrl.aspectRatio;
    }
    
    // Default to landscape if it's just a string URL
    return 'landscape';
  };

  // Get cover image (mainImage or first gallery image)
  const coverImage = project?.mainImage || project?.image || (project?.gallery && project.gallery.length > 0 
    ? (typeof project.gallery[0] === 'string' ? project.gallery[0] : (project.gallery[0].src || project.gallery[0].url || project.gallery[0]))
    : null);
  
  const normalizedGallery = useMemo(() => {
    return project ? normalizeGallery(project.gallery) : [];
  }, [project, normalizeGallery]);

  // Debug: Log gallery data to check what we're getting from API
  if (process.env.NODE_ENV === 'development' && project) {
    console.log('Raw project.gallery:', project.gallery);
    console.log('Normalized Gallery:', normalizedGallery);
    if (normalizedGallery.length > 0) {
      console.log('First gallery item details:', {
        src: normalizedGallery[0].src,
        aspectRatio: normalizedGallery[0].aspectRatio,
        width: normalizedGallery[0].width,
        height: normalizedGallery[0].height,
        widthType: typeof normalizedGallery[0].width,
        heightType: typeof normalizedGallery[0].height
      });
    }
  }

  // Convert gallery to react-photo-gallery format
  // Use width/height from gallery if available and valid, otherwise calculate from aspectRatio
  // Memoize to prevent recalculation on every render
  const galleryPhotos = useMemo(() => {
    if (!project || !normalizedGallery || normalizedGallery.length === 0) {
      return [];
    }
    
    return normalizedGallery.map((img) => {
      let width, height;
      
      // Check if width and height are valid numbers (not 0, not null, not undefined)
      const hasValidWidth = img.width != null && img.width !== 0 && !isNaN(Number(img.width));
      const hasValidHeight = img.height != null && img.height !== 0 && !isNaN(Number(img.height));
      
      // Calculate expected width/height based on aspectRatio
      let expectedWidth, expectedHeight;
        switch (img.aspectRatio) {
          case 'square':
          expectedWidth = 1;
          expectedHeight = 1;
            break;
          case 'portrait':
          expectedWidth = 3;
          expectedHeight = 4;
            break;
          case 'landscape-3-4':
          expectedWidth = 4;
          expectedHeight = 3;
            break;
          case 'landscape':
          default:
          expectedWidth = 16;
          expectedHeight = 9;
            break;
        }
        
        // If width and height are already defined in gallery item, use them
        // But verify they match the aspectRatio (with some tolerance)
        if (hasValidWidth && hasValidHeight) {
          const actualWidth = Number(img.width);
          const actualHeight = Number(img.height);
          const actualRatio = actualWidth / actualHeight;
          const expectedRatio = expectedWidth / expectedHeight;
          
          // If the ratio matches (within 5% tolerance), use the provided values
          // Otherwise, use the expected values from aspectRatio
          if (Math.abs(actualRatio - expectedRatio) / expectedRatio < 0.05) {
            width = actualWidth;
            height = actualHeight;
          } else {
            // Ratio doesn't match, use expected values
            width = expectedWidth;
            height = expectedHeight;
          }
        } else {
          // No valid width/height, use aspectRatio calculation
          width = expectedWidth;
          height = expectedHeight;
        }
        
        return {
          src: img.src,
          width: width,
          height: height,
          alt: `${project?.title || ''} - ${img.src}`
        };
    });
  }, [normalizedGallery, project]);

  // Debug: Log final gallery photos format
  if (process.env.NODE_ENV === 'development' && galleryPhotos.length > 0) {
    console.log('Gallery Photos for react-photo-gallery:', galleryPhotos.slice(0, 3)); // Log first 3
  }

  // Update ref with latest galleryPhotos
  useEffect(() => {
    galleryPhotosRef.current = galleryPhotos;
  }, [galleryPhotos]);

  // If no project found, show 404 or redirect
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold text-q8-primary-900 mb-4">Không tìm thấy dự án</p>
          <p className="text-q8-primary-600 mb-8">Dự án bạn tìm kiếm không tồn tại hoặc đã được gỡ bỏ.</p>
          <Link href="/du-an" className="inline-flex items-center px-6 py-3 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-colors">
            Quay lại danh sách dự án
          </Link>
        </div>
      </div>
    );
  }
  
  // Update state when galleryPhotos is calculated (this runs after render, but useEffect is already defined above)
  // The useEffect above will trigger recalculation when galleryPhotosLength changes

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Hero Section with Cover Image */}
      <section className="relative">
        <div className="relative h-screen overflow-hidden">
          {coverImage && (
            <SafeImage
              src={coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
          
          {/* Project Info Overlay - Centered */}
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
            <div className="container mx-auto max-w-7xl text-center">
              <p className="text-3xl md:text-5xl  font-bold text-white mb-4">
                {project.title}
              </p>
              
              {/* Location and Area Info */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-4 text-white/90">
                {project.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-white/80" />
                    <span className="text-lg md:text-base">{project.location}</span>
                  </div>
                )}
                {project.area && (
                  <div className="flex items-center gap-2">
                    <FaRuler className="text-white/80" />
                    <span className="text-lg md:text-base">{project.area}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-white/80 justify-center">
                <span className="text-sm md:text-base font-medium">Design by</span>
                <span className="text-xl md:text-2xl font-bold text-white">Q8 Design Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      {galleryPhotos.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-8xl">
            {/* Mobile: CSS Grid with 2 columns */}
            <div className="md:hidden grid grid-cols-2 gap-2">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openLightbox(null, { photo, index })}
                  
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Desktop: React Photo Gallery with justified layout */}
            <div className="hidden md:block container mx-auto" ref={galleryContainerRef}>
              <div className="flex justify-center">
                <div 
                  style={{ 
                    minHeight: `${Math.max(targetRowHeight, 400)}px`, 
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  {targetRowHeight > 0 && (
                    <Gallery
                      photos={galleryPhotos}
                      direction="row"
                      margin={4}
                      targetRowHeight={Math.max(targetRowHeight, 400)}
                      imagePadding={8}
                      limitNodeSearch={limitNodeSearch}
                      onClick={openLightbox}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Details */}
      <section className="md:py-6 py-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Project Summary */}
              <div ref={summarySectionRef} className="mb-12">
                <p ref={summaryTitleRef} className="text-2xl md:text-3xl font-bold text-q8-primary-900 mb-3">
                  Tóm tắt dự án
                </p>
                <div 
                  className="relative transition-all duration-1000 ease-in-out"
                  style={{ maxHeight: showFullSummary ? 'none' : collapsedMaxHeight, overflow: showFullSummary ? 'visible' : 'hidden' }}
                >
                  <div 
                    ref={summaryContentRef} 
                    className="text-q8-primary-700 blog leading-relaxed text-lg transition-opacity duration-1000 ease-in-out"
                  >
                    {parse(showFullSummary ? rawSummaryHtml : collapsedSummaryHtml, {
                      replace: transformImage
                    })}
                  </div>
                  {!showFullSummary && hasMoreSummary && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/70 to-transparent transition-opacity duration-1000 ease-in-out" />
                  )}
                </div>
                {hasMoreSummary && !showFullSummary && (
                  <div className="mt-4 flex justify-center" ref={summaryToggleRef}>
                    <button
                      onClick={() => {
                        setShowFullSummary(true);
                      }}
                      className="inline-flex items-center px-6 py-2 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-all duration-300 hover:shadow-md"
                    >
                      Xem đầy đủ bài viết
                    </button>
                  </div>
                )}
              </div>
              {/* 3D Viewer - chỉ hiển thị nếu project có 3D */}
              {project.has3D && project.model3D && (
                <div className="mb-12">
                  <NoiThatViewer
                    model3D={project.model3D}
                    projectTitle={project.title}
                  />
                </div>
              )}

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-q8-primary-50 rounded-3xl p-8 sticky top-8">
                {/* Project Info */}
                <h3 className="text-xl font-bold text-q8-primary-900 mb-6">Thông tin dự án</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-q8-primary-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-q8-primary-500">Chủ đầu tư</span>
                      <p className="font-medium text-q8-primary-900">{project.client || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-q8-primary-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-q8-primary-500">Vị trí</span>
                      <p className="font-medium text-q8-primary-900">{project.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaRuler className="text-q8-primary-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-q8-primary-500">Diện tích</span>
                      <p className="font-medium text-q8-primary-900">{project.area}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaCog className="text-q8-primary-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-q8-primary-500">Dịch vụ</span>
                      <p className="font-medium text-q8-primary-900">{project.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-q8-primary-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-q8-primary-500">Năm hoàn thành</span>
                      <p className="font-medium text-q8-primary-900">{project.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaPalette className="text-q8-primary-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-q8-primary-500">Phong cách</span>
                      <p className="font-medium text-q8-primary-900">{project.style || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaDollarSign className="text-q8-primary-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-q8-primary-500">Ngân sách</span>
                      <p className="font-medium text-q8-primary-900">{project.budget || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={toggleForm}
                    className="w-full bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold py-3 px-6 rounded-full text-center transition-colors duration-300 flex items-center justify-center"
                  >
                    Tư vấn dự án tương tự
                    <FaArrowRight className="ml-2" />
                  </button>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-4">
                Dự án liên quan
              </p>
              <p className="text-lg text-q8-primary-600">
                Khám phá thêm các dự án tương tự khác của Q8 Design
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <div key={relatedProject.slug} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <Link href={`/du-an/${relatedProject.slug}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                      {/* Category Badge */}
                      {relatedProject.category && (
                        <div className="absolute top-4 left-4 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full text-sm font-medium shadow-lg">
                            {categoryNames[relatedProject.category] || relatedProject.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-q8-primary-900 mb-2 group-hover:text-q8-primary-700 transition-colors">
                      <Link href={`/du-an/${relatedProject.slug}`}>
                        {relatedProject.title}
                      </Link>
                    </h3>
                    <p className="text-q8-primary-600 text-sm">
                     Diện tích: {relatedProject.area}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/du-an"
                className="inline-flex items-center px-8 py-4 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-colors duration-300"
              >
                Xem tất cả dự án
                <FaArrowRight className="ml-3" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-q8-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-q8-primary-900">
            Bạn có muốn kiến tạo một không gian sống như thế này?
          </h2>
          <p className="text-xl text-q8-primary-600 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để được tư vấn miễn phí và bắt đầu
            hành trình thiết kế không gian sống mơ ước của bạn.
          </p>

          <div className="flex flex-row gap-4 justify-center flex-nowrap">
            <button
              onClick={toggleForm}
              className="inline-flex items-center px-10 py-4 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Liên hệ tư vấn
            </button>
            <Link
              href="/dich-vu"
              className="inline-flex items-center px-8 py-4 border-2 border-q8-primary-900 text-q8-primary-900 hover:bg-q8-primary-900 hover:text-white font-bold rounded-full transition-all duration-300"
            >
              Xem dịch vụ
            </Link>
          </div>
        </div>
      </section>


      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close when clicking on overlay (but not on image or buttons)
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Close Button - Outside Image Container */}
          <button
            onClick={closeLightbox}
            className="absolute top-0 md:top-0 right-0 md:right-0 text-white hover:text-red-400 transition-colors z-30 bg-red-600 hover:bg-red-700 rounded-full p-2 md:p-3 shadow-lg"
            title="Đóng ảnh"
            aria-label="Đóng ảnh"
          >
            <FaTimes className="text-lg md:text-xl" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2 md:p-3 hover:bg-opacity-70"
            aria-label="Ảnh trước"
          >
            <FaChevronLeft className="text-2xl md:text-3xl" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2 md:p-3 hover:bg-opacity-70"
            aria-label="Ảnh sau"
          >
            <FaChevronRight className="text-2xl md:text-3xl" />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-5xl max-h-full flex flex-col items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - On top of image */}
            <button
              onClick={closeLightbox}
              className="absolute -top-6 md:-top-5 right-0 text-white hover:text-red-400 transition-colors z-30 bg-red-600 hover:bg-red-700 rounded-full p-1.5 md:p-2 shadow-lg"
              title="Đóng ảnh"
              aria-label="Đóng ảnh"
            >
              <FaTimes className="text-base md:text-lg" />
            </button>
            
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || project.title}
              width={1200}
              height={800}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              style={{ maxHeight: '70vh' }}
              onError={(e) => {
                e.target.src = `https://images.unsplash.com/photo-1594736797933-d0300ba38463?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80`;
              }}
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm z-10">
            {currentIndex + 1} / {galleryPhotos.length}
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleForm();
          }}
        >
          <div className="relative bg-white rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-q8-primary-100 hover:bg-q8-primary-200 rounded-full flex items-center justify-center transition-colors"
              onClick={toggleForm}
              aria-label="Đóng form"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Registration Form */}
            <ContactForm />
          </div>
        </div>
      )}
    </div>
    </>
  );
}