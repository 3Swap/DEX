/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import * as ethereumAddress from 'ethereum-address';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import IconButton from '../../components/IconButton';
import TokenList from '../../components/TokenList';
import { useWeb3Context } from '../../contexts/web3';
import { useAssetsContext } from '../../contexts/assets';
import { useAllowance, useBalance, useCurrencyQuery, useSwapRouterContract, useTokenContract } from '../../hooks';
import { useSwapContext } from '../../contexts/swap';
import { Fetcher, Token, WETH } from '3swap-sdk';
import { _calculateMinimumReceived, _calculatePriceImpact, _getAmountOutFromReserves } from '../../utils';
import { useReserves, useTriad } from '../../hooks/triad';
import Spinner from '../../components/Spinner';
import { useToastContext } from '../../contexts/toast';

type Props = {
  transactionModal: boolean;
  setTransactionModal: any;
};

const SwapCard = styled('div')`
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

  @media screen and (min-width: 320px) and (max-width: 375px) {
    width: 100%;
    /* margin-left: 9px; */
    .swapButton {
      width: 80%;
    }
  }
  // 393x786 411x731 414x736
  @media screen and (min-width: 376px) and (max-width: 480px) {
    width: 100%;


    .swapButton {
      width: 80%;
    }
  }

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
    @media screen and (min-width: 320px) and (max-width: 375px) {
      margin-bottom: 10px;
    }
    @media screen and (min-width: 376px) and (max-width: 480px) {
      margin-bottom: 10px;
    }
  }

  .details {
    width: 80%;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;

    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    @media screen and (min-width: 320px) and (max-width: 375px) {
      width: 96%;
      padding: 0 10px;
    }
    @media screen and (min-width: 376px) and (max-width: 480px) {
      width: 96%;
      padding: 0 10px;
    }
    .detailtext {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 12px;
      gap: 10px;

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
          margin-top: 5px;
          z-index: 1;
        }

        &:hover {
          .triangle {
            display: block;
            position: absolute;
            width: 18px;
            height: 20px;
            top: 100%;
            z-index: 2;
          }

          .hover {
            display: block;
            position: absolute;
            width: max-content;
            height: fit-content;
            margin-left: -15px;
            top: 140%;
            background: #fcfcfc;
            color: #4500a0;
            border-radius: 4px;
            font-size: 12px;
            z-index: 2;
            padding: 5px 20px;
          }
        }
      }
    }

    .num {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      /* identical to box height, or 171% */

      /* Color primary */

      color: #fff;
    }

    .num-green {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      /* identical to box height, or 171% */

      /* Color primary */

      color: #1c8d61;
    }
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
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;

    @media screen and (min-width: 320px) and (max-width: 375px) {
      padding-top: 10px;
      height: auto;
    }
    @media screen and (min-width: 376px) and (max-width: 480px) {
      padding-top: 10px;
      height: auto;
    }
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
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    margin-top: 11px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 30px;
    justify-content: flex-start;

    @media screen and (min-width: 320px) and (max-width: 375px) {
      width: 95%;
      padding: 0px 5px;
    }
    @media screen and (min-width: 376px) and (max-width: 480px) {
      width: 95%;
      padding: 0px 5px;
    }
    .coin-container {
      width: 402px;
      height: 55px;
      background: #fff;
      border: 1px solid #d8d8d8;
      box-sizing: border-box;
      border-radius: 20px;
      margin-top: 25px;
      display: flex;
      flex-direction: row;

      @media screen and (min-width: 320px) and (max-width: 375px) {
        width: 100%;
        padding: 0px;
        .left {
          width: 30%;
          img {
            padding-left: 5px;
          }
        }
        .right {
          width: 60%;
        }
      }
      @media screen and (min-width: 376px) and (max-width: 480px) {
        width: 100%;
        padding: 0px;
        .left {
          width: 30%;
          img {
            padding-left: 5px;
          }
        }
        .right {
          width: 60%;
        }
      }
      .left {
        width: 40%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
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
        justify-content: space-between;
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

        .inner-right-input {
          flex-basis: 90%;
          flex-grow: 1;
        }

        .inner-right-button {
          flex-basis: 10%;
          flex-grow: 1;
        }
      }
    }

    .bal {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 24px;
      margin-top: 5px;

      color: #9a999c;

      @media screen and (min-width: 320px) and (max-width: 375px) {
        padding-right: 5px;
      }
      @media screen and (min-width: 376px) and (max-width: 480px) {
        padding-right: 5px;
      }
    }
  }

  .interchange {
    margin-top: 35px;
  }

  .text-second {
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

  .to {
    width: 460px;
    background: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    height: 100px;
    margin-top: 11px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 30px;
    justify-content: flex-start;

    @media screen and (min-width: 320px) and (max-width: 375px) {
      width: 95%;
      padding: 0px 5px;
    }
    @media screen and (min-width: 376px) and (max-width: 480px) {
      width: 95%;
      padding: 0px 5px;
    }
    .coin-container {
      width: 402px;
      height: 55px;
      background: #fcfcfc;
      border: 1px solid #d8d8d8;
      box-sizing: border-box;
      border-radius: 20px;
      margin-top: 20px;

      display: flex;
      flex-direction: row;

      @media screen and (min-width: 320px) and (max-width: 375px) {
        width: 100%;
        padding: 0px;
        .left {
          width: 30%;
          img {
            padding-left: 5px;
          }
        }
        .right {
          width: 60%;
        }
      }
      @media screen and (min-width: 376px) and (max-width: 480px) {
        width: 100%;
        padding: 0px;
        .left {
          width: 30%;
          img {
            padding-left: 5px;
          }
        }
        .right {
          width: 60%;
        }
      }
      .left {
        width: 40%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
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
    }
  }

  .btn-disabled {
    width: 460px;
    height: 62px;
    background: #b1b1b1;
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
  }
`;

