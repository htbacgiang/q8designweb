// utils/q8MetaUtils.js

// Function to create dynamic site navigation with recent projects
export function createSiteNavigation(projects = []) {
  const baseNavigation = [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Trang chủ",
      "description": "Q8 Design - Thiết kế kiến trúc và nội thất chuyên nghiệp",
      "url": "https://q8design.vn"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2, 
      "name": "Giới thiệu",
      "description": "Tìm hiểu về Q8 Design và đội ngũ chuyên gia",
      "url": "https://q8design.vn/gioi-thieu"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Dịch vụ",
      "description": "Thiết kế kiến trúc, nội thất và thi công trọn gói",
      "url": "https://q8design.vn/dich-vu"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Dự án",
      "description": "Portfolio các công trình đã hoàn thiện",
      "url": "https://q8design.vn/du-an"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "Liên hệ",
      "description": "Thông tin liên hệ và tư vấn miễn phí",
      "url": "https://q8design.vn/lien-he"
    }
  ];

  // Thêm 2 dự án gần nhất nếu có
  if (projects && projects.length >= 2) {
    baseNavigation.push(
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": projects[0]?.title?.substring(0, 50) || 'Dự án mới nhất',
        "description": projects[0]?.description?.substring(0, 60) || 'Dự án thiết kế mới nhất của Q8 Design',
        "url": `https://q8design.vn/du-an/${projects[0]?.slug || ''}`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 7,
        "name": projects[1]?.title?.substring(0, 50) || 'Dự án thứ 2',
        "description": projects[1]?.description?.substring(0, 60) || 'Dự án thiết kế gần đây của Q8 Design',
        "url": `https://q8design.vn/du-an/${projects[1]?.slug || ''}`
      }
    );
  }

  return baseNavigation;
}

export function createPageMeta({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage = "https://q8design.vn/images/q8-design-og-image.jpg",
  ogType = "website"
}) {
  const fullTitle = title ? `${title} | Q8 Design` : "Q8 Design - Thiết kế kiến trúc và nội thất chuyên nghiệp";
  const fullCanonical = `https://q8design.vn${canonicalPath}`;
  
  return {
    title: fullTitle,
    description: description || "Q8 Design - Công ty thiết kế kiến trúc và nội thất hàng đầu Việt Nam. Chuyên thiết kế nhà phố, biệt thự, chung cư và thi công trọn gói.",
    keywords: keywords || "thiết kế kiến trúc, thiết kế nội thất, Q8 Design, nhà phố, biệt thự, chung cư, thi công trọn gói",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: fullCanonical,
    og: {
      title: fullTitle,
      description: description || "Q8 Design - Thiết kế kiến trúc và nội thất chuyên nghiệp. Biến ý tưởng thành hiện thực với đội ngũ chuyên gia giàu kinh nghiệm.",
      type: ogType,
      image: ogImage,
      imageWidth: "1200",
      imageHeight: "630",
      url: fullCanonical,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || "Q8 Design - Thiết kế kiến trúc và nội thất chuyên nghiệp. Biến ý tưởng thành hiện thực với đội ngũ chuyên gia giàu kinh nghiệm.",
      image: ogImage,
    },
  };
}

