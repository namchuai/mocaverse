import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  error?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const wallet = req.query.wallet as string;

  if (!wallet) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const isUsed = false;

    if (!isUsed) {
      return res.status(200).json({ message: "Wallet is available" });
    } else {
      return res.status(400).json({ error: "Wallet already in use" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
