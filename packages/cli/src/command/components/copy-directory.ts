import fs from "fs"
import path from "path"

export const copyDirectry = (sourcePath: string, outPath: string) => {
  fs.mkdirSync(outPath, { recursive: true })

  const contents = fs.readdirSync(sourcePath)

  contents.forEach((item) => {
    const sourceItemPath = path.resolve(sourcePath, item)
    const outItemPath = path.resolve(outPath, item)

    fs.stat(sourceItemPath, (_, stats) => {
      if (stats.isFile()) {
        fs.copyFileSync(sourceItemPath, outItemPath)
      } else {
        copyDirectry(sourceItemPath, outItemPath)
      }
    })
  })
}
