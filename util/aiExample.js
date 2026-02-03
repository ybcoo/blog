import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
/**
 * 确保node版本V20以上
 * 第一步npm install langchain @langchain/core
 * 安装npm install @langchain/openai    # OpenAI模型需要
 * 第二步 安装dotenv 用于加载环境变量
 * 第三步 创建 .env 文件，添加以下内容：
 * DASHSCOPE_API_KEY=你的千问API Key
 * DASHSCOPE_BASE_URL=你的千问Base URL
 */
/**
 * npm install @langchain/langgraph  # LangGraph用于状态管理和工作流
 * npm报错可选 --legacy-peer-deps 忽略依赖冲突
 */
// import { StateGraph, Annotation, MemorySaver } from "@langchain/langgraph";
// import dotenv from "dotenv";

// 获取当前文件的目录路径
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// 加载环境变量
// dotenv.config({ path: resolve(__dirname, "../../.env") });

// ============= 创建千问聊天模型 =============
const chat = new ChatOpenAI({
  model: "qwen-plus",
  apiKey: "sk-91af07eee1e8438c9b7bbb2b22f50468",
  configuration: {
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  },
});

// ============= 第一步：发送一条消息 =============
export async function helloWorld() {
  console.log("=== 第一步：发送一条消息 ===");

  const response = await chat.invoke([new HumanMessage("你好")]);

  console.log(response.content);
}

// ============= 第二步：添加系统消息（设定角色） =============
export async function withSystemMessage() {
  console.log("\n=== 第二步：添加系统消息 ===");

  const response = await chat.invoke([
    new SystemMessage("你是一个专业翻译助手，只负责翻译，不做其他事情。"),
    new HumanMessage("把 'Hello World' 翻译成中文"),
  ]);

  console.log(response.content);
}

// ============= 第三步：使用 LangGraph 自动管理对话记忆（真正自动） =============
export async function withMemory() {
  console.log("\n=== 第三步：多轮对话（LangGraph 自动管理记忆） ===");

  // 定义状态图的结构 - 使用 messagesAnnotation 预配置的消息注解
  const StateAnnotation = Annotation.Root({
    messages: Annotation({
      reducer: (x, y) => x.concat(y), //例如x=[1,2],y=[3,4],结果为[1,2,3,4]
      default: () => [],
    }),
  });

  // 定义调用模型的节点
  async function callModel(state) {
    const messages = state.messages;
    const response = await chat.invoke(messages);
    return { messages: [response] };
  }

  // 构建状态图
  const workflow = new StateGraph(StateAnnotation)
    .addNode("model", callModel)
    .addEdge("__start__", "model")
    .addEdge("model", "__end__");

  // 创建内存保存器 - 自动管理状态
  const memory = new MemorySaver();
  const app = workflow.compile({ checkpointer: memory });

  // 定义会话 ID - 同一个 ID 会自动共享历史
  const threadId = "conversation-1";
  const config = { configurable: { thread_id: threadId } };

  // 第一轮对话 - 只传新消息，LangGraph 自动追加到历史
  console.log("用户: 我叫小明");
  let res1 = await app.invoke(
    { messages: [new HumanMessage("我叫小明")] },
    config,
  );
  console.log("AI:", res1.messages[res1.messages.length - 1].content);

  // 第二轮对话 - 只传新消息，自动带上之前的上下文
  console.log("\n用户: 我叫什么名字？");
  let res2 = await app.invoke(
    { messages: [new HumanMessage("我叫什么名字？")] },
    config,
  );
  console.log("AI:", res2.messages[res2.messages.length - 1].content);

  // 查看完整的对话历史
  console.log("\n=== 完整对话历史 ===");
  res2.messages.forEach((msg) => {
    const role =
      msg instanceof HumanMessage
        ? "用户"
        : msg instanceof SystemMessage
          ? "系统"
          : "AI";
    console.log(`${role}:`, msg.content);
  });
}

// 运行示例
// helloWorld();
// withSystemMessage();
//withMemory(); // 运行第三步
// 简单版本，不使用 langgraph，避免 AsyncLocalStorage 兼容性问题
export const chatHooks = () => {
  // 系统提示词（设定 AI 角色）
  const systemPrompt = new SystemMessage(systemMessage || "你是一个友好、专业的AI助手名字叫fish，乐于助人，回答简洁明了。");

  // 用简单数组存储对话历史
  let history = [];

  const startChat = async (message) => {
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

  return { startChat };
};