import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_ACCOUNT_API } from "@/constants/api";
import type { UpdateAccountParams } from "@/types/account";

export const updateAccount = async (data: UpdateAccountParams) => {
  const res = await axiosUserInstance.put(GET_ACCOUNT_API, data);
  return res.data;
};