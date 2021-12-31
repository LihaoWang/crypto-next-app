import { useState } from "react";
import Link from "next/link";

function PriceCard({ coinData }) {
  const [rise, setRise] = useState(coinData.market_data.price_change_24h > 0);
  return (
    <div className="flex flex-row justify-between items-center   py-4 px-5 md:py-5 md:px-6  text-white  w-full">
      <div className="basis-1/3  grow-0 shrink-0">
        <div className="flex flex-row items-center ">
          <img
            className="mr-2 md:mr-5 w-8"
            src={coinData.image.small}
            alt={coinData.id}
          />
          <Link className="" href={`/${coinData.id}`}>
            <h1 className="cursor-pointer md:text-2xl font-bold text-clip overflow-hidden">
              {coinData.name}
            </h1>
          </Link>
        </div>
      </div>
      <h1 className="md:text-2xl basis-1/3  grow-0 shrink-0 text-center">
        ${coinData.market_data.current_price.usd}
      </h1>
      <div className="basis-1/3  grow-0 shrink-0 text-right">
        {coinData.market_data.price_change_24h > 0 ? (
          <h1 className="md:text-2xl text-green-600 ">
            {coinData.market_data.price_change_percentage_24h}%
          </h1>
        ) : (
          <h1 className="md:text-2xl text-red-600 ">
            {coinData.market_data.price_change_percentage_24h}%
          </h1>
        )}
      </div>
    </div>
  );
}

export default PriceCard;
