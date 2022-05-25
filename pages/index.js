import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useQRCode } from 'next-qrcode';

export default function Home() {
  const url = useRef("")
  const [fUrl, setFUrl] = useState("https://www.youtube.com/watch?v=iik25wqIuFo")
  const [hostname, setHostname] = useState("")
  const [generate, setGenerate] = useState(false)
  const { Canvas } = useQRCode();
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    console.log(!!pattern.test(str))
    return !!pattern.test(str);
  }

  useEffect(() => {
    /// retrieve my hostname
    const host = window.location.origin
    setHostname(host)
  }, [])

  const generateHandler = () => {
    if (!url.current.includes("http")) {
      url.current = "https://" + url.current
    }
    if (validURL(url.current)) {
      setFUrl(url.current);
      setGenerate(!generate)
    }
    else {
      alert("Not valid url");
    }
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Create QR Code For Free</title>
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Enter URL below and click <span style={{ color: "#0070f3" }}>Generate</span>
        </h2>
        <input className={styles.qr_input} onChange={(e) => url.current = e.target.value} placeholder='Paste your URL' />
        <button className={styles.qr_generate_btn} onClick={generateHandler} >Generate</button>
        <div style={{ width: "max-content", outline: "3px solid #0070f3", padding: "80px 30px 30px", position: "relative" }}>
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: "50px",
            width: "100%",
            background: "#0070f3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white"
          }} > Your QR code </div>
          <Canvas
            text={`${hostname}/redirector/a?url=${fUrl}`}
            options={{
              type: 'image/png',
              quality: 0.6,
              level: "M",
              margin: 3,
              scale: 4,
              width: 200,
              // color: {
              //   dark: '#010599FF',
              //   light: '#FFBF60FF',
              // },
            }}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/asanoviskhak"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by{' '}
          <span className={styles.logo}>
            Iskhak Asanov
          </span>
        </a>
      </footer>
    </div>
  )
}
