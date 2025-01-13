import { createContext, FC, ReactNode, useState } from "react";

export type SidebarContextType = {
  sidebar: boolean;
  setSidebar: (value: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SidebarContext = createContext<SidebarContextType>({
  sidebar: false,
  setSidebar: () => {},
});

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
