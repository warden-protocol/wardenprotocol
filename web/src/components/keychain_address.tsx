import { Link, LinkProps } from "react-router-dom";
import Address from "./address";

function KeychainAddress({ address, ...props }: { address: string } & Partial<LinkProps>) {
  return (
    <Link className="underline" to={`/keychains/${address}`} {...props}>
      <Address address={address} />
    </Link>
  );
}

export default KeychainAddress;
