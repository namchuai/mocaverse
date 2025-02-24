"use client";

import { inviteCode } from "@/common/label";
import { useEffect, useState } from "react";
import { apis } from "@/apis";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SubmitModal from "./SubmitModal";

const InviteCode: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenModal(true);
    }
  }, [error]);

  const handleSubmit = async () => {
    try {
      const res = await apis.verifyCode(input);
      router.push("/reservation?code=" + res.code);
    } catch (error) {
      setError(error.response.data.error);
      return error;
    }
  };

  const isDisabled = input.length === 0;

  return (
    <>
      <div className="font-semibold text-sm">{inviteCode.name}</div>
      <div className="font-bold text-lg text-yellow-200">{inviteCode.title}</div>
      <div className="text-sm text-center">{inviteCode.subTitle}</div>
      <Image src={"/image.png"} className="object-cover" width={170} height={170} alt={""} />
      <Input
        placeholder={inviteCode.placeholder}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <Button variant={"main"} disabled={isDisabled} onClick={handleSubmit}>
        {inviteCode.button}
      </Button>
      <SubmitModal isOpen={openModal} type={"error"} onClose={setOpenModal} message={error} />
    </>
  );
};
export default InviteCode;
