"use client";

import AnimationWrapper from "../motion/Animation-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

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
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  const handleDisconnect = () => {
    onDisconnect();
    onClose();
    router.push("/");
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1] as const,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            className="relative w-full max-w-sm rounded-2xl bg-black border border-white p-6 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 text-center">
              <h2 id="modal-title" className="text-xl font-semibold text-white">
                Disconnect Wallet
              </h2>
            </div>

            <AnimationWrapper variant="fadeIn" delay={0.1}>
              <p className="text-gray-300 mb-6 text-center">
                Are you sure you want to disconnect your wallet?
              </p>
            </AnimationWrapper>

            <div className="flex gap-3 mt-8">
              <button
                className="py-3 w-full rounded-[48px] text-center border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="py-3 w-full text-center rounded-[48px] bg-green-900 text-white font-medium hover:bg-green-600 transition-colors"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}