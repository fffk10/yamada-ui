import * as p from "@clack/prompts"
import c from "chalk"
import ListIt from "list-it"
import { generateAssistant } from "./assistant"
import { getCoverage, getCoverageReport, getUncoveredLines } from "./coverage"
import { getSourcePaths, getTestPaths } from "./file"
import { generateTest } from "./test"

const list = new ListIt({
  headerColor: "gray",
  headerUnderline: true,
})

const PASS_COVERAGE = 95

const main = async () => {
  p.intro(c.magenta(`Fixing the test by AI`))

  const s = p.spinner()

  try {
    const start = process.hrtime.bigint()

    s.start(`Getting the coverage report`)

    const { report, summary } = await getCoverageReport()

    s.stop(`Got the coverage report`)

    const { total, ...files } = summary

    const coverage = getCoverage(total)

    p.note(list.d([coverage]).toString(), "Coverage report total")

    s.start(`Generating the test assistant`)

    const assistant = await generateAssistant()

    s.stop(`Generated the test assistant`)

    s.start(`Fixing the test`)

    await Promise.all(
      Object.entries(files).map(async ([path, data]) => {
        const shortPath = path.replace(`${process.cwd()}/packages/`, "")
        const { coverage } = getCoverage(data)

        if (coverage > PASS_COVERAGE) return

        if (shortPath !== "components/accordion/src/accordion-item.tsx") return

        const sourcePaths = await getSourcePaths(path)
        const testPaths = await getTestPaths(path)

        const uncoveredLines = getUncoveredLines(report[path])

        await generateTest(assistant)(
          path,
          sourcePaths,
          testPaths,
          JSON.stringify(uncoveredLines),
        )

        return
      }),
    )

    s.stop(`Fixed the test`)

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}

main()
