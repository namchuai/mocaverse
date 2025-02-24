import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  imageUrls: string[];
};

const GroupImages: React.FC<Props> = ({ imageUrls }) => (
  <div className="flex items-center justify-center gap-2 -space-x-4">
    {imageUrls.map((url, index) => (
      <Image
        className={cn(index === 1 && "mb-6")}
        key={index}
        src={url}
        width={80}
        height={80}
        alt={""}
      />
    ))}
  </div>
);

export default GroupImages;
