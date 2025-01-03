import { FetchedAccount } from "@/types/account";

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  return true;
};

export const getAdminData = () => {
  const user = JSON.parse(localStorage.getItem("user") as string) as FetchedAccount;
  
  return user;
};