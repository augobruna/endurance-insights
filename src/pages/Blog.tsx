import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PostCard from "@/components/blog/PostCard";
import { posts, SITE_URL } from "@/lib/posts";

const Blog = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const f = p.frontmatter;
      return (
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        (f.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Human Endurance Podcast Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Endurance training insights, race reports, and interviews from the Human Endurance Podcast.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.frontmatter.title,
      url: `${SITE_URL}/blog/${p.frontmatter.slug}`,
      datePublished: p.frontmatter.date,
      author: { "@type": "Person", name: p.frontmatter.author },
    })),
  };

  return (
    <>
      <SEO
        title="Blog | Human Endurance Podcast"
        description="Endurance training insights, race reports, and interviews from the Human Endurance Podcast — hosted by Bruna and Fabi."
        canonical={`${SITE_URL}/blog`}
        jsonLd={jsonLd}
      />

      <main className="relative min-h-screen">
        <Navbar />

        <section className="pt-32 pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 text-primary">
              The Blog
            </p>
            <h1 className="text-5xl md:text-7xl mb-6">Human Endurance</h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Training insights, race stories, interviews, and endurance
              knowledge — written by Bruna, Fabi, and friends of the podcast.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </section>

        <section className="px-6 pb-24" aria-label="Articles">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">
                No articles match “{query}”.
              </p>
            ) : (
              filtered.map((p, i) => (
                <PostCard
                  key={p.frontmatter.slug}
                  post={p.frontmatter}
                  index={i}
                />
              ))
            )}
          </div>
        </section>

        <Footer />

        <noscript>
          <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Human Endurance Blog</h1>
            <p>Endurance training insights, race reports, and interviews.</p>
            <ul>
              {posts.map((p) => (
                <li key={p.frontmatter.slug}>
                  <a href={`/blog/${p.frontmatter.slug}`}>
                    {p.frontmatter.title}
                  </a>{" "}
                  — {p.frontmatter.description}
                </li>
              ))}
            </ul>
          </div>
        </noscript>
      </main>
    </>
  );
};

export default Blog;
