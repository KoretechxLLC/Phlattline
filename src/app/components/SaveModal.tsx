import { AnimatePresence, motion } from "framer-motion";
import { FaSave } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import { MdSaveAlt } from "react-icons/md";

const SaveModal = ({ trigger, confirmAction }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {trigger(() => setIsOpen(true))}
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
    <>
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
              <FaSave className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-0 -left-24" />
              <div className="relative z-10">
                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green grid place-items-center mx-auto">
                  <MdSaveAlt className="text-green-700" />
                </div>

                <p className="text-center mb-6">
                  Are you sure you want to confirm?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`
                    relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-[1px] 
                    border-slate-900 px-4 py-2 font-semibold bg-white w-full text-center
                    uppercase text-slate-900 transition-all duration-500
                    
                    before:absolute before:inset-0
                    before:-z-10 before:translate-x-[150%]
                    before:translate-y-[150%] before:scale-[2.5]
                    before:rounded-[100%] before:bg-slate-900
                    before:transition-transform before:duration-1000
                    before:content-[""]
            
                    hover:scale-105 hover:text-white
                    hover:before:translate-x-[0%]
                    hover:before:translate-y-[0%]
                    active:scale-95`}
                  >
                    Cancel
                  </button>
                  <button
                    className={`
        relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-[1px] 
        border-green-500 px-4 py-2 font-semibold bg-white w-full text-center
        uppercase text-green-500 transition-all duration-500
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-green-500
        before:transition-transform before:duration-1000
        before:content-[""]

        hover:scale-105 hover:text-white
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95`}
                    onClick={() => {
                      confirmAction();
                      setIsOpen(false);
                    }}
                  >
                    Yes, Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SaveModal;
