import { Link, LinkProps } from "react-router-dom";
import Address from "./address";

function KeyringAddress({ address, ...props }: { address: string } & Partial<LinkProps>) {
  return (
    <Link className="underline" to={`/keyrings/${address}`} {...props}>
      <Address address={address} />
    </Link>
  );
}

export default KeyringAddress;
