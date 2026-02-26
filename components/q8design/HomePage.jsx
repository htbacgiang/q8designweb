"use client";
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import WorkProcessSection from './WorkProcessSection';
import ProjectsSection from './ProjectsSection';
import BlogSection from './BlogSection';
import ClientsSection from './ClientsSection';
import FAQSection from './FAQSection';
import CTABannerSection from './CTABannerSection';
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
        {/* Work Process - Quy trình làm việc */}
        <WorkProcessSection />
        {/* Clients Section - Khách hàng của chúng tôi */}
        <ClientsSection />
        {/* FAQ Section - Câu hỏi thường gặp */}
        <FAQSection />

        <FurnitureViewer />
        {/* Blog Section - Tin tức & Kiến thức */}
        <BlogSection />
        {/* CTA Banner - Ảnh cố định, nội dung scroll */}
        <CTABannerSection />
      </div>
    </>
  );
}
