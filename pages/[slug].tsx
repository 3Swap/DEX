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
import { useToastContext } from '../contexts/toast';

const MainContainer = styled('div')`
  min-width: 100vw;
  min-height: 100vh;
  background-color: #0e0020;

  position: relative;
  .bg {
    position: absolute;
    filter: blur(120px);
    &:nth-child(1) {
      background: #bc29e0;
      width: 400px;
      height: 400px;
      left: -80px;
      top: -80px;
    }
    &:nth-child(2) {
      background: #fce8a5;
      left: 150px;
      height: 500px;
      width: 400px;
    }
    &:nth-child(3) {
      left: 500px;
      top: 200px;
      width: 300px;
      height: 100px;
      background: #ffd549;
    }
    &:nth-child(4) {
      background: linear-gradient(to bottom, #4500a0, #9e00ff);
      width: 600px;
      height: 800px;
      left: -100px;
      top: -100px;
    }
  }
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
  @media screen and (min-width: 320px) and (max-width: 375px) {
    width: 100%;
  }
  @media screen and (min-width: 376px) and (max-width: 480px) {
    width: 100%;
  }
`;

const Flex = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  backdrop-filter: blur(0px);
  z-index: 10;
  .linkNav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;

    border-radius: 8px;
    width: max-content;

    * {
      cursor: pointer;
    }

    button {
      color: #4500a0;
      display: flex;
      align-items: center;
      padding: 13px 20px;
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
  const { isVisible, content, toastType } = useToastContext();

  const [transactionModal, setTransactionModal] = useState(false);
  const [showliquidityPoolModal, setShowLiquidityPoolModal] = useState(false);

  const handleBackgroundClick = () => {
    if (transactionModal) {
      setTransactionModal(false);
    }
  };

  return (
    <>
      <MainContainer onClick={handleBackgroundClick}>
        <div className="bg"></div>
        <div className="bg"></div>
        <div className="bg"></div>
        <div className="bg"></div>

        <Header>
          <SwapLogo src="3swap.svg" className="logo" />
          <div className="nav_right">
            <Dropdown />
            <Button
              width="145px"
              height="45px"
              title={isActive && account ? ethAddress.formatEthAddress(account, 6) : 'Connect Wallet'}
              background="#4500a0"
              fontSize="14px"
              style={{ padding: '0 5px', fontWeight: '600' }}
              click={() => {
                if (!isActive) return connectWallet();
                else return disconnectWallet();
              }}
            />
          </div>
        </Header>
        <MainPage>
          {/* possible values direction="topRight | topLeft | bottomRight | bottomLeft" : status="success | danger | warning | info" */}
          {isVisible && (
            <Toast direction="bottomRight" status={toastType}>
              {content}
            </Toast>
          )}
          <Flex style={{ margin: '1em auto' }}>
            <div></div>
            <div className="linkNav">
              <ActiveLink href="/swap" activeClassName="activeLink">
                <button
                  style={{
                    border: 'none',
                    width: 'max-content',
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
                    width: 'max-content',
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
              <Liquidity showModal={showliquidityPoolModal} setShowModal={setShowLiquidityPoolModal} />
            </div>
          ) : (
            <div>
              <PageNotFound />
            </div>
          )}
        </MainPage>
      </MainContainer>
    </>
  );
}
