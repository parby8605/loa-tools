/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-lostark.game.onstove.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
