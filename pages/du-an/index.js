import React from "react";
import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ProjectsPage from "../../components/q8design/ProjectsPage";

export default function DuAn({ meta }) {
  // JSON-LD Schema.org cho trang dự án
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Dự án Q8 Design - Portfolio thiết kế kiến trúc và nội thất",
    "description": "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Q8 Design. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
    "url": "https://q8design.vn/du-an",
    "image": "https://q8design.vn/images/q8-design-projects.jpg",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://q8design.vn/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Dự án",
          "item": "https://q8design.vn/du-an"
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Danh sách dự án Q8 Design",
      "description": "Bộ sưu tập các dự án thiết kế và thi công của Q8 Design",
      "numberOfItems": "500+",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "name": "Biệt thự hiện đại Thảo Điền",
          "description": "Thiết kế biệt thự hiện đại với phong cách tối giản, tối ưu không gian sống",
          "url": "https://q8design.vn/du-an/biet-thu-hien-dai-thao-dien",
          "image": "https://q8design.vn/images/projects/biet-thu-thao-dien.jpg",
          "creator": {
            "@type": "Organization",
            "name": "Q8 Design"
          },
          "dateCreated": "2023",
          "genre": "Architectural Design"
        },
        {
          "@type": "CreativeWork", 
          "name": "Căn hộ penthouse The Manor",
          "description": "Thiết kế nội thất căn hộ penthouse sang trọng với view toàn thành phố",
          "url": "https://q8design.vn/du-an/can-ho-penthouse-the-manor",
          "image": "https://q8design.vn/images/og-image.jpg",
          "creator": {
            "@type": "Organization",
            "name": "Q8 Design"
          },
          "dateCreated": "2023",
          "genre": "Interior Design"
        },
        {
          "@type": "CreativeWork",
          "name": "Văn phòng công ty ABC",
          "description": "Thiết kế văn phòng hiện đại, thân thiện môi trường với không gian làm việc linh hoạt",
          "url": "https://q8design.vn/du-an/van-phong-cong-ty-abc",
          "image": "https://q8design.vn/images/og-image.jpg",
          "creator": {
            "@type": "Organization",
            "name": "Q8 Design"
          },
          "dateCreated": "2023",
          "genre": "Commercial Design"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Q8 Design",
      "url": "https://q8design.vn",
      "logo": {
        "@type": "ImageObject",
        "url": "https://q8design.vn/logo-q8.png",
        "width": "200",
        "height": "60"
      },
      "description": "Công ty thiết kế kiến trúc và nội thất hàng đầu Việt Nam"
    },
    "about": {
      "@type": "Thing",
      "name": "Thiết kế kiến trúc và nội thất",
      "description": "Dịch vụ thiết kế kiến trúc, nội thất, thi công trọn gói và cải tạo không gian"
    },
    "keywords": "dự án Q8 Design, thiết kế biệt thự, thiết kế căn hộ, thiết kế văn phòng, portfolio Q8, dự án kiến trúc, dự án nội thất, nhà đẹp, thiết kế hiện đại",
    "inLanguage": "vi-VN",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Q8 Design",
      "url": "https://q8design.vn"
    }
  };

  return (
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <Head>
        {/* JSON-LD Schema.org cho trang Dự án */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h1 className="visually-hidden">
        Dự án thiết kế kiến trúc và nội thất Q8 Design
      </h1>
      <ProjectsPage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  // Projects are now fetched client-side via API
  const meta = {
    title: "Dự án Q8 Design - Bộ sưu tập thiết kế kiến trúc và nội thất đẳng cấp",
    description:
      "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Q8 Design. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
    keywords:
      "dự án Q8 Design, thiết kế biệt thự, thiết kế căn hộ, thiết kế văn phòng, portfolio Q8, dự án kiến trúc, dự án nội thất, nhà đẹp, thiết kế hiện đại",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/du-an",
    og: {
      title: "Dự án Q8 Design - Bộ sưu tập thiết kế kiến trúc và nội thất đẳng cấp",
      description:
        "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Q8 Design. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
      type: "website",
      image: "https://q8design.vn/images/og-image.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/du-an",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dự án Q8 Design - Bộ sưu tập thiết kế kiến trúc và nội thất đẳng cấp",
      description:
        "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Q8 Design. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
      image: "https://q8design.vn/images/og-image.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
