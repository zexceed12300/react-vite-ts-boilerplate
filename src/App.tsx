import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import RootLayout from "./pages/RootLayout";
import IndexAuth from "./pages/auth";
import Index from "./pages";
import Authentication from "./components/auth/Authentication";
import Dashboard from "./pages/dashboard/Dashboard";
import IndexDashboard from "./pages/dashboard";

const ProtectedRoute = () => {
  return (
    <Authentication>
      <Outlet />
    </Authentication>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="auth" element={<IndexAuth />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Index />} />
            <Route path="dashboard" element={<IndexDashboard />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

export default App;
