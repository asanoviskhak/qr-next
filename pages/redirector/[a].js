import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head';

const Redirector = () => {
    const router = useRouter()
    const { url } = router.query
    useEffect(() => {
        if (url) {
            window.location.href = url;
        }
    }, [url])
    return (<>
        <Head>
            <title>{url}</title>
        </Head>
        <p>Redirecting to {url}</p>
    </>
    )
}

export default Redirector