<template>
  <main class="main">
    <article class="header">
      <h2
        :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        "
      >
        Yu Bingcao is a passionate coding enthusiast
      </h2>
      <span
        :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'"
        style="font-size: 20px; margin-top: 20px; display: inline-block"
        >Welcome to my personal corner. I’m someone who values work-life
        balance, and I’ll share my life, what I see, what I feel, and what I
        love here.</span
      >
      <span
        :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'"
        style="
          font-size: 20px;
          margin-top: 20px;
          display: inline-block;
          width: 100%;
        "
      >
        This is my second webpage project.</span
      >
      <ClientOnly>
        <div class="scroller-container">
          <!-- 文本列表：v-for 每行都用同一个 class，动态加动画 -->
          <div
            class="text-list"
            :class="
              themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'
            "
          >
            <p
              v-for="(line, index) in textList"
              :key="index"
              class="text-line"
              :class="{
                'scroll-single-line':
                  isScrolling && currentScrollIndex === index,
              }"
              @click="router.push(`/mainBox/${line.id}`)"
            >
              <span v-html="line.content" class="html-content"></span>
            </p>
          </div>
        </div>
      </ClientOnly>
      <div style="width: 100%">
        <div
          class="scroll-button"
          :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'"
          :style="{
            '--buttonHovor':
              themeStore.theme.label == 'light' ? '#efe8e2' : '#181f11',
          }"
          @click="scrollUp"
        >
          More v
        </div>
      </div>
    </article>
    <section
      class="page"
      :style="{
        borderColor: themeStore.theme.label === 'light' ? '#eee9e4' : '#232b1c',
      }"
    >
      <div class="pageHeader">
        <span
          class="title"
          style="font-weight: 800"
          :class="
            themeStore.theme.label === 'light'
              ? 'smallTitle_sun'
              : 'smallTitle_moon'
          "
          >Post</span
        >
        <div class="right">
          <span
            style="font-weight: 800"
            :class="
              themeStore.theme.label === 'light'
                ? 'smallTitle_sun'
                : 'smallTitle_moon'
            "
          >
            {{ `${pageNum} of ${totalPage} posts` }}
          </span>
          <div class="arrow">
            <div
              class="leftArrow"
              @click="handleLeftArrow"
              :style="{ '--arrowHover': themeStore.hovorColor }"
              :class="leftArrowStyle"
            >
              <
            </div>
            <div
              class="rightArrow"
              @click="handleRightArrow"
              :style="{ '--arrowHover': themeStore.hovorColor }"
              :class="rightArrowStyle"
            >
              >
            </div>
          </div>
        </div>
      </div>
      <div class="pageBody" style="margin-bottom: 20px">
        <div
          v-for="(item, index) in pageList"
          :key="index"
          class="hovorDiv"
          :style="{ '--hovorColor': themeStore.hovorColor }"
          @click="router.push(`/mainBox/${item.id}`)"
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding-top: 5px;
            "
          >
            <h4
              :class="
                themeStore.theme.label === 'light'
                  ? 'smallTitle_sun'
                  : 'smallTitle_moon'
              "
            >
              {{ item.title }}
            </h4>
            <span
              class="date-text"
              :class="
                themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'
              "
              >{{ item.date }}</span
            >
          </div>
          <span
            class="text-omit html-content"
            :class="
              themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'
            "
            style="padding-top: 5px; padding-bottom: 5px"
            v-html="item.content"
          ></span>
        </div>
      </div>
      <div class="pageFooter" style="margin-bottom: 20px">
        <div class="arrow">
          <div
            class="leftArrow"
            @click="handleLeftArrow"
            :style="{ '--arrowHover': themeStore.hovorColor }"
            :class="leftArrowStyle"
          >
            <
          </div>
          <span
            style="font-weight: 800"
            :class="
              themeStore.theme.label === 'light'
                ? 'smallTitle_sun'
                : 'smallTitle_moon'
            "
          >
            {{ `${pageNum} of ${totalPage} posts` }}
          </span>
          <div
            class="rightArrow"
            @click="handleRightArrow"
            :style="{ '--arrowHover': themeStore.hovorColor }"
            :class="rightArrowStyle"
          >
            >
          </div>
        </div>
      </div>
    </section>
    <section class="footer flexCenter">
      <span
        style="font-size: 14px; margin-top: 20px"
        :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'"
        >Designed by Yu BingCao(Klein) in 2025 years · comment</span
      >
    </section>
  </main>
</template>
<script setup>
// import { ref, computed } from "vue";
import { useThemeStore } from "~~/stores/theme";
import { homeHooks } from "~~/app/hooks/homeHooks";
let {
  pageNum,
  pageSize,
  total,
  totalPage,
  getPageSettings,
  pageList,
  textList,
  moreLines,
  getArticleList,
  setLoopList,
} = homeHooks();
const router = useRouter();
const themeStore = useThemeStore();
const leftDisabled = ref(true);
const rightDisabled = ref(false);
await setLoopList();
moreLines.value.push(...textList.value);
const leftArrowStyle = computed(() => {
  if (themeStore.theme.label == "light") {
    return {
      arrowColor_sun: !leftDisabled.value,
      disabled_sun: leftDisabled.value,
    };
  } else {
    return {
      arrowColor_moon: !leftDisabled.value,
      disabled_moon: leftDisabled.value,
    };
  }
});
const rightArrowStyle = computed(() => {
  if (themeStore.theme.label == "light") {
    return {
      arrowColor_sun: !rightDisabled.value,
      disabled_sun: rightDisabled.value,
    };
  } else {
    return {
      arrowColor_moon: !rightDisabled.value,
      disabled_moon: rightDisabled.value,
    };
  }
});

