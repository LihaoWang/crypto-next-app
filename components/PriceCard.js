import React from "react";

function PriceCard({ coinData }) {
  return (
    <div className="flex flex-row justify-between items-center mb-10 bg-slate-100 py-5 px-8">
      <div className="flex flex-row items-center">
        <img className="mr-5" src={coinData.image.small} alt={coinData.id} />
        <div>
          <h1 className="text-3xl font-bold">{coinData.name}</h1>
          {coinData.market_data.price_change_24h > 0 ? (
            <h1 className="text-xl text-green-600">
              +{coinData.market_data.price_change_24h}
            </h1>
          ) : (
            <h1 className="text-xl text-red-600">
              {coinData.market_data.price_change_24h}
            </h1>
          )}
        </div>
      </div>
      <h1 className="text-3xl mr-5">
        ${coinData.market_data.current_price.usd}
      </h1>
    </div>
  );
}

export default PriceCard;
