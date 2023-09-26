import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ActionsBadge from "@/components/actions_badge";

const items = [
  { name: "Home", path: "/" },
  { name: <span>Actions <ActionsBadge /></span>, path: "/actions" },
  { name: "Policies", path: "/policies" },
  { name: "Explorer", path: "/explorer" },
];

function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {
          items.map((item) => (
            <NavigationMenuItem key={item.path}>
              <Link to={item.path}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.name}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Menu;
