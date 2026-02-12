/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://q8design.vn',
  generateRobotsTxt: false, // Tắt vì chúng ta đã có robots.txt tùy chỉnh
  sitemapSize: 7000,
  exclude: [
    '/admin/*', 
    '/dashboard/*', 
    '/api/*', 
    '/auth/*',
    '/activate',
    '/unsubscribe',
    '/cai-dat',
    '/_*', // Next.js internal pages
    '/404',
    '/500'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://q8design.vn/sitemap.xml',
      'https://q8design.vn/api/sitemap.xml'
    ],
  },
  // Cấu hình SEO tối ưu cho từng loại trang
  transform: async (config, path) => {
    // Cấu hình priority và changefreq dựa trên đường dẫn
    let priority = 0.7;
    let changefreq = 'weekly';
    
    // Trang chủ - ưu tiên cao nhất
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } 
    // Các trang bài viết - ưu tiên cao, cập nhật thường xuyên
    else if (path.includes('/bai-viet')) {
      priority = 0.9;
      changefreq = 'daily';
    }
    // Trang giới thiệu và tư vấn - quan trọng
    else if (path.includes('/gioi-thieu') || path.includes('/tu-van')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Dịch vụ và dự án - quan trọng cho business
    else if (path.includes('/dich-vu') || path.includes('/du-an')) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // Công cụ kiểm tra - tính năng chính
    else if (path.includes('/cong-cu-kiem-tra') || path.includes('/dat-lich-tu-van')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // Trang đăng ký/đăng nhập
    else if (path.includes('/dang-ky') || path.includes('/dang-nhap')) {
      priority = 0.6;
      changefreq = 'monthly';
    }
    // Trang liên hệ
    else if (path.includes('/lien-he')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // Các trang khác
    else if (path.includes('/huong-dan') || path.includes('/tuyen-dung')) {
      priority = 0.6;
      changefreq = 'monthly';
    }
    // Trang chính sách - ít quan trọng
    else if (path.includes('/bao-mat') || path.includes('/chinh-sach')) {
      priority = 0.3;
      changefreq = 'yearly';
    }
    
    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};