// BLOG/SANITY DISABLED: import { sanityFetch } from "@/sanity/lib/fetch";
// BLOG/SANITY DISABLED: import { postSlugsQuery } from "@/sanity/lib/queries";
import type { MetadataRoute } from "next";
import { unstable_noStore } from "next/cache";

// BLOG/SANITY DISABLED: async function getBlogPosts() {
// BLOG/SANITY DISABLED: Skip Sanity fetch if not properly configured
// BLOG/SANITY DISABLED: Sanity/blog config check removed
// return [];

// BLOG/SANITY DISABLED: Blog post fetch and error handling removed
// return [];
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // to try fix caching issue: https://github.com/vercel/next.js/discussions/56708#discussioncomment-10127496
  unstable_noStore();

  // BLOG/SANITY DISABLED: const blogPosts = await getBlogPosts();
  const blogPosts = [];

  const staticUrls = [
    {
      url: "https://www.getinboxzero.com/",
      priority: 1,
    },
    {
      url: "https://www.getinboxzero.com/bulk-email-unsubscriber",
    },
    {
      url: "https://www.getinboxzero.com/ai-automation",
    },
    {
      url: "https://www.getinboxzero.com/email-analytics",
    },
    {
      url: "https://www.getinboxzero.com/block-cold-emails",
    },
    {
      url: "https://www.getinboxzero.com/privacy",
    },
    {
      url: "https://www.getinboxzero.com/terms",
    },
    // {
    //   // BLOG/SANITY DISABLED: url: "https://www.getinboxzero.com/blog",
    //   changeFrequency: "daily",
    //   lastModified: new Date(),
    //   priority: 1,
    // },
    // {
    //   // BLOG/SANITY DISABLED: url: "https://www.getinboxzero.com/blog/post/how-my-open-source-saas-hit-first-on-product-hunt",
    // },
    // {
    //   // BLOG/SANITY DISABLED: url: "https://www.getinboxzero.com/blog/post/why-build-an-open-source-saas",
    // },
    // {
    //   // BLOG/SANITY DISABLED: url: "https://www.getinboxzero.com/blog/post/alternatives-to-skiff-mail",
    // },
    // {
    //   // BLOG/SANITY DISABLED: url: "https://www.getinboxzero.com/blog/post/best-email-unsubscribe-app",
    // },
    // {
    //   // BLOG/SANITY DISABLED: url: "https://www.getinboxzero.com/blog/post/bulk-unsubscribe-from-emails",
    // },
    // {
    //   // BLOG/SANITY DISABLED: url: "https://www.getinboxzero.com/blog/post/escape-email-trap-unsubscribe-for-good",
    // },
    {
      url: "https://docs.getinboxzero.com/",
    },
    {
      url: "https://docs.getinboxzero.com/introduction",
    },
    {
      url: "https://docs.getinboxzero.com/essentials/email-ai-automation",
    },
    {
      url: "https://docs.getinboxzero.com/essentials/bulk-email-unsubscriber",
    },
    {
      url: "https://docs.getinboxzero.com/essentials/cold-email-blocker",
    },
  ];

  // BLOG/SANITY DISABLED: Only staticUrls remain
  return [...staticUrls];
}
