import '../styles/globals.css'
import { useEffect } from 'react';
import { pageview } from '/lib/gtag';


function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const handleRouteChange = url => {
      pageview(url, document.title);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  return <Component {...pageProps} />
}

export default MyApp
