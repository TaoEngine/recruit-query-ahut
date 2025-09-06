import type { Handler } from "@netlify/functions";
import { handleRecruitRequest } from "./utils.js";
import querystring from "querystring";

// 代理API请求，避免CORS问题
const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    let requestData: any;
    
    // 检查请求内容类型
    const contentType = event.headers?.['content-type'] || event.headers?.['Content-Type'] || '';
    
    if (contentType.includes('application/json')) {
      // 处理JSON格式请求体
      requestData = JSON.parse(event.body || "{}");
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // 处理表单格式请求体
      requestData = querystring.parse(event.body || "");
    } else {
      // 默认尝试解析为表单数据
      requestData = querystring.parse(event.body || "");
    }

    const { action, month, year, mon, day, pagesize, pageindex } = requestData;
    
    const data = await handleRecruitRequest({ action, month, year, mon, day, pagesize, pageindex });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("API请求错误:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "请求失败" }),
    };
  }
};

export { handler };