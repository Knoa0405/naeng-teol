"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const MainNav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex justify-center items-center space-x-4 lg:space-x-6 pt-4">
      <Button>냉장고 털기</Button>
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
