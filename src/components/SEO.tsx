import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const DEFAULT_IMAGE = "https://humanendurancepodcast.com/og-image.png";

const SEO = ({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  author,
  jsonLd,
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
