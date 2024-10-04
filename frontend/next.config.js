/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['developers.elementor.com'],
  },
}

module.exports = nextConfig
