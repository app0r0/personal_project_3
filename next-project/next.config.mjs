/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Next.js のビルド成果物 (JS/CSS chunks) は内容ハッシュ付きなので永続キャッシュ可
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // public/ の静的ファイル (SVG, JS など)
        source: '/:path*\\.(svg|ico|png|jpg|jpeg|gif|webp|woff|woff2|js)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
