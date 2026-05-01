import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ProjectDetailPage from "../../components/q8design/ProjectDetailPage";

export default function ProjectDetail({ meta, project, jsonLd }) {
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
      <h1 className="visually-hidden">{project?.title}</h1>
      <ProjectDetailPage project={project} />
    </DefaultLayout>
  );
}

// Helper function to normalize image URL
const normalizeImageUrl = (imageUrl, baseUrl) => {
  if (!imageUrl) return `${baseUrl}/logo-q8.png`;
  
  // Check if URL is already absolute (starts with http:// or https://)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If relative path, prepend baseUrl
  return `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};

// Helper functions
const createMeta = (project, baseUrl, slug) => {
  const imageUrl = project.mainImage || project.image;
  const normalizedImage = normalizeImageUrl(imageUrl, baseUrl);
  
  return {
    title: `${project.title} - Q8 Design`,
    description: project.description || `Chi tiết dự án ${project.title} của Q8 Design`,
    keywords: `${project.title}, ${project.tags?.join(', ') || ''}, thiết kế kiến trúc, Q8 Design`,
    robots: "index, follow",
    author: "Q8 Design",
    canonical: `${baseUrl}/du-an/${slug}`,
    og: {
      title: `${project.title} - Q8 Design`,
      description: project.description || `Chi tiết dự án ${project.title}`,
      type: "article",
      image: normalizedImage,
      imageWidth: "1200",
      imageHeight: "630",
      url: `${baseUrl}/du-an/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Q8 Design`,
      description: project.description || `Chi tiết dự án ${project.title}`,
      image: normalizedImage,
    },
  };
};

const createJsonLd = (project, baseUrl, slug) => {
  const imageUrl = project.mainImage || project.image;
  const normalizedImage = normalizeImageUrl(imageUrl, baseUrl);
  
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description || `Chi tiết dự án ${project.title}`,
    "url": `${baseUrl}/du-an/${slug}`,
    "image": normalizedImage,
    "creator": {
      "@type": "Organization",
      "name": "Q8 Design",
      "url": baseUrl,
    },
    "datePublished": project.year || "2024",
    "keywords": project.tags?.join(', ') || "thiết kế kiến trúc, Q8 Design",
    "inLanguage": "vi-VN",
  };
};

export async function getServerSideProps({ params, req }) {
  const { slug } = params;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = `${protocol}://${req.headers.host}`;
  try {
    // Lấy project đúng theo slug
    const res = await fetch(`${baseUrl}/api/projects/search?slug=${encodeURIComponent(slug)}`);
    const api = await res.json();
    const project = api?.data?.projects?.[0];
    if (!project) return { notFound: true };
    // Lấy dự án liên quan
    // Lấy nhiều hơn 3 để sau khi filter ra dự án hiện tại vẫn còn đủ 3 dự án
    const relRes = await fetch(`${baseUrl}/api/projects?category=${encodeURIComponent(project.category)}&limit=20`);
    const relData = await relRes.json();
    
    // Helper function để random shuffle array (Fisher-Yates algorithm)
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    // Filter ra dự án hiện tại, shuffle, rồi lấy 3 dự án đầu tiên
    const filteredProjects = (relData?.data?.projects || [])
      .filter(p => p.slug !== project.slug);
    
    const shuffledProjects = shuffleArray(filteredProjects);
    
    const relatedProjects = shuffledProjects
      .slice(0, 3) // Lấy 3 dự án ngẫu nhiên sau khi shuffle
      .map(({ title, slug, image, location, area, category }) => ({ title, slug, image, location, area, category }));
    return {
      props: {
        meta: createMeta(project, baseUrl, slug),
        project: { ...project, relatedProjects, createdAt: null, updatedAt: null },
        jsonLd: createJsonLd(project, baseUrl, slug),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}