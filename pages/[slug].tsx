import React, { useState } from 'react';
import * as ethAddress from 'eth-address';
import Swap from '../routes/app/swap';
import Liquidity from '../routes/app/liquidity';
import PageNotFound from '../routes/app/404';
import styled from 'styled-components';
import { usePageQuery } from '../hooks';
import { ActiveLink } from '../components/Link';
import Header from '../components/Header';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import { useWeb3Context } from '../contexts/web3';
import Toast from '../components/Toast';

const MainContainer = styled('div')`
  min-width: 100vw;
  min-height: 100vh;
  background-color: #0e0020;
  position: relative;
  background-image: linear-gradient(
    to bottom right,
    rgba(188, 41, 224, 0.5),
    rgba(69, 0, 160, 0.5),
    rgba(252, 232, 165, 0.3),
    rgba(255, 213, 73, 0.3),
    rgba(158, 0, 255, 0.5)
  );
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

const SwapLogo = styled('img')`
  width: 125.19px;
  height: 42px;
`;

export default function Index() {
  const { slug } = usePageQuery();
  const { isActive, connectWallet, account, disconnectWallet } = useWeb3Context();

  const [transactionModal, setTransactionModal] = useState(false);
  const [liquidityPoolModal, setLiquidityPoolModal] = useState(false);

  const handleBackgroundClick = () => {
    if (transactionModal) {
      setTransactionModal(false);
    }
  };

  return (
    <MainContainer onClick={handleBackgroundClick}>
      {/* possible values direction="topRight | topLeft | bottomRight | bottomLeft" : status="success | danger | warning | info" */}
      <Toast direction="topRight" status="success" />
      <Header>
        <SwapLogo src="3swap.svg" />
        <div className="nav_right">
          <Dropdown />
          <Button
            width="145px"
            height="45px"
            title={isActive && account ? ethAddress.formatEthAddress(account, 7) : 'Connect Wallet'}
            background="#4500a0"
            fontSize="14px"
            click={() => {
              if (!isActive) return connectWallet();
              else return disconnectWallet();
            }}
          />
        </div>
      </Header>
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
            <Swap transactionModal={transactionModal} setTransactionModal={setTransactionModal} />
          </div>
        ) : slug === 'liquidity' ? (
          <div>
            <Liquidity liquidityPoolModal={liquidityPoolModal} setLiquidityPoolModal={setLiquidityPoolModal} />
          </div>
        ) : (
          <div>
            <PageNotFound />
          </div>
        )}
      </MainPage>
    </MainContainer>
  );
}
