<template>
  <main class="main">
    <section class="header"></section>
    <section class="middle" :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'" :style="{
        borderColor: themeStore.theme.label === 'light' ? '#eee9e4' : '#232b1c',
      }">
      <div class="card" v-if="travelList.length">
        <div class="cardHeader">
          <h3 :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        ">travel</h3>
        </div>
        <div class="imgContainer">
          <div class="imgCard" v-for="(item,index) in travelList" :key="index" @click="router.push(`/mainBox/${item.id}`)">
            <img
              class="img"
              :src="item?.url"
              alt=""
            />
            <span class="title">{{ item?.title }}</span>
          </div>
        </div>
      </div>
      <div class="card" v-if="dailyList.length">
        <div class="cardHeader">
          <h3 :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        ">daily</h3>
        </div>
        <div class="imgContainer">
          <div class="imgCard" v-for="(item,index) in dailyList" :key="index" @click="router.push(`/mainBox/${item.id}`)">
            <img
              class="img"
              :src="item?.url"
              alt=""
            />
            <span class="title">{{ item?.title }}</span>
          </div>
        </div>
      </div>
      <div class="card" v-if="memoryList.length">
        <div class="cardHeader">
          <h3 :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        ">memory</h3>
        </div>
        <div class="imgContainer">
          <div class="imgCard" v-for="(item,index) in memoryList" :key="index" @click="router.push(`/mainBox/${item.id}`)">
            <img
              class="img"
              :src="item?.url"
              alt=""
            />
            <span class="title">{{ item?.title }}</span>
          </div>
        </div>
      </div>
      <div class="card" v-if="diaryList.length">
        <div class="cardHeader">
          <h3 :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        ">diary</h3>
        </div>
        <div class="imgContainer">
          <div class="imgCard" v-for="(item,index) in diaryList" :key="index" @click="router.push(`/mainBox/${item.id}`)">
            <img
              class="img"
              :src="item?.url"
              alt=""
            />
            <span class="title">{{ item?.title }}</span>
          </div>
        </div>
      </div>
      <div class="card" v-if="experienceList.length">
        <div class="cardHeader">
          <h3 :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        ">experience</h3>
        </div>
        <div class="imgContainer">
          <div class="imgCard" v-for="(item,index) in experienceList" :key="index" @click="router.push(`/mainBox/${item.id}`)">
            <img
              class="img"
              :src="item?.url"
              alt=""
            />
            <span class="title">{{ item?.title }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useThemeStore } from "~~/stores/theme";
import { getArticle } from "~~/util/api";
const router = useRouter();
const themeStore=useThemeStore()
const travelList = ref<Array<any>>([]);
const dailyList = ref<Array<any>>([]);
const memoryList = ref<Array<any>>([]);
const diaryList = ref<Array<any>>([]);
const experienceList = ref<Array<any>>([]);
const getArticleDetail = async () => {
  try {
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
  }
};
await getArticleDetail();
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  max-width: 60vh; //这其实是bug但是计算刚刚好
  display: flex;
  justify-content: center;
  flex-direction: column;
  .header {
    padding-top: 200px;
  }
  .middle {
    border: 2px solid ;
    width: 100%;
    padding: 20px 0;
    margin-bottom: 20px;
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    border-radius: 24px;
    .card {
      display: flex;
      flex-direction: column;
      .cardHeader {
        padding: 20px;
      }
      .imgContainer {
        display: flex;
        gap: 32px;
        padding: 0 20px;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
        .imgCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          .title{
            max-width: 164px;
            white-space: nowrap;
            overflow: hidden;
            display: inline-block;
            text-overflow: ellipsis;
            cursor: pointer;
          }
        }
      }
    }
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
