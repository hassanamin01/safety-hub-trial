/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@untitledui/react', '@untitledui/icons', '@untitledui/file-icons'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
