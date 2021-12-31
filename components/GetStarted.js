import { BsArrowRight, BsArrowDown, BsFillEyeFill } from "react-icons/bs";

import { FaCoins } from "react-icons/fa";
import { IoIosWallet } from "react-icons/io";
function GetStarted() {
  return (
    <div id="cta" className="text-white max-w-screen-lg mx-5 md:m-auto pb-5">
      <h1 className="text-4xl font-bold">Get started</h1>
      <h1 className="text-4xl font-bold">in a few minutes</h1>
      <div className="flex flex-col md:flex-row justify-between  my-10 gap-5">
        <div className="flex-1 flex flex-col bg-neutral-800 justify-center items-center px-8 py-5 rounded-xl gap-3 text-center ">
          <IoIosWallet className="text-2xl md:text-4xl" />
          <h1 className="md:text-xl text-lg">Connect a wallet</h1>
        </div>
        <BsArrowRight className="my-auto hidden md:block" />
        <BsArrowDown className="md:hidden mx-auto" />
        <div className="flex-1 flex flex-col bg-neutral-800 justify-center items-center px-8 py-5 rounded-xl gap-3 text-center">
          <FaCoins className="text-2xl md:text-4xl" />
          <h1 className="md:text-xl text-lg">
            Add a cryptocurrency to watchlist
          </h1>
        </div>
        <BsArrowRight className="my-auto hidden md:block" />
        <BsArrowDown className="md:hidden mx-auto" />
        <div className="flex-1 flex flex-col bg-neutral-800 justify-center items-center px-8 py-5 rounded-xl gap-3 text-center">
          <BsFillEyeFill className="text-2xl md:text-4xl" />
          <h1 className="md:text-xl text-lg">
            Start tracking your cryptocurrencies
          </h1>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
