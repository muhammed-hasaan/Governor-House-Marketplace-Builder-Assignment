import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// console.log(process.env);

if (!process.env.NEXT_PUBLIC_SANITY_TOKEN) {
  throw new Error("SANITY_TOKEN environment variable is not set");
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-03-25",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
