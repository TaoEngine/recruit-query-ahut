import axios from "axios";

/**
 * 处理请求参数并发送API请求
 * @param params 请求参数对象
 * @returns API响应数据
 */
export async function handleRecruitRequest(params: {
  action: string;
  month?: string;
  year?: string;
  mon?: string;
  day?: string;
  pagesize?: string;
  pageindex?: string;
}) {
  const urlParams = new URLSearchParams();
  urlParams.append("action", params.action);

  if (params.month !== undefined) urlParams.append("month", params.month);
  if (params.year !== undefined) urlParams.append("year", params.year);
  if (params.mon !== undefined) urlParams.append("mon", params.mon);
  if (params.day !== undefined) urlParams.append("day", params.day);
  if (params.pagesize !== undefined) urlParams.append("pagesize", params.pagesize);
  if (params.pageindex !== undefined) urlParams.append("pageindex", params.pageindex);
  urlParams.append("rand", Math.random().toString());

  const response = await axios.post(
    "https://ahut.ahbys.com/API/Web/Recruit.ashx",
    urlParams,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}