import path from "path"
import { glob } from "glob"

export const resolveSourcePath = async (
  packageName: string,
): Promise<string> => {
  const distPath = ["node_modules", "@yamada-ui", packageName, "dist"]

  const paths = [
    path.join(
      "node_modules",
      ".pnpm",
      `@yamada-ui+${packageName}@*`,
      ...distPath,
    ),
    path.join(...distPath),
    path.posix.join(
      "node_modules",
      ".pnpm",
      `@yamada-ui+${packageName}@*`,
      ...distPath,
    ),
    path.posix.join(...distPath),
  ]

  const triedPaths = await Promise.all(
    paths.map(async (possiblePath) => {
      const paths = await glob(possiblePath)

      if (paths.length) return paths[0]

      return ""
    }),
  )

  const resolvedPath = triedPaths.find(Boolean)

  if (!resolvedPath)
    throw new Error(
      `Could not find ${packageName} component in @yamada-ui/react in node_modules.`,
    )

  return path.resolve(process.cwd(), resolvedPath)
}
