import DefaultLayout from "../components/layout/DefaultLayout";
import { readPostsFromDb, formatPosts } from "../lib/utils";
import HomePage from "../components/q8design/HomePage";

export default function Home({ posts = [], meta = {} }) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Q8 Design",
    "url": "https://q8design.vn",
    "logo": "https://q8design.vn/logo-q8.png",
    "telephone": "+84-98-811-68-28",
    "email": "info@q8design.vn",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Đ. Nam An Khánh - KĐT Nam An Khánh",
      "addressLocality": "Hà Nội",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-98-811-68-28",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese"
    },
    "sameAs": ["https://www.facebook.com/Q8designvn"],
    "description":
    "Q8 Design là đơn vị thiết kế và thi công kiến trúc, nội thất uy tín tại Hà Nội và các tỉnh lân cận. Chúng tôi kiến tạo không gian sống và kinh doanh đẳng cấp, khác biệt cho Biệt thự, Villa và Chung cư.",
  };

  return (
      <DefaultLayout 
        title={meta?.title}
        desc={meta?.description}
        thumbnail={meta?.og?.image}
        meta={meta}
      >
          <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
        <h1 className="visually-hidden">
        Q8 Design - Thiết kế & Thi công Nội thất Trọn gói
        </h1>
        <HomePage />
      </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Lấy bài viết và format
    const raw = await readPostsFromDb(); // Fetch all posts
    const posts = formatPosts(raw) || [];

    // Projects are now fetched client-side via API
2
  const meta = {
    title: "Q8 Design | Thiết kế & Thi công Nội thất Trọn gói",
    description:
      "Q8 Design là đơn vị thiết kế và thi công kiến trúc, nội thất uy tín tại Hà Nội và các tỉnh lân cận. Chúng tôi kiến tạo không gian sống và kinh doanh đẳng cấp, khác biệt cho Biệt thự, Villa và Chung cư.",
    keywords:
      "thiết kế nội thất, thi công nội thất, thiết kế biệt thự, thi công biệt thự, kiến trúc sư hà nội, cải tạo chung cư, thiết kế chung cư, Q8 Design",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn",
    og: {
      title: "Q8 Design | Thiết kế & Thi công Nội thất Trọn gói",
      description: "Q8 Design là đơn vị thiết kế và thi công kiến trúc, nội thất uy tín tại Hà Nội và các tỉnh lân cận. Chúng tôi kiến tạo không gian sống và kinh doanh đẳng cấp, khác biệt cho Biệt thự, Villa và Chung cư.",
      type: "website",
      image: "https://q8design.vn/images/og-image.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn",
      site_name: "Q8 Design",
    },
    twitter: {
      card: "summary_large_image",
      title: "Q8 Design | Thiết kế & Thi công Nội thất Trọn gói",
      description: "Q8 Design là đơn vị thiết kế và thi công kiến trúc, nội thất uy tín tại Hà Nội và các tỉnh lân cận. Chúng tôi kiến tạo không gian sống và kinh doanh đẳng cấp, khác biệt cho Biệt thự, Villa và Chung cư.",
      image: "https://q8design.vn/images/og-image.jpg",
    },
  };

    return {
      props: { posts, meta },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    // Fallback meta object
    const fallbackMeta = {
      title: "Q8 Design | Thiết kế & Thi công Nội thất Trọn gói",
      description: "Q8 Design là đơn vị thiết kế và thi công kiến trúc, nội thất uy tín tại Hà Nội và các tỉnh lân cận. Chúng tôi kiến tạo không gian sống và kinh doanh đẳng cấp, khác biệt cho Biệt thự, Villa và Chung cư.",
      keywords: "thiết kế nội thất, thi công nội thất, thiết kế biệt thự, thi công biệt thự, kiến trúc sư hà nội, cải tạo chung cư, thiết kế chung cư, Q8 Design",
      robots: "index, follow",
      author: "Q8 Design",
      canonical: "https://q8design.vn",
      og: {
        title: "Q8 Design | Thiết kế & Thi công Nội thất Trọn gói",
        description: "Q8 Design là đơn vị thiết kế và thi công kiến trúc, nội thất uy tín tại Hà Nội và các tỉnh lân cận. Chúng tôi kiến tạo không gian sống và kinh doanh đẳng cấp, khác biệt cho Biệt thự, Villa và Chung cư.",
        type: "website",
        image: "https://q8design.vn/images/og-image.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://q8design.vn",
        site_name: "Q8 Design",
      },
      twitter: {
        card: "summary_large_image",
        title: "Q8 Design | Thiết kế & Thi công Nội thất Trọn gói",
        description: "Q8 Design là đơn vị thiết kế và thi công kiến trúc, nội thất uy tín tại Hà Nội và các tỉnh lân cận. Chúng tôi kiến tạo không gian sống và kinh doanh đẳng cấp, khác biệt cho Biệt thự, Villa và Chung cư.",
        image: "https://q8design.vn/images/og-image.jpg",
      },
    };

    return {
      props: { posts: [], meta: fallbackMeta },
    };
  }
}