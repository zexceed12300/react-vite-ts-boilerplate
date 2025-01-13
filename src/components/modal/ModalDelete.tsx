import { FC } from "react";
import { LuAlertCircle } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { Button } from "../Button";

export interface ModalDeleteProps {
  message?: string | null;
  onDelete: () => void;
  closeModal: () => void;
  loading: boolean;
};

export const ModalDelete: FC<ModalDeleteProps> = ({
  message = null,
  onDelete = () => {},
  closeModal = () => {},
  loading,
}) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen">
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-40 w-full h-screen"></div>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-xl shadow ">
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
            <MdClose className="text-xl" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <LuAlertCircle className="mx-auto mb-4 text-gray-400 w-16 h-16" />
            <h3 className="mb-5 font-bold">{message}</h3>
            <div className="flex justify-center gap-2">
              <Button
                loading={loading}
                onClick={onDelete}
                className={"bg-red-600 hover:bg-red-700"}>
                Delete
              </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
