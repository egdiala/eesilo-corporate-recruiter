import { axiosUserInstance } from "@/services/axiosInstance";
import { COUNTRY_API } from "@/constants/api";

export const getCountries = async () => {
  const res = await axiosUserInstance.get(COUNTRY_API);
  return res.data;
};

export const getStatesByCountry = async (id: string) => {
  const res = await axiosUserInstance.get(`${COUNTRY_API}/${id}`);
  return res.data;
};