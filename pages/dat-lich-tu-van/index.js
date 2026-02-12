import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ContactPage from "../../components/q8design/ContactPage";

export default function DatLichTuVan({ meta }) {
  // JSON-LD Schema.org cho trang đặt lịch tư vấn
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Đặt lịch tư vấn thiết kế Q8 Design",
    "provider": {
      "@type": "Organization",
      "name": "Q8 Design",
      "url": "https://q8design.vn",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Đ. Nam An Khánh - KĐT Nam An Khánh",
        "addressLocality": "Hà Nội",
        "addressRegion": "Hà Nội",
        "postalCode": "100000",
        "addressCountry": "VN"
      },
      "telephone": "+84-98-811-68-28",
      "email": "info@q8design.vn"
    },
    "description": "Đặt lịch tư vấn thiết kế kiến trúc và nội thất miễn phí với Q8 Design. Nhận báo giá chi tiết và thiết kế concept ban đầu trong 24h.",
    "serviceType": "Design Consultation",
    "areaServed": "Vietnam",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "VND",
      "name": "Tư vấn thiết kế miễn phí",
      "description": "Tư vấn thiết kế kiến trúc và nội thất miễn phí tại nhà hoặc văn phòng",
      "validFrom": "2024-01-01",
      "availabilityStarts": "08:00",
      "availabilityEnds": "18:00"
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
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
        {/* JSON-LD Schema.org cho trang Đặt lịch tư vấn */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h1 className="visually-hidden">
        Đặt lịch tư vấn thiết kế Q8 Design - Miễn phí 100%
      </h1>
      
      <ContactPage bookingMode={true} />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Đặt lịch tư vấn Q8 Design - Thiết kế kiến trúc và nội thất miễn phí",
    description:
      "Đặt lịch tư vấn thiết kế kiến trúc và nội thất miễn phí với Q8 Design. Nhận báo giá chi tiết và thiết kế concept ban đầu trong 24h. Đội ngũ kiến trúc sư tận tâm, giàu kinh nghiệm.",
    keywords:
      "đặt lịch tư vấn, tư vấn thiết kế miễn phí, Q8 Design booking, tư vấn kiến trúc, tư vấn nội thất, báo giá thiết kế, thiết kế concept",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/dat-lich-tu-van",
    og: {
      title: "Đặt lịch tư vấn Q8 Design - Thiết kế kiến trúc và nội thất miễn phí",
      description:
        "Đặt lịch tư vấn thiết kế kiến trúc và nội thất miễn phí với Q8 Design. Nhận báo giá chi tiết và thiết kế concept ban đầu trong 24h. Đội ngũ kiến trúc sư tận tâm, giàu kinh nghiệm.",
      type: "website",
      image: "https://q8design.vn/images/q8-design-consultation.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/dat-lich-tu-van",
    },
    twitter: {
      card: "summary_large_image",
      title: "Đặt lịch tư vấn Q8 Design - Thiết kế kiến trúc và nội thất miễn phí",
      description:
        "Đặt lịch tư vấn thiết kế kiến trúc và nội thất miễn phí với Q8 Design. Nhận báo giá chi tiết và thiết kế concept ban đầu trong 24h. Đội ngũ kiến trúc sư tận tâm, giàu kinh nghiệm.",
      image: "https://q8design.vn/images/q8-design-consultation.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
