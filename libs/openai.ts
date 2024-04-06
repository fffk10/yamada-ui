import { config } from "dotenv"
import OpenAI from "openai"

config()

export const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
})
