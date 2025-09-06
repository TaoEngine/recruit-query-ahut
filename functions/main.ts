import express from "express";
import path from "path";
import { handleRecruitRequest } from "./utils.js";

const app = express();
// Netlify Functions 会自动分配端口
const PORT = process.env["PORT"] || 80;

// 添加解析body的中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 设置静态文件目录
app.use(express.static("public"));

// 路由
app.get("/", (_req: any, res: { sendFile: (arg0: string) => void }) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// 代理API请求，避免CORS问题
app.post("/api/recruit", async (req, res) => {
  try {
    const { action, month, year, mon, day, pagesize, pageindex } = req.body;
    
    const data = await handleRecruitRequest({ action, month, year, mon, day, pagesize, pageindex });
    
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("API请求错误:", error);
    res.status(500).json({ error: "请求失败" });
  }
});

// 保留本地开发服务器功能
if (process.env["NODE_ENV"] !== "production") {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}

// 导出默认的Express应用供Netlify函数使用
export default app;