/**
 * 确保node版本V20以上
 * 第一步npm install langchain @langchain/core
 * 安装npm install @langchain/openai    # OpenAI模型需要
 */
import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
// ============= 创建千问聊天模型 =============
const chat = new ChatOpenAI({
  model: "qwen-vl-max-2025-08-13",
  apiKey: "sk-91af07eee1e8438c9b7bbb2b22f50468",
  configuration: {
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  },
});
export const chatHooks = () => {
  // 系统提示词（设定 AI 角色）

  let systemPrompt: any =
    "你是一个友好、专业的AI助手名字叫fish，乐于助人，回答简洁明了。";

  // 用简单数组存储对话历史
  let history: any = [];
  const setSystemMessage = (message: any) => {
    systemPrompt = new SystemMessage(message);
    console.log("ai---", systemPrompt);
  };
  const startChat = async (message: any) => {
    try {
      // 构建消息列表：系统提示词 + 历史 + 新消息
      const messages = [systemPrompt, ...history, new HumanMessage(message)];

      const response = await chat.invoke(messages);

      // 保存到历史
      history.push(new HumanMessage(message));
      history.push(response);

      // 限制历史长度，避免 token 过大
      if (history.length > 20) {
        history = history.slice(-20);
      }

      return response.content;
    } catch (e) {
      console.error(e);
      return "AI服务异常，请稍后再试";
    }
  };

  return { startChat, setSystemMessage };
};