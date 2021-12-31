import Head from "next/head";
import PriceCard from "../components/PriceCard";
import Hero from "../components/Hero";
import MarketHeader from "../components/MarketHeader";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.coingecko.com/api/v3/coins`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
export default function Home({ data }) {
  const [currData, setCurrData] = useState(data.slice(0, 5));
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  function loadMore() {
    if (currData.length < data.length) {
      setCurrData(data);
      executeScroll();
    } else {
      setCurrData(data.slice(0, 5));
      executeScroll();
    }
  }
  return (
    <div className="bg-black pb-10">
      <Hero />
      <div className="max-w-screen-lg m-auto">
        <div ref={myRef} className="rounded-xl bg-neutral-800">
          <MarketHeader />
          {currData &&
            currData.map((coin) => <PriceCard coinData={coin} key={coin.id} />)}
        </div>
        <div className="flex flex-row justify-center">
          <button
            onClick={loadMore}
            className="text-white my-8 text-xl font-bold py-3 px-4 bg-neutral-800 rounded-lg mx-auto"
          >
            {currData.length < data.length ? "Load more" : "Show less"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
