import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Check, Info } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  type: "error" | "success";
  onClose: (open: boolean) => void;
  message?: string;
};

const SubmitModal: React.FC<Props> = ({ isOpen, type, onClose, message }) => {
  const navigate = useRouter();
  const handleClose = () => {
    type === "success" ? onClose(true) : onClose(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        isShowCloseIcon={!Boolean(type === "success")}
        className="w-full flex items-center justify-center flex-col gap-4"
      >
        {type === "error" ? (
          <Info className={cn("text-red-500")} size={48} />
        ) : (
          <Check className="text-green-500" size={48} />
        )}

        <DialogDescription>{message}</DialogDescription>
        {type === "success" && (
          <Button
            className="min-w-[100px]"
            onClick={() => navigate.push("/")}
            variant="destructive"
          >
            Home
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default SubmitModal;
