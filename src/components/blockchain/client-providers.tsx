"use client";

import StarknetProvider from "./StarknetProvider";
import { WalletProvider } from "../blockchain/WalletProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StarknetProvider>
      <WalletProvider>{children}</WalletProvider>
    </StarknetProvider>
  );
}