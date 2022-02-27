import React from 'react';
import Swap from '../routes/app/swap';
import Liquidity from '../routes/app/liquidity';
import styled from 'styled-components';
import { usePageQuery } from '../hooks';
import { ActiveLink } from '../components/Link';

const MainContainer = styled('div')`
  min-width: 100vw;
  min-height: 100vh;
  background: #0e0020;
`;

const Navbar = styled('div')`
  height: 90px;
  width: 100vw;
`;

const MainPage = styled('div')`
  min-height: 85vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Flex = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .linkNav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
    height: 30px;
    border-radius: 8px;
    width: 20%;

    * {
      cursor: pointer;
    }

    button {
      color: #4500a0;
      padding: 8px;
    }

    .activeLink {
      background-color: #4500a0;
      color: #fff;
    }
  }
`;

export default function Index() {
  const { slug } = usePageQuery();
  return (
    <MainContainer>
      <MainPage>
        <Flex style={{ margin: '1em auto' }}>
          <div></div>
          <div className="linkNav">
            <ActiveLink href="/swap" activeClassName="activeLink">
              <button
                style={{
                  border: 'none',
                  width: '100%',
                  height: 'inherit',
                  borderRadius: 'inherit',
                  textAlign: 'center'
                }}
              >
                Swap
              </button>
            </ActiveLink>
            <ActiveLink href="/liquidity" activeClassName="activeLink">
              <button
                style={{
                  border: 'none',
                  width: '100%',
                  height: 'inherit',
                  borderRadius: 'inherit',
                  textAlign: 'center'
                }}
              >
                Liquidity
              </button>
            </ActiveLink>
          </div>
          <div></div>
        </Flex>
        {slug === 'swap' || slug === 'index' ? (
          <div>
            <Swap />
          </div>
        ) : slug === 'liquidity' ? (
          <div>
            <Liquidity />
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
