import { Link, LinkProps } from "react-router-dom";
import Address from "./address";

function KeychainAddress({ address, ...props }: { address: string } & Partial<LinkProps>) {
  return (
    <Link to={`/keychains/${address}`} {...props}>
      <Address address={address} hideAvatar />
    </Link>
  );
}

export default KeychainAddress;
