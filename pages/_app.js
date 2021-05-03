import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  pageProps.test = "global data...";
  return <Component {...pageProps} />;
}

export default MyApp;
