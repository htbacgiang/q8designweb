import {
  GetServerSideProps,
  NextPage,
} from "next";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import DefaultLayout2 from "../components/layout/DefaultLayout2";
import db from "../utils/db";
import Post from "../models/Post";
import Share from "../components/common/Share";
import Link from "next/link";
import { trimText } from "../utils/helper";
import SidebarCTAForm from "../components/q8design/SidebarCTAForm";
import { useProjects } from "../hooks/useProjects";
import SafeImage from "../components/common/SafeImage";
import { FaMapMarkerAlt, FaRuler, FaCube } from "react-icons/fa";

type PostData = {
  id: string;
  title: string;
  content: string;
  meta: string;
  tags: string[];
  slug: string;
  thumbnail: string;
  createdAt: string;
  category: string;
  recentPosts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail?: string;
    createdAt: string;
    isDirectPost?: boolean;
  }[];
};

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  author: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};

type Props = {
  post?: PostData;
  meta?: MetaData;
};

// Helper function to normalize image URL
const normalizeImageUrl = (imageUrl: string | undefined, baseUrl: string = "https://q8design.vn"): string => {
  if (!imageUrl) return `${baseUrl}/logo-q8-01.png`;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};

const DirectPost: NextPage<Props> = ({ post, meta }) => {
  const { projects = [] } = useProjects({
    limit: 15,
    page: 1,
    sort: "createdAt",
    order: "desc",
  });

  const [sidebarProjects, setSidebarProjects] = useState<any[]>([]);

  useEffect(() => {
    if (projects.length > 0 && sidebarProjects.length === 0) {
      const shuffled = [...projects].sort(() => 0.5 - Math.random());
      setSidebarProjects(shuffled.slice(0, 3));
    }
  }, [projects, sidebarProjects.length]);

  const filterCategories = [
    { id: "apartment", name: "Căn hộ" },
    { id: "townhouse", name: "Nhà phố" },
    { id: "villa", name: "Biệt thự - vila" },
    { id: "office", name: "Văn phòng" },
  ];

  if (!post) {
    const errorMeta = {
      title: "Bài viết không tồn tại | Q8 Design",
      description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
      keywords: "bài viết không tồn tại, Q8 Design",
      robots: "noindex, follow",
      author: "Q8 Design",
      canonical: "https://q8design.vn",
      og: {
        title: "Bài viết không tồn tại | Q8 Design",
        description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa",
        type: "website",
        image: "https://q8design.vn/logo-q8-01.png",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://q8design.vn",
      },
      twitter: {
        card: "summary_large_image",
        title: "Bài viết không tồn tại | Q8 Design",
        description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa",
        image: "https://q8design.vn/logo-q8-01.png",
      },
    };

    return (
      <DefaultLayout2
        title={errorMeta.title}
        desc={errorMeta.description}
        thumbnail={errorMeta.og.image}
        meta={errorMeta}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Bài viết không tồn tại</h1>
            <p className="text-gray-600 mt-2">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </DefaultLayout2>
    );
  }

  const { title, content, meta: postMeta, slug, thumbnail, category, createdAt, recentPosts } = post;
  const host = "https://q8design.vn";


  // Xử lý content để thêm figcaption cho ảnh có data-show-caption="true"
  const processedContent = (() => {
    if (!content) return content;
    let processed = content;
    processed = processed.replace(
      /(<figure[^>]*>[\s\S]*?<\/figure>)|<img([^>]*)>/gi,
      (match, figureTag, imgAttrs) => {
        if (figureTag) return match;
        if (!imgAttrs) return match;
        const showCaptionMatch = imgAttrs.match(/data-show-caption=["']true["']/i);
        if (!showCaptionMatch) return match;
        const altMatch = imgAttrs.match(/alt=["']([^"']+)["']/i);
        if (!altMatch || !altMatch[1]) return match;
        const altText = altMatch[1];
        return `<figure><img${imgAttrs}><figcaption>${altText}</figcaption></figure>`;
      }
    );
    return processed;
  })();

  return (
    <DefaultLayout2
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Main Content - 75% width on md and up */}
          <div className="w-full md:w-3/4 pr-0 md:pr-4 mb-4 md:mb-0 overflow-visible">
            <div className="md:pb-20 pb-6 container mx-auto">
              {/* Breadcrumb - 2 cấp: Trang chủ › Tiêu đề */}
              <div className="flex font-bold gap-2 text-base text-gray-600">
                <Link href="/" className="hover:text-blue-800 whitespace-nowrap">
                  Trang chủ
                </Link>
                <span>›</span>
                <span className="flex font-bold gap-2 mb-4 text-base text-gray-600">
                  {trimText(title, 35)}
                </span>
              </div>

              {/* Tiêu đề bài viết */}
              <h1 className="md:text-3xl text-xl font-bold text-primary-dark dark:text-primary">
                {title}
              </h1>
              <div className="mt-2 mb-2">
                <Share url={`${host}/${slug}`} />
              </div>
              <div className="mt-2 uppercase text-blue-800 font-xl">
                <b>{category}</b>
              </div>
              <div className="blog prose prose-lg dark:prose-invert [&_img]:mx-auto overflow-visible">
                <style jsx>{`
                  .blog {
                    overflow: visible;
                  }
                  .blog img {
                    display: block;
                    margin: 1.5em auto;
                  }
                  .blog figure {
                    margin: 1.5em 0;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  }
                  .blog figure img {
                    display: block;
                    margin: 0 auto;
                  }
                  .blog figcaption {
                    margin-top: 0.5em;
                    font-size: 0.875em;
                    color: #6b7280;
                    font-style: italic;
                    text-align: center;
                    width: 100%;
                    max-width: 100%;
                  }
                `}</style>
                {parse((processedContent || content || '')
                  .replace(/<table/gi, '<div class="q8-table-container" style="width: 100%; overflow-x: auto; margin: 1rem 0; border: 1px solid #e2e8f0; border-radius: 8px;"><table style="min-width: 800px !important; width: 100% !important; table-layout: auto !important; border-collapse: collapse !important;"')
                  .replace(/<\/table>/gi, '</table></div>'))}
              </div>
            </div>
          </div>

          {/* CTA Form Section - 25% width on md and up */}
          <div className="w-full md:w-1/4 px-0.5 pl-3 lg:pl-6">
            <div className="pt-5 sticky top-24 space-y-8">
              <SidebarCTAForm />

              {/* Dự án tiêu biểu */}
              {sidebarProjects && sidebarProjects.length > 0 && (
                <div className="sidebar-projects">
                  <p className="text-2xl flex items-center font-bold text-primary-dark dark:text-primary mb-4 border-b border-gray-200 pb-2">
                    Dự án tiêu biểu
                  </p>
                  <div className="flex flex-col gap-4 space-y-2 mt-2">
                    {sidebarProjects.map((project: any, index: number) => (
                      <Link key={project._id || project.id} href={`/du-an/${project.slug}`} className="group block">
                        <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer">
                          <div className="absolute inset-0">
                            <SafeImage
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              priority={index < 3}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/80 transition-all duration-500"></div>
                          <div className="absolute top-2 left-2 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full text-[10px] font-semibold shadow-sm">
                              {filterCategories.find((cat) => cat.id === project.category)?.name || project.category}
                            </span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="text-center px-4 max-w-sm">
                              <h3 className="text-white font-bold text-sm mb-1.5 drop-shadow-md">
                                {project.title}
                              </h3>
                              <div className="flex flex-col items-center justify-center text-white/90 text-[11px] space-y-0.5">
                                <span className="flex items-center">
                                  <FaMapMarkerAlt className="mr-1.5 text-[#c4a77d]" />
                                  {project.location}
                                </span>
                                <span className="flex items-center">
                                  <FaRuler className="mr-1.5 text-[#c4a77d]" />
                                  {project.area}
                                </span>
                              </div>
                            </div>
                          </div>
                          {project.has3D && (
                            <div className="absolute top-2 right-2 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                              <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                                <FaCube className="text-q8-primary-900 text-[10px]" />
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout2>
  );
};

export default DirectPost;

export const getServerSideProps: GetServerSideProps<
  { post: PostData; meta: MetaData },
  { slug: string }
> = async ({ params }) => {
  try {
    await db.connectDb();

    const baseUrl = "https://q8design.vn";

    // Chỉ lấy bài viết isDirectPost=true, đã publish, chưa bị xóa
    const post = await Post.findOne({
      slug: params?.slug,
      isDirectPost: true,
      isDraft: false,
      deletedAt: null,
    });

    if (!post) {
      return { notFound: true };
    }

    const posts = await Post.find({
      _id: { $ne: post._id },
      isDraft: false,
      deletedAt: null,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("slug title thumbnail category createdAt isDirectPost");

    const recentPosts = posts.map((p) => {
      const thumbUrl = p.thumbnail?.url;
      const normalizedThumbnail = normalizeImageUrl(thumbUrl, baseUrl);
      return {
        id: p._id.toString(),
        title: p.title,
        slug: p.slug,
        category: p.category || "Uncategorized",
        thumbnail: normalizedThumbnail,
        createdAt: p.createdAt.toString(),
        isDirectPost: p.isDirectPost || false,
      };
    });

    const { _id, title, content, meta, slug, tags, thumbnail, category, createdAt } = post;
    const thumbnailUrl = normalizeImageUrl(thumbnail?.url, baseUrl);

    const metaData: MetaData = {
      title: `${title} | Q8 Design`,
      description: meta || `Đọc bài viết "${title}" về thiết kế nội thất từ chuyên gia Q8 Design.`,
      keywords: `${title}, thiết kế nội thất, Q8 Design, kiến trúc, trang trí nhà, ${category}`,
      robots: "index, follow",
      author: "Q8 Design",
      canonical: `${baseUrl}/${slug}`,
      og: {
        title: `${title} | Q8 Design`,
        description: meta || `Đọc bài viết "${title}" về thiết kế nội thất từ chuyên gia Q8 Design`,
        type: "article",
        image: thumbnailUrl,
        imageWidth: "1200",
        imageHeight: "630",
        url: `${baseUrl}/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Q8 Design`,
        description: meta || `Đọc bài viết "${title}" về thiết kế nội thất từ chuyên gia Q8 Design`,
        image: thumbnailUrl,
      },
    };

    const postData: PostData = {
      id: _id.toString(),
      title,
      content,
      meta,
      slug,
      tags,
      category,
      thumbnail: thumbnailUrl,
      createdAt: createdAt.toString(),
      recentPosts,
    };

    return {
      props: {
        post: postData,
        meta: metaData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps (direct post):", error);
    return { notFound: true };
  }
};
