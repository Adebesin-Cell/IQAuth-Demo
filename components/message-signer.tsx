import { Button } from '@/components/ui/button';
   import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
   import { Input } from '@/components/ui/input';
   import type React from 'react';
   import { useState } from 'react';
   import { useSignMessage } from 'wagmi';

   interface MessageSignerProps {
     setSignature: React.Dispatch<React.SetStateAction<string>>;
   }

   export const MessageSigner: React.FC<MessageSignerProps> = ({ setSignature }) => {
     const [message, setMessage] = useState('');
     const { signMessageAsync, status } = useSignMessage();

     const handleSign = async () => {
       if (!message) return;
       try {
         const signature = await signMessageAsync({ message });
         setSignature(signature);
       } catch (error) {
         console.error('Error signing message:', error);
       }
     };

     return (
       <Card>
         <CardHeader>
           <CardTitle>Sign Message</CardTitle>
         </CardHeader>
         <CardContent>
           <div className='space-y-4'>
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
                 placeholder='Enter message to sign'
               />
             </div>
             <Button
               onClick={handleSign}
               disabled={status === 'pending' || !message}
             >
               {status === 'pending' ? 'Signing...' : 'Sign Message'}
             </Button>
           </div>
         </CardContent>
       </Card>
     );
   };