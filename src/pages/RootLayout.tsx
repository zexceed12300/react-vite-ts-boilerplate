import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NextUIProvider } from "@nextui-org/react";
import Authentication from "../components/auth/Authentication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "../components/Layout";
import { Toaster } from "react-hot-toast";

interface RootLayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <NextUIProvider locale="en-GB">
            <Authentication>
              <SidebarProvider>{children}</SidebarProvider>
            </Authentication>
          </NextUIProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
