// import createImageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// import { dataset, projectId } from "../env";

// // https://www.sanity.io/docs/image-url
// const builder = createImageUrlBuilder({ projectId, dataset });

// export const urlFor = (source: SanityImageSource) => {
//   return builder.image(source);
// };

// Placeholder for disabled Sanity image functionality
export const urlFor = (source: any) => {
  console.warn(
    "Sanity 'urlFor' function is disabled. Returning empty string for source:",
    source,
  );
  return ""; // Return an empty string or a placeholder image URL
};
