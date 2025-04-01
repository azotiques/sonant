import { cn } from "@/lib/utils";
import Sidebar from "../_components/Sidebar";
import Navigation from "./Navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { redirect } from "next/navigation";
import LogoButton from "./LogoButton";

function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navigation />
      <div className="flex h-[calc(100vh-39px)] bg-zinc-950">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="px-3 py-3 gap-y-2 flex flex-col justify-between"
            defaultSize={12}
            minSize={10}
            maxSize={18}
          >
            <div className=" rounded-xl border-zinc-800 border-r-1 h-screen w-16 items-center py-2 flex flex-col">
              <LogoButton />
            </div>

            <Sidebar />
          </ResizablePanel>
          <ResizableHandle className="bg-transparent h-[calc(100vh-px)]" />
          <ResizablePanel
            className="rounded-tl-lg border-zinc-800 border-1"
            defaultSize={12}
          >
            <div className="bg-zinc-900">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Layout;
