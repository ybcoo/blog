<template>
  <div class="review">
    <div class="header">
      <h1
        style="margin: 0"
        :class="
          themeStore.theme.label === 'light' ? 'bigTitle_sun' : 'bigTitle_moon'
        "
      >
        {{ form?.title || "Your title" }}
      </h1>
      <h3
        v-if="!form?.type"
        :class="
          themeStore.theme.label === 'light'
            ? 'smallTitle_sun'
            : 'smallTitle_moon'
        "
      >
        For Travel Moments, Daily Life Snippets, Precious Memories and Personal
        Diary
      </h3>
      <h3
        v-else
        :class="
          themeStore.theme.label === 'light'
            ? 'smallTitle_sun'
            : 'smallTitle_moon'
        "
      >
        {{ typeMap[(form?.type?.value || form?.type) as any] }}
      </h3>
    </div>
    <div
      class="content"
      :class="themeStore.theme.label === 'light' ? 'font_sun' : 'font_moon'"
      :style="{
        '--font': themeStore.theme.label === 'light' ? '#45403c' : '#d9e0d8',
      }"
    >
      <div
        v-if="form && form?.content !== '<p><br></p>'"
        v-html="form?.content"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "~~/stores/theme";
const themeStore = useThemeStore();
interface formType {
  id?: number;
  createTime?: string;
  type?: { label: string; value: string } | null;
  title: string;
  file?: any;
  url: string;
  content: string;
}
defineProps<{
  form?: formType | null;
}>();
const typeMap: any = {
  travel: "For Travel Moments",
  daily: "For Daily Life Snippets",
  memory: "For Precious Memories",
  diary: "For Personal Diary",
  experience: "For My Experience",
};
</script>
<style lang="scss" scoped>
.review {
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; // Firefox 专属：隐藏滚动条
  -ms-overflow-style: none; // IE/Edge 旧版：隐藏滚动条
  &::-webkit-scrollbar {
    display: none; // Chrome/Safari/Edge 新版：隐藏滚动条
  }
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  .header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .content {
    font-size: 16px;
    font-weight: 500;
    :deep(img) {
      max-width: 100% !important;
      height: auto !important;
      display: block !important;
      margin: 10px 0 !important;
      /* 额外：清空图片内联的宽高样式（优先级拉满） */
      width: auto !important;
    }
    // 重置富文本中的基础文本样式
    :deep(p),
    :deep(span),
    :deep(div),
    :deep(li),
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      color: inherit !important; // 继承外层颜色（比如你主题的颜色）
      font-size: inherit;
      font-weight: inherit;
    }

    :deep(a) {
      color: inherit !important;
      text-decoration: underline; // 如果你想给链接额外样式可以写这里
    }

    :deep(strong),
    :deep(b) {
      color: var(--font) !important;
      font-weight: 600;
    }
  }
}
.content :deep(img),
.content :deep(video) {
  max-width: 100% !important; /* 不超过预览容器宽度 */
  width: 100% !important; /* 占满容器宽度 */
  height: auto !important; /* 按比例缩放，避免被拉伸 */
  display: block !important; /* 防止行内导致溢出 */
  border-radius: 8px; /* 可选视觉优化 */
}
</style>
