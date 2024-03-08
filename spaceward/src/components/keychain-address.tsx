import { Link, LinkProps } from "react-router-dom";
import Address from "./address";

function KeychainId({ id, ...props }: { id: string } & Partial<LinkProps>) {
  return (
    <Link to={`/keychains/${id}`} {...props}>
      <Address address={id} hideAvatar />
    </Link>
  );
}

export default KeychainId;
