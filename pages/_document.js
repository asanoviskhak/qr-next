import { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '/lib/gtag';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="Generate a QR Code For Free" />
                <link rel="icon" href="/favicon.ico" />
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}