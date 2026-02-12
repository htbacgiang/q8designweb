import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import CareerPage from "../../components/q8design/CareerPage";

export default function TuyenDung({ meta }) {
  // JSON-LD Schema.org cho trang tuyển dụng
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Cơ hội nghề nghiệp tại Q8 Design",
    "description": "Tham gia đội ngũ Q8 Design - Môi trường làm việc sáng tạo, chuyên nghiệp. Tuyển dụng Kiến trúc sư, Thiết kế nội thất, Project Manager và nhiều vị trí hấp dẫn khác.",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Q8 Design",
      "sameAs": "https://q8design.vn",
      "logo": "https://q8design.vn/logo-q8.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Đ. Nam An Khánh - KĐT Nam An Khánh",
        "addressLocality": "Hà Nội",
        "addressCountry": "VN"
      }
    },
    "datePosted": "2024-01-01",
    "employmentType": ["FULL_TIME", "PART_TIME", "INTERN"],
    "industry": "Architecture and Interior Design",
    "workHours": "8:00 AM - 6:00 PM",
    "benefits": [
      "Lương thưởng cạnh tranh",
      "Bảo hiểm sức khỏe",
      "Đào tạo chuyên môn",
      "Môi trường sáng tạo",
      "Cơ hội thăng tiến"
    ]
  };

  return (
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <Head>
        {/* JSON-LD Schema.org cho trang Tuyển dụng */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h1 className="visually-hidden">
        Tuyển dụng Q8 Design - Cơ hội nghề nghiệp trong lĩnh vực thiết kế
      </h1>
      
      <CareerPage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Tuyển dụng Q8 Design - Cơ hội nghề nghiệp trong lĩnh vực thiết kế",
    description:
      "Tham gia đội ngũ Q8 Design - Môi trường làm việc sáng tạo, chuyên nghiệp với nhiều cơ hội thăng tiến. Đang tuyển dụng Kiến trúc sư, Thiết kế nội thất, Project Manager và nhiều vị trí hấp dẫn khác.",
    keywords:
      "tuyển dụng Q8 Design, việc làm thiết kế, tuyển kiến trúc sư, tuyển thiết kế nội thất, việc làm kiến trúc, career Q8 Design, job Q8 Design",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/tuyen-dung",
    og: {
      title: "Tuyển dụng Q8 Design - Cơ hội nghề nghiệp trong lĩnh vực thiết kế",
      description:
        "Tham gia đội ngũ Q8 Design - Môi trường làm việc sáng tạo, chuyên nghiệp với nhiều cơ hội thăng tiến. Đang tuyển dụng Kiến trúc sư, Thiết kế nội thất, Project Manager và nhiều vị trí hấp dẫn khác.",
      type: "website",
      image: "https://q8design.vn/images/q8-design-career.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/tuyen-dung",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tuyển dụng Q8 Design - Cơ hội nghề nghiệp trong lĩnh vực thiết kế",
      description:
        "Tham gia đội ngũ Q8 Design - Môi trường làm việc sáng tạo, chuyên nghiệp với nhiều cơ hội thăng tiến. Đang tuyển dụng Kiến trúc sư, Thiết kế nội thất, Project Manager và nhiều vị trí hấp dẫn khác.",
      image: "https://q8design.vn/images/q8-design-career.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
