<template>
    <div class="lockCnt" :style="{background:lockBg,borderRadius:`${borderRadius??0}px`}">
        <div class="filterBg"></div>
        <img class="lockIcon" :src="lockImg" alt="no data">
    </div>
</template>
<script setup lang="ts">
import { lock } from "~/assets/icon/svg";
import { useThemeStore } from "~~/stores/theme";
const themeStore = useThemeStore(); 
defineProps<{
    borderRadius:string
}>()
const lockBg=computed(()=>{
    return themeStore.theme.label=='light'?'rgba(229, 224, 214,0.8)':'rgba(26, 34, 18,0.8)'
})
const lockImg=computed(()=>{
    return themeStore.theme.label=='light'?lock?.light:lock?.dark
})
</script>
<style lang="scss" scoped>
.lockCnt {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // background: rgba(229, 224, 214,0.8);
    // background: rgba(26, 34, 18,0.8);
    .filterBg{
        width: 100%;
        height: 100%;
        position:absolute;
        z-index: 0;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);//影响背后的内容区别于-filter影响自身
    }
    .lockIcon {
        width: 16px;
        height: 16px;
        position: relative;
        z-index: 1;
    }
}
</style>