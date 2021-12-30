import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import PriceCard from "../components/PriceCard";
import MarketHeader from "../components/MarketHeader";
import Footer from "../components/Footer";
export async function getServerSideProps() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins`);
  const data = await res.json();

  return { props: { data } };
}
function WatchList({ data }) {
  const { isAuthenticated, user, Moralis } = useMoralis();
  const [watchList, setWatchList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const WatchList = Moralis.Object.extend("WatchList");
  useEffect(() => {
    if (isAuthenticated) {
      getWatchList();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const newData = data.filter((coin) => {
      return watchList.includes(coin.id);
    });
    setFilteredData(newData);
  }, [watchList]);
  async function getWatchList() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    const prev = userWatchList[0].get("coins");
    setWatchList(prev);
  }

  return (
    <div className="bg-black  h-screen">
      <div className="max-w-screen-lg m-auto text-white pt-10">
        <h1 className="text-4xl text-center font-bold mb-8">My Watchlist</h1>
        <MarketHeader />
        {filteredData &&
          filteredData.map((coin) => (
            <PriceCard coinData={coin} key={coin.id} />
          ))}
        {!isAuthenticated && <h1>Please log in</h1>}

        <Footer />
      </div>
    </div>
  );
}

export default WatchList;
