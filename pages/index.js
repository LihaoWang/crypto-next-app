import Head from "next/head";
import PriceCard from "../components/PriceCard";
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
    <div className="max-w-screen-lg m-auto">
      <h1 className="text-3xl font-bold">Crypto Land</h1>

      {data.map((coin) => (
        <PriceCard coinData={coin} key={coin.id} />
      ))}
    </div>
  );
}
