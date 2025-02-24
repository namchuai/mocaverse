import * as yup from "yup";

export const reservationSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      )
      .required("Email is required"),
    code: yup.string().required("Code is required"),
    wallet_address: yup.string().required("Wallet address is required"),
    signature: yup.string().required("Signature is required"),
  })
  .required();

export type ReservationPayload = yup.InferType<typeof reservationSchema>;
