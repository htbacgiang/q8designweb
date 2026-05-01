import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ServicesPage from "../../components/q8design/ServicesPage";

export default function DichVu({ meta }) {
  // JSON-LD Schema.org cho trang dịch vụ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dịch vụ thiết kế kiến trúc và nội thất Q8 Design",
    "provider": {
      "@type": "Organization",
      "name": "Q8 Design",
      "url": "https://q8design.vn"
    },
    "description": "Q8 Design cung cấp dịch vụ thiết kế kiến trúc, thiết kế nội thất, thi công xây dựng và cải tạo không gian với chất lượng cao và phong cách hiện đại.",
    "serviceType": "Design and Construction Services",
    "areaServed": "Vietnam",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dịch vụ Q8 Design",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thiết kế kiến trúc",
            "description": "Thiết kế kiến trúc nhà ở, biệt thự, văn phòng với phong cách hiện đại"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thiết kế nội thất",
            "description": "Thiết kế nội thất hoàn chỉnh từ concept đến hoàn thiện"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thi công xây dựng",
            "description": "Thi công xây dựng trọn gói với chất lượng cao"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cải tạo không gian",
            "description": "Cải tạo và nâng cấp không gian hiện có"
          }
        }
      ]
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
        {/* JSON-LD Schema.org cho trang Dịch vụ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <h1 className="visually-hidden">
        Dịch vụ thiết kế kiến trúc và nội thất Q8 Design
      </h1>
      <ServicesPage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Dịch vụ Q8 Design - Thiết kế kiến trúc và nội thất chuyên nghiệp",
    description:
      "Khám phá các dịch vụ chuyên nghiệp của Q8 Design: Thiết kế kiến trúc, thiết kế nội thất, thi công xây dựng và cải tạo không gian. Quy trình làm việc chuyên nghiệp, đội ngũ kiến trúc sư giàu kinh nghiệm.",
    keywords:
      "dịch vụ thiết kế, thiết kế kiến trúc, thiết kế nội thất, thi công xây dựng, cải tạo nhà, Q8 Design, kiến trúc sư, nội thất hiện đại, thi công trọn gói",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/dich-vu",
    og: {
      title: "Dịch vụ Q8 Design - Thiết kế kiến trúc và nội thất chuyên nghiệp",
      description:
        "Khám phá các dịch vụ chuyên nghiệp của Q8 Design: Thiết kế kiến trúc, thiết kế nội thất, thi công xây dựng và cải tạo không gian. Quy trình làm việc chuyên nghiệp, đội ngũ kiến trúc sư giàu kinh nghiệm.",
      type: "website",
      image: "https://q8design.vn/images/q8-design-services.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/dich-vu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dịch vụ Q8 Design - Thiết kế kiến trúc và nội thất chuyên nghiệp",
      description:
        "Khám phá các dịch vụ chuyên nghiệp của Q8 Design: Thiết kế kiến trúc, thiết kế nội thất, thi công xây dựng và cải tạo không gian. Quy trình làm việc chuyên nghiệp, đội ngũ kiến trúc sư giàu kinh nghiệm.",
      image: "https://q8design.vn/images/q8-design-services.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
