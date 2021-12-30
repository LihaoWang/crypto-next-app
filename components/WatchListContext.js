import React, { useState, useContext, useEffect } from "react";

const WatchListContext = React.createContext();
const LoginContext = React.createContext();
const setLoginContext = React.createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}
export function useLogin() {
  return useContext(LoginContext);
}
export function useSetLogin() {
  return useContext(setLoginContext);
}

export function WatchListProvider({ children }) {
  const [watchList, setWatchList] = useState([]);
  const [login, setLogin] = useState(false);

  function updateLogin() {
    setLogin((prev) => !prev);
  }
  return (
    <WatchListContext.Provider value={watchList}>
      <LoginContext.Provider value={login}>
        <setLoginContext.Provider value={updateLogin}>
          {children}
        </setLoginContext.Provider>
      </LoginContext.Provider>
    </WatchListContext.Provider>
  );
}
