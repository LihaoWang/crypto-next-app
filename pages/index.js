import Head from "next/head";
import PriceCard from "../components/PriceCard";
import Hero from "../components/Hero";
import MarketHeader from "../components/MarketHeader";
import Footer from "../components/Footer";
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.coingecko.com/api/v3/coins`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
export default function Home({ data }) {
  return (
    <div className="bg-black pb-10">
      <Hero />
      <div className="max-w-screen-lg m-auto">
        <div className="rounded-xl bg-neutral-800">
          <MarketHeader />
          {data.map((coin) => (
            <PriceCard coinData={coin} key={coin.id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
