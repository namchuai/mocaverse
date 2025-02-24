import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { shortenAddress } from "@/lib/utils";

const ConnectWallet: React.FC = () => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      {address ? (
        <div className="w-full border flex items-center p-2 rounded-xl justify-between">
          <div className="text-sm">Connected with {shortenAddress(address)}</div>
          <Button type="button" variant="main" size="sm" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      ) : (
        connectors.map((connector) => (
          <Button
            type="button"
            variant="main"
            key={connector.uid}
            onClick={() => connect({ connector })}
          >
            Connect Wallet
          </Button>
        ))
      )}
    </>
  );
};

export default ConnectWallet;
