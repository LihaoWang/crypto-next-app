import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

import Nav from "../components/Nav";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <Nav />
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
