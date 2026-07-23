import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_podcast_info",
  title: "Get podcast info",
  description:
    "Return show metadata for the Human Endurance Podcast: description, hosts, and where to listen (Spotify, Apple Podcasts, YouTube).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Human Endurance Podcast",
      tagline: "Redefining Limits",
      description:
        "Endurance sports podcast exploring the science and stories behind human performance. Expert Series with specialists in sports science, nutrition, and coaching. Guest Series with real athletes doing extraordinary things while balancing everyday life.",
      website: "https://humanendurancepodcast.com",
      hosts: [
        {
          name: "Bruna",
          role: "Runner, Coach, and Co-founder of Augo Training",
          instagram: "https://www.instagram.com/justbrunathings/",
        },
        {
          name: "Fabi",
          role: "Triathlete, Coach, and Co-founder of Augo Training",
          instagram: "https://www.instagram.com/endurance_fabi/",
        },
      ],
      listen: {
        spotify: "https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb",
        applePodcasts:
          "https://podcasts.apple.com/us/podcast/human-endurance/id1729061731",
        youtube: "https://www.youtube.com/@HumanEndurance",
      },
      social: {
        instagram: "https://www.instagram.com/humanendurancepodcast/",
        substack: "https://justbrunathings.substack.com/",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
