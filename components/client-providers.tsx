'use client';

import { IqLoginProvider } from '@everipedia/iq-login/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <IqLoginProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IqLoginProvider>
  );
}
