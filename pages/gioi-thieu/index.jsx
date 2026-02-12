import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import AboutPage from "../../components/q8design/AboutPage";

export default function GioiThieu({ meta }) {
  // JSON-LD Schema.org cho Q8 Design
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Q8 Design",
    "alternateName": "Q8 Design",
    "url": "https://q8design.vn",
    "logo": {
      "@type": "ImageObject",
      "url": "https://q8design.vn/logo-q8.png",
      "width": "200",
      "height": "60"
    },
    "image": "https://q8design.vn/images/q8-design-about.jpg",
    "description": "Q8 Design - Công ty thiết kế kiến trúc và nội thất hàng đầu Việt Nam. Chuyên thiết kế và thi công các công trình nhà ở, văn phòng, và không gian thương mại với phong cách hiện đại, tối giản.",
    "foundingDate": "2014",
    "foundingLocation": {
      "@type": "Place",
      "name": "Hà Nội, Việt Nam"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Đ. Nam An Khánh - KĐT Nam An Khánh",
      "addressLocality": "Hà Nội",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+84-98-811-68-28",
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": "Vietnamese"
      },
      {
        "@type": "ContactPoint",
        "email": "info@q8design.vn",
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": "Vietnamese"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/q8design",
      "https://www.instagram.com/q8design",
      "https://www.linkedin.com/company/q8design"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Vietnam"
    },
    "knowsAbout": [
      "Thiết kế kiến trúc",
      "Thiết kế nội thất", 
      "Thi công xây dựng",
      "Cải tạo không gian",
      "Tư vấn thiết kế"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dịch vụ Q8 Design",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thiết kế Kiến trúc",
            "description": "Thiết kế kiến trúc nhà phố, biệt thự, công trình thương mại"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Thiết kế Nội thất",
            "description": "Thiết kế nội thất nhà ở, văn phòng, cửa hàng"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Thi công trọn gói",
            "description": "Thi công xây dựng và hoàn thiện nội thất"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cải tạo không gian", 
            "description": "Cải tạo và nâng cấp không gian hiện có"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tư vấn và hỗ trợ",
            "description": "Tư vấn thiết kế và hỗ trợ khách hàng"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "award": [
      "Top 10 Công ty thiết kế nội thất uy tín nhất Việt Nam 2022",
      "Chứng nhận ISO 9001:2015"
    ],
    "numberOfEmployees": "50",
    "slogan": "Kiến tạo không gian sống đẳng cấp"
  };

  return (
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <Head>
        {/* JSON-LD Schema.org cho trang Giới thiệu */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <h1 className="visually-hidden">
        Q8 Design - Công ty thiết kế kiến trúc và nội thất hàng đầu
      </h1>
      <AboutPage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Giới thiệu Q8 Design - Công ty thiết kế kiến trúc và nội thất hàng đầu",
    description:
      "Khám phá câu chuyện của Q8 Design - công ty thiết kế kiến trúc và nội thất với hơn 10 năm kinh nghiệm. Chúng tôi tạo ra những không gian sống đẳng cấp, hiện đại và độc đáo cho mọi gia đình Việt.",
    keywords:
      "Q8 Design, thiết kế kiến trúc, thiết kế nội thất, công ty thiết kế, kiến trúc sư, nội thất hiện đại, thiết kế nhà, thi công nội thất, không gian sống",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/gioi-thieu",
    og: {
      title: "Giới thiệu Q8 Design - Công ty thiết kế kiến trúc và nội thất hàng đầu",
      description:
        "Khám phá câu chuyện của Q8 Design - công ty thiết kế kiến trúc và nội thất với hơn 10 năm kinh nghiệm. Chúng tôi tạo ra những không gian sống đẳng cấp, hiện đại và độc đáo cho mọi gia đình Việt.",
      type: "website",
      image: "https://www.q8design.vn/images/og-image.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/gioi-thieu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giới thiệu Q8 Design - Công ty thiết kế kiến trúc và nội thất hàng đầu",
      description:
        "Khám phá câu chuyện của Q8 Design - công ty thiết kế kiến trúc và nội thất với hơn 10 năm kinh nghiệm. Chúng tôi tạo ra những không gian sống đẳng cấp, hiện đại và độc đáo cho mọi gia đình Việt.",
      image: "https://www.q8design.vn/images/og-image.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}