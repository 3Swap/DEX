import React from 'react';
import Swap from '../routes/app/swap';
import styled from 'styled-components';
import { usePageQuery } from '../hooks';

const MainContainer = styled('div')`
  min-width: 100vw;
  min-height: 100vh;
  background: black;
`;

const Navbar = styled('div')`
  height: 90px;
  width: 100vw;
`;

const MainPage = styled('div')`
  min-height: 85vh;
  min-width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function Index() {
  const { slug } = usePageQuery();
  return (
    <MainContainer>
      <MainPage>
        {slug === 'swap' || slug === '' || slug === 'index' ? (
          <Swap></Swap>
        ) : slug === 'liquidity' ? (
          <div>
            <span>Liquidity goes here</span>
          </div>
        ) : (
          <div>
            <span>Not found</span>
          </div>
        )}
      </MainPage>
    </MainContainer>
  );
}
