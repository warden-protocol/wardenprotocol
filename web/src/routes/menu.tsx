import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ActionsBadge from "@/components/actions_badge";

const items = [
  { name: "Home", path: "/" },
  { name: <span>Actions <ActionsBadge /></span>, path: "/actions" },
  { name: "Policies", path: "/policies" },
  { name: "Explorer", path: "/explorer" },
  { name: "Wallet Connect", path: "/walletconnect" },
];

function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {
          items.map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to={item.path}>
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Menu;
