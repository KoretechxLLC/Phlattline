import { AnimatePresence, motion } from "framer-motion";
import { MdDeleteForever, MdDelete } from "react-icons/md";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

const Deletemodel = ({
  trigger,
  confirmAction,
}: {
  trigger?: (openModal: () => void) => ReactNode;
  confirmAction: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {trigger && trigger(() => setIsOpen(true))}
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmAction={confirmAction}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  confirmAction,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  confirmAction: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#BAA716] to-[#B50D34] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <MdDeleteForever className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-0 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-red grid place-items-center mx-auto">
                <MdDelete className="text-red-700" />
              </div>

              <p className="text-center mb-6">
                Are you sure you want to delete?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-slate-900 px-4 py-2 font-semibold bg-white w-full text-center uppercase text-slate-900 transition-all duration-500 hover:scale-105 hover:text-white hover:bg-slate-900 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmAction();
                    setIsOpen(false);
                  }}
                  className="relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-red-500 px-4 py-2 font-semibold bg-white w-full text-center uppercase text-red-500 transition-all duration-500 hover:scale-105 hover:text-white hover:bg-red-500 active:scale-95"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Deletemodel;
