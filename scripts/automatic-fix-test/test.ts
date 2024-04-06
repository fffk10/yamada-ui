import type { Assistant } from "openai/resources/beta"
import { openai } from "../../libs/openai"
import { createFiles } from "./file"

export const generateTest =
  (assistant: Assistant) =>
  async (
    targetPath: string,
    sourcePaths: string[],
    testPaths: string[],
    report: string,
  ) => {
    if (!sourcePaths.length) throw new Error("No source code")
    if (!testPaths.length) throw new Error("No test code")

    const thread = await openai.beta.threads.create()

    const sourceFiles = await createFiles(sourcePaths)
    const sourceFileIds = sourceFiles.map(({ id }) => id)
    const targetSourceFile = sourceFiles.find(({ path }) => path === targetPath)
    const targetSourceFileId = targetSourceFile?.id

    if (!targetSourceFileId) throw new Error("No target source code")

    const testFiles = await createFiles(testPaths)
    const testFileIds = testFiles.map(({ id }) => id)

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "This is tested source code.",
      file_ids: sourceFileIds,
    })

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: [
        `This is the JSON information of the lines where tests are missing for the file ID: ${targetSourceFileId}, generated from the test coverage.`,
        "```json",
        report,
        "```",
      ].join("\n"),
    })

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "This is test code used to generate test coverage.",
      file_ids: testFileIds,
    })

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: [
        `Based on the test code you provided, please create a test for the missing line in file ID: ${targetSourceFileId}.`,
        "No test instructions or guides required. Write test code that requires no human intervention.",
      ].join("\n"),
      file_ids: testFileIds,
    })

    const { status, thread_id, usage, last_error } =
      await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: assistant.id,
      })

    if (status === "completed") {
      const messages = await openai.beta.threads.messages.list(thread_id)

      for (const { role, content } of messages.data) {
        if (role !== "assistant") continue

        const data = content[0]

        if (data.type !== "text") continue

        console.log(data.text.value)
      }
    } else {
      const { code, message } = last_error ?? {}

      throw new Error(code ? `${code}: ${message}` : "An error occurred")
    }

    console.log(usage)

    return usage
  }
