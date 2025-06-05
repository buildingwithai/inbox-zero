"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
// BLOG/SANITY DISABLED: import { apiVersion, dataset, projectId } from "./sanity/env";
// BLOG/SANITY DISABLED: import { schema }  from  "./sanity/schemaTypes"; // File does not exist or is not a module
// BLOG/SANITY DISABLED: import { structure }  from  "./sanity/structure"; // File is not a module

export default defineConfig({
  basePath: "/studio",
  projectId: "disabled-project-id", // BLOG/SANITY DISABLED
  dataset: "disabled-dataset", // BLOG/SANITY DISABLED
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  // BLOG/SANITY DISABLED: schema,
  // BLOG/SANITY DISABLED: plugins: [
  //   structureTool({ structure }),
  //   // Vision is for querying with GROQ from inside the Studio
  //   // https://www.sanity.io/docs/the-vision-plugin
  //   visionTool({ defaultApiVersion: apiVersion }),
  // ],
});
