<template>
  <div class="robot-container">
    <div class="row" v-if="showRobot">
      <span
        class="robotTitle"
        :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        "
        >Hi~</span
      >
      <div class="iconContainer" @click="showRobot = false">
        <img
          class="robotIcon"
          :src="
            themeStore.theme.label === 'light'
              ? robotIcon.default_sun
              : robotIcon.default_moon
          "
          alt="Robot Icon"
        />
      </div>
    </div>
    <div v-else class="chatContainer">
        <div class="header">
            <img class="deleteIcon" :src="deleteIcon.default_sun" alt="Delete Icon" @click="showRobot=true"/>
        </div>
      <div class="chatContent" ref="chatContentRef">
        <div class="messageDivider" v-for="(item, index) in chatList" :key="index">
          <div class="robotMessage" v-if="item?.role === 'robot'">
            <img class="messageIcon" :src="robotIcon.default_moon" alt="" />
            <span>{{ item?.message }}</span>
          </div>
          <div class="userMessage" v-if="item?.role === 'user'">
            <span>{{ item?.message }}</span>
            <img class="messageIcon" :src="getUserIcon" alt="" />
          </div>
        </div>
        <!-- 加载动画 -->
        <div class="robotMessage" v-if="showLoading">
          <img class="messageIcon" :src="robotIcon.default_moon" alt="" />
          <div class="typingIndicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>

      <div class="bottomBar">
        <input class="userInput" v-model="inputMessage" type="text" />
        <button class="userButton" @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { robotIcon,deleteIcon } from "~/assets/icon/svg";
import { useThemeStore } from "~~/stores/theme";
import { manageIcon } from "~/assets/icon/svg";
import {chatHooks} from "~~/util/ai";
const {startChat,setSystemMessage}=chatHooks()
const themeStore = useThemeStore();
const props=defineProps<{
  formItem: any;
}>();
const showRobot = ref(true);
const chatList = ref<Record<string, any>[]>([
  {
    role: "robot",
    message: "Hello! How can I assist you today?",
  },
]);
const inputMessage = ref("");
const chatContentRef = ref<HTMLElement | null>(null);

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContentRef.value) {
      chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight;
    }
  });
};

// 监听消息列表变化，自动滚动
watch(() => chatList.value, () => {
  scrollToBottom();
}, { deep: true });
const showLoading = ref(false);
const getUserIcon = computed(() => {
  return themeStore.theme.label === "light"
    ? manageIcon.default_sun
    : manageIcon.default_moon;
});
setSystemMessage(`你叫fish,是摘要文章机器人,别人会问你左边的文章帮我概括下,然后这个文章是我v-html也就是content属性进来的,所以你要自己去解析理解内容意思,那好你清楚了背景,我会给你个js对象 title是标题,type是类型,content是内容,其他属性不用管,v-html里有图片能解析出来就介绍,没有就不用 下面这就是js ${JSON.stringify(props?.formItem)}`)

const sendMessage = async() => {
  if (inputMessage.value.trim() === "") return;
  chatList.value.push({
    role: "user",
    message: inputMessage.value,
  });
  const tmpValue = inputMessage.value;
  inputMessage.value = "";
  // 模拟机器人回复
  showLoading.value = true;
  const response = await startChat(tmpValue);
  showLoading.value = false;
    chatList.value.push({
      role: "robot",
      message: response,
    });

  
};
</script>
<style lang="scss" scoped>
.robot-container {
  position: fixed;
  bottom: 40px;
  right: 40px;
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.5;
    .robotTitle {
      font-weight: 500;
    }
  }
  .chatContent {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    // 隐藏滚动条
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .messageDivider{
        display: flex;
        flex-direction: column;
    }
  }
  .chatContainer {
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 420px;
    .header{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 0px 10px;
        .deleteIcon{
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
    .robotMessage {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      span {
        max-width: 250px;
        padding: 10px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
        background-color: #f0f0f0;
        border-radius: 8px;
      }
    }
    .userMessage {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      span {
        padding: 10px;
        background-color: #d1e7dd;
        border-radius: 8px;
        max-width: 250px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
      }
    }
    .bottomBar {
      width: 100%;
      display: flex;
      gap: 10px;
      justify-content: flex-start;
      align-items: center;
      .userInput {
        padding: 10px;
        flex: 1;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 5px;
        background-color: #f5f5f5;
      }
      .userButton {
        height: 30px;
        padding: 10px;
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        border-radius: 5px;
        background-color: #f5f5f5;
        color: #000;
        cursor: pointer;
      }
    }
  }
}
.iconContainer {
  width: 50px;
  height: 50px;
  .robotIcon {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
.messageIcon{
    width: 32px;
    height: 32px;
    padding: 5px;
    border-radius: 50%;
}
/* 打字动画 */
.typingIndicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.typingIndicator .dot {
  width: 8px;
  height: 8px;
  background-color: #999;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typingIndicator .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typingIndicator .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
.divider {
  height: 10px;
  width: 100%;
  background-color: #f5f5f5;
}
</style>
