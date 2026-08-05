<template>
    <div class="commentContainer">
        <div class="rocketCnt" ref="rocketRef">
            <div  @mouseenter="isHover=true" class="rocketIcon"  @click="isHover=!isHover">
                <img class="default" :src="rocket.default" alt="">
                <img class="hover" :src="rocket.hover" alt="">
            </div>

            <div class="inputCnt"  :class="{show:isHover,hidden:!isHover}">
                <div class="avatarCnt" :class="{pointer:isHover}">
                    <img class="avatar" :src="avatarUrl" alt="no data" @click="changeAvatar">
                </div>
                <div class="inputBox">
                    <input class="input" type="text" placeholder="Boost comment...">
                </div>
                <div class="smile"></div>
                <div class="iconCnt" >
                    <div class="yes" :class="{pointer:isHover}" @click="isHover=false">
                        <img class="check" :src="yes.default" alt="">
                    </div>
                    <div class="no" :class="{pointer:isHover}" @click="isHover=false">
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
const getAvatar = () => {
    return `https://picsum.photos/200/200?random=${Math.random()}`
}
//实则为是否显示不代表悬停
const isHover=ref(false)
const avatarUrl = ref(getAvatar())
const rocketRef=ref<HTMLElement|null>(null)
const changeAvatar = () => {
    avatarUrl.value = getAvatar()
}
const handleClickOutside=(e:MouseEvent)=>{
    if(rocketRef.value&&!rocketRef.value.contains(e.target as Node)){
        isHover.value=false
    }
}
onMounted(()=>{
    document.addEventListener('click',handleClickOutside)
})
onUnmounted(()=>{
    document.removeEventListener('click',handleClickOutside)
})
</script>
<style lang="scss" scoped>
.commentContainer {
    width: 100%;
    display: flex;
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
.pointer{
    cursor: pointer;
}
.rocketCnt {
    display: flex;
    position: relative;

    .rocketIcon {
        display: flex;
        position: absolute;
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
            font-size: 13px;
        }
    }
    .show{
        opacity: 1;
        transform: translateY(0);
    }
    .hidden{
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