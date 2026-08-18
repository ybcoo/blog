import { createComment, getComment } from "~~/util/api"

export const commentHooks = () => {
    const getCommentList = async (articleId:any) => {
        try {
            const data:any = await getComment({articleId:articleId})
            
            const { result=[] } = data?? {};
            return result
        } catch (e) {
            console.error(e)
        }

    }
    const handleCreateComment = async (body:any) => {
        try {
            const {content,url,articleId}=body
            const { data, error } = await createComment({content,url,articleId})
            if (error.value) {
                console.error("Failed to fetch articles:", error.value);
            }
            // console.log('data.value',data.value)
            const { result } = data?.value ?? ({} as any);
            // console.log(result);
        } catch (e) {
            console.error(e)
        }
    }
    return { getCommentList, handleCreateComment }
}
