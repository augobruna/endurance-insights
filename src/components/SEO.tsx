import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const DEFAULT_IMAGE = "https://humanendurancepodcast.com/og-image.png";
/** og-image.png is 1080x1080; declaring it lets crawlers lay out the card
 *  without downloading the file first. */
const DEFAULT_IMAGE_SIZE = "1080";
const TWITTER_HANDLE = "@HumanEndurance";

const SEO = ({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags,
  noindex,
  jsonLd,
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      {image === DEFAULT_IMAGE && (
        <meta property="og:image:width" content={DEFAULT_IMAGE_SIZE} />
      )}
      {image === DEFAULT_IMAGE && (
        <meta property="og:image:height" content={DEFAULT_IMAGE_SIZE} />
      )}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {author && <meta property="article:author" content={author} />}
      {tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
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
