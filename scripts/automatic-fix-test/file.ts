import { createReadStream, existsSync } from "fs"
import { readdir } from "fs/promises"
import path from "path"
import { openai } from "../../libs/openai"

export const createFiles = (paths: string[]) =>
  Promise.all(
    paths.map(async (path) => {
      const file = createReadStream(path)

      const data = await openai.files.create({
        file,
        purpose: "assistants",
      })

      return { ...data, path }
    }),
  )

export const getPaths = async (targetPath: string) => {
  try {
    const dirents = await readdir(targetPath, { withFileTypes: true })

    return (
      await Promise.all(
        dirents.flatMap(async (dirent): Promise<string[] | string> => {
          const resolvedPath = path.join(targetPath, dirent.name)

          if (dirent.isDirectory()) {
            return await getPaths(resolvedPath)
          } else {
            return resolvedPath
          }
        }),
      )
    ).flat()
  } catch {
    const isExist = existsSync(targetPath)

    return isExist ? [targetPath] : []
  }
}

export const getSourcePaths = async (targetPath: string): Promise<string[]> => {
  const pathMap = targetPath.split("/")
  const targetIndex = pathMap.findIndex((name) => name === "src") + 1
  const sourcePath = "/" + path.join(...pathMap.slice(0, targetIndex))

  const paths = await getPaths(sourcePath)

  return paths
}

export const getTestPaths = async (targetPath: string): Promise<string[]> => {
  const pathMap = targetPath.split("/")
  const targetIndex = pathMap.findIndex((name) => name === "src")
  const testPath = "/" + path.join(...pathMap.slice(0, targetIndex), "tests")

  const paths = await getPaths(testPath)

  return paths
}
