import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import parse from "html-react-parser";
import Share from "../common/Share";
import { trimText } from "../../utils/helper";

interface FAQ {
  question: string;
  answer: string;
}

export interface PostAuthor {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatar?: string;
}

interface PostData {
  title: string;
  content: string;
  slug: string;
  category: string;
  faqs?: FAQ[];
  postAuthor?: PostAuthor;
}

interface Props {
  post: PostData;
  shareUrl: string;
  breadcrumbHref: string;
  breadcrumbLabel: string;
}

const BlogPostContent: FC<Props> = ({ post, shareUrl, breadcrumbHref, breadcrumbLabel }) => {
  const { title, content, category, faqs, postAuthor } = post;

  const processedContent = (() => {
    if (!content) return content;
    return content.replace(
      /(<figure[^>]*>[\s\S]*?<\/figure>)|<img([^>]*)>/gi,
      (match, figureTag, imgAttrs) => {
        if (figureTag) return match;
        if (!imgAttrs) return match;
        const showCaptionMatch = imgAttrs.match(/data-show-caption=["']true["']/i);
        if (!showCaptionMatch) return match;
        const altMatch = imgAttrs.match(/alt=["']([^"']+)["']/i);
        if (!altMatch || !altMatch[1]) return match;
        return `<figure><img${imgAttrs}><figcaption>${altMatch[1]}</figcaption></figure>`;
      }
    );
  })();

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          })),
        }
      : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    url: shareUrl,
    author: postAuthor && postAuthor.slug
      ? {
          "@type": "Person",
          name: postAuthor.name,
          url: `https://q8design.vn/tac-gia/${postAuthor.slug}`,
        }
      : {
          "@type": "Organization",
          name: postAuthor?.name || "Q8 Design",
          url: "https://q8design.vn",
        },
    publisher: {
      "@type": "Organization",
      name: "Q8 Design",
      url: "https://q8design.vn",
    },
  };

  return (
    <>
      <Head>
        <script
          key="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {faqSchema && (
          <script
            key="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
      </Head>

      {/* Breadcrumb */}
      <div className="flex font-bold gap-2 text-base text-gray-600">
        <Link href={breadcrumbHref} className="hover:text-blue-800 whitespace-nowrap">
          {breadcrumbLabel}
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
        <Share url={shareUrl} />
      </div>
      <div className="mt-2 uppercase text-blue-800 font-xl">
        <b>{category}</b>
      </div>

      {/* Nội dung bài viết */}
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
        {parse(
          (processedContent || content || "")
            .replace(
              /<table/gi,
              '<div class="q8-table-container" style="width: 100%; overflow-x: auto; margin: 1rem 0; border: 1px solid #e2e8f0; border-radius: 8px;"><table style="min-width: 800px !important; width: 100% !important; table-layout: auto !important; border-collapse: collapse !important;"'
            )
            .replace(/<\/table>/gi, "</table></div>")
        )}
      </div>

      {/* Phần FAQ */}
      {faqs && faqs.length > 0 && (
        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Author Card */}
      {postAuthor && (
        <div className="mt-10 border-t border-gray-200 pt-8">
          <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
            {postAuthor.avatar ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={postAuthor.avatar}
                alt={postAuthor.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#105d97] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">
                  {postAuthor.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              {postAuthor.slug ? (
                <Link
                  href={`/tac-gia/${postAuthor.slug}`}
                  className="font-bold text-gray-900 hover:text-[#105d97] transition-colors"
                >
                  {postAuthor.name}
                </Link>
              ) : (
                <span className="font-bold text-gray-900">{postAuthor.name}</span>
              )}
              {postAuthor.role && (
                <p className="text-sm text-[#105d97] mt-0.5">{postAuthor.role}</p>
              )}
              {postAuthor.bio && (
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{postAuthor.bio}</p>
              )}
              {postAuthor.slug && (
                <Link
                  href={`/tac-gia/${postAuthor.slug}`}
                  className="inline-block mt-2 text-xs text-[#105d97] hover:underline"
                >
                  Xem tất cả bài viết →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostContent;
