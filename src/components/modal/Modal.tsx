import { createContext, FC, useContext, useEffect, useRef } from "react";
import { LuAlertCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { Button } from "../Button";

export interface ModalContextType {
  onClickOutside?: () => void;
};

const ModalContext = createContext<ModalContextType>({});

const useModal = () => {
  return useContext(ModalContext);
};

export interface ModalContainerType {
  id?: string;
  display?: string;
  onClickOutside?: () => void;
  children: React.ReactNode;
};

export const ModalContainer: FC<ModalContainerType> = ({
  id = "",
  display = "",
  onClickOutside = undefined,
  children,
}) => {
  useEffect(() => {
    if (display) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return function () {
      document.body.style.overflow = "auto";
    };
  }, [id, display]);

  if (id !== display) return null;

  return (
    <ModalContext.Provider value={{ onClickOutside }}>
      <div className="fixed w-full h-screen flex top-0 left-0 z-50 p-4 overflow-y-auto">
        <div className="fixed w-full h-full bg-black bg-opacity-40 top-0 left-0"></div>
        {children}
      </div>
    </ModalContext.Provider>
  );
};

export interface ModalType {
  title?: string;
  className?: string;
  children: React.ReactNode;
  width?: string;
};

export const Modal: FC<ModalType> = ({
  title = "",
  className = "",
  children,
  width = "",
}) => {
  const { onClickOutside } = useModal();

  return (
    <div
      className={`relative z-10 bg-white m-auto p-4 rounded-xl w-full shadow ${className}`}
      style={{ maxWidth: width }}>
      <div className="flex gap-4 mb-6">
        <div className="text-xl font-bold">{title}</div>
        <button
          onClick={onClickOutside}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex ml-auto">
          <MdClose className="text-xl m-auto" />
        </button>
      </div>
      {children}
    </div>
  );
};

export interface AlertModalType {
  icon?: React.ReactNode;
  message?: string;
  leftButton?: {
    label?: string;
    onClick?: () => void;
    loading?: boolean;
    className?: string;
  };
  rightButton?: {
    label?: string;
    onClick?: () => void;
    loading?: boolean;
    className?: string;
  };
};

export const AlertModal: FC<AlertModalType> = ({
  icon = null,
  message = "",
  leftButton = { label: "", onClick: () => {}, loading: false, className: "" },
  rightButton = { label: "", onClick: () => {}, loading: false, className: "" },
}) => {
  const { onClickOutside } = useModal();

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen">
      <div className="fixed bg-black bg-opacity-40 w-full h-screen"></div>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-xl shadow ">
          <button
            onClick={onClickOutside}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
            <MdClose className="text-xl" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            {icon ? (
              icon
            ) : (
              <LuAlertCircle className="mx-auto mb-4 text-gray-400 w-16 h-16" />
            )}
            <h3 className="mb-5 font-bold">{message}</h3>
            <div className="flex justify-center gap-2">
              <Button
                className={
                  leftButton.className ?? "bg-red-600 hover:bg-red-700"
                }
                loading={leftButton.loading}
                onClick={leftButton.onClick}>
                {leftButton.label}
              </Button>
              <Button
                className={rightButton?.className}
                onClick={rightButton.onClick}
                loading={rightButton.loading}>
                {rightButton.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface MiniModalType {
  onClickOutside?: () => void;
  id?: string;
  display?: string;
  className?: string;
  children: React.ReactNode;
};

export const MiniModal: FC<MiniModalType> = ({
  onClickOutside = () => {},
  id = "",
  display = "",
  className = "",
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        typeof onClickOutside === "function"
      )
        onClickOutside();
    };

    if (id === display) document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [display, id, onClickOutside]);

  if (id !== display) return null;

  return (
    <div ref={modalRef} className={`absolute top-[100%] z-50 ${className}`}>
      {children}
    </div>
  );
};
