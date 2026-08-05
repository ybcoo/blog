import { useFetch } from "#app";
const isDev = true;
const baseUrl = isDev
  ? "http://localhost:3001"
  : "https://blogapi.ybcfish.cloud";
export const getExperienceArticle = () => {
  const apiUrl = `${baseUrl}/blogApi/getExperienceArticle`;
  return useFetch(apiUrl, {
    // baseUrl,
    method: "get",
  });
};
export const getArticle = (query?: any) => {
  const apiUrl = `${baseUrl}/blogApi/getArticle`;
  return useFetch(apiUrl, {
    // baseUrl,
    method: "get",
    params: query,
  });
};
export const getPublicArticle = (query?: any) => {
  const apiUrl = `${baseUrl}/blogApi/getPublicArticle`;
  return useFetch(apiUrl, {
    // baseUrl,
    method: "get",
    params: query,
  });
};