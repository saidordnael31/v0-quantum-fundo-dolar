/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desativar completamente a geração estática
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Desativar a otimização de imagens para simplificar
  images: {
    unoptimized: true,
  },
  // Desativar a pré-renderização estática para todas as páginas
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Adicionar configurações para melhorar a estabilidade
  poweredByHeader: false,
  reactStrictMode: false,
  swcMinify: true,
}

export default nextConfig
