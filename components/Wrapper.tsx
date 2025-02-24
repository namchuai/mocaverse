import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Wrapper: React.FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      "bg-blue-950 rounded-2xl p-6 flex items-center justify-center flex-col gap-2",
      className
    )}
  >
    {children}
  </div>
);
export default Wrapper;
