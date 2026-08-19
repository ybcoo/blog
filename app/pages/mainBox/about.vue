<template>
  <main class="main">
    <section class="header"></section>
    <!-- <section class="middle" :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'" :style="{
      borderColor: themeStore.theme.label === 'light' ? '#eee9e4' : '#232b1c',
    }">
      <div class="publicCnt" :class="{rightTranslate:index%2==0,leftTranslate:index%2==1,shadowLight:themeStore.theme.label === 'light',shadowDark:themeStore.theme.label === 'dark'}" v-for="(item, index) in publicList" @click="router.push(`/mainBox/${item.id}`)">
        <div v-show="index % 2 == 0" class="left">
          <div class="imgCnt">
            <img :src="item?.url" alt="">
          </div>
          <div class="contentCnt">
            <h3
              :class="{ 'bigTitle_sun': themeStore.theme.label === 'light', 'bigTitle_moon': themeStore.theme.label === 'dark' }">
              {{ item?.title }}</h3>
              <span>{{ formatTimestampToDate(item.createTime) }}</span> 
            <span class="html-content text-omit" :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'
              " v-html="item?.content"></span>
              <div class="middleCnt end">
              <div class="arrowCnt" :class="{shadowLight:themeStore.theme.label === 'light',shadowDark:themeStore.theme.label === 'dark'}">
                <img :src="themeStore.theme.label === 'light' ? rightArrow.light : rightArrow.dark" alt="no data">
              </div>
            </div>
          </div>
        </div>
        <div v-show="index % 2 == 1" class="right">
          <div class="contentCnt">
            <h3
              :class="{ 'bigTitle_sun': themeStore.theme.label === 'light', 'bigTitle_moon': themeStore.theme.label === 'dark' }">
              {{ item?.title }}</h3>
            <span>{{ formatTimestampToDate(item.createTime) }}</span>
            <span class="html-content text-omit" :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'
              " v-html="item?.content"></span>
              <div class="middleCnt start">
              <div class="arrowCnt" :class="{shadowLight:themeStore.theme.label === 'light',shadowDark:themeStore.theme.label === 'dark'}">
                <img :src="themeStore.theme.label === 'light' ? leftArrow.light : leftArrow.dark" alt="no data">
              </div>
            </div>
          </div>
          <div class="imgCnt">
            <img :src="item?.url" alt="">
          </div>
        </div>
      </div>
    </section> -->
    <section ref="middleRef" class="middle" :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'" :style="{
      borderColor: themeStore.theme.label === 'light' ? '#eee9e4' : '#232b1c',
    }">
    <div class="colCnt" v-for="(i,countIndex) in columnCount">
      <div class="colItem" v-for="(item,index) in loopList[countIndex]" @click="router.push(`/mainBox/${item.id}`)">
        <div class="imgCard" :style="{aspectRatio:1 / item?.ratio}">
          <img class="imgItem" :src="item.url" alt="">
        </div>
        <div class="textCard">
          <h6 class="text-omit" :class="{ 'bigTitle_sun': themeStore.theme.label === 'light', 'bigTitle_moon': themeStore.theme.label === 'dark' }">{{ item.title }}</h6>
          <span class="html-content text-omit ftsize" :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'
              " v-html="item?.content"></span>
        </div>
      </div>
    </div>
    </section>
    <Loading v-show="showLoading" />
  </main>
