import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function Navigation() {
  return (
    <div className="fixed left-0 right-0 top-4 bg-black m-[0_auto] lg:w-[80rem] rounded-full">
      <div className="text-white flex items-center justify-between lg:px-[12rem] lg:py-4 md:px-[12rem] md:py-4">
        <div className="flex items-center justify-between gap-8">
          <Link href="/">
            <div className="">
              <Logo />
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-black">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center justify-between gap-8">
          <ul>
            <Link className="text-sm" href="/signin">
              {"Sign In"}
            </Link>
          </ul>
          <ul>
            <Link href="/signup">
              <Button className="text-sm" type="medium">
                {"Sign Up"}
              </Button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
