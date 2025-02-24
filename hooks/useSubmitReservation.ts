import { apis } from "@/apis";
import { ReservationPayload } from "@/schemas";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const useSubmitReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = useCallback<SubmitHandler<ReservationPayload>>(
    async (data) => {
      setIsLoading(true);
      setError(null);
      try {
        await apis.verifyCode(data.code);
        await apis.verifyEmailUsed(data.email);
        await apis.verifyWalletUsed(data.wallet_address);

        // TODO: this should be generate by Backend. For now, random nonce.
        const nonce = Math.floor(Math.random() * 1000000);
        const message = `Confirm reservation with code: ${data.code}, email: ${
          data.email
        } on ${new Date().toISOString()}. Nonce: ${nonce}`;
        const signature = await window.ethereum?.request({
          method: "personal_sign",
          params: [message, data.wallet_address],
        });

        const payload: ReservationPayload = {
          email: data.email,
          code: data.code,
          wallet_address: data.wallet_address,
          signature: signature,
        };
        await apis.reserve(payload);
        setSuccess(true);
      } catch (error) {
        setError(error.response.data.error);
        return error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { onSubmit, isLoading, error, success };
};

export default useSubmitReservation;