// Predefined meta for common pages
export const pageMetas = {
  home: createPageMeta({
    title: "Q8 Design - Thiết kế Kiến trúc và Nội thất Chuyên nghiệp",
    description: "Q8 Design là công ty thiết kế kiến trúc và nội thất hàng đầu Việt Nam. Chuyên thiết kế nhà phố, biệt thự, chung cư và thi công trọn gói. Đội ngũ chuyên gia giàu kinh nghiệm, cam kết chất lượng và tiến độ.",
    keywords: "thiết kế kiến trúc, thiết kế nội thất, Q8 Design, nhà phố, biệt thự, chung cư, thi công trọn gói, kiến trúc sư, nội thất cao cấp, thiết kế nhà ở, thiết kế thương mại",
    canonicalPath: "",
  }),
  
  about: createPageMeta({
    title: "Giới thiệu Q8 Design - Đội ngũ chuyên gia thiết kế",
    description: "Tìm hiểu về Q8 Design - công ty thiết kế kiến trúc và nội thất uy tín với 10+ năm kinh nghiệm. Đội ngũ kiến trúc sư, kỹ sư chuyên nghiệp, cam kết mang đến những công trình chất lượng cao.",
    keywords: "Q8 Design, giới thiệu công ty, đội ngũ kiến trúc sư, thiết kế kiến trúc, thiết kế nội thất, kinh nghiệm thiết kế, công ty uy tín",
    canonicalPath: "/gioi-thieu",
  }),
  
  services: createPageMeta({
    title: "Dịch vụ Thiết kế Kiến trúc và Nội thất | Q8 Design",
    description: "Q8 Design cung cấp đầy đủ dịch vụ thiết kế kiến trúc, thiết kế nội thất và thi công trọn gói. Chuyên nghiệp, uy tín với quy trình 5 bước minh bạch. Tư vấn miễn phí 24/7.",
    keywords: "dịch vụ thiết kế kiến trúc, dịch vụ thiết kế nội thất, thi công trọn gói, cải tạo không gian, tư vấn thiết kế, Q8 Design, kiến trúc sư chuyên nghiệp",
    canonicalPath: "/dich-vu",
  }),
  
  projects: createPageMeta({
    title: "Portfolio Dự án Thiết kế | Q8 Design",
    description: "Khám phá portfolio các dự án thiết kế kiến trúc và nội thất đã hoàn thiện của Q8 Design. Từ nhà phố, biệt thự đến các công trình thương mại, mỗi dự án đều mang đậm dấu ấn sáng tạo.",
    keywords: "portfolio thiết kế, dự án kiến trúc, dự án nội thất, nhà phố, biệt thự, chung cư, công trình thương mại, Q8 Design, thiết kế đẹp",
    canonicalPath: "/du-an",
  }),
  
  contact: createPageMeta({
    title: "Liên hệ Q8 Design - Tư vấn Thiết kế Miễn phí",
    description: "Liên hệ Q8 Design để được tư vấn thiết kế kiến trúc và nội thất miễn phí. Hotline: 098 811 68 28. Địa chỉ: Nam An Khánh, Hà Nội. Hỗ trợ 24/7 qua Zalo, email và các kênh trực tuyến.",
    keywords: "liên hệ Q8 Design, tư vấn thiết kế miễn phí, hotline thiết kế, địa chỉ Q8 Design, tư vấn kiến trúc, tư vấn nội thất, đặt lịch tư vấn",
    canonicalPath: "/lien-he",
  }),
  
  // Service detail pages
  architectureDesign: createPageMeta({
    title: "Thiết kế Kiến trúc Chuyên nghiệp | Q8 Design",
    description: "Dịch vụ thiết kế kiến trúc chuyên nghiệp cho nhà phố, biệt thự, công trình thương mại. Q8 Design với đội ngũ kiến trúc sư giàu kinh nghiệm, cam kết chất lượng và tiến độ thiết kế.",
    keywords: "thiết kế kiến trúc, kiến trúc sư, thiết kế nhà phố, thiết kế biệt thự, thiết kế thương mại, quy hoạch đô thị, Q8 Design",
    canonicalPath: "/dich-vu/thiet-ke-kien-truc",
  }),
  
  interiorDesign: createPageMeta({
    title: "Thiết kế Nội thất Cao cấp | Q8 Design",
    description: "Dịch vụ thiết kế nội thất cao cấp cho nhà phố, chung cư, biệt thự. Q8 Design chuyên tạo ra những không gian sống đẹp, tiện nghi và phù hợp với phong cách sống hiện đại.",
    keywords: "thiết kế nội thất, nội thất cao cấp, thiết kế nhà phố, thiết kế chung cư, thiết kế biệt thự, nội thất văn phòng, Q8 Design",
    canonicalPath: "/dich-vu/thiet-ke-noi-that",
  }),
  
  construction: createPageMeta({
    title: "Thi công Trọn gói Chất lượng Cao | Q8 Design",
    description: "Dịch vụ thi công trọn gói từ A-Z với chất lượng cao nhất. Q8 Design cam kết thi công đúng tiến độ, đảm bảo chất lượng và thẩm mỹ theo thiết kế. Giám sát 24/7.",
    keywords: "thi công trọn gói, thi công nội thất, thi công kiến trúc, giám sát thi công, chất lượng cao, Q8 Design, thi công chuyên nghiệp",
    canonicalPath: "/dich-vu/thi-cong-tron-goi",
  }),
  
  renovation: createPageMeta({
    title: "Cải tạo Không gian Chuyên nghiệp | Q8 Design",
    description: "Dịch vụ cải tạo và nâng cấp không gian cũ thành mới. Q8 Design chuyên cải tạo nhà phố, chung cư, biệt thự với giải pháp tối ưu công năng và thẩm mỹ.",
    keywords: "cải tạo không gian, nâng cấp nội thất, cải tạo nhà phố, cải tạo chung cư, cải tạo biệt thự, Q8 Design, thiết kế lại",
    canonicalPath: "/dich-vu/cai-tao-noi-that-chung-cu",
  }),
  
  consultation: createPageMeta({
    title: "Tư vấn Thiết kế Miễn phí | Q8 Design",
    description: "Tư vấn thiết kế kiến trúc và nội thất miễn phí 24/7. Đội ngũ chuyên gia Q8 Design sẵn sàng hỗ trợ, đưa ra giải pháp phù hợp với nhu cầu và ngân sách của bạn.",
    keywords: "tư vấn thiết kế miễn phí, tư vấn kiến trúc, tư vấn nội thất, hỗ trợ khách hàng, Q8 Design, tư vấn chuyên nghiệp",
    canonicalPath: "/dich-vu/tu-van-ho-tro",
  }),
  
  // Project detail pages
  projectDetail: (project) => createPageMeta({
    title: `${project.title} | Dự án Q8 Design`,
    description: project.description || `Dự án ${project.title} được thiết kế và thi công bởi Q8 Design. ${project.type} tại ${project.location} với diện tích ${project.area}.`,
    keywords: `dự án ${project.title}, ${project.type}, ${project.location}, Q8 Design, thiết kế kiến trúc, thiết kế nội thất, ${project.tags?.join(', ')}`,
    canonicalPath: `/du-an/${project.slug}`,
    ogType: "article",
  }),
  
  // Service detail pages
  serviceDetail: (service) => createPageMeta({
    title: `${service.title} | Dịch vụ Q8 Design`,
    description: service.description || `Dịch vụ ${service.title} chuyên nghiệp tại Q8 Design. ${service.subtitle || ''} với đội ngũ chuyên gia giàu kinh nghiệm.`,
    keywords: `dịch vụ ${service.title}, ${service.title.toLowerCase()}, Q8 Design, thiết kế kiến trúc, thiết kế nội thất, ${service.tags?.join(', ')}`,
    canonicalPath: `/dich-vu/${service.slug}`,
  }),
  
  // Career page
  career: createPageMeta({
    title: "Tuyển dụng | Cơ hội nghề nghiệp tại Q8 Design",
    description: "Tham gia đội ngũ Q8 Design - công ty thiết kế kiến trúc và nội thất hàng đầu. Cơ hội phát triển nghề nghiệp, môi trường làm việc chuyên nghiệp, đãi ngộ hấp dẫn.",
    keywords: "tuyển dụng Q8 Design, việc làm kiến trúc sư, việc làm thiết kế nội thất, cơ hội nghề nghiệp, Q8 Design careers",
    canonicalPath: "/tuyen-dung",
  }),
  
  // Blog/News pages
  blog: createPageMeta({
    title: "Tin tức & Kiến thức Thiết kế | Q8 Design",
    description: "Cập nhật tin tức mới nhất về thiết kế kiến trúc, nội thất và xu hướng thiết kế. Chia sẻ kiến thức chuyên môn từ đội ngũ chuyên gia Q8 Design.",
    keywords: "tin tức thiết kế, kiến thức kiến trúc, xu hướng nội thất, blog Q8 Design, chia sẻ kinh nghiệm thiết kế",
    canonicalPath: "/tin-tuc",
  }),
  
  // Privacy and terms
  privacy: createPageMeta({
    title: "Chính sách Bảo mật | Q8 Design",
    description: "Chính sách bảo mật thông tin khách hàng của Q8 Design. Cam kết bảo vệ dữ liệu cá nhân và thông tin dự án của khách hàng.",
    keywords: "chính sách bảo mật, bảo vệ dữ liệu, Q8 Design, privacy policy, bảo mật thông tin",
    canonicalPath: "/chinh-sach-bao-mat",
  }),
  
  terms: createPageMeta({
    title: "Điều khoản Sử dụng | Q8 Design",
    description: "Điều khoản sử dụng dịch vụ thiết kế và thi công của Q8 Design. Quy định về quyền và nghĩa vụ của các bên trong quá trình hợp tác.",
    keywords: "điều khoản sử dụng, terms of service, Q8 Design, quy định dịch vụ, điều kiện hợp tác",
    canonicalPath: "/dieu-khoan-su-dung",
  }),
  
  // Authentication pages
  login: createPageMeta({
    title: "Đăng nhập | Q8 Design",
    description: "Đăng nhập vào Q8 Design để truy cập các dịch vụ thiết kế kiến trúc và nội thất chuyên nghiệp. Đăng nhập bằng email, số điện thoại hoặc Google.",
    keywords: "Q8 Design, đăng nhập, thiết kế kiến trúc, nội thất, tư vấn thiết kế, kiến trúc sư, thi công trọn gói",
    canonicalPath: "/dang-nhap",
  }),
  
  register: createPageMeta({
    title: "Đăng ký | Q8 Design",
    description: "Đăng ký tài khoản miễn phí tại Q8 Design để được tư vấn thiết kế kiến trúc và nội thất chuyên nghiệp. Dịch vụ thiết kế nhà phố, biệt thự, chung cư và thi công trọn gói.",
    keywords: "đăng ký Q8 Design, tài khoản thiết kế, tư vấn kiến trúc, thiết kế nội thất, thi công trọn gói, kiến trúc sư, nội thất cao cấp",
    canonicalPath: "/dang-ky",
  }),
};

