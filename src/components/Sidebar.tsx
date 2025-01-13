import { FC } from "react";
import { TbBrandReact, TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { SidebarContextType } from "./Layout";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { TbHome } from "react-icons/tb";
import { removeCookie } from "../utils/cookie";

const sidebarConfig = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: <TbHome size={24} />,
  },
];

const Sidebar: FC<SidebarContextType> = ({ sidebar, setSidebar }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const pathname = useLocation().pathname;

  const checkEndpoint = (url: string) => {
    if (pathname.split("/")[1] == "servers") {
      return pathname.split("/")[2] == url.split("/")[2];
    }
    return url.split("/")[1] == pathname.split("/")[1];
  };

  return (
    <aside>
      <div
        id="default-sidebar"
        className={`fixed md:sticky top-0 left-0 z-20 h-screen md:translate-x-0 ${
          sidebar ? "translate-x-0 w-80" : "-translate-x-full w-16"
        } transition-all duration-300 z-50 shadow-[0_6px_30px_-25px_rgba(0,0,0,0.3)]`}
        aria-label="Sidebar">
        <div className="flex flex-col justify-between h-full overflow-y-auto overflow-x-hidden bg-white">
          <ul className="space-y-2 font-medium">
            <li
              className={`flex ${
                sidebar ? "justify-start" : "justify-center"
              } bg-white h-16`}>
              <div className="flex items-center">
                <div className="flex justify-start scale-75">
                  {sidebar ? (
                    <button
                      onClick={() => setSidebar(!sidebar)}
                      className="flex gap-3 items-center">
                      <TbBrandReact size={30} />
                      <span className="font-bold text-2xl text-nowrap">
                        Your Brand
                      </span>
                    </button>
                  ) : (
                    <button onClick={() => setSidebar(!sidebar)}>
                      <TbBrandReact size={30} />
                    </button>
                  )}
                </div>
              </div>
            </li>
            {sidebarConfig.map((cfg, i) => (
              <li key={i} className="px-2">
                <Link
                  to={cfg.url}
                  className={`flex items-center px-3 py-1.5 rounded-lg ${
                    checkEndpoint(cfg.url) ? "bg-slate-100" : ""
                  } hover:bg-slate-200 group`}>
                  <div
                    className={`w-6 font-bold ${
                      checkEndpoint(cfg.url) ? "text-sky-500" : ""
                    }`}>
                    {cfg.icon}
                  </div>
                  {sidebar && (
                    <span
                      className={`ml-3 font-bold text-nowrap ${
                        checkEndpoint(cfg.url) ? "text-sky-500" : ""
                      }`}>
                      {cfg.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between bg-slate-100 rounded-xl p-3 mx-2 my-6">
            {sidebar && (
              <div className="flex flex-col">
                <span className="font-bold">{user?.name}</span>
                <span className="text-sm">{user?.email}</span>
              </div>
            )}
            <button onClick={() => {
              removeCookie("auth");
              window.location.href = "/auth/login";
            }}>
              <TbLogout className="text-red-500" size={24} />
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => setSidebar(!sidebar)}
        className={` ${
          sidebar ? "fixed" : "hidden"
        } md:hidden bg-black opacity-25 w-screen h-screen z-40`}></div>
    </aside>
  );
};

export default Sidebar;
