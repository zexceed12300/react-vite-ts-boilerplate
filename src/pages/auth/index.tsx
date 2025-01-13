import { Outlet } from "react-router-dom";

const IndexAuth = () => {
  return (
    <div className="flex p-6 w-full min-h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default IndexAuth;
