import Long from "long";
import { Link, LinkProps } from "react-router-dom";
import Address from "./address";

function KeychainId({ id, ...props }: { id: string | Long } & Omit<Partial<LinkProps>, "id">) {
  return (
    <Link to={`/keychains/${id.toString()}`} {...props}>
      <Address address={id.toString()} hideAvatar />
    </Link>
  );
}

export default KeychainId;
