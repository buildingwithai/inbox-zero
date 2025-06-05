// BLOG/SANITY DISABLED: All code in this file is disabled for build sanity.
// import type { StructureResolver } from "sanity/structure";

// // https://www.sanity.io/docs/structure-builder-cheat-sheet
// export const structure: StructureResolver = (S) =>
//   S.list()
//     .title("Blog")
//     .items([
//       S.documentTypeListItem("post").title("Posts"),
//       S.documentTypeListItem("category").title("Categories"),
//       S.documentTypeListItem("author").title("Authors"),
//       S.divider(),
//       ...S.documentTypeListItems().filter(
//         (item) =>
//           item.getId() &&
//           !["post", "category", "author"].includes(item.getId()!),
//       ),
//     ]);
//       S.documentTypeListItem("author").title("Authors"),
//       S.divider(),
//       ...S.documentTypeListItems().filter(
//         (item) =>
//           item.getId() &&
//           !["post", "category", "author"].includes(item.getId()!),
//       ),
//     ]);
