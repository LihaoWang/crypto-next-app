import React from "react";

function MarketHeader() {
  return (
    <div className="text-white md:text-xl flex flex-row  py-5 px-6 justify-between ">
      <h1 className="text-neutral-400 font-bold basis-1/3 shrink-0 grow-0">
        Crypto
      </h1>
      <h1 className="text-neutral-400 font-bold basis-1/3 shrink-0 grow-0 text-center">
        Price
      </h1>
      <h1 className="text-neutral-400 font-bold basis-1/3 shrink-0 grow-0 text-right">
        Change 24H
      </h1>
    </div>
  );
}

export default MarketHeader;
