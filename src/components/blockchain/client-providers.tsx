"use client";

import { Suspense } from "react";
import StarknetProvider from "./StarknetProvider";
import { WalletProvider } from "../blockchain/WalletProvider";

interface ClientProvidersProps {
  children: React.ReactNode;
}

// Loading fallback component
function ProvidersLoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
        <p className="mt-4 text-white">Loading wallet...</p>
      </div>
    </div>
  );
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <Suspense fallback={<ProvidersLoadingFallback />}>
      <StarknetProvider>
        <WalletProvider>{children}</WalletProvider>
      </StarknetProvider>
    </Suspense>
  );
}
