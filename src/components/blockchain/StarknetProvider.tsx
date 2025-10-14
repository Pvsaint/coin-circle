"use client";

import { mainnet, sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  voyager,
  Connector,
} from "@starknet-react/core";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { useMemo } from "react";

interface StarknetProviderProps {
  children: React.ReactNode;
}

// Environment configuration
const isDevelopment = process.env.NODE_ENV === "development";
const DAPP_NAME = process.env.NEXT_PUBLIC_DAPP_NAME || "CoinCircle";
const ARGENT_WEB_WALLET_URL = "https://web.argent.xyz";

export function StarknetProvider({ children }: StarknetProviderProps) {
  // Memoize connectors to prevent recreation on every render
  const connectors = useMemo(() => {
    const walletConnectors: Connector[] = [
      // Popular Starknet wallets
      new InjectedConnector({
        options: { id: "argentX", name: "Argent X" },
      }),
      new InjectedConnector({
        options: { id: "braavos", name: "Braavos" },
      }),
      
      // Web wallet for users without extensions
      new WebWalletConnector({ url: ARGENT_WEB_WALLET_URL }),
      
      // Mobile wallet connector
      ArgentMobileConnector.init({
        options: {
          dappName: DAPP_NAME,
          url: ARGENT_WEB_WALLET_URL,
          chainId: isDevelopment ? "SN_SEPOLIA" : "SN_MAIN",
        },
      }),
    ];

    // Optional: Add additional wallets in development
    if (isDevelopment) {
      walletConnectors.push(
        new InjectedConnector({
          options: { id: "metamask", name: "MetaMask" },
        }),
        new InjectedConnector({
          options: { id: "keplr", name: "Keplr" },
        }),
        new InjectedConnector({
          options: { id: "okxwallet", name: "OKX" },
        })
      );
    }

    return walletConnectors;
  }, []);

  // Memoize chains based on environment
  const chains = useMemo(() => {
    // In production, prioritize mainnet; in development, prioritize testnet
    return isDevelopment ? [sepolia, mainnet] : [mainnet, sepolia];
  }, []);

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors as Connector[]}
      explorer={voyager}
      autoConnect={true}
    >
      {children}
    </StarknetConfig>
  );
}

export default StarknetProvider;