import { defineMcp } from "@lovable.dev/mcp-js";
import getPodcastInfo from "./tools/get_podcast_info";
import listBlogPosts from "./tools/list_blog_posts";
import getBlogPost from "./tools/get_blog_post";

export default defineMcp({
  name: "human-endurance-podcast-mcp",
  title: "Human Endurance Podcast",
  version: "0.1.0",
  instructions:
    "Public tools for the Human Endurance Podcast. Use `get_podcast_info` for show metadata, hosts, and listen links. Use `list_blog_posts` to discover blog posts on humanendurancepodcast.com, then `get_blog_post` with a slug to read one.",
  tools: [getPodcastInfo, listBlogPosts, getBlogPost],
});
