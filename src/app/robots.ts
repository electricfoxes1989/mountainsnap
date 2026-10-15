import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Explicitly allow search and AI/LLM crawlers (GEO): retrieval visibility in
// ChatGPT, Claude, Perplexity, Gemini and AI Overviews is intentional.
const aiRules = [
    { userAgent: "GPTBot", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "OAI-SearchBot", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "ChatGPT-User", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "ClaudeBot", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "Claude-Web", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "anthropic-ai", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "claude-searchbot", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "Google-Extended", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "GoogleOther", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "PerplexityBot", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "Perplexity-User", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "CCBot", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "Applebot", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "Applebot-Extended", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "Meta-ExternalAgent", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "Bytespider", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "cohere-ai", allow: "/",  disallow: ["/studio", "/studio/"] },
    { userAgent: "YouBot", allow: "/",  disallow: ["/studio", "/studio/"] }
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/studio/"] },
      ...aiRules,
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
