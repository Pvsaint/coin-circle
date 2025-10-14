"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";

// --- Types ---
interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (accountType: string) => void;
}

const userAccountOption = {
  title: "Access Owner and Beneficiary",
  description: [
    "Create an inheritance plan to secure your digital assets for future generations.",
    "Claim and inherit assets seamlessly through our platform.",
    "Manage your digital legacy with ease and confidence.",
  ],
  dashboardRoute: "/user-dashboard",
};

// --- Animation Variants ---
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.1 },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.3 },
  },
};

export function AccountTypeModal({
  isOpen,
  onClose,
  onSubmit,
}: AccountTypeModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  const handleSelect = () => {
    // Pass account type to parent component instead of using localStorage
    onSubmit("user");
    router.push(userAccountOption.dashboardRoute);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative bg-[#0C1327] rounded-lg max-w-2xl w-full p-6 md:p-10 shadow-xl overflow-y-auto max-h-[90vh]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-lg font-bold transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Header */}
            <motion.div className="text-center mb-10" variants={headerVariants}>
              <h1
                id="modal-title"
                className="font-bold text-2xl uppercase text-white mb-4"
              >
                Welcome to InheritX
              </h1>
              <p className="text-base text-gray-300">
                Create your profile to get started.
              </p>
            </motion.div>

            {/* Card */}
            <motion.div
              className="border border-[#343B4F] rounded-xl p-6 md:p-8 bg-[#081028] cursor-pointer hover:shadow-xl transition-shadow"
              variants={cardVariants}
              onClick={handleSelect}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect();
                }
              }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                {userAccountOption.title}
              </h2>
              <motion.ul
                className="list-disc pl-6 mb-6 space-y-2"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {userAccountOption.description.map((item, i) => (
                  <motion.li
                    key={`desc-${i}`}
                    className="text-sm text-gray-300 leading-relaxed"
                    variants={listItemVariants}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={buttonVariants}>
                <div className="inline-block border border-[#1FACAA] text-[#1FACAA] hover:bg-[#1FACAA] hover:text-[#081028] transition-colors duration-200 rounded-full px-6 py-2 text-sm font-medium">
                  Proceed to dashboard
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
