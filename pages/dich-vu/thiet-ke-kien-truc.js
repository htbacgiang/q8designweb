import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ArchitectureServicePage from "../../components/q8design/ArchitectureServicePage";

export default function ThietKeKienTruc({ meta }) {
  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Dịch vụ Thiết kế Kiến trúc Chuyên nghiệp tại Hà Nội", // Đã sửa
        "provider": {
          "@type": "Organization",
          "name": "Q8 Design",
          "url": "https://q8design.vn"
        },
        "description": "Q8 Design là đơn vị chuyên thiết kế kiến trúc biệt thự, nhà phố với đội ngũ KTS giàu kinh nghiệm tại Hà Nội. Liên hệ để nhận tư vấn và báo giá chi tiết, tối ưu chi phí.", // Đã sửa
        "serviceType": "Architecture Design Services",
        "areaServed": "Hà Nội", // Có thể thêm các tỉnh khác
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "VND"
          }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <ArchitectureServicePage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Dịch vụ Thiết kế Kiến trúc Chuyên nghiệp tại Hà Nội | Q8 Design",
    description:
    "Q8 Design là đơn vị chuyên thiết kế kiến trúc biệt thự, nhà phố với đội ngũ KTS giàu kinh nghiệm tại Hà Nội. Liên hệ để nhận tư vấn và báo giá chi tiết, tối ưu chi phí.",
    keywords:
      "xu hướng thiết kế kiến trúc 2026, kiến trúc xanh, thiết kế bền vững, công nghệ AI trong kiến trúc, phong cách Nhật Bản, không gian mở, thiết kế nhà phố, thiết kế biệt thự, Q8 Design, kiến trúc hiện đại, thiết kế kiến trúc chuyên nghiệp",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/dich-vu/thiet-ke-kien-truc",
    og: {
      title: "Dịch vụ Thiết kế Kiến trúc Chuyên nghiệp tại Hà Nội | Q8 Design",
      description:
      "Q8 Design là đơn vị chuyên thiết kế kiến trúc biệt thự, nhà phố với đội ngũ KTS giàu kinh nghiệm tại Hà Nội. Liên hệ để nhận tư vấn và báo giá chi tiết, tối ưu chi phí.",
      type: "website",
      image: "https://q8design.vn/images/og-thiet-ke-kien-truc.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/dich-vu/thiet-ke-kien-truc",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dịch vụ Thiết kế Kiến trúc Chuyên nghiệp tại Hà Nội | Q8 Design",
      description:
      "Q8 Design là đơn vị chuyên thiết kế kiến trúc biệt thự, nhà phố với đội ngũ KTS giàu kinh nghiệm tại Hà Nội. Liên hệ để nhận tư vấn và báo giá chi tiết, tối ưu chi phí.",
      image: "https://q8design.vn/images/og-thiet-ke-kien-truc.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}

