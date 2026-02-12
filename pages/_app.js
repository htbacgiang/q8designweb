import "../styles/globals.css";
import "../styles/toast.css";
import "../styles/dashboard.css";
import "../styles/about-animations.css";
import "../styles/q8design.css";
import "../styles/optimized-fonts.css";
import { Rajdhani } from "next/font/google";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { createSiteNavigation } from "../utils/metaUtils";


// Optimized font configuration - only essential weights
const geogrotesque = localFont({
  src: [
    {
      path: '../public/fonts/Geogtq-Rg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geogtq-Md.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geogtq-Bd.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geogrotesque',
  display: 'swap',
});

// Satoshi font configuration - primary font for Q8 Design
const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});
  function MyApp({ Component, pageProps: { session, meta, posts, ...pageProps } }) {
  
  return (
      <>
          {meta && (
            <Head>
              <title>{meta.title}</title>
              <meta name="description" content={meta.description} />
              <meta name="keywords" content={meta.keywords} />
              <meta name="robots" content={meta.robots} />
              <meta name="author" content={meta.author} />
              <link rel="canonical" href={meta.canonical} />
              
              {/* Additional SEO meta tags */}
              <meta name="geo.region" content="VN" />
              <meta name="geo.placename" content="Hà Nội" />
              <meta name="language" content="vi" />
              <meta name="revisit-after" content="7 days" />
              <meta name="theme-color" content="#f97316" />
              <meta name="msapplication-TileColor" content="#f97316" />
              
              {/* Open Graph */}
              <meta property="og:title" content={meta.og.title} />
              <meta property="og:description" content={meta.og.description} />
              <meta property="og:type" content={meta.og.type} />
              <meta property="og:image" content={meta.og.image} />
              <meta property="og:image:width" content={meta.og.imageWidth} />
              <meta property="og:image:height" content={meta.og.imageHeight} />
              <meta property="og:image:alt" content="Q8 Design - Thiết kế kiến trúc và nội thất đẳng cấp" />
              <meta property="og:image:type" content="image/jpeg" />
              <meta property="og:url" content={meta.og.url} />
              
              {/* Twitter */}
              <meta name="twitter:card" content={meta.twitter.card} />
              <meta name="twitter:title" content={meta.twitter.title} />
              <meta name="twitter:description" content={meta.twitter.description} />
              <meta name="twitter:image" content={meta.twitter.image} />
              
              {/* JSON-LD Organization + Website */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify([
                    {
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      "@id": "https://q8design.vn/#organization",
                      "name": "Q8 Design",
                      "alternateName": "Q8 Design",
                      "url": "https://q8design.vn",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://q8design.vn/logo-q8.png",
                        "width": 200,
                        "height": 60
                      },
                      "image": "https://q8design.vn/images/og-image.jpg",
                      "description": "Q8 Design - Công ty thiết kế kiến trúc và nội thất hàng đầu Việt Nam. Chuyên thiết kế và thi công các công trình nhà ở, văn phòng, và không gian thương mại với phong cách hiện đại, tối giản.",
                      "sameAs": [
                        "https://www.facebook.com/q8design",
                        "https://www.instagram.com/q8design",
                        "https://www.linkedin.com/company/q8design"
                      ],
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
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Đ. Nam An Khánh - KĐT Nam An Khánh",
                        "addressLocality": "Hà Nội",
                        "addressRegion": "Hà Nội",
                        "postalCode": "100000",
                        "addressCountry": "VN"
                      },
                      "foundingDate": "2014",
                      "foundingLocation": {
                        "@type": "Place",
                        "name": "Hà Nội, Việt Nam"
                      },
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
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      "@id": "https://q8design.vn/#website",
                      "url": "https://q8design.vn",
                      "name": "Q8 Design",
                      "description": "Q8 Design chuyên thiết kế và thi công kiến trúc, nội thất trọn gói cho Biệt thự, Chung cư và các công trình dân dụng.",
                      "publisher": {
                        "@id": "https://q8design.vn/#organization"
                      },
                      "potentialAction": [{
                        "@type": "SearchAction",
                        "target": {
                          "@type": "EntryPoint",
                          "urlTemplate": "https://q8design.vn/search?q={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                      }],
                      "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": createSiteNavigation(posts)
                      },
                      "inLanguage": "vi-VN",
                      "copyrightYear": "2024",
                      "isPartOf": {
                        "@type": "WebSite",
                        "name": "Q8 Design",
                        "url": "https://q8design.vn"
                      }
                    }
                  ])
                }}
              />
            </Head>
          )}
          <SessionProvider session={session}>
            <div className={`${geogrotesque.variable} ${satoshi.variable} font-sans`} style={{fontFamily: 'var(--font-satoshi), var(--font-geogrotesque), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 10001 }}
              />
              <Component {...pageProps} />
            </div>
          </SessionProvider>
        </>
  );
}

export default MyApp;