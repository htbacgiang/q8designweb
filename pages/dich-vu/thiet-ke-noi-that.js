import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import InteriorDesignServicePage from "../../components/q8design/InteriorDesignServicePage";

export default function ThietKeNoiThat({ meta }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dịch vụ Thiết kế Nội thất Chuyên nghiệp | Q8 Design",
    "provider": {
      "@type": "Organization",
      "name": "Q8 Design",
      "url": "https://q8design.vn"
    },
    "description": "Q8 Design – Chuyên thiết kế nội thất nhà ở, biệt thự, văn phòng và công trình thương mại. Mang đến không gian sống tinh tế, tiện nghi và đậm dấu ấn cá nhân.",
    "serviceType": "Interior Design Services",
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
        Dịch vụ Thiết kế Nội thất Chuyên nghiệp | Q8 Design
      </h1>
      <InteriorDesignServicePage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Dịch vụ Thiết kế Nội thất Cao Cấp | Q8 Design",
    description:
    "Q8 Design – Chuyên thiết kế nội thất nhà ở, biệt thự, văn phòng và công trình thương mại. Mang đến không gian sống tinh tế, tiện nghi và đậm dấu ấn cá nhân.",
    keywords:
      "thiết kế nội thất, thiết kế nội thất nhà ở, thiết kế nội thất biệt thự, thiết kế nội thất căn hộ, thiết kế nội thất văn phòng, Q8 Design, nội thất hiện đại, nội thất cao cấp, thiết kế nội thất chuyên nghiệp, xu hướng nội thất 2026",
    robots: "index, follow",
    author: "Q8 Design",
    canonical: "https://q8design.vn/dich-vu/thiet-ke-noi-that",
    og: {
      title: "Dịch vụ Thiết kế Nội thất Cao Cấp | Q8 Design",
      description:
      "Q8 Design – Chuyên thiết kế nội thất nhà ở, biệt thự, văn phòng và công trình thương mại. Mang đến không gian sống tinh tế, tiện nghi và đậm dấu ấn cá nhân.",
      type: "website",
      image: "https://q8design.vn/images/og-thiet-ke-noi-that.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://q8design.vn/dich-vu/thiet-ke-noi-that",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dịch vụ Thiết kế Nội thất Cao Cấp | Q8 Design",
      description:
      "Q8 Design – Chuyên thiết kế nội thất nhà ở, biệt thự, văn phòng và công trình thương mại. Mang đến không gian sống tinh tế, tiện nghi và đậm dấu ấn cá nhân.",
      image: "https://q8design.vn/images/og-thiet-ke-noi-that.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
