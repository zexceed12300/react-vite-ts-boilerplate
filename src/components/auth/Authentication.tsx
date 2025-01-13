import { FC, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useCallback, useEffect } from "react";
import api from "../../services/api";
import { setUser } from "../../redux/slice";
import { CircularProgress } from "@nextui-org/react";

export interface AuthenticationProps {
  children: ReactNode;
}

const Authentication: FC<AuthenticationProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const queryString = queryParams.toString();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // const expiredAt = useSelector((state: RootState) => state.auth.expiredAt);
  const user = useSelector((state: RootState) => state.auth.user);
  const clientId = `${window.location.protocol}//${window.location.host}${pathname}?${queryString}`;

  const getUser = useCallback(() => {
    api
      .get("/auth/user")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          console.log(res);
          dispatch(setUser(res.data.data));
          console.log("Auth: User authenticated");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status == 401) {
          console.log("Auth: ", err.response.status);
          navigate(`auth/login?pass=${pathname}`);
        } else {
          console.log(err);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!accessToken) {
      console.log(clientId);
      navigate(`auth/login?pass=${pathname}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken && !user) {
      getUser();
    }
  }, [accessToken, user, getUser]);

  return (accessToken && user) || pathname.includes("/auth/") ? (
    <>{children}</>
  ) : (
    <div className="flex items-center gap-3 justify-center h-screen">
      <CircularProgress
        strokeWidth={4}
        classNames={{
          svg: "text-blue-600 w-5 h-5",
        }}
      />
      <span>Authenticating User</span>
    </div>
  );
};

export default Authentication;
