import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import millify from "millify";
import { RiArrowLeftRightFill } from "react-icons/ri";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useMoralis } from "react-moralis";
import Footer from "../components/Footer";
export async function getServerSideProps(context) {
  const { coinid } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`);
  const data = await res.json();
  const market = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=usd&days=3`
  );
  const marketData = await market.json();

  return { props: { data, marketData } };
}

function Coinid({ data, marketData }) {
  const { isAuthenticated, user, Moralis } = useMoralis();
  const [inputValue, setInputValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [currencyRate, setCurrencyRate] = useState(
    data.market_data.current_price.usd
  );
  const [rise, setRise] = useState(data.market_data.price_change_24h > 0);
  const [coinExists, setCoinExists] = useState(false);
  const WatchList = Moralis.Object.extend("WatchList");

  useEffect(() => {
    if (user) {
      checkIfExists();
    } else {
      console.log("not logged in");
    }
  }, [isAuthenticated]);
  function handleValueChange(e) {
    setInputValue(e.target.value);
    setConvertedValue(e.target.value * currencyRate);
  }
  function handleConvertedValueChange(e) {
    setConvertedValue(e.target.value);
    setInputValue(Math.floor(e.target.value / currencyRate));
  }
  function handleCurrencyChange(e) {
    setCurrencyRate(data.market_data.current_price[e.target.value]);
    setConvertedValue(
      inputValue * data.market_data.current_price[e.target.value]
    );
  }
  async function checkIfExists() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    if (userWatchList.length > 0) {
      const watchList = userWatchList[0];
      const coins = watchList.get("coins");
      if (coins.includes(data.id)) {
        setCoinExists(true);
      }
    } else {
      const watchList = new WatchList();
      watchList.set("user", userid);
      watchList.set("coins", []);
      await watchList.save();
    }
  }
  async function addToWatch() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    const prev = userWatchList[0].get("coins");
    if (prev) {
      userWatchList[0].set("coins", [...prev, data.id]);
    } else {
      userWatchList[0].set("coins", [data.id]);
    }
    userWatchList[0].save().then(() => {
      console.log("saved");
      setCoinExists(true);
    });
  }
  async function removeFromWatch() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    const prev = userWatchList[0].get("coins");
    const filtered = prev.filter((coin) => coin !== data.id);
    userWatchList[0].set("coins", filtered);
    userWatchList[0].save().then(() => {
      console.log("saved");
      setCoinExists(false);
    });
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-screen-lg m-auto py-10 text-white">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <img className="w-16" src={data.image.large} />
            <div className="flex flex-col ml-5">
              <h1 className="text-4xl font-bold">{data.name}</h1>
              <h1 className="text-3xl text-neutral-400">{data.symbol}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-6 items-end justify-between mb-5">
          <div className="flex flex-row items-end">
            <h1 className="text-5xl">${data.market_data.current_price.usd}</h1>

            <h1
              className={`text-3xl ml-3 ${
                rise ? "text-green-600" : "text-red-600"
              }  `}
            >
              {data.market_data.price_change_percentage_24h}%
            </h1>
          </div>
          <div>
            {isAuthenticated && !coinExists && (
              <button
                className="text-white text-lg p-3 px-4 bg-slate-500 hover:bg-slate-600 rounded-lg mt-5 flex flex-row gap-2 items-center justify-center"
                onClick={addToWatch}
              >
                <AiOutlineStar />
                Add to Watchlist
              </button>
            )}
            {isAuthenticated && coinExists && (
              <button
                className="text-white text-lg p-3 px-4 bg-slate-500 hover:bg-slate-600 rounded-lg mt-5 flex flex-row gap-2 items-center justify-center"
                onClick={removeFromWatch}
              >
                <AiFillStar />
                Remove from Watchlist
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-2/3">
            <Line
              className="mt-10 w-2/3 flex-initial"
              data={{
                labels: [...Array(25).keys()],
                datasets: [
                  {
                    label: "Price",
                    data: marketData.prices.map((price) => price[1]),
                    tension: 0.5,
                    borderColor: `${rise ? "#16a34a" : "#dc2626"}`,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    display: false,
                  },
                },
              }}
            />
          </div>
          <div className="w-1/3 px-8 py-3 bg-neutral-800 rounded-xl">
            <h1 className="text-2xl text-neutral-300 my-3 font-bold">
              Changes
            </h1>
            <div className="flex flex-col ">
              <div className="flex flex-row justify-between my-3 border-t pt-3">
                <h1 className="text-neutral-300">1 Day</h1>
                <h1 className="text-2xl">
                  {data.market_data.price_change_percentage_24h}%
                </h1>
              </div>
              <div className="flex flex-row justify-between my-3 border-t pt-3">
                <h1 className="text-neutral-300">7 Days</h1>
                <h1 className="text-2xl">
                  {data.market_data.price_change_percentage_7d}%
                </h1>
              </div>
              <div className="flex flex-row justify-between my-3 border-t pt-3">
                <h1 className="text-neutral-300">1 Month</h1>
                <h1 className="text-2xl">
                  {data.market_data.price_change_percentage_30d}%
                </h1>
              </div>
              <div className="flex flex-row justify-between my-3 border-t pt-3">
                <h1 className="text-neutral-300">1 Year</h1>
                <h1 className="text-2xl">
                  {data.market_data.price_change_percentage_1y}%
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-neutral-800 p-5 rounded-xl">
          <h1 className="text-2xl text-neutral-300 mb-3 font-bold">Stats</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col ">
              <h1 className="text-neutral-300">24h High</h1>
              <h1 className="text-3xl">${data.market_data.high_24h.usd}</h1>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-neutral-300">24h Low</h1>
              <h1 className="text-3xl">${data.market_data.low_24h.usd}</h1>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-neutral-300">Market Cap</h1>
              <h1 className="text-3xl">
                ${millify(data.market_data.market_cap.usd)}
              </h1>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-neutral-300">Market Cap Rank</h1>
              <h1 className="text-3xl">
                #{millify(data.market_data.market_cap_rank)}
              </h1>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-neutral-300">Total Volume</h1>
              <h1 className="text-3xl">
                ${millify(data.market_data.total_volume.usd)}
              </h1>
            </div>
            {data.market_data.fully_diluted_valuation.usd && (
              <div className="flex flex-col ">
                <h1 className="text-neutral-300">Fully Diluted Valuation</h1>
                <h1 className="text-3xl">
                  ${millify(data.market_data.fully_diluted_valuation.usd)}
                </h1>
              </div>
            )}

            {data.market_data.total_supply && (
              <div className="flex flex-col ">
                <h1 className="text-neutral-300">Total Supply</h1>
                <h1 className="text-3xl">
                  ${millify(data.market_data.total_supply)}
                </h1>
              </div>
            )}

            <div className="flex flex-col ">
              <h1 className="text-neutral-300">Cirulating Supply</h1>
              <h1 className="text-3xl">
                ${millify(data.market_data.circulating_supply)}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-8 bg-neutral-800 mt-10 rounded-xl ">
          <h1 className="text-2xl text-neutral-300 font-bold mb-5">
            Currency Converter
          </h1>
          <form className="flex flex-row justify-center items-center">
            <div className="flex flex-row border-2 justify-center items-center p-5 text-2xl rounded-lg">
              <h1>{data.symbol}</h1>
              <input
                className="focus:outline-none  p-3 bg-neutral-800"
                onChange={handleValueChange}
                value={inputValue}
              />
            </div>
            <RiArrowLeftRightFill className="text-2xl font-bold mx-5" />
            <div className="flex flex-row border-2 justify-center items-center p-5 text-2xl rounded-lg">
              <select
                className="bg-neutral-800"
                onChange={handleCurrencyChange}
              >
                <option value="usd">usd</option>
                <option value="cny">cny</option>
              </select>

              <input
                className="focus:outline-none p-3 bg-neutral-800"
                onChange={handleConvertedValueChange}
                value={convertedValue}
              />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Coinid;
