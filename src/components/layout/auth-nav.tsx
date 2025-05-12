"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";

import NavLink from "./nav-link";

const AuthNav = () => {
  const navLinks = [
    { label: "내 좋아요", href: "/users/me/likes" },
    { label: "내 레시피", href: "/users/me/recipes" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map(link => (
          <NavigationMenuItem key={link.href}>
            <NavLink href={link.href} label={link.label} />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AuthNav;
