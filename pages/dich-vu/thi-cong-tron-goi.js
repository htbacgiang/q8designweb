import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import FullConstructionServicePage from "../../components/q8design/FullConstructionServicePage";

export default function ThiCongTronGoi({ meta }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dịch vụ Thi công Trọn gói | Q8 Design",
    "provider": {
      "@type": "Organization",
      "name": "Q8 Design",
      "url": "https://q8design.vn"
    },
    "description": "Q8 Design – Đơn vị thi công trọn gói chuyên nghiệp từ thiết kế đến hoàn thiện. Cam kết đúng tiến độ, kiểm soát chi phí, đảm bảo chất lượng và thẩm mỹ cao nhất.",
    "serviceType": "Full Construction Services",
    "areaServed": "Vietnam",
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
      <h1 className="visually-hidden">
        Dịch vụ Thi công Trọn gói | Q8 Design
      </h1>
      <FullConstructionServicePage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Dịch vụ Thi công Trọn Gói Nhà Ở, Biệt Thự, Văn Phòng | Q8 Design",
    description:
    "Q8 Design – Đơn vị thi công trọn gói chuyên nghiệp từ thiết kế đến hoàn thiện. Cam kết đúng tiến độ, kiểm soát chi phí, đảm bảo chất lượng và thẩm mỹ cao nhất.",
    keywords:
      "thi công trọn gói, thi công nhà ở, thi công biệt thự, thi công văn phòng, Q8 Design, thi công chuyên nghiệp, thi công nội thất, xây dựng trọn gói, thi công hoàn thiện",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/dich-vu/thi-cong-tron-goi",
    og: {
      title: "Dịch vụ Thi công Trọn Gói Nhà Ở, Biệt Thự, Văn Phòng | Q8 Design",
      description:
      "Q8 Design – Đơn vị thi công trọn gói chuyên nghiệp từ thiết kế đến hoàn thiện. Cam kết đúng tiến độ, kiểm soát chi phí, đảm bảo chất lượng và thẩm mỹ cao nhất.",
      type: "website",
      image: "https://q8design.vn/images/thi-cong-trong-goi.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/dich-vu/thi-cong-tron-goi",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dịch vụ Thi công Trọn Gói Nhà Ở, Biệt Thự, Văn Phòng | Q8 Design",
      description:
      "Q8 Design – Đơn vị thi công trọn gói chuyên nghiệp từ thiết kế đến hoàn thiện. Cam kết đúng tiến độ, kiểm soát chi phí, đảm bảo chất lượng và thẩm mỹ cao nhất.",
      image: "https://q8design.vn/images/thi-cong-trong-goi.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
