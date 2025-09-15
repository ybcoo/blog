<template>
  <main class="layout" :style="{ backgroundColor: themeStore.theme.color }">
    <!-- 1. 小屏幕时显示顶部水平导航 -->
    <div class="top-nav" :style="{ '--hover-bg': hovorColor }">
      <section class="flexCenter" style="gap: 16px;width: calc(100% - 50px);">
        <NuxtLink class="icon-container" :style="{ backgroundColor: active === 'home' ? 'white' : '' }"
          @click="changeActive('home')" to="/mainBox/home">
          <img class="icon" :src="changeImg(homePic)" alt="home" />
        </NuxtLink>
        <NuxtLink class="icon-container" :style="{ backgroundColor: active === 'about' ? 'white' : '' }"
          @click="changeActive('about')" to="/mainBox/about">
          <img class="icon" :src="changeImg(aboutPic)" alt="about" />
        </NuxtLink>
        <NuxtLink class="icon-container" :style="{ backgroundColor: active === 'share' ? 'white' : '' }"
          @click="changeActive('share')" to="/mainBox/share">
          <img class="icon" :src="changeImg(sharePic)" alt="share" />
        </NuxtLink>
        <button class="icon-container" :disabled="isDisabled" @click="toggleThemeWithAnimation">
          <img class="icon" :src="themeImg" alt="theme" />
          <span v-if="showRipple" class="ripple-effect" :style="rippleStyle"></span>
        </button>
      </section>

      <section class="flexCenter center" @click="handleToManage"
        :style="{ right: 0, top: 0, border: 'none', outline: 'none', padding: 0, width: '50px', height: '50px', cursor: 'pointer' }">
        <img class="icon " :src="changeImg(managePic)" alt="manage" />
      </section>
    </div>
    <aside class="sidebar">
      <nav class="navContainer">
        <div class="nav" :style="{ '--hover-bg': hovorColor }">
          <NuxtLink class="icon-container" :style="{ backgroundColor: active === 'home' ? 'white' : '' }"
            @click="changeActive('home')" to="/mainBox/home">
            <img class="icon" :src="changeImg(homePic)" alt="home" />
          </NuxtLink>
          <NuxtLink class="icon-container" :style="{ backgroundColor: active === 'about' ? 'white' : '' }"
            @click="changeActive('about')" to="/mainBox/about">
            <img class="icon" :src="changeImg(aboutPic)" alt="about" />
          </NuxtLink>
          <NuxtLink class="icon-container" :style="{ backgroundColor: active === 'share' ? 'white' : '' }"
            @click="changeActive('share')" to="/mainBox/share">
            <img class="icon" :src="changeImg(sharePic)" alt="share" />
          </NuxtLink>
        </div>
        <button class="icon-container" :disabled="isDisabled" @click="toggleThemeWithAnimation">
          <img class="icon" :src="themeImg" alt="theme" />
          <span v-if="showRipple" class="ripple-effect" :style="rippleStyle"></span>
        </button>
      </nav>
    </aside>
    <section class="content">
      <NuxtPage />
    </section>
    <section class="manage flexCenter center" @click="handleToManage" :style="{ position: 'absolute', right: 0, top: 0 }">
      <img class="icon " :src="changeImg(managePic)" alt="manage" />
    </section>
  </main>
