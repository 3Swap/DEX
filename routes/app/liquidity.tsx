/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import * as ethereumAddress from 'ethereum-address';
import styled from 'styled-components';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import IconButton from '../../components/IconButton';
import { useAssetsContext } from '../../contexts/assets';
import { useWeb3Context } from '../../contexts/web3';
import { useCurrencyQuery, useSwapRouterContract, useTokenContract } from '../../hooks';
import TokenList from '../../components/TokenList';
import Spinner from '../../components/Spinner';
import { useSwapContext } from '../../contexts/swap';
import { Fetcher, Token, WETH } from '3swap-sdk';
import { useToastContext } from '../../contexts/toast';

type Props = {
  showModal: boolean;
  setShowModal: any;
};

const LiquidityCard = styled('div')`
  margin: 2em auto;
  width: 540px;
  height: 846px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(19px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  input {
    background: transparent !important;
  }

  .title {
    width: 80%;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    height: 27px;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 24px;
  }
  .desc {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    height: 27px;
    width: 80%;
    margin-top: 10px;
  }
  .text {
    width: 80%;
    margin-top: 50px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    height: 19px;
    color: #f2f2f2;
  }
  .from {
    width: 460px;
    height: 238px;
    background: #ffffff;
    border: 1px solid #cedaff;
    border-radius: 20px;
    margin-top: 11px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 30px;
    justify-content: flex-start;
  }

  .left {
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */
    /* Color primary */
    color: #4500a0;
  }

  .right {
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding-right: 18px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    /* or 171% */
    /* Inactive text color */
    color: #9a999c;
  }
  .bal {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 24px;
    margin-top: 5px;
    color: #9a999c;
  }
  .coin-container {
    width: 402px;
    height: 55px;
    background: #fcfcfc;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 20px;
    margin-top: 25px;
    display: flex;
    flex-direction: row;
  }
  .addition {
    margin-top: 35px;
  }
  .text_select_token {
    width: 80%;
    margin-top: 35px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    height: 19px;
    color: #f2f2f2;
  }
  .select_token {
    width: 460px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #cedaff;
    border-radius: 20px;
    height: 100px;
    margin-top: 11px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 30px;
    justify-content: flex-start;
  }
  .left {
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */
    /* Color primary */
    color: #4500a0;
  }

  .right {
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding-right: 18px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    /* or 171% */
    /* Inactive text color */
    color: #9a999c;
  }

  .coin_container {
    width: 402px;
    height: 55px;
    background: #fcfcfc;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 20px;
    margin: 15px 0;
    display: flex;
    flex-direction: row;
  }
  .btn_primary {
    cursor: pointer;
    width: 460px;
    height: 62px;
    background: #4500a0;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    border: none;
    margin-bottom: 50px;
  }
  .amt {
    color: #322e37;
    font-weight: bold;
  }
`;
const LiquidityPoolCard = styled('div')<{ open: boolean }>`
  width: 540px;
  height: auto;
  background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
  box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
  backdrop-filter: blur(19px);
  overflow: hidden;
  display: ${props => (props.open ? 'block' : 'none')};
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 20px;
  margin: 2em auto;
  font-family: 'Poppins';

  .title {
    display: flex;
    align-items: center;
    padding: 20px 40px;
    justify-content: space-between;

    .heading {
      h2 {
        margin-bottom: -8px;
        color: #fff;
      }
      p {
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .container {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px 40px;
    .content {
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;

      h3 {
        font-size: 14px;
        color: #121212;
      }
      h2 {
        font-size: 14px;
        color: #333;
      }
    }
  }
`;

