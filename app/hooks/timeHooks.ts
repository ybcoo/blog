export const timeHooks = () => {
  /**
   * 时间戳 转 yyyy-MM-dd
   * @param timestamp 时间戳(数字/字符串)
   * @returns 格式化日期 yyyy-MM-dd，异常返回空字符串
   */
  function formatTimestampToDate(timestamp: number | string): string {
    try {
      // 1. 转数字（兜底字符串）
      const ts = Number(timestamp);

      // 2. 非法值直接返回空
      if (isNaN(ts) || ts <= 0) return "";

      // 3. 生成日期
      const date = new Date(ts);

      // 4. 非法日期返回空
      if (date.toString() === "Invalid Date") return "";

      // 5. 格式化
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch {
      // 异常兜底
      return "";
    }
  }
  return { formatTimestampToDate };
};
