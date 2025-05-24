"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";

import ThemeToggle from "@/components/theme-toggle";

import AuthGuard from "./auth-guard";

import NavLink from "./nav-link";
import SessionSign from "./session-sign";

const MainNav = () => {
  const navigationItems = [
    { label: "냉장고 털기", href: "/" },
    { label: "커뮤니티", href: "/community" },
    { label: "내 좋아요", href: "/users/me/likes", authOnly: true },
    { label: "내 레시피", href: "/users/me/recipes", authOnly: true },
  ];

  return (
    <NavigationMenu className="flex items-center justify-center space-x-2 p-4 md:space-x-4 lg:space-x-8">
      <NavigationMenuList className="flex items-center gap-2 scrollbar-hide max-sm:w-52 max-sm:overflow-x-scroll max-xs:w-48 lg:gap-8">
        <AuthGuard>
          {navigationItems.map(item => (
            <NavigationMenuItem key={item.href} data-auth-only={item.authOnly}>
              <NavLink href={item.href} label={item.label} />
            </NavigationMenuItem>
          ))}
        </AuthGuard>
      </NavigationMenuList>
      <SessionSign />
      <ThemeToggle />
    </NavigationMenu>
  );
};

export default MainNav;
