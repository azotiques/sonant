import Sidebar from "../_components/Sidebar";
import Navigation from "./Navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navigation />
      <div className="flex h-[calc(100vh-39px)] bg-zinc-950">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="px-3 py-3 flex flex-col justify-end"
            defaultSize={12}
            minSize={10}
            maxSize={18}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle className="bg-transparent h-[calc(100vh-px)]" />
          <ResizablePanel
            className="rounded-tl-lg border-zinc-800 border-1"
            defaultSize={12}
          >
            <div className="bg-zinc-900 w-screen">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Layout;
