import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";

import { ThemeToggle } from "@/components/theme-toggle";

import { NavLink } from "./nav-link";
import SessionSign from "./session-sign";

const MainNav = async () => {
  const navigationItems = [
    { label: "냉장고 털기", href: "/" },
    { label: "커뮤니티", href: "/community" },
  ];

  return (
    <nav className="flex items-center justify-center space-x-4 pt-4 lg:space-x-6">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          {navigationItems.map(item => (
            <NavigationMenuItem key={item.href}>
              <NavLink href={item.href} label={item.label} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
      <SessionSign />
    </nav>
  );
};

export default MainNav;
