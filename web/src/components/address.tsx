import { useKeplrAddress } from "../keplr";

export default function Address(props: { address: string }) {
  const myAddr = useKeplrAddress();
  if (props.address === myAddr) {
    return (
      <span className="font-mono">
        You ({props.address})
      </span>
    );
  }

  return (
    <span className="font-mono">
      {props.address}
    </span>
  );
}
