/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/swap');
  }, []);
  return (
    <div>
      <span>Loading...</span>
    </div>
  );
}
