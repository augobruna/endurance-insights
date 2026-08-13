import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PostMeta from "@/components/blog/PostMeta";
import { getPostBySlug, getAdjacentPosts, SITE_URL } from "@/lib/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/blog" replace />;

  const post = getPostBySlug(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const { frontmatter: f, Component } = post;
  const { prev, next } = getAdjacentPosts(slug);
  const canonical = f.canonical ?? `${SITE_URL}/blog/${f.slug}`;
  const image = f.cover ? `${SITE_URL}${f.cover}` : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: f.title,
    description: f.description,
    image: image ? [image] : undefined,
    datePublished: f.date,
    author: { "@type": "Person", name: f.author },
    publisher: {
      "@type": "Organization",
      name: "Human Endurance Podcast",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <SEO
        title={`${f.title} | Human Endurance Podcast`}
        description={f.description}
        canonical={canonical}
        image={image}
        type="article"
        publishedTime={f.date}
        author={f.author}
        jsonLd={jsonLd}
      />

      <main className="relative">
        <Navbar />

        <article className="pt-28 pb-24">
          <header className="px-6 max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              {f.title}
            </h1>
            <PostMeta post={f} />
          </header>

          {f.cover && (
            <div className="my-10 px-6">
              {/* Podcast episode art is square while race photos are wide, so the
                  hero contains rather than crops — a 16/9 cover would cut the
                  guest's name off the square artwork. */}
              <div className="max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-2xl bg-card border border-border">
                <img
                  src={f.cover}
                  alt={f.coverAlt ?? f.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )}

          <div className="px-6 max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-[Roca_One] prose-headings:tracking-wide prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-primary prose-img:rounded-xl">
              <Component />
            </div>

            {f.substackUrl && (
              <p className="mt-10 text-sm text-muted-foreground">
                Originally published on{" "}
                <a
                  href={f.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Substack
                </a>
                . Subscribe there to get new posts by email.
              </p>
            )}

            <div className="mt-16 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Listen to the podcast</p>
                  <p className="text-sm text-muted-foreground">
                    New episodes weekly on Spotify, Apple, and YouTube.
                  </p>
                </div>
              </div>
              <Link
                to="/#listen"
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Where to listen
              </Link>
            </div>

            {(prev || next) && (
              <nav
                aria-label="More articles"
                className="mt-12 grid sm:grid-cols-2 gap-4"
              >
                {prev ? (
                  <Link
                    to={`/blog/${prev.frontmatter.slug}`}
                    className="group rounded-xl border border-border p-5 hover:border-primary/50 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 inline-flex items-center gap-1">
                      <ArrowLeft className="h-3 w-3" /> Previous
                    </p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {prev.frontmatter.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    to={`/blog/${next.frontmatter.slug}`}
                    className="group rounded-xl border border-border p-5 hover:border-primary/50 transition-colors sm:text-right"
                  >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 inline-flex items-center gap-1 sm:justify-end w-full">
                      Next <ArrowRight className="h-3 w-3" />
                    </p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {next.frontmatter.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
};

export default BlogPost;
