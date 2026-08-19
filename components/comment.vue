<template>
    <div class="commentContainer" :class="{ 'flex-end': !props?.list?.length, 'flex-start': props?.list?.length }">
        <!-- <div class="listCnt" v-if="props?.list?.length"> -->
        <div class="itemCnt" v-for="(item, index) in props.list" :key="index">
            <div class="avatarCntSmall">
                <img :src="item.url" alt="no data" class="avatar">
            </div>
            <span class="span">{{ item.content }}</span>
        </div>
        <!-- </div> -->
        <div class="rocketCnt" ref="rocketRef">
            <div @mouseenter="isHover = true" class="rocketIcon" @click="isHover = !isHover">
                <img class="default" :src="rocket.default" alt="">
                <img class="hover" :src="rocket.hover" alt="">
            </div>

            <div class="inputCnt" :class="{ show: isHover, hidden: !isHover }">
                <div class="avatarCnt" :class="{ pointer: isHover }">
                    <img class="avatar" :src="commentUser.avatarUrl" alt="no data" @click="changeAvatar">
                </div>
                <div class="inputBox">
                    <input class="input" type="text" v-model="commentUser.inputVal" placeholder="Boost comment...">
                </div>
                <div class="smile"></div>
                <div class="iconCnt">
                    <div class="yes" :class="{ pointer: isHover }" @click="handleClickYes">
                        <img class="check" :src="yes.default" alt="">
                    </div>
                    <div class="no" :class="{ pointer: isHover }" @click="isHover = false">
                        <img class="check" :src="no.default" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { rocket } from '~/assets/icon/svg';
import { yes, no } from '~/assets/icon/svg';
import { createComment, getComment } from '~~/util/api';
import { commentHooks } from '~/hooks/commentHooks';
const {handleCreateComment,getCommentList}=commentHooks()
const props = defineProps<{
    list: any,
    articleId:any
}>()

const emit = defineEmits<{
    (e: 'update:list', value: any): any
}>()
const getAvatar = () => {
    return `https://picsum.photos/200/200?random=${Math.random()}`
}
//实则为是否显示不代表悬停
const isHover = ref(false)
// const inputVal=ref('')
// const avatarUrl = ref(getAvatar())
const commentUser = reactive<any>({
    inputVal: '',
    avatarUrl: getAvatar()
})
const rocketRef = ref<HTMLElement | null>(null)
const changeAvatar = () => {
    commentUser.avatarUrl = getAvatar()
}
const handleClickOutside = (e: MouseEvent) => {
    if (rocketRef.value && !rocketRef.value.contains(e.target as Node)) {
        isHover.value = false
    }
}
const handleClickYes = async () => {
    if (!commentUser.inputVal||commentUser.inputVal.length>50) {
        return
    }
    
        // const await createComment({ content: commentUser.inputVal, url: commentUser.avatarUrl })
    const result=await handleCreateComment({ content: commentUser.inputVal, url: commentUser.avatarUrl,articleId:props.articleId })
    
    const commentList=await getCommentList(props?.articleId)
    // console.log('udate-',commentList)
    emit('update:list',commentList)
    
    commentUser.inputVal = ''
    changeAvatar()
    isHover.value = false
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
<style lang="scss" scoped>
.listCnt {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.itemCnt {
    background-color: white;
    border-radius: 30px;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.commentContainer {
    width: 100%;
    display: flex;
    align-items: center;
    // padding: 0 20px;
    // padding-right: 25%;
}

.flex-end {
    justify-content: flex-end;
    @media (max-width: 768px) {
        // justify-content: flex-start;
    }
}

.flex-start {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: flex-start;
}

.avatarCnt {
    border-radius: 50%;
    overflow: hidden;
    display: flex;

    .avatar {
        width: 24px;
        height: 24px;
    }
}

.avatarCntSmall {
    border-radius: 50%;
    overflow: hidden;
    display: flex;

    .avatar {
        width: 20px;
        height: 20px;
    }
}

.span {
    font-size: 12px;
}

.check {
    width: 16px;
    height: 16px;
}

.iconCnt {
    display: flex;
    align-items: center;
    gap: 5px;
}

.yes {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: #abd6a6 solid 1px;
    border-radius: 50%;

}

.no {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: #c80102 solid 1px;
    border-radius: 50%;
}

.pointer {
    cursor: pointer;
}

.rocketCnt {
    display: flex;
    position: relative;

    .rocketIcon {
        display: flex;
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 4px;

        &:hover {
            background-color: rgb(255, 255, 255, 0.5);
            cursor: pointer;

            .default {
                opacity: 0;
                transition: opacity .25s ease;
            }

            .hover {
                opacity: 1;
                transition: opacity .25s ease;
            }

            // transform: translateY(-2px) scale(1.1);
        }
    }

    .inputCnt {
        background-color: white;
        border-radius: 30px;
        padding: 8px;
        position: absolute;
        display: flex;
        align-items: center;
        top: 40px;
        justify-content: space-between;
        transition:
            opacity .5s ease,
            transform .5s ease;

        .inputBox {
            display: flex;
            padding: 0 8px;
        }

        .input {
            border: none;
            outline: none;
            font-size: 12px;
        }
    }

    .show {
        opacity: 1;
        transform: translateY(0);
    }

    .hidden {
        opacity: 0;
        transform: translateY(-10px);
    }

    .default {
        position: absolute;
        padding: 8px;
        // left: 0;
        // right: 0;
        // top: 0;
        // bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
    }

    .hover {
        position: absolute;
        padding: 8px;
        width: 100%;
        height: 100%;
        opacity: 0;
        // left: 0;
        // right: 0;
        // top: 0;
        // bottom: 0;
    }


}
</style>
