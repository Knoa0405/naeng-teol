"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";

import ThemeToggle from "@/components/theme-toggle";

import AuthGuard from "./auth-guard";
import AuthNav from "./auth-nav";

import NavLink from "./nav-link";
import SessionSign from "./session-sign";

const MainNav = () => {
  const navigationItems = [
    { label: "냉장고 털기", href: "/" },
    { label: "커뮤니티", href: "/community" },
  ];

  return (
    <NavigationMenu className="flex items-center justify-center space-x-2 pt-4 md:space-x-4 lg:space-x-8">
      <NavigationMenuList className="flex items-center gap-2 scrollbar-hide max-sm:w-60 max-sm:overflow-x-scroll max-xs:w-48 lg:gap-8">
        {navigationItems.map(item => (
          <NavigationMenuItem key={item.href}>
            <NavLink href={item.href} label={item.label} />
          </NavigationMenuItem>
        ))}
        <AuthGuard>
          <AuthNav />
        </AuthGuard>
      </NavigationMenuList>
      <SessionSign />
      <ThemeToggle />
    </NavigationMenu>
  );
};

export default MainNav;
