import { useContext, ReactNode, FC, createContext, useState } from "react";
import Sidebar from "./Sidebar";

export type SidebarContextType = {
  sidebar: boolean;
  setSidebar: (value: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { sidebar, setSidebar } = useSidebar();

  return (
    <main className="flex w-full">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div
        className={`flex flex-col ${
          sidebar ? "md:w-[calc(100%-16rem)] " : "md:w-[calc(100%-4rem)]"
        } w-full bg-slate-100 min-h-screen transition-all duration-300`}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