const handleLeftArrow = () => {
  if (pageNum.value == 1) {
    leftDisabled.value = true;
    return;
  }
  rightDisabled.value = false;
  pageNum.value--;
  getArticleList();
  if (pageNum.value == 1) {
    leftDisabled.value = true;
  }
};
const handleRightArrow = () => {
  if (pageNum.value == totalPage.value) {
    rightDisabled.value = true;
    return;
  }
  leftDisabled.value = false;
  pageNum.value++;
  getArticleList();
  if (pageNum.value == totalPage.value) {
    rightDisabled.value = true;
  }
};
const lineHeight = ref(30);
const isScrolling = ref(false);
let moreIndex = 0;
// 新增：控制“当前哪一行正在滚动”的索引
const currentScrollIndex = ref(-1);
// 核心改：逐行触发动画，而非容器整体动
const scrollUp = async () => {
  if (isScrolling.value) return;
  isScrolling.value = true;

  // 1. 逐行触发动画（从第0行到第3行，依次滚动）
  for (let i = 0; i < textList.value.length; i++) {
    currentScrollIndex.value = i; // 标记当前滚动行
    await new Promise((resolve) => setTimeout(resolve, 150)); // 每行间隔150ms，更有节奏感
  }
  textList.value.shift();
  textList.value.push(moreLines.value[moreIndex]);
  moreIndex = (moreIndex + 1) % moreLines.value.length;

  // 3. 重置状态，准备下一次滚动
  currentScrollIndex.value = -1;
  isScrolling.value = false;
};

getArticleList();
</script>
<style lang="scss" scoped>
.arrow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
}
.leftArrow {
  font-weight: 400;
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background-color: var(--arrowHover);
  }
}
.rightArrow {
  font-weight: 400;
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background-color: var(--arrowHover);
  }
}
.page {
  // position: relative;
  border: 2px solid;
  border-radius: 1.5rem;
  flex-shrink: 0;
  padding-left: 5px;
  padding-right: 5px;
}
.date-text {
  opacity: 0; // 初始透明度为0（隐藏）
  transition: opacity 0.3s ease; // 过渡效果，hover时平滑显示
}

.hovorDiv {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  max-height: 60px;
  &:hover {
    background-color: var(--hovorColor);
    .date-text {
      opacity: 1; // 完全不透明（显示）
    }
    transition: background-color 0.3s ease;
  }
}
.main {
  width: 100%;
  height: 100%;
  max-width: 668px;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  /* Firefox 浏览器 */
  scrollbar-width: none;
  /* IE/Edge 浏览器 */
  -ms-overflow-style: none;
  .header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 44px;
    padding-right: 44px;
  }
  @media (max-width: 768px) {
    padding-top: 0;
  }
}
.text-omit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pageHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding-left: 20px;
  padding-right: 20px;
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
// 滚动容器：只负责固定高度和隐藏超出，无动画
.scroller-container {
  height: calc(5 * #{30px}); // 固定4行高度
  overflow: hidden;
  margin-top: 20px;
  border-radius: 8px;
}

// 文本列表：保持每行垂直排列，不做动画
.text-list {
  margin: 0;
  padding: 0;
}

// 单行文本：基础样式（v-for 共用同一个class）
.text-line {
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 2px 0;
  // 关键：给单行加过渡，动画时才动
  transition: all 0.3s ease-out;
  // transform: translateY(0); // 初始位置
  opacity: 1; // 初始透明度
  white-space: nowrap;
  overflow: hidden; /* 隐藏超出容器的文本 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  overflow: hidden;
  width: 100%;
}
.html-content {
  display: inline;

  // 重置所有内部元素
  :deep(*) {
    display: inline !important;
    white-space: nowrap !important;
    margin: 0 !important;
    padding: 0 !important;
    line-height: inherit !important;
    font-size: inherit !important;
    color: inherit !important;
  }

  // 隐藏换行
  :deep(br) {
    display: none !important;
  }

  // 隐藏或缩小图片
  :deep(img) {
    display: none !important; // 或者限制大小
    /* 或者
    max-width: 20px !important;
    height: 16px !important;
    vertical-align: middle !important;
    */
  }

  // 隐藏视频
  :deep(video) {
    display: none !important;
  }
}

// 单行滚动动画类（v-for 共用这个动画逻辑）
.scroll-single-line {
  // 向上滚动“自身高度”（正好滚出容器）
  transform: translateY(-30px);
  // 滚动时渐隐，增强层次感
  opacity: 0;
}

// 按钮样式（保留你的原有设置）
.scroll-button {
  border-radius: 8px;
  background-color: var(--buttonHovor);
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 2px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
  transition: transform 0.2s ease;
  &:active {
    transform: scale(0.95);
  }
}
</style>
