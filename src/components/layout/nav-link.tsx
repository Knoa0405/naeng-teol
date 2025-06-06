"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuLink
      asChild
      className={cn(
        "text-sm font-medium text-muted-foreground hover:text-primary max-sm:px-2",
        isActive && "text-primary",
        navigationMenuTriggerStyle(),
      )}
    >
      <Link href={href}>{label}</Link>
    </NavigationMenuLink>
  );
};

export default NavLink;
