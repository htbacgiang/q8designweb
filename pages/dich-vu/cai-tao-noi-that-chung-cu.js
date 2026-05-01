import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ApartmentRenovationServicePage from "../../components/q8design/ApartmentRenovationServicePage";

export default function CaiTaoNoiThatChungCu({ meta }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dịch vụ Cải tạo Nội thất Chung cư Chuyên nghiệp | Q8 Design",
    "provider": {
      "@type": "Organization",
      "name": "Q8 Design",
      "url": "https://q8design.vn"
    },
    "description": "Q8 Design chuyên cải tạo nội thất chung cư cũ tại Hà Nội. Đội ngũ KTS giàu kinh nghiệm, quy trình minh bạch, cam kết không phát sinh chi phí, mang lại không gian sống tiện nghi, hiện đại cho gia đình bạn.",
    "serviceType": "Apartment Renovation Services",
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
        Dịch vụ Cải tạo Nội thất Chung cư Chuyên nghiệp | Q8 Design
      </h1>
      <ApartmentRenovationServicePage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Dịch vụ Cải tạo Nội thất Chung cư Chuyên nghiệp | Q8 Design",
    description:
    "Q8 Design chuyên cải tạo nội thất chung cư cũ tại Hà Nội. Đội ngũ KTS giàu kinh nghiệm, quy trình minh bạch, cam kết không phát sinh chi phí, mang lại không gian sống tiện nghi, hiện đại cho gia đình bạn.",
    keywords:
      "cải tạo nội thất chung cư, sửa chữa căn hộ, cải tạo chung cư cũ, nâng cấp nội thất, Q8 Design, cải tạo căn hộ Hà Nội, thiết kế lại chung cư, thi công cải tạo",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/dich-vu/cai-tao-noi-that-chung-cu",
    og: {
      title: "Dịch vụ Cải tạo Nội thất Chung cư Chuyên nghiệp | Q8 Design",
      description:
      "Q8 Design chuyên cải tạo nội thất chung cư cũ tại Hà Nội. Đội ngũ KTS giàu kinh nghiệm, quy trình minh bạch, cam kết không phát sinh chi phí, mang lại không gian sống tiện nghi, hiện đại cho gia đình bạn.",
      type: "website",
      image: "https://q8design.vn/images/cai-tao-noi-that-chung-cu-q8design.webp",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/dich-vu/cai-tao-noi-that-chung-cu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dịch vụ Cải tạo Nội thất Chung cư Chuyên nghiệp | Q8 Design",
      description:
      "Q8 Design chuyên cải tạo nội thất chung cư cũ tại Hà Nội. Đội ngũ KTS giàu kinh nghiệm, quy trình minh bạch, cam kết không phát sinh chi phí, mang lại không gian sống tiện nghi, hiện đại cho gia đình bạn.",
      image: "https://q8design.vn/images/cai-tao-noi-that-chung-cu-q8design.webp",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
