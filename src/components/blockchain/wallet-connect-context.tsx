"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AccountStatus, useAccount, useConnect } from "@starknet-react/core";

// Define the context type
interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  isConnecting: boolean;
  isWalletDetected: boolean;
  error: Error | null;
  isModalOpen: boolean;
  openConnectModal: () => void;
  closeConnectModal: () => void;
  clearError: () => void;
}

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

// Provider component
export function WalletProvider({ children }: WalletProviderProps) {
  const { isConnected = false, address, status } = useAccount();
  const { connectors } = useConnect();
  const [isWalletDetected, setIsWalletDetected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if any wallet is available in the browser
  useEffect(() => {
    const checkWalletAvailability = () => {
      const hasWallet = connectors.some((connector) => connector.available());
      setIsWalletDetected(hasWallet);
    };

    checkWalletAvailability();
  }, [connectors]);

  // Handle connection errors
  useEffect(() => {
    if (status === ("error" as AccountStatus)) {
      setError(new Error("Failed to connect wallet. Please try again."));
    } else if (status === ("connected" as AccountStatus)) {
      // Clear error when successfully connected
      setError(null);
    } else if (status === ("disconnected" as AccountStatus)) {
      // Clear error when disconnected
      setError(null);
    }
  }, [status]);

  // Close modal automatically when wallet connects
  useEffect(() => {
    if (isConnected && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isConnected, isModalOpen]);

  // Memoized functions to prevent unnecessary re-renders
  const openConnectModal = useCallback(() => {
    setIsModalOpen(true);
    // Clear any previous errors when opening modal
    setError(null);
  }, []);

  const closeConnectModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isConnected,
      address,
      isConnecting: status === ("connecting" as AccountStatus),
      isWalletDetected,
      error,
      isModalOpen,
      openConnectModal,
      closeConnectModal,
      clearError,
    }),
    [
      isConnected,
      address,
      status,
      isWalletDetected,
      error,
      isModalOpen,
      openConnectModal,
      closeConnectModal,
      clearError,
    ]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

// Custom hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

// Export context for advanced use cases
export { WalletContext };
