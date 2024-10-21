import { axiosUserInstance } from "@/services/axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { GET_APPLICANT_DOCUMENT_API, GET_SHORTLISTED_CANDIDATES_API, GET_TALENTS_API, UPLOAD_OFFER_LETTER_API } from "@/constants/api";
import type { GetDocumentQuery, GetShortlistedQuery, GetTalentsQuery, RemoveShortlistedParams, RequestDocumentParams, ShortlistCandidateParams, UploadOfferLetterParams } from "@/types/applicants";

export const getTalents = async (query: GetTalentsQuery) => {
  const res = await axiosUserInstance.get(`${GET_TALENTS_API}${createQueryString(query)}`);
  return res.data;
};

export const getTalent = async (id: string) => {
  const res = await axiosUserInstance.get(`${GET_TALENTS_API}/${id}`);
  return res.data;
};

export const getShortlisted = async (query: GetShortlistedQuery) => {
  const res = await axiosUserInstance.get(`${GET_SHORTLISTED_CANDIDATES_API}${createQueryString(query)}`);
  return res.data;
};

export const getShortlistedCandidate = async (query: GetShortlistedQuery & { talentId: string }) => {
  const { talentId, ...rest } = query
  const res = await axiosUserInstance.get(`${GET_SHORTLISTED_CANDIDATES_API}/${talentId}${createQueryString(rest)}`);
  return res.data;
};

export const shortlistCandidate = async (data: ShortlistCandidateParams) => {
  const res = await axiosUserInstance.post(GET_SHORTLISTED_CANDIDATES_API, data);
  return res.data;
};

export const removeShortlisted = async (data: RemoveShortlistedParams) => {
  const res = await axiosUserInstance.delete(`${GET_SHORTLISTED_CANDIDATES_API}/${data?.user_id}?job_id=${data?.job_id}`);
  return res.data;
};

export const getApplicantDocument = async (query: GetDocumentQuery) => {
  const { user_id, ...rest } = query
  const res = await axiosUserInstance.get(`${GET_APPLICANT_DOCUMENT_API}/${user_id}${createQueryString(rest)}`);
  return res.data;
};

export const requestDocumentAccess = async (payload: RequestDocumentParams) => {
  const res = await axiosUserInstance.post(GET_APPLICANT_DOCUMENT_API, payload);
  return res.data;
};

export const uploadOfferLetter = async (payload: UploadOfferLetterParams) => {
  const { file, application_id } = payload
  const res = await axiosUserInstance.patch(`${UPLOAD_OFFER_LETTER_API}/${application_id}`, file, {
    headers: {
      "Accept": "application/form-data",
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: payload.onUploadProgress
  });
  return res.data;
};