import { axiosCountryInstance } from "@/services/axiosInstance";
import { COUNTRY_API } from "@/constants/api";

export const getCountries = async () => {
  const res = await axiosCountryInstance.get(COUNTRY_API);
  return res.data;
};

export const getStatesByCountry = async (id: string) => {
  const res = await axiosCountryInstance.get(`${COUNTRY_API}/${id}/states`);
  return res.data;
};

export const getCitiesByStateAndCountry = async (payload: { country: string; state: string; }) => {
  const res = await axiosCountryInstance.get(`${COUNTRY_API}/${payload.country}/states/${payload.state}/cities`);
  return res.data;
};