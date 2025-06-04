export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-09-03";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export function getSanityEnv() {
  if (!projectId || projectId === "project123" || !dataset) {
    return undefined;
  }
  return { projectId, dataset, apiVersion };
}
