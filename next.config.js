/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images:{
    domains: ['api-teste-123.herokuapp.com'],
  },
}

module.exports = nextConfig
