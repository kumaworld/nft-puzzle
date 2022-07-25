import fs from 'fs'
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'assets/nft')

export function getAllNfts([] = []) {
    const nfts = fs.readdirSync(postsDirectory)
    return nfts
      .map((nft, index) => getNftById(index.toString()))
}

export function getNftById(index: string) {
    const fullPath = join(postsDirectory, `${index}.json`)

    const json = fs.readFileSync(fullPath, 'utf8')

    return JSON.parse(json)
}