</template>
<script setup>
import { homePic, aboutPic, sharePic, themePic, managePic } from "~/composables/theme";
import { useThemeStore } from "~~/stores/theme";
const themeStore = useThemeStore();
const isDisabled = ref(false);
// 涟漪加载效果
const showRipple = ref(false);
const rippleStyle = ref({});
const rippleSize = ref(0);
const toggleThemeWithAnimation = (event) => {
  const button = event.currentTarget;
  const buttonRect = button.getBoundingClientRect();
  isDisabled.value = true;
  // 1. 计算点击点相对于按钮的坐标（不变）
  const xInButton = event.clientX - buttonRect.left;
  const yInButton = event.clientY - buttonRect.top;

  // 2. 计算视口尺寸（包含滚动条宽度，避免边缘遗漏）
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // 3. 计算最大距离（增加10%冗余，确保覆盖边缘）
  const maxDistance =
    Math.max(
      event.clientX,
      viewportWidth - event.clientX,
      event.clientY,
      viewportHeight - event.clientY
    ) * 1.1; // 关键：加10%冗余，处理边框/滚动条等边缘情况

  // 4. 计算按钮对角线（不变）
  const buttonDiagonal = Math.sqrt(
    buttonRect.width ** 2 + buttonRect.height ** 2
  );

  // 5. 计算缩放倍数（再加5%保险值）
  const scale = ((maxDistance * 2) / buttonDiagonal) * 1.05; // 额外5%确保覆盖

  // 设置涟漪样式
  rippleStyle.value = {
    left: `${xInButton}px`,
    top: `${yInButton}px`,
    width: `${buttonDiagonal}px`,
    height: `${buttonDiagonal}px`,
    marginLeft: `-${buttonDiagonal / 2}px`,
    marginTop: `-${buttonDiagonal / 2}px`,
    "--scale": scale,
    "--backColor":
      themeStore.theme.label == "dark"
        ? "rgba(246, 241, 237, 1)"
        : "rgba(15, 22, 0, 1)",
  };

  showRipple.value = true;
  setTimeout(() => {
    changeTheme();
    showRipple.value = false;
    setTimeout(() => {
      isDisabled.value = false;
    }, 300);
  }, 500);
};
// 主题切换
const active = computed(() => {
  return themeStore.active;
});
const hovorColor = computed(() => {
  return themeStore.theme.label == "dark" ? "#1a2510" : "#f2eae1";
});
const changeActive = (value) => {
  themeStore.active = value;
};
const changeTheme = () => {
  themeStore.theme.label == "light"
    ? (themeStore.theme = { label: "dark", color: "#0f1600" })
    : (themeStore.theme = { label: "light", color: "#f6f1ed" });
};
const themeImg = computed(() => {
  if (themeStore.theme.label == "light") {
    return themePic.value.default_sun;
  } else {
    return themePic.value.default_moon;
  }
});
const changeImg = (img) => {
  if (img.label == active.value) {
    return img.select;
  } else {
    if (themeStore.theme.label == "light") {
      return img.default_sun;
    } else {
      return img.default_moon;
    }
  }
};
//跳转后台管理
const handleToManage=()=>{
  window.location.href = 'http://localhost:8080'
}
</script>
<style lang="scss" scoped>
.top-nav {
  display: none; // 默认隐藏
  position: fixed; // 固定在顶部
  top: 0;
  left: 0;
  width: 100%; // 全宽，减去可能的滚动条宽度
  height: 60px;
  background-color: inherit; // 继承主题背景色
  align-items: center;
  justify-content: center;

  // 小屏幕显示顶部导航
  @media (max-width: 768px) {
    display: flex;
    padding-left: 50px;
  }
}

.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 0;
  }

  //  transition: background-color 0.6s ease; 

}

.sidebar {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease; // 侧边栏动画
  padding-top: 200px;

  @media (max-width: 768px) {
    display: none;
  }
}

.content {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-right: 20%;
  align-items: stretch;
  overflow-y: hidden;


  @media (max-width: 768px) {
    width: 100%;
    height: calc(100% - 60px); // 减去顶部导航高度
    margin-top: 60px;
    padding-right: 20px;
    padding-left: 20px;
  }
}

.nav {
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--hover-bg);
  }

  border-radius: 8px;
}

.icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.manage {
  width: 50px;
  height: 50px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
}

.center {
  /* 动画过渡：与其他元素保持一致的曲线和时长 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  // 悬停效果：向下位移3px + 放大1.1倍 + 阴影增强层次感
  &:hover {
    transform: translateY(3px) scale(1.1); // translateY(3px)向下，scale(1.1)放大10%
  }

  // 图片同步动画（可选，让图标放大更协调）
  &:hover .icon {
    transform: scale(1.2); // 图标额外放大一点，增强视觉反馈
  }
}

.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  border: none; // 去除边框
  outline: none; // 去除聚焦轮廓
  padding: 0; // 清除内边距
  background: transparent; // 背景透明（继承父元素）
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); // 统一过渡效果

  &:hover {
    background-color: var(--hover-bg);
    cursor: pointer;
    transform: translateX(2px); // 侧边导航项悬停时轻微右移
  }

  &.active {
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1.05); // 激活状态放大
  }

  &:hover .icon {
    transform: scale(1.15); // 悬停时图标放大
  }

  &.active .icon {
    transform: scale(1.2); // 激活状态图标更大
  }
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background-color: var(--backColor);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(var(--scale));
    opacity: 1;
  }
}
</style>
