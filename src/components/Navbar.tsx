/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { PiListBold } from "react-icons/pi";
import { TbCaretDownFilled } from "react-icons/tb";
import { removeCookie } from "../utils/cookie";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export interface NavbarType {
  sidebar: boolean | undefined;
  setSidebar: (value: boolean) => void | undefined;
}

export function Navbar({ sidebar, setSidebar }: NavbarType) {
  const user = useSelector((state: RootState) => state.auth.user);
  const pathname = useLocation().pathname;

  const client_id = `${window.location.protocol}//${window.location.host}${pathname}`;
  const authUrl = useSelector((state: RootState) => state.env.authUrl);

  return (
    <div className="md:hidden flex sticky top-0 items-center bg-white h-16 px-3 shadow-[0_6px_30px_-25px_rgba(0,0,0,0.3)] z-30">
      <button onClick={() => setSidebar(!sidebar)}>
        <PiListBold className="text-black text-2xl font-bold" />
      </button>
      <div className="ml-auto">
        <Dropdown>
          <DropdownTrigger>
            <button className="outline-none flex gap-1">
              <div className="flex flex-col justify-end items-end text-black">
                <span className="font-bold">{user?.name}</span>
                <span className="text-xs">{user?.email}</span>
              </div>
              <TbCaretDownFilled className="mt-2 text-xs" />
            </button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="logout" color="danger" onClick={() => {}}>
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
