import path from "path"
import * as p from "@clack/prompts"
import c from "chalk"
import type { DefaultOptions } from "../../utils"
import { getConfig } from "../../utils/config"
import { copyDirectry } from "./copy-directory"
import { resolveSourcePath } from "./resolve-source-path"

type Options = DefaultOptions & {}

export default (hex: string) =>
  async (componentNames: string[], { cwd, config: configPath }: Options) => {
    p.intro(c.hex(hex)(`Generating Yamada UI components`))

    const s = p.spinner()

    try {
      const start = process.hrtime.bigint()

      const config = await getConfig(cwd, configPath)
      const dirPath = config.options.dirPath

      for (const componentName of componentNames) {
        s.start(`Generating the ${componentName}`)

        const sourcePath = await resolveSourcePath(componentName)
        const outputPath = path.resolve(process.cwd(), dirPath, componentName)
        copyDirectry(sourcePath, outputPath)

        p.note(componentName, "Component name")

        s.stop(`Generated the ${componentName}`)
      }

      const end = process.hrtime.bigint()
      const duration = (Number(end - start) / 1e9).toFixed(2)

      p.outro(c.green(`Done in ${duration}s\n`))
    } catch (e) {
      s.stop(`An error occurred`, 500)

      p.cancel(c.red(e instanceof Error ? e.message : "Message is missing"))
    }
  }
