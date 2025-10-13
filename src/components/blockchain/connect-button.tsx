
"use client";

import React, { useEffect } from "react";
import {
  useAccount,
  useConnect,
  Connector,
} from "@starknet-react/core";
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";

interface ConnectButtonProps {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (walletId: string) => void;
}

export function ConnectButton({ isOpen, setIsModalOpen }: ConnectButtonProps) {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  // Customize the connectors (for example, WebWalletConnector)
  const customizedConnectors = connectors.map((connector) => {
    if (connector instanceof WebWalletConnector) {
      return new WebWalletConnector({});
    }
    return connector;
  });

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: customizedConnectors as StarknetkitConnector[],
  });

  useEffect(() => {
    const autoConnect = async () => {
      try {
        const { connector } = await starknetkitConnectModal();
        if (connector) {
          await connect({ connector: connector as Connector });
          console.log("✅ Wallet connected successfully");
          setIsModalOpen(false); // Close modal immediately after connection
        }
      } catch (error) {
        console.error("❌ Wallet connection failed:", error);
        setIsModalOpen(false); // Also close modal on failure to prevent lock
      }
    };

    if (isOpen && !isConnected) {
      autoConnect();
    }

    // Safety check: if already connected, ensure modal is closed
    if (isConnected) {
      setIsModalOpen(false);
    }
  }, [isOpen, isConnected, connect, setIsModalOpen, starknetkitConnectModal]);

  return null;
}
