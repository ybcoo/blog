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
const resultDefault: any = {
  id: "36",
  url: "",
  content: `<p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Contact Me:(Email)2747490496@qq.com</strong></span></p><p><br></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Position（职位）：</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">前端工程师</span></p><p><br></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Capability（能力）：</strong></span></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>1.</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">熟悉 </span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Vue3 、Taro微信小程序</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">开发，包括</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Pinia、Vuex</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">全局状态管理。</span></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>2.熟悉Nuxt4</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">，了解其约定式路由、服务端渲染核心能力，借助 SSR 优化首屏加载速度与 SEO，通过约定式路由简化路由配置，提升开发效率。</span></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>3.</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">熟悉 </span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Node.js</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">（</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>NestJs</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">、</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Express</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">）后端框架，能够基于这些开发框架高效和后端进行联调。</span></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>4.</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">熟悉</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>MySQL、MongoDB</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">，使用过</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong> Peisma/Sequelize</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"> </span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>ORM </strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">实现数据库增删改查以及</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>JWT</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">鉴权的实现。</span></p><p><strong>5.</strong><span style="font-size: 14px;">熟悉 </span><span style="font-size: 14px;"><strong>Axios</strong></span><span style="font-size: 14px;"> 请求库，能自定义 Axios 实例，封装全局请求与响应拦截。</span></p><p><br></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Experience</strong></span></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 16px;"><u><strong>2025.12 - 至今（浙江凌迪数字科技有限公司）- 前端实习生</strong></u></span></p><p><br></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>工作内容</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">：微信小程序从0-1全栈开发（小程序：</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>衣立得</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"> 已发布）</span></p><p><br></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>技术栈：Taro</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+Vue+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>TypeScript</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>NestJS</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Prisma</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+Jenkins+GitLab+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Mysql</strong></span></p><p><br></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>工作内容（Details）：</strong></span></p><p><strong>1.</strong> 核心功能开发 AI 打样流程：实现完整的打样流程，包括图片上传、AI 生成效果图、结果展示等模块 </p><p><strong>2</strong>.面料库管理：开发面料列表展示（卡片/列表双视图）、信息编辑、删除、蓝牙打印、生成二维码及扫码进入H5 </p><p><strong>3</strong>.用户系统：实现微信登录、用户信息管理、点数消耗系统及用户充值点数</p><p><strong>4.</strong>分享功能：开发面料效果分享页，支持权限控制和点数验证</p><p><br></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>技术难点与解决方案：</strong></span></p><p><strong>1.</strong>组件中 useDidShow 生命周期不生效（Taro 的 useDidShow 只在注册的页面中生效）</p><p><strong>解决方案</strong>：在父页面中使用 <strong>useDidShow</strong> 监听页面显示 通过 <strong>ref</strong> 获取子组件实例，调用子组件<strong>暴露</strong>的 <strong>refreshFabricList</strong> 方法</p><p><strong>2.</strong>蓝牙连接，调用获取<strong>蓝牙设备监听</strong>事件会短时间内重复<strong>触发多次回调</strong>，同一设备被多次添加到列表中，以及重复执行多次过滤"未知设备"的复杂逻辑，导致页面卡顿严重，响应时间长，搜索期间用户不可操作等问题。</p><p><strong>解决方案</strong>：通过<strong>防抖</strong>做到等列表全部更新完，最后只执行一次设备过滤，页面响应速度可从5-8秒降至1-3秒 优化50%。</p><p><strong>3.</strong>微信<strong>分享页</strong>操作<strong>权限</strong>问题，仅判断了用户token是否存在，忽略用户先登录后获取的token，导致用户token校验通过，能够看到他人分享页面下的操作栏</p><p><strong>解决方案</strong>：设置权限判断接口，通过分享页url的用户唯一id+本地token，二者的强关联，从数据库查询信息，做到token+id分享页归属个人有操作和返回上级页面权限，仅token无操作权限，但表示已登陆，可返回自己上级页面，</p><p>其余仅浏览权限，返回登录页。</p><p><br></p><p><img src="" alt="linctex.jpg" data-href="" style=""/></p><p><span style="color: rgb(51, 51, 51); background-color: rgba(219, 224, 232, 0.3); font-size: 16px;"><u><strong>2025.08 - 2025.12 (杭州智珈云科技有限公司) - 前端实习生</strong></u></span></p><p><strong>工作内容：</strong></p><p><strong>1.</strong>负责扫码点餐滑菜模块：处理套餐与子菜的复杂数据关联，实现子菜 / 全套餐子菜删除线联动效果，通过计时器按分钟记录下单时长</p><p><strong>2.</strong>独立开发 Web/H5 双端原材料模块：涵盖原材料、单位、生产配方管理及商品管理优化，二次封装带分页搜索的表格弹窗组件（支持选中项回传、编辑回显、删除 / 清空），实现生产配方表格 Input 插槽、Excel 导入导出逻辑修改，适配 PC / 移动端双端样式，参与冒烟自测及 Bug 修复。</p><p>难点与亮点：</p><p><strong>1</strong>.数据关联与状态同步：套餐与子菜存在层级嵌套的复杂数据结构，需精准处理 “单个子菜操作→删除线显示”“全选子菜→套餐名删除线联动” 的状态同步，避免数据错乱。</p><p><strong>2.</strong>组件封装复用：表格弹窗组件需兼顾分页、搜索、选中项回传、编辑回显、删除 / 清空等多重功能，且要适配h5的复用场景。</p><p><strong>3.</strong>计时逻辑精准性：需基于下单时间实现 “每分钟记录已下单时长”，需处理计时中断、页面刷新 / 切后台后的续算问题，及计时器合适的销毁时机，保证计时数据的准确性。</p><p><br></p><p><strong>Project Experience</strong></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>个人博客系统及后台管理( </strong></span><a href="https://github.com/ybcoo/blog" target="_blank"><strong>https://github.com/ybcoo/blog</strong></a> <span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>)</strong></span></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>博客链接Link： </strong></span><a href="https://ybcoo.github.io/blog/" target="_blank"><span style="color: rgb(66, 144, 247);"><u><strong>https://ybcoo.github.io/blog</strong></u></span></a></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>后台链接Link： </strong></span><a href="https://ybcoo.github.io/blog-manage-ts/" target="_blank"><span style="color: rgb(66, 144, 247);"><u><strong>https://ybcoo.github.io/blog-manage-ts</strong></u></span></a></p><p><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>技术栈：Nuxt4</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Node.js</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">（</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>NestJS</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">）+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Prisma</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Mysql</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>JWT</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+Pinia+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>Axios</strong></span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;">+Vue3+Scss+</span><span style="color: rgb(19, 19, 19); background-color: rgba(219, 224, 232, 0.3); font-size: 14px;"><strong>TypeScript</strong></span></p><p>项目介绍：基于<strong>Nuxt4</strong>、<strong>NestJS</strong>和<strong>Mysql</strong>开发的个人博客系统，实现内容的展示、切换主题、动画交互、管理等。</p><p> 项目亮点:</p><p>1.极致轻量低依赖：<strong>极少依赖第三方UI框架</strong>，菜单、按钮、输入框等核心组件及交互动画均自主开发，仅依托Nuxt4生态+Pinia构建轻量化架构，减少冗余代码，加载速度更优。</p><p>2.沉浸式主题体验：基于<strong>Pinia</strong>实现全局主题切换，搭配细腻涟漪过渡动画，视觉衔接自然流畅，兼顾个性化需求与交互质感。</p><p>3.全栈技术深度整合：基于<strong>Vue3</strong>+<strong>Nuxt4</strong>+<strong>NestJS</strong>构建前后端一体化架构，结合<strong>PrismaORM</strong>、JWT鉴权与<strong>Axios</strong>请求封装，实现博客内容高效展示与安全管理。</p><p>4.定制化样式体系：采用动态添加类名，css自定义样式变量，主题样式全局统一且易扩展，配合自定义动画逻辑，兼顾视觉一致性与交互独特性。</p>`,
  title: "Yu Bingcao",
  type: "experience",
};
setSystemMessage(`你叫fish,是摘要文章机器人,别人会问你左边的文章帮我概括下,然后这个文章是我v-html也就是content属性进来的,所以你要自己去解析理解内容意思,那好你清楚了背景,我会给你个js对象 title是标题,type是类型,content是内容,其他属性不用管,v-html里有图片能解析出来就介绍,没有就不用 下面这就是js ${JSON.stringify(resultDefault)}`)

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
