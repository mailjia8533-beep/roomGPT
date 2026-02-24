// pages/api/generate.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, imageUrl } = req.body;

  // 从 Zeabur 的环境变量中读取配置
  const API_KEY = process.env.RUNNINGHUB_API_KEY;
  const WORKFLOW_ID = process.env.WORKFLOW_ID;
  const PROMPT_NODE_ID = process.env.PROMPT_NODE_ID || "6"; // 默认填你的提示词节点ID
  const IMAGE_NODE_ID = process.env.IMAGE_NODE_ID || "9";   // 默认填你的图片节点ID

  try {
    const response = await fetch("https://www.runninghub.ai/api/v1/task/openapi/v2/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        workflow_id: WORKFLOW_ID,
        input_nodes: {
          [PROMPT_NODE_ID]: { "text": prompt },
          // 如果你的工作流需要输入图片（试穿功能），取消下面这行的注释
          // [IMAGE_NODE_ID]: { "image_url": imageUrl } 
        }
      }),
    });

    const data = await response.json();
    
    if (data.code === 0) {
      // 成功获取 RunningHub 任务 ID
      res.status(200).json({ taskId: data.data.task_id });
    } else {
      res.status(500).json({ error: data.msg });
    }
  } catch (error) {
    res.status(500).json({ error: "连接 RunningHub 失败" });
  }
}
