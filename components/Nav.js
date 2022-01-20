import { useMoralis } from "react-moralis";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";

function Nav() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const handleLogin = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is required to use the login feature");
    } else {
      await authenticate();
    }
  };
  return (
    <div className="flex flex-row px-6 py-3 justify-between items-center bg-black text-white">
      <h1 className="text-2xl font-bold">
        <Link href="/">Xchange</Link>
      </h1>
      <div className="flex flex-row ">
        {isAuthenticated ? (
          <div className="flex flex-row justify-center items-center">
            {/* <h1>{user.get("username")}</h1> */}
            <Link href="/watch-list">
              <button className="p-3 px-4  rounded-md mr-3 flex flex-row items-center gap-1  hover:bg-neutral-800">
                <AiFillEye />
                Watchlist
              </button>
            </Link>
            <button
              className="p-3 px-4  rounded-md mr-3 flex flex-row items-center gap-1  hover:bg-neutral-800"
              onClick={() => logout()}
            >
              <IoLogOut />
              Logout
            </button>
            {/* <img
              className="w-12 rounded-full"
              src={`https://avatars.dicebear.com/api/identicon/:${user.get(
                "username"
              )}.svg`}
            /> */}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="py-3 md:px-4  rounded-md  flex flex-row items-center gap-3  "
          >
            <img className="w-6" src="/metamask.svg" />
            <h1>Login</h1>
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
