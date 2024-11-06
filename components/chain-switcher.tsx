import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type React from 'react';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';

export const ChainSwitcher: React.FC = () => {
  const { chain } = useAccount();
  const { chains, error, isPending, switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Switch Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <p>Current network: {chain?.name ?? 'Not connected'}</p>
          <div className='flex flex-wrap gap-2'>
            {chains.map((x) => (
              <Button
                key={x.id}
                onClick={() => switchChain({ chainId: x.id })}
                disabled={isPending || x.id === chain?.id}
              >
                {x.name}
                {isPending && x.id === chain?.id && ' (switching)'}
              </Button>
            ))}
          </div>
          <Button onClick={() => disconnect()} variant='destructive'>
            Disconnect
          </Button>
          {error && <p className='text-red-500'>{error.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
};
