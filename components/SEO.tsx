import Head from 'next/head';

const SEO = ({
  title = 'Minimalist ✦ Concept by PARANTHESE STUDIO',
  description = 'A non-commercial concept project by Paranthese Studio, bringing to life a Dribbble design by Afterglow for the skincare brand Minimalist — exploring advanced front-end interactions and motion design.',
  image = '/images/ogimage-minimalist.webp',
  url = 'https://minimalist.paranthese.studio/',
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="#F9F8F6" name="msapplication-TileColor" />
      <meta content="#0E0E0E" name="theme-color" />
      <title>{title}</title>

      <meta content={title} name="apple-mobile-web-app-title" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
      <meta content={description} name="description" />
      <meta content="notranslate" name="google" />

      {/* OGTAGS */}
      <meta content="MINIMALIST" property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta content="en_US" property="og:locale" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={url} property="og:url" />
      <meta content="website" property="og:type" />

      {/* FAVICON */}
      <link href="/favicon/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
      <link href="/favicon/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon/favicon.ico" rel="shortcut icon" />
      <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon/site.webmanifest" rel="manifest" />

      {/* SEO */}
      <link href={url} rel="canonical" />
      <meta content="index, follow" name="robots" />
    </Head>
  );
};

export default SEO;
