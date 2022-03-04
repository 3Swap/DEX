/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/swap');
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.5,
        height: '100vh',
        width: '100vw'
      }}
    >
      <Spinner />
    </div>
  );
}