// Function to get meta for specific project
export function getProjectMeta(project) {
  return pageMetas.projectDetail(project);
}

// Function to get meta for specific service
export function getServiceMeta(service) {
  return pageMetas.serviceDetail(service);
}

// Function to create structured data for Q8 Design
export function createQ8StructuredData(projects = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Q8 Design",
    "alternateName": "Q8 Design Studio",
    "url": "https://q8design.vn",
    "logo": "https://q8design.vn/images/q8-design-logo.png",
    "description": "Công ty thiết kế kiến trúc và nội thất chuyên nghiệp hàng đầu Việt Nam",
    "foundingDate": "2014",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Đ. Nam An Khánh - KĐT Nam An Khánh",
      "addressLocality": "Hà Nội",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-98-811-68-28",
      "contactType": "customer service",
      "availableLanguage": ["Vietnamese", "English"]
    },
    "sameAs": [
      "https://facebook.com/q8design",
      "https://instagram.com/q8design",
      "https://youtube.com/@q8design"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dịch vụ thiết kế kiến trúc và nội thất",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thiết kế Kiến trúc",
            "description": "Thiết kế kiến trúc chuyên nghiệp cho nhà phố, biệt thự, công trình thương mại"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thiết kế Nội thất",
            "description": "Thiết kế nội thất cao cấp cho mọi loại hình công trình"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thi công Trọn gói",
            "description": "Thi công trọn gói từ A-Z với chất lượng cao nhất"
          }
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebSite",
      "name": "Q8 Design",
      "url": "https://q8design.vn",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://q8design.vn/tim-kiem?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  };
}
