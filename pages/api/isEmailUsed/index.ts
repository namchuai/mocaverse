import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type ResponseData = {
  message?: string;
  error?: string;
};

const filePath = path.join(process.cwd(), "store/email.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    let reserved_emails: string[] = JSON.parse(data);

    const emailString = Array.isArray(email) ? email[0] : email;

    if (!reserved_emails.includes(emailString)) {
      reserved_emails.push(emailString);
      fs.writeFileSync(filePath, JSON.stringify(reserved_emails, null, 2));
      return res.status(200).json({ message: "Email is available" });
    } else {
      return res.status(400).json({ error: "Email already in use" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
