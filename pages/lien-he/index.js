import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ContactPage from "../../components/q8design/ContactPage";

export default function LienHe({ meta }) {
  // JSON-LD Schema.org cho trang liên hệ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Liên hệ Q8 Design",
    "description": "Liên hệ với Q8 Design để được tư vấn thiết kế kiến trúc và nội thất miễn phí. Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Q8 Design",
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
          "availableLanguage": ["Vietnamese", "English"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ContactPoint",
          "email": "info@q8design.vn",
          "contactType": "customer service"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/q8design",
        "https://www.instagram.com/q8design"
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
        {/* JSON-LD Schema.org cho trang Liên hệ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h1 className="visually-hidden">
        Liên hệ Q8 Design - Tư vấn thiết kế kiến trúc và nội thất
      </h1>
      
      <ContactPage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Liên hệ Q8 Design - Tư vấn thiết kế kiến trúc và nội thất miễn phí",
    description:
      "Liên hệ ngay với Q8 Design để được tư vấn thiết kế kiến trúc và nội thất miễn phí. Hotline: 098 811 68 28. Email: info@q8design.vn. Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7.",
    keywords:
      "liên hệ Q8 Design, tư vấn thiết kế, hotline Q8 Design, địa chỉ Q8 Design, email Q8 Design, tư vấn miễn phí, thiết kế kiến trúc, thiết kế nội thất",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/lien-he",
    og: {
      title: "Liên hệ Q8 Design - Tư vấn thiết kế kiến trúc và nội thất miễn phí",
      description:
        "Liên hệ ngay với Q8 Design để được tư vấn thiết kế kiến trúc và nội thất miễn phí. Hotline: 098 811 68 28. Email: info@q8design.vn. Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7.",
      type: "website",
      image: "https://q8design.vn/images/q8-design-contact.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/lien-he",
    },
    twitter: {
      card: "summary_large_image",
      title: "Liên hệ Q8 Design - Tư vấn thiết kế kiến trúc và nội thất miễn phí",
      description:
        "Liên hệ ngay với Q8 Design để được tư vấn thiết kế kiến trúc và nội thất miễn phí. Hotline: 098 811 68 28. Email: info@q8design.vn. Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7.",
      image: "https://q8design.vn/images/q8-design-contact.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}