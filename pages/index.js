import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useQRCode } from 'next-qrcode';

export default function Home() {
  const url = useRef("")
  const img = useRef(null)
  const [fUrl, setFUrl] = useState("https://www.youtube.com/watch?v=iik25wqIuFo")
  const [scale, setScale] = useState(4)
  const [hostname, setHostname] = useState("")
  const [generate, setGenerate] = useState(false)
  const { Image } = useQRCode();
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

  const func = (st) => {
    return st * 10 + 300
  }

  console.log(scale);

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
        <div id="qr_code_generated_image" style={{ width: "max-content", outline: "3px solid #0070f3", padding: "80px 30px 30px", position: "relative" }}>
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
          <Image
            alt={fUrl}
            text={`${hostname}/redirector/a?url=${fUrl}`}
            options={{
              type: 'image/jpeg',
              quality: 1,
              level: "H",
              margin: 2,
              scale: scale,
              width: func(scale),
              // color: {
              //   dark: '#010599FF',
              //   light: '#FFBF60FF',
              // },
            }}
          />
        </div>
        <p style={{ marginTop: "20px", marginBottom: "0px" }}>Change size</p>
        <input type="range" min="4" max="10" value={scale} onChange={(e) => setScale(+e.target.value)} />
        <button
          onClick={() => {
            //// download qr code from child img element of div with id qr_code_generated_image
            const canvas = document.createElement('canvas');
            const img = document.getElementById("qr_code_generated_image").childNodes[1];
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'qr_code.png';
            link.href = dataURL;
            link.click();
          }}
          style={{ marginTop: "20px" }}>
          Download QR code
        </button>
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
