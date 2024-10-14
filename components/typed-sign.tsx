import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type React from 'react';
import { useEffect } from 'react';
import { useSignTypedData } from 'wagmi';
import { Input } from './ui/input';

interface TypedDataSignerProps {
  setSignature: React.Dispatch<React.SetStateAction<string>>;
}

export const TypedDataSigner: React.FC<TypedDataSignerProps> = ({
  setSignature
}) => {
  const { signTypedData, status, data: signature } = useSignTypedData();

  useEffect(() => {
    if (signature) {
      setSignature(signature);
    }
  }, [signature, setSignature]);

  const handleSignTypedData = () => {
    signTypedData({
      types: {
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' }
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' }
        ]
      },
      primaryType: 'Mail',
      message: {
        from: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
        },
        to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
        },
        contents: 'Hello, Bob!'
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Typed Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <Button onClick={handleSignTypedData} disabled={status === 'pending'}>
            {status === 'pending' ? 'Signing...' : 'Sign Typed Data'}
          </Button>
          {signature && (
            <div>
              <label
                htmlFor='signature'
                className='block text-sm font-medium text-gray-700'
              >
                Signature
              </label>
              <Input
                id='signature'
                value={signature}
                readOnly
                className='bg-gray-100'
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
