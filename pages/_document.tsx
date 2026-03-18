import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <meta name="description" content="Rupor platform" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="overflow-hidden bg-dynamic-primary scrollbar">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
