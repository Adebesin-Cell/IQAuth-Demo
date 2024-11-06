'use client';
import { use } from 'react';

import { Login } from '@everipedia/iq-login/client';
import { useRouter } from 'next/navigation';

function Page(props: { searchParams: Promise<{ from: string }> }) {
  const searchParams = use(props.searchParams);

  const { from } = searchParams;

  const router = useRouter();
  return (
    <div className='flex items-center justify-center py-10 p-6'>
      <Login
        handleRedirect={() => {
          router.push(from || '/');
        }}
      />
    </div>
  );
}

export default Page;
