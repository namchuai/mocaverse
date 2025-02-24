import InviteCode from "@/components/InviteCode";
import MocaNFT from "@/components/MocaNFT";
import Wrapper from "@/components/Wrapper";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="grid grid-cols-1 text-secondary md:grid-cols-2 gap-4">
        <Wrapper>
          <MocaNFT />
        </Wrapper>
        <Wrapper>
          <InviteCode />
        </Wrapper>
      </div>
    </div>
  );
}
