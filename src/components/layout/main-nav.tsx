import SignIn from "@/components/ui/sign-in";
import SignOut from "@/components/ui/sign-out";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { auth } from "@/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "@/components/nav-link";

const MainNav = async () => {
  const session = await auth();

  const navigationItems = [
    { label: "냉장고 털기", href: "/" },
    { label: "커뮤니티", href: "/community" },
  ];

  return (
    <nav className="flex justify-center items-center space-x-4 lg:space-x-6 pt-4">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavLink href={item.href} label={item.label} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
      {session ? <SignOut /> : <SignIn />}
    </nav>
  );
};

export default MainNav;
