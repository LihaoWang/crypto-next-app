import React from "react";

function Hero() {
  return (
    <div className=" bg-black">
      <div className="max-w-screen-lg m-auto flex flex-row py-20">
        <div className="flex-1 text-white flex flex-col justify-center items-start">
          <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-600">
            Xchange 2.0
          </h1>
          <h1 className="font-extrabold text-8xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">
            Web3
          </h1>
          <h2 className=" font-bold text-5xl mt-3">Crypto Tracker</h2>
          <h2 className=" font-bold text-5xl mt-2">& Calculator</h2>
          <h3 className="mt-3 text-gray-400 text-2xl">
            Easily track cryptocurrencies in one place.
          </h3>
          <button className="mt-10 text-xl font-bold py-3 px-4 bg-gradient-to-b from-pink-400 to-purple-600 rounded-lg">
            Get Started
          </button>
        </div>
        <div className="flex-1">
          <img src="./coins.png" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