</template>
<script setup lang="ts">
import { useThemeStore } from "~~/stores/theme";
import { getArticle, getPublicArticle } from "~~/util/api";
import Loading from "~~/components/Loading.vue";
import { timeHooks } from "~/hooks/timeHooks";
import { leftArrow, rightArrow } from "~/assets/icon/svg";
const { formatTimestampToDate } = timeHooks();
const showLoading = ref(false);
const router = useRouter();
const themeStore = useThemeStore()
const travelList = ref<Array<any>>([]);
const dailyList = ref<Array<any>>([]);
const memoryList = ref<Array<any>>([]);
const diaryList = ref<Array<any>>([]);
const experienceList = ref<Array<any>>([]);
const publicList = ref<Array<any>>([]);
const middleRef=ref<HTMLElement | null>(null)
let minWidth=175
const columnCount=ref(1)
let resizeObserver:ResizeObserver | null = null
let loopList=ref<any>(Array.from({length:columnCount.value},()=>[]))
const updateColumnCount=()=>{
  if(!middleRef.value)return
  // 读取 middle 最终生效的 css 样式
  const style=getComputedStyle(middleRef.value)
  const gap=10
  const width=middleRef.value.clientWidth
  columnCount.value=Math.min(Math.floor((width + gap) / (minWidth + gap)),publicList.value.length)
  divideList()
  // console.log(columnCount.value)
}
const divideList=()=>{
  loopList.value=Array.from({length:columnCount.value},()=>[])
  publicList.value.forEach((i,index)=>{
    loopList.value[index%columnCount.value].push(i)
  })
}
const calculateRatio=async(item:any)=>{
  const ratio=await new Promise<number>((resolve, reject) => {
    const img=new Image()
    img.onload=()=>{
      resolve(img.naturalHeight/img.naturalWidth)
    }
    img.onerror=()=>{
      resolve(1)
    }
    img.src=item.url
  })
  return ratio
}
const getPublic = async () => {
  try {
    showLoading.value = true;
    const { data, error } = await getPublicArticle();
    if (error.value) {
      console.error("Failed to fetch articles:", error.value);
    }
    const { code, result } = data?.value ?? ({} as any);
    const { list = [] } = result || {};
    const newlist=await Promise.all(list.map(async(item:any)=>{
      const ratio=await calculateRatio(item)
      return {
        ...item,
        ratio
      }
    }))
    // console.log('newlist->',newlist)
    publicList.value = newlist
  } catch (e) {
    console.error(e);
  } finally {
    showLoading.value = false;
  }
}
const getArticleDetail = async () => {
  try {
    showLoading.value = true;
    const { data, error } = await getArticle();
    if (error.value) {
      console.error("Failed to fetch articles:", error.value);
    }
    const { code, result } = data?.value ?? ({} as any);
    const { list = [], total: totalNum = 0 } = result || {};
    travelList.value = list.filter((i: any) => i.type == "travel");
    dailyList.value = list.filter((i: any) => i.type == "daily");
    memoryList.value = list.filter((i: any) => i.type == "memory");
    diaryList.value = list.filter((i: any) => i.type == "diary");
    experienceList.value = list.filter((i: any) => i.type == "experience");
  } catch (e) {
    console.error(e);
  } finally {
    showLoading.value = false;
  }
};
onMounted(()=>{
  minWidth= window.innerWidth < 768 ? 150 : 175
  if(!middleRef.value)return
  updateColumnCount()
  // 创建一个“尺寸监听器”
  // 只要 middle 的宽度/高度发生变化，这里就会触发
  resizeObserver=new ResizeObserver(()=>{
    updateColumnCount()
  })
  // 开始监听 middle 这个元素
  resizeObserver.observe(middleRef.value)
})
onBeforeUnmount(()=>{
  // 停止监听，防止内存泄漏
  resizeObserver?.disconnect()
  resizeObserver=null
})
getArticleDetail();
await getPublic()
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  flex: 1;
  // height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox 浏览器 */
  scrollbar-width: none;
  /* IE/Edge 浏览器 */
  -ms-overflow-style: none;

  .header {
     padding-top: 200px;
    @media (max-width: 768px) {
      padding: 5px 0;  
    }
  }

  .middle {
    // border: 2px solid ;
    display: flex;
    // padding: 40px 40px;
    padding: 0;
    gap: 10px;
    // overflow-y: auto;
    // border-radius: 24px;
    @media (max-width: 768px) {
      width: 100%;
    }
    .colCnt{
      display: flex;
      flex: 1;
      min-width: 0;
      flex-direction: column;
      gap:10px;
      overflow: hidden;
      .imgCard{
        display: flex;
        overflow: hidden;
        .imgItem{
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
        }
      }
      .colItem{
        &:hover{
          cursor: pointer;
          .imgItem{
            transform: scale(1.1);
          }
          .textCard{
            transform: scale(1.05);
          }
        }
        border-radius: 4px;
        overflow: hidden;
      }
      .textCard{
        display: flex;
        transition: transform 0.3s ease;
        background: rgba(255,255,255,0.3);
        flex-direction: column;
        padding: 3px 6px;
        overflow: hidden;
        .ftsize{
          font-size: 13px;
        }
      }
      
    }
  }
}
.shadowLight{
  box-shadow: 0 0 16px rgba(14, 22, 0, 0.2);
}
.shadowDark{
  box-shadow: 0 0 16px rgba(246, 241, 238, 0.2);
}
.publicCnt {
  display: flex;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  overflow: hidden;
  &:hover{
    cursor: pointer;
  }
  &:hover{
      .end{
        .arrowCnt{
          transform: translateX(20px);
          transition: transform 0.3s ease-in-out;
        }
      }
      .start{
        .arrowCnt{
          transform: translateX(-20px);
          transition: transform 0.3s ease-in-out;
        }
      }
    }
  // box-shadow: 0 0 16px rgba(14, 22, 0, 0.12);
  // box-shadow: 0 0 16px rgba(246, 241, 238, 0.12);
  transition: transform 0.3s ease-in-out;
  .left,
  .right {
    width: 100%;
    display: flex;
    &:hover{
      .imgCnt{
        transform: scale(1.1);
      }
    }
  }

  .imgCnt {
    display: flex;
    flex: 1;
    aspect-ratio: 4 / 3;
    transition: transform 0.3s ease-in-out;
    img {
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
  }

  .middleCnt {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    &.start{
      justify-content: flex-start;
    }
    &.end{
      justify-content: flex-end;
    }
    .arrowCnt {
      // position: absolute;
      display: flex;
      align-items: center;
      width: 24px;
      height: 24px;
      padding: 4px;
      border-radius: 50%;
      // box-shadow: 0 0 16px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      transition: transform 0.3s ease-in-out;
      // left: 50%;
      // top: 50%;
      // transform: translateX(-50%) translateY(-50%);

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .contentCnt {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    flex: 2;
    padding: 20px 40px;
    
  }
}

.img {
  width: 164px;
  max-width: 164px;
  aspect-ratio: 1;
  border-radius: 24px;
  cursor: pointer;
}
</style>