const TransactionSettings = styled('div')<{ open: boolean }>`
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 15px 70px rgba(189, 189, 189, 0.7);
  backdrop-filter: blur(19px);

  border-radius: 20px;
  width: 360px;
  min-height: 400px;
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
  @media screen and (min-width: 320px) and (max-width: 375px) {
    width: 95%;
    right: 2%;
  }
  @media screen and (min-width: 376px) and (max-width: 480px) {
    width: 95%;
    right: 2%;
  }

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
    width: 100%;
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
    width: 100%;
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

    @media screen and (min-width: 320px) and (max-width: 375px) {
      width: 95%;
      padding: 0px 5px;
    }
    @media screen and (min-width: 376px) and (max-width: 480px) {
      width: 95%;
      padding: 0px 5px;
    }

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

export default function Swap({ transactionModal, setTransactionModal }: Props) {
  const { inputCurrency1, inputCurrency2, outputCurrency, chainId: queryChainId } = useCurrencyQuery();
  const { assets } = useAssetsContext();
  const { localChainId, chainId, switchChain, isActive } = useWeb3Context();

  const [firstSelectedAddress, setFirstSelectedAddress] = useState('');
  const [secondSelectedAddress, setSecondSelectedAddress] = useState('');
  const [thirdSelectedAddress, setThirdSelectedAddress] = useState('');

  const [showList1, setShowList1] = useState<boolean>(false);
  const [showList2, setShowList2] = useState<boolean>(false);
  const [showList3, setShowList3] = useState<boolean>(false);

  const { balance: balance1, fetchBalance: fetchBalance1 } = useBalance();
  const { balance: balance2, fetchBalance: fetchBalance2 } = useBalance();

  const [slippage, setSlippage] = useState(0.1);
  const [gas, setGas] = useState(5);
  const [gasLimit, setGasLimit] = useState(24000);
  const [deadline, setDeadline] = useState(20);

  const { initiateSwap, initiateContractApproval } = useSwapContext();
  const { contract: swapRouterContract, createSwapRouterContract } = useSwapRouterContract();
  const { contract: token1Contract, createTokenContract: createToken1Contract } = useTokenContract();
  const { contract: token2Contract, createTokenContract: createToken2Contract } = useTokenContract();
  const { allowance: token1Allowance, loadAllowance: loadToken1Allowance } = useAllowance();
  const { allowance: token2Allowance, loadAllowance: loadToken2Allowance } = useAllowance();

  const [token1, setToken1] = useState<Token>();
  const [token2, setToken2] = useState<Token>();
  const [token3, setToken3] = useState<Token>();

  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);

  const [minimumReceived, setMinimumReceived] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0);

  const { isExistentTriad, checkTriadExistence } = useTriad();
  const { reserves, loadReserves } = useReserves();

  const [isLoading, setIsLoading] = useState(false);

  const { showErrorToast } = useToastContext();

  const setSelectedCurrencies = useCallback(() => {
    if (isActive && !!queryChainId) switchChain(queryChainId as string);

    if (inputCurrency1) setFirstSelectedAddress(inputCurrency1 as string);

    if (inputCurrency2) setSecondSelectedAddress(inputCurrency2 as string);

    if (outputCurrency) setThirdSelectedAddress(outputCurrency as string);
  }, []);

  const setMaxToken1 = useCallback(() => {
    setAmount1(balance1);
  }, [balance1]);

  const setMaxToken2 = useCallback(() => {
    setAmount2(balance2);
  }, [balance2]);

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
    if (!!firstSelectedAddress && ethereumAddress.isAddress(firstSelectedAddress)) {
      fetchBalance1(firstSelectedAddress);
    }
  }, [firstSelectedAddress]);

  useEffect(() => {
    if (!!secondSelectedAddress && ethereumAddress.isAddress(secondSelectedAddress)) {
      fetchBalance2(secondSelectedAddress);
    }
  }, [secondSelectedAddress]);

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

  useEffect(() => {
    (async () => {
      if ((!!chainId || !!localChainId) && !!token1 && !!token2 && !!token3) {
        setMinimumReceived(_calculateMinimumReceived(token1, token2, token3, amount1, amount2, amount3, slippage));
      }
    })();
  }, [token1, token2, token3, amount1, amount2, amount3, slippage, chainId, localChainId]);

  useEffect(() => {
    (async () => {
      if (
        !!firstSelectedAddress &&
        ethereumAddress.isAddress(firstSelectedAddress) &&
        !!secondSelectedAddress &&
        ethereumAddress.isAddress(secondSelectedAddress) &&
        !!thirdSelectedAddress &&
        ethereumAddress.isAddress(thirdSelectedAddress)
      ) {
        await checkTriadExistence(
          (chainId as number) || (localChainId as number),
          firstSelectedAddress,
          secondSelectedAddress,
          thirdSelectedAddress
        );
      }
    })();
  }, [token1, token2, token3, chainId]);

  useEffect(() => {
    (async () => {
      if (isExistentTriad) await loadReserves(firstSelectedAddress, secondSelectedAddress, thirdSelectedAddress);
    })();
  }, [isExistentTriad]);

  useEffect(() => {
    (() => {
      if (reserves.length > 0 && isExistentTriad && !!token1 && !!token2 && !!token3 && amount1 > 0 && amount2 > 0) {
        setAmount3(_getAmountOutFromReserves(reserves, amount1, amount2, token1, token2, token3));
      }
    })();
  }, [reserves, token1, token2, token3, amount1, amount2]);

  useEffect(() => {
    (() => {
      if (amount1 > 0 && amount2 > 0 && !!token1 && !!token2 && reserves.length > 0 && isExistentTriad) {
        setPriceImpact(_calculatePriceImpact(reserves, token1, token2, amount1, amount2));
      }
    })();
  }, [amount1, amount2, token1, token2, reserves, isExistentTriad]);

  useEffect(() => {
    if (!!token1Contract && !!chainId) loadToken1Allowance(token1Contract, chainId);
  }, [token1Contract, chainId]);

  useEffect(() => {
    if (!!token2Contract && !!chainId) loadToken2Allowance(token2Contract, chainId);
  }, [token2Contract, chainId]);

  const initSwap = async () => {
    setIsLoading(true);
    try {
      if (
        amount1 &&
        !!token1Contract &&
        firstSelectedAddress.toLowerCase() !== WETH[chainId as number].address().toLowerCase() &&
        token1Allowance < amount1
      ) {
        await initiateContractApproval(token1Contract, amount1, firstSelectedAddress);
      }

      if (
        amount2 &&
        !!token2Contract &&
        secondSelectedAddress.toLowerCase() !== WETH[chainId as number].address().toLowerCase() &&
        token2Allowance < amount2
      ) {
        await initiateContractApproval(token2Contract, amount2, secondSelectedAddress);
      }

      if (!!swapRouterContract && chainId && !!token1 && !!token2 && !!token3) {
        await initiateSwap(
          swapRouterContract,
          token1,
          token2,
          token3,
          amount1,
          amount2,
          minimumReceived,
          deadline,
          slippage,
          gas,
          gasLimit
        );
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showErrorToast(
        <>
          <span>
            {'An error occured'}
            {''}!
          </span>
        </>,
        4
      );
    }
  };

  return (
    <SwapCard>
      <Head>
        <title>3Swap | Swap</title>
      </Head>
      <div className="title">
        <Icon
          style={{ cursor: 'pointer' }}
          iconType="solid"
          name="chart-line"
          width="20px"
          height="20px"
          fontSize="20px"
        />
        <div>Swap</div>
        <Icon
          style={{ cursor: 'pointer' }}
          iconType="solid"
          name="gear"
          width="20px"
          height="20px"
          fontSize="20px"
          onClick={() => setTransactionModal(!transactionModal)}
        />
      </div>
      <div className="desc">Swap two tokens for one, pay less.</div>
      <TransactionSettings
        onClick={(e: any) => {
          e.stopPropagation();
        }}
        open={transactionModal}
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
            click={() => setTransactionModal(false)}
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
              value={deadline || 20}
              onChange={ev => setDeadline(ev.target.valueAsNumber)}
            />
          </div>
          <div>minutes</div>
        </div>

        <div className="slippage ">
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
        <div className="box speed">
          <div className={gas === 5 ? 'round selected' : 'round'} onClick={() => setGas(5)}>
            Standard (5)
          </div>
          <div className={gas === 7 ? 'round selected' : 'round'} onClick={() => setGas(7)}>
            Safe (4)
          </div>
          <div className={gas === 10 ? 'round selected' : 'round'} onClick={() => setGas(10)}>
            Instant (10)
          </div>
        </div>

        <div className="slippage">
          <div>Gas Limit</div>
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
              Highest amount of gas to pay for this transaction.
            </div>
          </div>
        </div>
        <div className="box">
          <div className="round">
            <input
              type="number"
              style={{ border: 'none', width: 'inherit', padding: 3, outline: 'none' }}
              value={gasLimit || 24000}
              onChange={ev => setGasLimit(ev.target.valueAsNumber)}
            />
          </div>
        </div>
      </TransactionSettings>

      <div className="text">From</div>

      <div className="from">
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
        <div className="coin-container">
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
            <div className="inner-right-input">
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
            <div className="inner-right-button">
              <Button
                border="1px solid #4500a0"
                title="MAX"
                click={setMaxToken1}
                height="14.74px"
                width="28px"
                color="#4500a0"
              />
            </div>
          </div>
        </div>

        <div className="bal">
          Balance: {balance1}{' '}
          {!!assets && Object.keys(assets).length > 0
            ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                ethereumAddress.isAddress(firstSelectedAddress)
                  ? firstSelectedAddress
                  : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[0]
              ]?.symbol
            : 'TOKEN_SYMBOL'}
        </div>

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
        <div className="coin-container">
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
            <div className="inner-right-input">
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
            <div className="inner-right-button">
              <Button
                border="1px solid #4500a0"
                title="MAX"
                click={setMaxToken2}
                height="14.74px"
                width="28px"
                color="#4500a0"
              />
            </div>
          </div>
        </div>

        <div className="bal">
          Balance: {balance2}{' '}
          {!!assets && Object.keys(assets).length > 0
            ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                ethereumAddress.isAddress(secondSelectedAddress)
                  ? secondSelectedAddress
                  : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[1]
              ]?.symbol
            : 'TOKEN_SYMBOL'}
        </div>
      </div>

      <IconButton
        background="#4500a0"
        iconType="solid"
        name="rotate"
        width="34px"
        height="34px"
        fontSize="20px"
        borderRadius="50%"
        marginTop="2em"
        click={() => {
          setFirstSelectedAddress(thirdSelectedAddress);
          setSecondSelectedAddress(firstSelectedAddress);
          setThirdSelectedAddress(secondSelectedAddress);
        }}
      />

      <div className="text-second">To</div>

      <div className="to">
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
        <div className="coin-container">
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
            <div className="inner-right-input">
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
                disabled
              />
            </div>
            {/* <div className="inner-right-button">
              <Button border="1px solid #4500a0" title="MAX" height="14.74px" width="28px" color="#4500a0" />
            </div> */}
          </div>
        </div>
      </div>

      <div className="details">
        <div className="detailtext">
          <div>Minimum received</div>
          <div className="info">
            <img src="./info-black.svg" alt="image" className="info-icon"></img>
            <img src="./triangle.svg" alt="image" className="triangle"></img>
            <div className="hover">The lowest amount you&apos;ll get from this swap</div>
          </div>
        </div>
        <div className="num">
          {minimumReceived}{' '}
          {!!assets && Object.keys(assets).length > 0
            ? assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`][
                ethereumAddress.isAddress(thirdSelectedAddress)
                  ? thirdSelectedAddress
                  : Object.keys(assets[`0x${(queryChainId || chainId || localChainId)?.toString(16)}`])[2]
              ]?.symbol
            : 'TOKEN_SYMBOL'}
        </div>
      </div>

      <div className="details">
        <div className="detailtext">
          <div>Price impact</div>
          <div className="info">
            <img src="./info-black.svg" alt="image" className="info-icon"></img>
            <img src="./triangle.svg" alt="image" className="triangle"></img>
            <div className="hover">Percentage shift in pricing constant that would be incurred by the reserves</div>
          </div>
        </div>
        <div className="num-green">{priceImpact}%</div>
      </div>
      {isLoading && <Spinner width="30px" height="30px" />}
      <Button
        background="#4500a0"
        marginTop="20px"
        marginBottom="20px"
        width="460px"
        className="swapButton"
        click={initSwap}
        disabled={
          !isExistentTriad ||
          priceImpact > 1 ||
          amount1 === 0 ||
          amount2 === 0 ||
          amount3 === 0 ||
          isLoading ||
          !isActive
        }
        title={
          !isExistentTriad
            ? 'Invalid Triad'
            : priceImpact > 1
            ? 'Price Impact Too High'
            : !isActive
            ? 'Please Connect Wallet'
            : 'Swap'
        }
        fontSize="20px"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '25px 0px',
          borderRadius: '10px'
        }}
      />
    </SwapCard>
  );
}
