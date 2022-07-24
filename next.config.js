const fs = require('fs');
const { join } = require('path')

const postsDirectory = join(process.cwd(), 'assets/nft')

export function getNftById(index) {
  const fullPath = join(postsDirectory, `${index}.json`)
  const json = fs.readFileSync(fullPath, 'utf8')

  return JSON.parse(json)
}

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
