import { CircularProgress } from "@nextui-org/react";
import { Link } from "react-router-dom";

export interface Button {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  href?: string;
  disabled?: boolean;
  compact?: boolean;
};

export function Button({
  type = "button",
  children,
  onClick,
  leftIcon,
  rightIcon,
  className = "bg-blue-500 hover:bg-blue-600",
  loading,
  href = "",
  disabled = false,
}: Button) {
  return !href ? (
    <button
      disabled={loading || disabled}
      type={type}
      className={`flex min-w-36 ${
        loading || disabled ? "opacity-50" : "opacity-100"
      } items-center justify-center gap-2 text-white rounded-lg font-bold duration-300 ${className}`}
      onClick={onClick}>
      {loading ? (
        <>
          <CircularProgress
            strokeWidth={4}
            classNames={{
              svg: "text-white w-5 h-5",
            }}
          />
          <span>Please wait</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="text-lg">{leftIcon}</span>}
          <span className="text-nowrap text-ellipsis overflow-hidden">
            {children}
          </span>
          {rightIcon && <span className="text-lg">{rightIcon}</span>}
        </>
      )}
    </button>
  ) : (
    <Link
      type={type}
      className={`flex min-w-36 ${
        loading || disabled ? "opacity-50" : "opacity-100"
      } items-center justify-center gap-2 text-white py-2 px-3 rounded-lg font-bold duration-300 ${className}`}
      onClick={onClick}
      to={href}>
      {leftIcon && <span className="text-lg">{leftIcon}</span>}
      <span className="text-nowrap text-ellipsis overflow-hidden">
        {children}
      </span>
      {rightIcon && <span className="text-lg">{rightIcon}</span>}
    </Link>
  );
}

export default Button;
