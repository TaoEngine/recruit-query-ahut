import express from "express";
import path from "path";
import axios from "axios";

const app = express();
const PORT = 80;

// 添加解析body的中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 设置静态文件目录
app.use(express.static("public"));

// 路由
app.get("/", (_req: any, res: { sendFile: (arg0: string) => void }) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 代理API请求，避免CORS问题
app.post("/api/recruit", async (req, res) => {
  try {
    const { action, month, year, mon, day, pagesize, pageindex } = req.body;

    const params = new URLSearchParams();
    params.append("action", action);

    if (month !== undefined) params.append("month", month);
    if (year !== undefined) params.append("year", year);
    if (mon !== undefined) params.append("mon", mon);
    if (day !== undefined) params.append("day", day);
    if (pagesize !== undefined) params.append("pagesize", pagesize);
    if (pageindex !== undefined) params.append("pageindex", pageindex);
    params.append("rand", Math.random().toString());

    const response = await axios.post(
      "https://ahut.ahbys.com/API/Web/Recruit.ashx",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("API请求错误:", error);
    res.status(500).json({ error: "请求失败" });
  }
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
