"use client";
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ProjectsSection from './ProjectsSection';
import BlogSection from './BlogSection';
import FurnitureViewer from '../q8design/FurnitureViewer';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      <div className="min-h-screen">
        {/* About Section - Giới thiệu nhanh về Q8 Design */}
        <AboutSection />
      {/* Projects Section - Dự án tiêu biểu và nhúng 3D */}
      <ProjectsSection />
      {/* Services Section - Các dịch vụ nổi bật */}
      <ServicesSection />

        <FurnitureViewer />
        {/* Blog Section - Tin tức & Kiến thức */}
        <BlogSection />
      </div>
    </>
  );
}
