import { useFetch } from '#app'
const isDev=false
const baseUrl=isDev?'http://localhost:3001' : 'https://119494gm78gm5.vicp.fun'
export const getExperienceArticle=()=>{
    const apiUrl=`${baseUrl}/blogApi/getExperienceArticle`
    return useFetch(apiUrl,{
        // baseUrl,
        method:'get'
    })
}