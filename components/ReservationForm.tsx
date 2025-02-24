"use client";

import type React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { reservationSchema } from "@/schemas";
import { reservation } from "@/common/label";
import GroupImages from "./GroupImages";
import ConnectWallet from "./ConnectWallet";
import useSubmitReservation from "@/hooks/useSubmitReservation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import SubmitModal from "./SubmitModal";

type Props = {
  code: string;
};

export default function ReservationForm({ code }: Props) {
  const { address } = useAccount();
  const { onSubmit, error, isLoading, success } = useSubmitReservation();
  const [openModal, setOpenModal] = useState(false);
  const form = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (!address) {
      form.reset();
      return;
    }
    form.setValue("wallet_address", address);
    form.setValue("code", code);
    form.setValue("signature", "123");
  }, [address]);

  useEffect(() => {
    if (error || success) {
      setOpenModal(true);
    }
  }, [error, success]);

  return (
    <>
      <Form {...form}>
        <form
          className="w-full text-secondary max-w-md flex flex-col justify-center rounded-2xl p-6 bg-blue-950"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ConnectWallet />
          <div className="my-4">
            <GroupImages
              imageUrls={[
                "https://i.seadn.io/s/raw/files/2b7d0d924c4dadb469884ac76f24addf.png?auto=format&dpr=1&w=1000",
                "https://i.seadn.io/s/raw/files/b9358366fd2fac160f177a988313fe45.png?auto=format&dpr=1&w=1000",
                "https://i.seadn.io/s/raw/files/7bf9db4386a68d25f97e95fb4149eb2b.png?auto=format&dpr=1&w=1000",
              ]}
            />
            <Label htmlFor="email">{reservation.emailAddress}</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={!address}
                      className="bg-secondary rounded-full text-primary mt-2"
                      placeholder={reservation.enterEmail}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={!address} type="submit" variant={"main"}>
            {isLoading ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
      <SubmitModal
        message={error ? error : "Submit successfully"}
        isOpen={openModal}
        type={error ? "error" : "success"}
        onClose={setOpenModal}
      />
    </>
  );
}
