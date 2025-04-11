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
import {
  getPendingFriendRequests,
  getSentFriendRequests,
  getUser,
} from "../_utils/actions";

function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navigation />

      <div className="flex h-[calc(100vh-39px)] bg-neutral-900">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="px-3 py-3 gap-y-2 md:flex flex-col xs:hidden justify-between"
            defaultSize={12}
            minSize={10}
            maxSize={18}
          >
            <div className=" rounded-xl border-neutral-800 border-r-1 h-screen w-16 items-center py-2 flex flex-col">
              <LogoButton />
            </div>

            <Sidebar />
          </ResizablePanel>
          <ResizableHandle className="bg-transparent h-[calc(100vh-px)]" />
          <ResizablePanel
            className="rounded-tl-lg border-neutral-800 border-1"
            defaultSize={12}
          >
            <div className="bg-neutral-900">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Layout;
