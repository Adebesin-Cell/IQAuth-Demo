'use client';

import { IqLoginProvider } from '@everipedia/iq-login/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { polygon } from 'viem/chains';

const queryClient = new QueryClient();

const NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
const NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID =
  process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID;

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  if (!NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
    throw new Error('Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID');
  }
  if (!NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID) {
    throw new Error('Missing NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID');
  }

  return (
    <IqLoginProvider
      chain={polygon}
      walletConnectProjectId={NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
      web3AuthProjectId={NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IqLoginProvider>
  );
}
