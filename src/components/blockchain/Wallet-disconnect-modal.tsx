"use client";

import AnimationWrapper from "../motion/Animation-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

interface WalletDisconnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

export default function WalletDisconnectModal({
  isOpen,
  onClose,
  onDisconnect,
}: WalletDisconnectModalProps) {


  const handleDisconnect = () => {
    onDisconnect();
    window.location.href = "/";
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-sm rounded-2xl bg-black border border-white  p-6 shadow-xl"
            // variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex float-right mb-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-8  mt-10 pl-20">
              <h2 className="text-xl font-semibold text-white">
                Disconnect Wallet
              </h2>
            </div>

            <AnimationWrapper variant="fadeIn" delay={0.1}>
              <p className="text-gray-300 mb-6 text-center">
                Are you sure you want to disconnect your wallet?
              </p>
            </AnimationWrapper>

            <div className="flex justify-between gap-2 mt-8">
              <button
                className=" w-full rounded-[48px] text-center border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className=" py-3 w-full text-center rounded-[48px] cursor-pointer bg-green-900 text-white font-medium hover:bg-green-600 transition-colors"
                onClick={handleDisconnect}
              >
                Disconnect Wallet
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
