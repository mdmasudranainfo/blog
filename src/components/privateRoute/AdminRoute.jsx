"use client";

import { authContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Loader from "../share/loader/Loader";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const { User, isLoading } = useContext(authContext);
  console.log(isLoading, User);

  if (isLoading) {
    return <Loader />;
  }
  if (User?._id) {
    return children;
  } else {
    router.push("/login");
  }
};

export default AdminRoute;
