/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["developers.elementor.com"],
  },
  serverExternalPackages: ['@react-pdf/renderer'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  i18n: {
    locales: ['en', 'vi'], // Thay 'en' và 'vi' bằng các ngôn ngữ bạn muốn hỗ trợ
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
