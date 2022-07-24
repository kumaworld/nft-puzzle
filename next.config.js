const fs = require('fs');
const { join } = require('path')

const postsDirectory = join(process.cwd(), 'assets/nft')

function getAllNfts([] = []) {
  const nfts = fs.readdirSync(postsDirectory)
  return nfts
    .map((nft, index) => getNftById(index.toString()))
}


module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: '.',
  images: {
    loader: "imgix",
    path: "https://noop/",
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  exportPathMap: async function () {
      let paths = {}

      const nfts = getAllNfts()

      nfts.forEach((nft, index) => {
        paths[`/puzzles/${index}`] = { page: '/puzzles', query: { id: index } }
      })

      return paths
  },
}
