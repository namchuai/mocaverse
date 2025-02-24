import { ReservationPayload } from "@/schemas";
import axios from "axios";

enum API_URL {
  isWalletUsed = "/api/isWalletUsed",
  isEmailUsed = "/api/isEmailUsed",
  verifyCode = "/api/verifyCode",
  reserve = "/api/reserve",
}

const verifyCode = async (code: string) => {
  const res = await axios.get(API_URL.verifyCode, {
    params: { code },
  });
  return res.data;
};

const verifyEmailUsed = async (email: string) => {
  const res = await axios.get(API_URL.isEmailUsed, {
    params: { email },
  });
  return res.data;
};

const verifyWalletUsed = async (wallet: string) => {
  const res = await axios.get(API_URL.isWalletUsed, {
    params: { wallet },
  });
  return res.data;
};

const reserve = async (data: ReservationPayload) => {
  const res = await axios.post(API_URL.reserve, data);
  return res.data;
};

export const apis = {
  verifyCode,
  verifyEmailUsed,
  verifyWalletUsed,
  reserve,
};
