import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

function Navigation() {
  return (
    <div className="fixed left-0 right-0 top-4 bg-black m-[0_auto] lg:w-[80rem] rounded-full">
      <div className="flex items-center justify-between lg:px-[12rem] lg:py-4 md:px-[12rem] md:py-4">
        <Logo />
        <div className="flex items-center justify-between gap-8">
          <ul>
            <Link href="/about" className="font-mono">
              {"ABOUT"}
            </Link>
          </ul>
          <ul>
            <Link href="/features" className="font-mono">
              {"FEATURES"}
            </Link>
          </ul>
          <ul>
            <Link href="/signin" className="font-mono">
              <Button type="medium">{"SING IN"}</Button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
