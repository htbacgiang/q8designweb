import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import db from "../../utils/db";
import Author from "../../models/Author";
import Post from "../../models/Post";

interface AuthorData {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    facebook?: string;
    zalo?: string;
    linkedin?: string;
  };
}

interface PostItem {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  meta: string;
  category: string;
  createdAt: string;
  isDirectPost: boolean;
}

interface Props {
  author: AuthorData;
  posts: PostItem[];
  meta: any;
}

const normalizeImageUrl = (
  imageUrl: string | undefined,
  baseUrl = "https://q8design.vn"
): string => {
  if (!imageUrl) return `${baseUrl}/logo-q8-01.png`;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
};

const AuthorPage: NextPage<Props> = ({ author, posts = [], meta }) => {
  if (!author) return null;

  const baseUrl = "https://q8design.vn";
  const pageUrl = `${baseUrl}/tac-gia/${author.slug}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role || "",
    image: author.avatar || "",
    url: pageUrl,
    worksFor: {
      "@type": "Organization",
      name: "Q8 Design",
      url: baseUrl,
    },
  };

  const metaTitle = `${author.name} — Tác giả tại Q8 Design`;
  const metaDesc =
    author.bio ||
    `Đọc các bài viết của ${author.name}${author.role ? `, ${author.role}` : ""} tại Q8 Design.`;

  return (
    <DefaultLayout2
      title={metaTitle}
      desc={metaDesc}
      thumbnail={author.avatar || `${baseUrl}/logo-q8-01.png`}
      meta={{
        title: metaTitle,
        description: metaDesc,
        keywords: `${author.name}, tác giả, Q8 Design, thiết kế nội thất`,
        robots: "index, follow",
        author: author.name,
        canonical: pageUrl,
        og: {
          title: metaTitle,
          description: metaDesc,
          type: "profile",
          image: author.avatar || `${baseUrl}/logo-q8-01.png`,
          imageWidth: "400",
          imageHeight: "400",
          url: pageUrl,
        },
        twitter: {
          card: "summary",
          title: metaTitle,
          description: metaDesc,
          image: author.avatar || `${baseUrl}/logo-q8-01.png`,
        },
      }}
    >
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:site_name" content="Q8 Design" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="profile:username" content={author.slug} />
        {author.socialLinks?.facebook && (
          <meta property="article:author" content={author.socialLinks.facebook} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>

      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex font-bold gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-700">
            Trang chủ
          </Link>
          <span>›</span>
          <span className="text-gray-700">{author.name}</span>
        </div>

        {/* Author Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 p-6 border-gray-100">
          {author.avatar ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={author.avatar}
              alt={author.name}
              className="w-24 h-24 rounded-full object-cover flex-shrink-0 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#105d97] flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white text-3xl font-bold">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1  sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {author.name}
            </h1>
            {author.role && (
              <p className="text-[#105d97] font-medium mt-1">{author.role}</p>
            )}
            {author.bio && (
              <p className="text-gray-600 mt-1 leading-relaxed">{author.bio}</p>
            )}
            {/* Social Links */}
            {author.socialLinks && (
              <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
                {author.socialLinks.facebook && (
                  <a
                    href={author.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Facebook
                  </a>
                )}
                {author.socialLinks.zalo && (
                  <a
                    href={author.socialLinks.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Zalo
                  </a>
                )}
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-700 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Posts List */}
        <h2 className="text-xl font-bold text-gray-800 mb-5 border-b border-gray-200 pb-2">
          Bài viết của {author.name}
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({posts?.length || 0} bài)
          </span>
        </h2>

        {!posts || posts.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            Chưa có bài viết nào.
          </p>
        ) : (
          <div className="grid gap-5">
            {posts.map((post) => {
              const href = post.isDirectPost
                ? `/${post.slug}`
                : `/bai-viet/${post.slug}`;
              return (
                <Link key={post.id} href={href} className="group flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all">
                  <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={normalizeImageUrl(post.thumbnail)}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#105d97] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.meta && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {post.meta}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(post.createdAt)
                        .toLocaleDateString("vi-VN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        .replace("tháng ", "Tháng ")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </DefaultLayout2>
  );
};

export default AuthorPage;

export const getServerSideProps: GetServerSideProps<Props, { slug: string }> =
  async ({ params }) => {
    try {
      await db.connectDb();

      const author = await Author.findOne({ slug: params?.slug });
      if (!author) return { notFound: true };

      const rawPosts = await Post.find({
        postAuthor: author._id,
        isDraft: false,
        deletedAt: null,
      })
        .sort({ createdAt: -1 })
        .select("title slug thumbnail meta category createdAt isDirectPost");

      const posts: PostItem[] = rawPosts.map((p) => ({
        id: p._id.toString(),
        title: p.title,
        slug: p.slug,
        thumbnail: p.thumbnail?.url || "",
        meta: p.meta || "",
        category: p.category || "",
        createdAt: p.createdAt.toString(),
        isDirectPost: p.isDirectPost || false,
      }));

      const authorData: AuthorData = {
        name: author.name,
        slug: author.slug,
        role: author.role || "",
        bio: author.bio || "",
        avatar: author.avatar || "",
        socialLinks: {
          facebook: author.socialLinks?.facebook || "",
          zalo: author.socialLinks?.zalo || "",
          linkedin: author.socialLinks?.linkedin || "",
        },
      };

      const baseUrl = "https://q8design.vn";
      const pageUrl = `${baseUrl}/tac-gia/${author.slug}`;
      const metaTitle = `${author.name} — Tác giả tại Q8 Design`;
      const metaDesc =
        author.bio ||
        `Đọc các bài viết của ${author.name}${author.role ? `, ${author.role}` : ""} tại Q8 Design.`;

      const meta = {
        title: metaTitle,
        description: metaDesc,
        keywords: `${author.name}, tác giả, Q8 Design, thiết kế nội thất`,
        robots: "index, follow",
        author: author.name,
        canonical: pageUrl,
        og: {
          title: metaTitle,
          description: metaDesc,
          type: "profile",
          image: author.avatar || `${baseUrl}/logo-q8-01.png`,
          imageWidth: "400",
          imageHeight: "400",
          url: pageUrl,
        },
        twitter: {
          card: "summary",
          title: metaTitle,
          description: metaDesc,
          image: author.avatar || `${baseUrl}/logo-q8-01.png`,
        },
      };

      return { props: { author: authorData, posts, meta } };
    } catch (error) {
      console.error("Error in tac-gia getServerSideProps:", error);
      return { notFound: true };
    } finally {
      await db.disconnectDb();
    }
  };
