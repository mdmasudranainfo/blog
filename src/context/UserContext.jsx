"use client";

import { createContext } from "react";

import { fetcher } from "../utility/fetcher";
import useSWR from "swr";

export const authContext = createContext();

const UserContext = ({ children }) => {
  const {
    data: UserData,
    error,
    isLoading,
    mutate,
  } = useSWR(`${process.env.BASE_URL}/api/user/profile`, fetcher);

  const authInfo = {
    User: UserData?.data,
    isLoading,
  };

  //
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default UserContext;
