"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/ui/button";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MainNav = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navigationItems = [
    { label: "냉장고 털기", href: "/" },
    { label: "커뮤니티", href: "/community" },
  ];

  return (
    <nav className="flex justify-center items-center space-x-4 lg:space-x-6 pt-4">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-primary",
                    pathname === item.href && "text-primary",
                    navigationMenuTriggerStyle()
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </nav>
  );
};

export default MainNav;
