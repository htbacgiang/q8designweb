  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["react-pdf", "pdfjs-dist"],
    experimental: {
      esmExternals: "loose",
    },
    webpack: (config) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "pdfjs-dist": "pdfjs-dist/legacy",
        "pdfjs-dist/build/pdf": "pdfjs-dist/legacy/build/pdf",
        "pdfjs-dist/build/pdf.worker": "pdfjs-dist/legacy/build/pdf.worker",
        "pdfjs-dist/build/pdf.mjs": "pdfjs-dist/legacy/build/pdf.js",
      };
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
      return config;
    },
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "https://q8design.vn" },
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
      ];
    },
    images: {

      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
        {
          protocol: "https",
          hostname: "images.pexels.com",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "live.staticflickr.com",
        },
        {
          protocol: "https",
          hostname: "q8design.vn",
        },
        {
          protocol: "https",
          hostname: "example.com",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
  };

  module.exports = nextConfig;
