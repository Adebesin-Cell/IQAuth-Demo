import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type React from 'react';
import { useState } from 'react';
import { useAccount, useVerifyMessage } from 'wagmi';

interface MessageVerifierProps {
  signature?: string;
}

export const MessageVerifier: React.FC<MessageVerifierProps> = ({
  signature: propSignature
}) => {
  const { address } = useAccount();
  const [message, setMessage] = useState('');

  const {
    data: isValid,
    isError,
    isLoading,
    refetch
  } = useVerifyMessage({
    address: address,
    message,
    signature: propSignature as `0x${string}` | undefined
  });

  const handleVerify = () => {
    refetch();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Message</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-700'
            >
              Address
            </label>
            <Input id='address' value={address} readOnly placeholder='0x...' />
          </div>
          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700'
            >
              Message
            </label>
            <Input
              id='message'
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              placeholder='Enter message'
            />
          </div>
          <div>
            <label
              htmlFor='signature'
              className='block text-sm font-medium text-gray-700'
            >
              Signature
            </label>
            <Input
              id='signature'
              value={propSignature}
              readOnly
              placeholder='0x...'
            />
          </div>
          <Button onClick={handleVerify} disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Message'}
          </Button>
          {isValid !== undefined && (
            <p
              className={`text-sm ${
                isValid ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isValid ? 'Message is valid!' : 'Message is invalid.'}
            </p>
          )}
          {isError && (
            <p className='text-sm text-red-500'>
              Error occurred during verification.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
