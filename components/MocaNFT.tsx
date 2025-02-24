"use client";
import { moca } from "@/common/label";
import GroupImages from "./GroupImages";
import { Button } from "./ui/button";

const MocaNFT: React.FC = () => {
  const handleSubmit = () => {};

  return (
    <>
      <div className="font-semibold text-sm">{moca.name}</div>
      <div className="font-bold text-lg text-yellow-200">{moca.title}</div>
      <div className="text-sm text-center">{moca.subTitle}</div>
      <GroupImages
        imageUrls={[
          "https://i.seadn.io/s/raw/files/2b7d0d924c4dadb469884ac76f24addf.png?auto=format&dpr=1&w=1000",
          "https://i.seadn.io/s/raw/files/b9358366fd2fac160f177a988313fe45.png?auto=format&dpr=1&w=1000",
          "https://i.seadn.io/s/raw/files/7bf9db4386a68d25f97e95fb4149eb2b.png?auto=format&dpr=1&w=1000",
        ]}
      />
      <div className="text-sm text-center text-green-600">{moca.notice}</div>
      <Button variant={"main"} onClick={handleSubmit}>
        {moca.button}
      </Button>
    </>
  );
};
export default MocaNFT;
