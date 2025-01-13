import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/login";
import { useCallback, useState } from "react";
import { LoginRequestType, LoginResponseType } from "../../types/auth";
import api from "../../services/api";
import { setToken, setUser } from "../../redux/slice";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const pass = queryParams.get("pass");

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getUser = useCallback(() => {
    api
      .get("/api/auth/user")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          dispatch(setUser(res.data.data));
          console.log("Auth: User authenticated");
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [dispatch]);

  const login = useMutation({
    mutationFn: async (data: LoginRequestType): Promise<LoginResponseType> => {
      const res = await api.post("/auth/login", data);

      return res.data;
    },
    onSuccess: (data: LoginResponseType) => {
      api.defaults.headers[
        "Authorization"
      ] = `Bearer ${data.data.access_token}`;

      getUser();

      console.log("Auth: Token set: ", data);

      dispatch(
        setToken({
          accessToken: data.data.access_token,
          refreshToken: data.data.access_token,
        })
      );

      if (pass && pass != "/auth/login") {
        navigate(pass);
      } else {
        navigate("/");
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        login.mutate(data);
      })}
      className="rounded-lg p-14 w-full max-w-[450px] flex flex-col justify-around min-h-[500px] m-auto">
      <div className="flex flex-col gap-2 mb-2">
        <div className="text-center text-xl font-medium">React Vite TS Boilerplate</div>
        <div className="text-center text-sm">
          Masuk untuk melanjutkan ke dashboard admin
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gray-300 w-full outline-none text-sm"
          />
          {errors.email && (
            <label className="block mb-2 text-sm text-red-600">
              {errors.email.message}
            </label>
          )}
        </div>
        <div>
          <div className="relative">
            <input
              {...register("password")}
              placeholder="Password"
              className="outline-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-gray-300 w-full text-sm"
              type={showPassword ? "text" : "password"}
            />
            {showPassword ? (
              <PiEye
                onClick={() => setShowPassword(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
              />
            ) : (
              <PiEyeClosed
                onClick={() => setShowPassword(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
              />
            )}
          </div>
          {errors.password && (
            <label className="block mb-2 text-sm text-red-600">
              {errors.password.message}
            </label>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 w-full mt-4 h-10 text-sm font-semibold"
        loading={login.isPending}>
        Masuk
      </Button>
      <div className="text-sm text-center">Copyright © 2024</div>
    </form>
  );
};

export default Login;
