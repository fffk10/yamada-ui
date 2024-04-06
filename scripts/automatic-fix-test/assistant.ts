import path from "path"
import type { Assistant, AssistantTool } from "openai/resources/beta"
import { openai } from "../../libs/openai"
import { createFiles } from "./file"

const TEST_MODULE_ENDPOINT = path.join(process.cwd(), "packages", "test", "src")

const TEST_FILE_PATHS = [
  "index.ts",
  "utils.ts",
  "render.tsx",
  "focus.ts",
  "accessibility.tsx",
  "mocks/index.ts",
  "mocks/localstorage.ts",
  "mocks/match-media.ts",
  "mocks/cookie.ts",
  "mocks/image.ts",
]

export const generateAssistant = async (): Promise<Assistant> => {
  const filePaths = TEST_FILE_PATHS.map((filePath) =>
    path.join(TEST_MODULE_ENDPOINT, filePath),
  )
  const files = await createFiles(filePaths)
  const fileIds = files.map(({ id }) => id)

  const tools: AssistantTool[] = [
    { type: "code_interpreter" },
    { type: "retrieval" },
  ]

  const assistant = await openai.beta.assistants.create({
    instructions: [
      "You are an assistant that automatically creates tests for lines that are missing tests in test coverage.",
      "Have them create automated tests that don't require human intervention.",
      "The tests you create are run again and repeatedly until the results reach a certain standard.",
      "When generating test code, please observe the following guidelines:",
      "- The file provided is a package used in testing. Please import it as `@yamada-ui/test`.",
      "- The test uses vitest. So, please use the function or description provided by vitest.",
      "- The generated code will be output in tsx format. Therefore, please ensure it contains only `typescript`.",
      "- The provided test code will be executed as is. Therefore, please ensure it does not contain any code that could cause omissions or errors.",
    ].join("\n"),
    model: "gpt-4-0125-preview",
    tools,
    file_ids: fileIds,
  })

  return assistant
}
