'use client';

import { ChainSwitcher } from '@/components/chain-switcher';
import { MessageSigner } from '@/components/message-signer';
import { MessageVerifier } from '@/components/message-verify';
import { TypedDataSigner } from '@/components/typed-sign';
import { Login } from '@everipedia/iq-login/client';
import type React from 'react';
import { useState } from 'react';
import { useAccount } from 'wagmi';

const TokenInterface: React.FC = () => {
  const { isConnected } = useAccount();
  const [signature, setSignature] = useState('');

  return (
    <div className='container mx-auto p-4 flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Token Management Interface
      </h1>
      {!isConnected ? (
        <Login />
      ) : (
        <div className='space-y-8 w-full max-w-4xl'>
          <ChainSwitcher />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <MessageSigner />
            <TypedDataSigner setSignature={setSignature} />
          </div>
          <MessageVerifier signature={signature} />
        </div>
      )}
    </div>
  );
};

export default TokenInterface;
