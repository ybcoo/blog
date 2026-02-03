import { useFetch } from '#app'
const isDev=false
const baseUrl=isDev?'http://localhost:3001' : 'https://blogapi.ybcfish.cloud'
export const getExperienceArticle=()=>{
    const apiUrl=`${baseUrl}/blogApi/getExperienceArticle`
    return useFetch(apiUrl,{
        // baseUrl,
        method:'get'
    })
}