// import { Post } from "@/app/blog/post/[slug]/Post";
// import type { Post as PostType } from "@/app/blog/types";
// BLOG/SANITY DISABLED: import { client } from "@/sanity/lib/client";
// BLOG/SANITY DISABLED: import { sanityFetch } from "@/sanity/lib/fetch";
// BLOG/SANITY DISABLED: import { postPathsQuery, postQuery } from "@/sanity/lib/queries";
import { captureException } from "@/utils/error";
// BLOG/SANITY DISABLED: import imageUrlBuilder from "@sanity/image-url";
import type { ResolvingMetadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  // BLOG/SANITY DISABLED: Sanity/blog config check removed
  // if (!sanityEnv || !sanityEnv.projectId || sanityEnv.projectId === "project123") {
  return [];
  // }
  // const posts = await client.fetch(postPathsQuery); // client is commented out
  // return posts;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
) {
  const params = await props.params;
  // Post is always undefined as Sanity is disabled
  const post = undefined;

  // BLOG/SANITY DISABLED: Original fetch logic commented
  // const post = await sanityFetch<PostType>({
  //   query: postQuery,
  //   params,
  // });

  if (!post) {
    // This will always be true
    // BLOG/SANITY DISABLED: captureException logic commented as post is always undefined here in disabled state
    // captureException(new Error(`Post not found. Slug: ${params.slug}`), {
    //   extra: {
    //     params,
    //     // query: postQuery, // postQuery import might be commented
    //   },
    // });
    return {
      // Return default metadata for disabled state
      title: "Blog Post Unavailable",
      description: "This blog post is currently disabled.",
      alternates: { canonical: `/blog/post/${params.slug}` },
    };
  }

  // BLOG/SANITY DISABLED: Original metadata generation using post data commented
  // const previousImages = (await parent).openGraph?.images || [];
  // const builder = imageUrlBuilder(client); // client import is commented out
  // const imageUrl = post.mainImage
  //   ? builder
  //       .image(post.mainImage)
  //       .auto("format")
  //       .fit("max")
  //       .width(1200)
  //       .height(630)
  //       .url()
  //   : undefined;
  // return {
  //   title: post.title, // post is undefined
  //   description: post.description ?? "", // post is undefined
  //   alternates: { canonical: `/blog/post/${params.slug}` },
  //   openGraph: {
  //     images: imageUrl ? [imageUrl, ...previousImages] : previousImages,
  //   },
  // };

  // Fallback return, should be unreachable if the !post block correctly returns.
  return {
    title: "Blog Post",
    alternates: { canonical: `/blog/post/${params.slug}` },
  };
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// BLOG/SANITY DISABLED: Blog post page is disabled for build sanity.
export default function Page() {
  return <div>Blog post is disabled.</div>;
}

// BLOG/SANITY DISABLED: All code below is commented out for build sanity and easy restoration.
/*
  const params = await props.params;
  // BLOG/SANITY DISABLED: Blog post fetch removed
  const post = undefined;

  if (!post) {
    return <div>// BLOG/SANITY DISABLED: Blog post content unavailable.</div>;
  }

  // ...rest of file omitted for disablement
*/
//   return <Post post={post} />;
// }
