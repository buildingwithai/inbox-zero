import { createClient } from "next-sanity";
import { getSanityEnv } from "../env";

export function getSanityClient() {
  const env = getSanityEnv();
  if (!env) {
    throw new Error("Sanity client config is missing or invalid.");
  }
  return createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  });
}
