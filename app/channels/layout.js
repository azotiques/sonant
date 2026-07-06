import Navigation from "./Navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LogoButton from "./LogoButton";
import AllFriendsSidebar from "../_components/AllFriendsSidebar";
import Sidebar from "../_components/Sidebar";
import { getUser } from "../_utils/actions";

async function Layout({ children }) {
  const { userAccount } = await getUser();

  return (
    <div className="h-screen overflow-hidden bg-zinc-950">
      <Navigation />

      <div className="h-[calc(100vh-39px)] bg-zinc-950">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="hidden min-w-0 border-r border-zinc-800 bg-zinc-950 md:flex"
            defaultSize={24}
            minSize={22}
            maxSize={38}
          >
            <div className="relative flex h-full min-w-0 flex-1">
              <div className="flex h-full w-[72px] shrink-0 flex-col items-center border-r border-zinc-800 bg-zinc-950 px-2 py-3">
                <LogoButton />
              </div>

              <div className="min-w-0 flex-1 bg-zinc-950">
                <AllFriendsSidebar user={userAccount} />
              </div>

              <div className="absolute inset-x-2 bottom-2 z-10 rounded-lg bg-zinc-950/95 p-1.5 shadow-2xl shadow-zinc-950/60 backdrop-blur">
                <Sidebar user={userAccount} />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-zinc-800" />

          <ResizablePanel
            className="min-w-0 rounded-tl-lg border border-zinc-800 bg-zinc-950"
            defaultSize={70}
            minSize={50}
          >
            <div className="h-full min-w-0 bg-zinc-950">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Layout;
