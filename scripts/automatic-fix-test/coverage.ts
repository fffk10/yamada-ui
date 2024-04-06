import { readFile } from "fs/promises"
import path from "path"
// import { execa } from "execa"

const COVERAGE_PATH = path.join(process.cwd(), "coverage")

type CoverageReportSummaryResult = {
  total: number
  covered: number
  skipped: number
  pct: number
}

type CoverageReportSummaryData = {
  lines: CoverageReportSummaryResult
  functions: CoverageReportSummaryResult
  statements: CoverageReportSummaryResult
  branches: CoverageReportSummaryResult
}

type CoverageReportSummaryTotal = CoverageReportSummaryData & {
  branchesTrue: CoverageReportSummaryResult
}

type CoverageReportLocation = {
  start: { line: number; column: number }
  end: { line: number; column: number }
}

type CoverageReportStatementMap = Record<string, CoverageReportLocation>

type CoverageReportBranchMap = Record<
  string,
  {
    type: string
    line: number
    loc: CoverageReportLocation
    locations: CoverageReportLocation[]
  }
>

type CoverageReportFnMap = Record<
  string,
  {
    name: string
    decl: CoverageReportLocation
    loc: CoverageReportLocation
    line: number
  }
>

type CoverageReportData = {
  path: string
  all: boolean
  statementMap: CoverageReportStatementMap
  s: Record<string, number>
  branchMap: CoverageReportBranchMap
  b: Record<string, number[]>
  fnMap: CoverageReportFnMap
  f: Record<string, number>
}

type CoverageReport = Record<string, CoverageReportData>

type CoverageReportSummary = {
  total: CoverageReportSummaryTotal
  [key: string]: CoverageReportSummaryData
}

export const getCoverageReport = async () => {
  // await execa("pnpm", ["test:ci"])

  const report: CoverageReport = await JSON.parse(
    await readFile(path.join(COVERAGE_PATH, "coverage-final.json"), "utf-8"),
  )

  const summary: CoverageReportSummary = await JSON.parse(
    await readFile(path.join(COVERAGE_PATH, "coverage-summary.json"), "utf-8"),
  )

  return { report, summary }
}

const roundToSecondDecimal = (num: number) => Math.round(num * 100) / 100

export const getCoverage = (data: CoverageReportSummaryData) => {
  const { lines, functions, statements, branches } = data

  const totalPct =
    (lines.pct + functions.pct + statements.pct + branches.pct) / 4

  return {
    lines: roundToSecondDecimal(lines.pct),
    functions: roundToSecondDecimal(functions.pct),
    statements: roundToSecondDecimal(statements.pct),
    branches: roundToSecondDecimal(branches.pct),
    coverage: roundToSecondDecimal(totalPct),
  }
}

export const getUncoveredLines = ({
  statementMap,
  s,
  branchMap,
  b,
  fnMap,
  f,
}: CoverageReportData) => {
  const statements = Object.entries(statementMap).reduce<
    CoverageReportLocation[]
  >((prev, [key, loc]) => {
    if (s[key] === 0) prev.push(loc)

    return prev
  }, [])
  const branches = Object.entries(branchMap).reduce<CoverageReportLocation[]>(
    (prev, [key, { loc }]) => {
      if (b[key][0] === 0) prev.push(loc)

      return prev
    },
    [],
  )
  const functions = Object.entries(fnMap).reduce<CoverageReportLocation[]>(
    (prev, [key, { loc }]) => {
      if (f[key] === 0) prev.push(loc)

      return prev
    },
    [],
  )

  return { statements, branches, functions }
}
