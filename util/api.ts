import { useFetch } from "#app";
const isDev = false;
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
export const createComment=(body?:any)=>{
  const apiUrl = `${baseUrl}/blogApi/createComment`;
  return useFetch(apiUrl, {
    // baseUrl,
    method: "post",
    body
  });
}
export const getComment=(query?:any)=>{
  const apiUrl = `${baseUrl}/blogApi/getComment`;
  return $fetch(apiUrl, {
    // baseUrl,
    method: "get",
    params:query
  });
}
export const getResponse=(body?:any)=>{
  const apiUrl = `${baseUrl}/blogApi/getResponse`;
  return $fetch(apiUrl, {
    // baseUrl,
    method: "post",
    body
  });
}
export const checkPermit=(body?:any)=>{
  const apiUrl = `${baseUrl}/blogApi/checkPermit`;
  return $fetch(apiUrl, {
    // baseUrl,
    method: "post",
    body
  });
}