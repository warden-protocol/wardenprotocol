import { useKeplrAddress } from "../keplr";

export default function Address(props: { address: string }) {
  const myAddr = useKeplrAddress();
  if (props.address === myAddr) {
    return "you";
  }
  return props.address;
}
