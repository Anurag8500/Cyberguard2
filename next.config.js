/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  i18n: {
    locales: ['en', 'hi', 'bn'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
