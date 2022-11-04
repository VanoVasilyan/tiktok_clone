/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['upload.wikimedia.org', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
