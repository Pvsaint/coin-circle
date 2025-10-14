"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { useAccount, useConnect, Connector } from "@starknet-react/core";
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";

interface ConnectButtonProps {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect?: (walletId: string) => void;
  onConnectionSuccess?: () => void;
  onConnectionError?: (error: Error) => void;
}

export function ConnectButton({
  isOpen,
  setIsModalOpen,
  onConnectionSuccess,
  onConnectionError,
}: ConnectButtonProps) {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const isConnectingRef = useRef(false);
  const hasConnectedRef = useRef(false);

  // Memoize customized connectors to prevent recreation on every render
  const customizedConnectors = React.useMemo(() => {
    return connectors.map((connector) => {
      if (connector instanceof WebWalletConnector) {
        return new WebWalletConnector({});
      }
      return connector;
    });
  }, [connectors]);

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: customizedConnectors as StarknetkitConnector[],
  });

  // Memoized connection handler
  const handleConnect = useCallback(async () => {
    // Prevent multiple simultaneous connection attempts
    if (isConnectingRef.current || isConnected) {
      return;
    }

    isConnectingRef.current = true;

    try {
      const { connector } = await starknetkitConnectModal();

      if (!connector) {
        console.log("ℹ️ Connection cancelled by user");
        setIsModalOpen(false);
        return;
      }

      await connect({ connector: connector as Connector });

      console.log("✅ Wallet connected successfully");
      hasConnectedRef.current = true;

      // Call success callback if provided
      onConnectionSuccess?.();

      setIsModalOpen(false);
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error("Unknown connection error");
      console.error("❌ Wallet connection failed:", err);

      // Call error callback if provided
      onConnectionError?.(err);

      setIsModalOpen(false);
    } finally {
      isConnectingRef.current = false;
    }
  }, [
    isConnected,
    connect,
    setIsModalOpen,
    starknetkitConnectModal,
    onConnectionSuccess,
    onConnectionError,
  ]);

  // Handle modal open/close and connection state
  useEffect(() => {
    // If modal is opened and wallet is not connected, initiate connection
    if (isOpen && !isConnected && !isConnectingRef.current) {
      handleConnect();
    }
  }, [isOpen, isConnected, handleConnect]);

  // Separate effect to close modal when connected
  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false);
      console.log("🔒 Modal closed - wallet connected");
    }
  }, [isConnected, setIsModalOpen]);

  // Log connection state changes
  useEffect(() => {
    if (isConnected && address && !hasConnectedRef.current) {
      console.log("🔗 Wallet connected:", address);
      hasConnectedRef.current = true;
    }
  }, [isConnected, address]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isConnectingRef.current = false;
    };
  }, []);

  return null;
}
