import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { ReservationPayload } from "@/schemas";

const filePath = path.join(process.cwd(), "store/reserve.json");
const codePath = path.join(process.cwd(), "store/code.json");

type ResponseData = {
  code?: string;
  email?: string;
  wallet_address?: string;
  signature?: string;
  error?: any;
};

type CodeData = {
  code: string;
  max_use: number;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { code, email, wallet_address, signature } = req.body;
  if (!code || !email || !wallet_address || !signature) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = fs.readFileSync(filePath, "utf8");
  const codeData = fs.readFileSync(codePath, "utf8");
  const codes: CodeData[] = JSON.parse(codeData);
  let reserved_emails: ReservationPayload[] = JSON.parse(data);

  const findCode = codes.find((c) => c.code === code);
  if (!findCode) {
    return res.status(400).json({ error: "Code is invalid" });
  }
  if (findCode.max_use === 0) {
    return res.status(400).json({ error: "Code is already used" });
  }

  try {
    reserved_emails.push({ code, email, wallet_address, signature });
    const newCodes = { ...findCode, max_use: findCode.max_use - 1 };
    const newCodeData = codes.map((c) => (c.code === code ? newCodes : c));
    fs.writeFileSync(codePath, JSON.stringify(newCodeData, null, 2));
    fs.writeFileSync(filePath, JSON.stringify(reserved_emails, null, 2));
    return res.status(200).json({
      code,
      email,
      wallet_address,
      signature,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