const TransactionSettings = styled('div')<{ open: boolean }>`
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 15px 70px rgba(189, 189, 189, 0.7);
  backdrop-filter: blur(19px);

  border-radius: 20px;
  width: 360px;
  height: 298px;
  position: absolute;
  right: 10%;
  top: 15%;
  padding-left: 20px;
  opacity: ${props => (props.open ? '1' : '0')};
  transition-duration: 250ms;

  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;

    margin-top: 30px;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 24px;
    /* or 109% */

    /* Color primary */

    color: #4500a0;
    .close {
      cursor: pointer;
    }
  }

  .slippage {
    width: 65%;
    color: #4500a0;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    transition-duration: 250ms;

    .info {
      position: relative;
      transition-duration: 250ms;
      .hover {
        display: none;
      }

      .triangle {
        display: none;
      }

      .info-icon {
        cursor: pointer;
      }

      &:hover {
        .triangle {
          display: block;
          position: absolute;
          width: 18px;
          height: 20px;
          top: 80%;
        }

        .hover {
          display: flex;
          position: absolute;
          width: 100px;
          height: 100px;
          margin-left: -15px;
          top: -50%;
          background: #f5f5f5;
          border-radius: 4px;
          font-size: 12px;
          padding: 8px;
        }
      }
    }
  }

  .deadline {
    width: 65%;

    height: 35px;
    margin-top: 10px;
  }

  .box {
    width: 95%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;

    .round {
      &.small {
        width: 45px;
      }
      height: 24px;
      padding: 0px 10px;
      background: #fcfcfc;
      border-radius: 28px;
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-in-out;
      border: 1px solid #ccc;
      &.selected {
        background: #4500a0;
        color: #fff;
        border: none;
      }
      &:hover {
        border: none;
        background: #4500a0;
        color: #fff;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

export default function Liquidity({ showModal, setShowModal }: Props) {
  const { inputCurrency1, inputCurrency2, outputCurrency, chainId: queryChainId } = useCurrencyQuery();
  const { assets } = useAssetsContext();
  const { localChainId, chainId, switchChain, isActive } = useWeb3Context();

  const [firstSelectedAddress, setFirstSelectedAddress] = useState('');
  const [secondSelectedAddress, setSecondSelectedAddress] = useState('');
  const [thirdSelectedAddress, setThirdSelectedAddress] = useState('');

  const [showList1, setShowList1] = useState<boolean>(false);
  const [showList2, setShowList2] = useState<boolean>(false);
  const [showList3, setShowList3] = useState<boolean>(false);

  const [slippage, setSlippage] = useState(0.1);
  const [gas, setGas] = useState(50);
  const [deadline, setDeadline] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const { contract: swapRouterContract, createSwapRouterContract } = useSwapRouterContract();
  const { initiateContractApproval, initiateAddLiquidity } = useSwapContext();
  const { contract: token1Contract, createTokenContract: createToken1Contract } = useTokenContract();
  const { contract: token2Contract, createTokenContract: createToken2Contract } = useTokenContract();
  const { contract: token3Contract, createTokenContract: createToken3Contract } = useTokenContract();

  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);

  const [token1, setToken1] = useState<Token>();
  const [token2, setToken2] = useState<Token>();
  const [token3, setToken3] = useState<Token>();

  const { showErrorToast } = useToastContext();

  const setSelectedCurrencies = useCallback(() => {
    if (isActive && !!queryChainId) switchChain(queryChainId as string);

    if (inputCurrency1) setFirstSelectedAddress(inputCurrency1 as string);

    if (inputCurrency2) setSecondSelectedAddress(inputCurrency2 as string);

    if (outputCurrency) setThirdSelectedAddress(outputCurrency as string);
  }, []);

  useEffect(() => {
    setSelectedCurrencies();
  }, [inputCurrency1, inputCurrency2, outputCurrency, queryChainId]);

  useEffect(() => {
    if (assets && Object.keys(assets).length > 1 && (queryChainId || chainId || localChainId)) {
      setFirstSelectedAddress(Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[0]);
      setSecondSelectedAddress(Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[1]);
      setThirdSelectedAddress(Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[2]);
    }
  }, [assets, queryChainId, chainId, localChainId]);

  useEffect(() => {
    if (!!chainId) {
      createSwapRouterContract();
    }
  }, [chainId]);

  useEffect(() => {
    if (!!firstSelectedAddress && ethereumAddress.isAddress(firstSelectedAddress)) {
      createToken1Contract(firstSelectedAddress);
    }
  }, [firstSelectedAddress]);

  useEffect(() => {
    if (!!secondSelectedAddress && ethereumAddress.isAddress(secondSelectedAddress)) {
      createToken2Contract(secondSelectedAddress);
    }
  }, [secondSelectedAddress]);

  useEffect(() => {
    if (!!thirdSelectedAddress && ethereumAddress.isAddress(thirdSelectedAddress)) {
      createToken3Contract(thirdSelectedAddress);
    }
  }, [thirdSelectedAddress]);

  useEffect(() => {
    (async () => {
      if (!!firstSelectedAddress && ethereumAddress.isAddress(firstSelectedAddress) && (chainId || localChainId)) {
        const token = await Fetcher.fetchTokenData(
          (chainId as number) || (localChainId as number),
          firstSelectedAddress
        );
        setToken1(token);
      }
    })();
  }, [firstSelectedAddress, chainId, localChainId]);

  useEffect(() => {
    (async () => {
      if (!!secondSelectedAddress && ethereumAddress.isAddress(secondSelectedAddress) && (chainId || localChainId)) {
        const token = await Fetcher.fetchTokenData(
          (chainId as number) || (localChainId as number),
          secondSelectedAddress
        );
        setToken2(token);
      }
    })();
  }, [secondSelectedAddress, chainId, localChainId]);

  useEffect(() => {
    (async () => {
      if (!!thirdSelectedAddress && ethereumAddress.isAddress(thirdSelectedAddress) && (chainId || localChainId)) {
        const token = await Fetcher.fetchTokenData(
          (chainId as number) || (localChainId as number),
          thirdSelectedAddress
        );
        setToken3(token);
      }
    })();
  }, [thirdSelectedAddress, chainId, localChainId]);

  const initAddLiquidity = async () => {
    setIsLoading(true);
    try {
      if (
        amount1 &&
        !!token1Contract &&
        firstSelectedAddress.toLowerCase() !== WETH[chainId as number].address().toLowerCase()
      ) {
        await initiateContractApproval(token1Contract, amount1, firstSelectedAddress);
      }

      if (
        amount2 &&
        !!token2Contract &&
        secondSelectedAddress.toLowerCase() !== WETH[chainId as number].address().toLowerCase()
      ) {
        await initiateContractApproval(token2Contract, amount2, secondSelectedAddress);
      }

      if (
        amount3 &&
        !!token3Contract &&
        thirdSelectedAddress.toLowerCase() !== WETH[chainId as number].address().toLowerCase()
      ) {
        await initiateContractApproval(token3Contract, amount3, thirdSelectedAddress);
      }

      if (!!swapRouterContract && chainId && !!token1 && !!token2 && !!token3) {
        await initiateAddLiquidity(
          swapRouterContract,
          token1,
          token2,
          token3,
          amount1,
          amount2,
          amount3,
          deadline,
          gas
        );
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showErrorToast(
        <>
          <span>
            {error.message}
            {''}!
          </span>
        </>,
        4
      );
    }
  };

  return (
    <>
      <LiquidityPoolCard
        open={true}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <div className="liquidityPoolWrapper">
          <div className="title">
            <div className="heading">
              <h2>Your Liquidity</h2>
              <p>Remove liquidity to receive tokens back.</p>
            </div>
            <div className="icon">
              {/* <Icon iconType="solid" name="gear" width="20px" height="20px" fontSize="20px" /> */}
              <Icon
                iconType="solid"
                name="gear"
                width="20px"
                height="20px"
                fontSize="20px"
                style={{ marginLeft: '25px', color: '#fff', cursor: 'pointer' }}
              />
            </div>
          </div>
          <div className="container">
            <div className="content">
              <h3>No liquidity found.</h3>
              <h2>Don&apos;t see a pool you joined?</h2>
              <Button
                background="transparent"
                style={{
                  border: '2px solid #4500a0',
                  padding: '10px 25px',
                  borderRadius: '20px',
                  color: '#4500a0',
                  fontWeight: '600'
                }}
                marginTop="0px"
                width="auto"
                height="auto"
                title="Find other LP tokens"
                fontSize="18px"
              />
            </div>
          </div>
        </div>
      </LiquidityPoolCard>
      <LiquidityCard>
        <Head>
          <title>3Swap | Add Liquidity</title>
        </Head>
        <div className="title">
          <div>Add Liquidity</div>
          <Icon
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setShowModal(!showModal);
            }}
            iconType="solid"
            name="gear"
            width="20px"
            height="20px"
            fontSize="20px"
          />
        </div>
        <div className="desc">Get LP tokens when you add liquidity.</div>

        <TransactionSettings
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          open={showModal}
        >
          <div className="top">
            <div>Transaction Settings</div>
            <IconButton
              iconType="solid"
              name="close"
              width="20px"
              height="20px"
              color="#fff"
              fontSize="15px"
              background="#4500a0"
              borderRadius="50%"
              click={() => setShowModal(false)}
            />
          </div>
          <div className="slippage">
            <div>Slippage Tolerance</div>
            <div className="info">
              <IconButton
                iconType="solid"
                name="question"
                width="16px"
                height="16px"
                color="#4500a0"
                fontSize="9px"
                border="1px solid #4500a0"
                borderRadius="50%"
              />
              <img src="./triangle.svg" alt="image" className="triangle"></img>
              <div className="hover" style={{ width: '200px', height: 'auto' }}>
                Percentage change you&apos;re willing to allow between transaction execution time and block inclusion
                time.
              </div>
            </div>
          </div>
          <div className="box">
            <div className={slippage === 0.1 ? 'round selected' : 'round'} onClick={() => setSlippage(0.1)}>
              0.1%
            </div>
            <div className={slippage === 0.5 ? 'round selected' : 'round'} onClick={() => setSlippage(0.5)}>
              0.5%
            </div>
            <div className={slippage === 1.0 ? 'round selected' : 'round'} onClick={() => setSlippage(1.0)}>
              1.0%
            </div>
          </div>
          <div className="slippage">
            <div>Transaction Deadline</div>
            <div className="info">
              <IconButton
                iconType="solid"
                name="question"
                width="16px"
                height="16px"
                color="#4500a0"
                fontSize="9px"
                border="1px solid #4500a0"
                borderRadius="50%"
              />
              <img src="./triangle.svg" alt="image" className="triangle"></img>
              <div className="hover" style={{ width: '200px', height: 'auto' }}>
                How long from execution time before this transaction will be considered a failed one.
              </div>
            </div>
          </div>

          <div className="box">
            <div className="round small">
              <input
                type="number"
                style={{ border: 'none', width: 'inherit', textAlign: 'center', outline: 'none' }}
                value={deadline || 0}
                onChange={ev => setDeadline(ev.target.valueAsNumber)}
              />
            </div>
            <div>minutes</div>
          </div>

          <div className="slippage">
            <div>Transaction Speed (Gwei) </div>
            <div className="info">
              <IconButton
                iconType="solid"
                name="question"
                width="16px"
                height="16px"
                color="#4500a0"
                fontSize="9px"
                border="1px solid #4500a0"
                borderRadius="50%"
              />
              <img src="./triangle.svg" alt="image" className="triangle"></img>
              <div className="hover" style={{ width: '200px', height: 'auto' }}>
                How fast do you want this transaction?
              </div>
            </div>
          </div>
          <div className="box">
            <div className={gas === 50 ? 'round selected' : 'round'} onClick={() => setGas(50)}>
              Standard (50)
            </div>
            <div className={gas === 25 ? 'round selected' : 'round'} onClick={() => setGas(25)}>
              Safe (25)
            </div>
            <div className={gas === 100 ? 'round selected' : 'round'} onClick={() => setGas(100)}>
              Instant (100)
            </div>
          </div>
        </TransactionSettings>

        <div className="text_select_token">Select Token</div>

        <div className="select_token">
          {showList1 && (
            <TokenList
              selectedAddresses={[firstSelectedAddress, secondSelectedAddress, thirdSelectedAddress]}
              onClose={() => setShowList1(false)}
              onItemClick={val => {
                setFirstSelectedAddress(val);
                setShowList1(false);
              }}
            />
          )}
          <div className="coin_container">
            <div className="left" onClick={() => setShowList1(true)}>
              <img
                src={
                  !!assets && Object.keys(assets).length > 0
                    ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                        ethereumAddress.isAddress(firstSelectedAddress)
                          ? firstSelectedAddress
                          : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[0]
                      ]?.image
                    : ''
                }
                alt="coin_image"
                style={{ cursor: 'pointer' }}
                width={28}
                height={28}
              />
              <div>
                {!!assets && Object.keys(assets).length > 0
                  ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                      ethereumAddress.isAddress(firstSelectedAddress)
                        ? firstSelectedAddress
                        : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[0]
                    ]?.symbol
                  : 'TOKEN_SYMBOL'}
              </div>
              <IconButton
                width="12px"
                height="12px"
                iconType="solid"
                fontSize="12px"
                name="chevron-down"
                color="#4500a0"
              />
            </div>

            <div className="right">
              <div className="amt">
                <input
                  type="number"
                  style={{
                    border: 'none',
                    fontSize: 14,
                    padding: 4,
                    width: '100%',
                    outline: 'none',
                    textAlign: 'right'
                  }}
                  placeholder="Enter Amount"
                  value={amount1 || 0}
                  onChange={ev => setAmount1(ev.target.valueAsNumber)}
                />
              </div>
            </div>
          </div>
        </div>

        <IconButton
          background="#4500a0"
          iconType="solid"
          name="plus"
          width="34px"
          height="34px"
          fontSize="20px"
          borderRadius="50%"
          marginTop="2em"
        />

        <div className="text_select_token">Select Token</div>

        <div className="select_token">
          {showList2 && (
            <TokenList
              selectedAddresses={[firstSelectedAddress, secondSelectedAddress, thirdSelectedAddress]}
              onClose={() => setShowList2(false)}
              onItemClick={val => {
                setSecondSelectedAddress(val);
                setShowList2(false);
              }}
            />
          )}
          <div className="coin_container">
            <div className="left" onClick={() => setShowList2(true)}>
              <img
                src={
                  !!assets && Object.keys(assets).length > 0
                    ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                        ethereumAddress.isAddress(secondSelectedAddress)
                          ? secondSelectedAddress
                          : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[1]
                      ]?.image
                    : ''
                }
                style={{ cursor: 'pointer' }}
                alt="eth"
                width={28}
                height={28}
              />
              <div>
                {!!assets && Object.keys(assets).length > 0
                  ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                      ethereumAddress.isAddress(secondSelectedAddress)
                        ? secondSelectedAddress
                        : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[1]
                    ]?.symbol
                  : 'TOKEN_SYMBOL'}
              </div>
              <IconButton
                width="12px"
                height="12px"
                iconType="solid"
                fontSize="12px"
                name="chevron-down"
                color="#4500a0"
              />
            </div>

            <div className="right">
              <div className="amt">
                <input
                  type="number"
                  style={{
                    border: 'none',
                    fontSize: 14,
                    padding: 4,
                    width: '100%',
                    outline: 'none',
                    textAlign: 'right'
                  }}
                  placeholder="Enter Amount"
                  value={amount2 || 0}
                  onChange={ev => setAmount2(ev.target.valueAsNumber)}
                />
              </div>
            </div>
          </div>
        </div>

        <IconButton
          background="#4500a0"
          iconType="solid"
          name="plus"
          width="34px"
          height="34px"
          fontSize="20px"
          borderRadius="50%"
          marginTop="2em"
        />

        <div className="text_select_token">Select Token</div>

        <div className="select_token">
          {showList3 && (
            <TokenList
              selectedAddresses={[firstSelectedAddress, secondSelectedAddress, thirdSelectedAddress]}
              onClose={() => setShowList3(false)}
              onItemClick={val => {
                setThirdSelectedAddress(val);
                setShowList3(false);
              }}
            />
          )}
          <div className="coin_container">
            <div className="left" onClick={() => setShowList3(true)}>
              <img
                src={
                  !!assets && Object.keys(assets).length > 0
                    ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                        ethereumAddress.isAddress(thirdSelectedAddress)
                          ? thirdSelectedAddress
                          : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[2]
                      ]?.image
                    : ''
                }
                style={{ cursor: 'pointer' }}
                alt="btc"
                width={28}
                height={28}
              />
              <div>
                {!!assets && Object.keys(assets).length > 0
                  ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                      ethereumAddress.isAddress(thirdSelectedAddress)
                        ? thirdSelectedAddress
                        : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[2]
                    ]?.symbol
                  : 'TOKEN_SYMBOL'}
              </div>
              <IconButton
                width="12px"
                height="12px"
                iconType="solid"
                fontSize="12px"
                name="chevron-down"
                color="#4500a0"
              />
            </div>

            <div className="right">
              <div className="amt">
                <input
                  type="number"
                  style={{
                    border: 'none',
                    fontSize: 14,
                    padding: 4,
                    width: '100%',
                    outline: 'none',
                    textAlign: 'right'
                  }}
                  placeholder="Enter Amount"
                  value={amount3 || 0}
                  onChange={ev => setAmount3(ev.target.valueAsNumber)}
                />
              </div>
            </div>
          </div>
        </div>
        {isLoading && <Spinner width="30px" height="30px" />}
        <Button
          background="#4500a0"
          marginTop="20px"
          marginBottom="20px"
          width="460px"
          height="62px"
          title="Add Liquidity"
          fontSize="20px"
          click={initAddLiquidity}
          disabled={!amount1 || !amount2 || !amount3 || amount1 === 0 || amount2 === 0 || amount3 === 0 || isLoading}
        />
      </LiquidityCard>
    </>
  );
}
