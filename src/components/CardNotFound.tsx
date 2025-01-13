import { FC } from "react";
import { TbClipboardX } from "react-icons/tb";

type CardNotFoundProps = {
  className?: string;
  message?: string;
  size?: "sm" | "md" | "lg";
};

export const CardNotFound: FC<CardNotFoundProps> = ({
  className,
  message = "Data kosong / Tidak ditemukan",
  size = "sm",
}) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <TbClipboardX
        className="text-gray-500 rotate-6 mb-2"
        size={size === "sm" ? 80 : size === "md" ? 98 : 128}
      />
      <span
        className={`font-bold text-gray-500 text-${
          size === "sm"
            ? "md"
            : size === "md"
            ? "lg"
            : size === "lg"
            ? "xl"
            : "xl"
        } bg-gray-200 px-3 rounded-lg mb-2 w-fit`}>
        Data Empty
      </span>
      <span className={`font-medium text-${size} text-gray-600`}>
        {message}
      </span>
    </div>
  );
};
