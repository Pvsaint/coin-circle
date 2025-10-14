"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  useConnect,
  useAccount,
  useDisconnect,
  Connector,
  ConnectVariables,
} from "@starknet-react/core";

interface WalletContextProps {
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectors: Connector[];
  connectWallet: (connector: Connector) => Promise<void>;
  disconnectWallet: () => void;
  connectAsync: (args?: ConnectVariables) => Promise<void>;
  error: Error | null;
  clearError: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { connect, connectors, connectAsync, status } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [error, setError] = useState<Error | null>(null);

  // Connect to a specific wallet
  const connectWallet = useCallback(
    async (connector: Connector) => {
      try {
        setError(null);
        await connect({ connector });
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to connect wallet");
        setError(error);
        console.error("Wallet connection error:", error);
        throw error;
      }
    },
    [connect]
  );

  // Disconnect wallet and clear any errors
  const disconnectWallet = useCallback(() => {
    try {
      disconnect();
      setError(null);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to disconnect wallet");
      setError(error);
      console.error("Wallet disconnection error:", error);
    }
  }, [disconnect]);

  // Clear error manually
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Handle connection status errors
  useEffect(() => {
    if (status === "error") {
      setError(new Error("Connection failed. Please try again."));
    } else if (status === "success") {
      setError(null);
    }
  }, [status]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      account: address ?? null,
      isConnected: isConnected ?? false,
      isConnecting: status === "pending",
      connectors,
      connectWallet,
      disconnectWallet,
      connectAsync,
      error,
      clearError,
    }),
    [
      address,
      isConnected,
      status,
      connectors,
      connectWallet,
      disconnectWallet,
      connectAsync,
      error,
      clearError,
    ]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// Custom hook to use wallet context
export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

// Alias for backward compatibility
export { useWalletContext as useWallet };
