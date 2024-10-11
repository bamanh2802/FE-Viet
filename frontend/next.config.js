/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['developers.elementor.com'],
  },
  webpack: (config) => {
   config.resolve.alias.canvas = false;
    
   return config;
  },
}

module.exports = nextConfig
