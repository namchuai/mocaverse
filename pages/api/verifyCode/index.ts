import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "store/code.json");

type ResponseData = {
  message?: string;
  code?: string | null;
  error?: any;
};

type CodeData = {
  code: string;
  max_use: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const data = fs.readFileSync(filePath, "utf8");
  const codes: CodeData[] = JSON.parse(data);
  const code = req.query.code as string;

  try {
    const findCode = codes.find((c) => c.code === code);
    if (!findCode) {
      return res.status(400).json({ error: "Code is invalid" });
    }
    if (findCode.max_use === 0) {
      return res.status(400).json({ error: "Code is already used" });
    }
    fs.writeFileSync(filePath, JSON.stringify(codes, null, 2));
    return res.status(200).json({ message: "Code is valid", code });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
