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
import { useCurrencyQuery } from '../../hooks';
import TokenList from '../../components/TokenList';

type Props = {
  liquidityPoolModal: boolean;
  setLiquidityPoolModal: any;
};

const LiquidityCard = styled('div')`
  .container {
    width: 540px;
    height: 846px;
    background: linear-gradient(175.58deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.27) 99.87%);
    box-shadow: -10px 48.5967px 140px rgba(126, 123, 160, 0.2);
    backdrop-filter: blur(19px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    margin: 2em auto;
    font-family: 'Poppins';
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
export default function Liquidity({ liquidityPoolModal, setLiquidityPoolModal }: Props) {
  const { inputCurrency1, inputCurrency2, outputCurrency, chainId: queryChainId } = useCurrencyQuery();
  const { assets } = useAssetsContext();
  const { localChainId, chainId, switchChain, isActive } = useWeb3Context();

  const [firstSelectedAddress, setFirstSelectedAddress] = useState('');
  const [secondSelectedAddress, setSecondSelectedAddress] = useState('');
  const [thirdSelectedAddress, setThirdSelectedAddress] = useState('');

  const [showList1, setShowList1] = useState<boolean>(false);
  const [showList2, setShowList2] = useState<boolean>(false);
  const [showList3, setShowList3] = useState<boolean>(false);

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

  return (
    <>
      <LiquidityPoolCard
        open={!liquidityPoolModal}
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
        <div className="container">
          <Head>
            <title>3Swap | Add Liquidity</title>
          </Head>
          <div className="title">
            <div>Add Liquidity</div>
            <Icon iconType="solid" name="gear" width="20px" height="20px" fontSize="20px" />
          </div>
          <div className="desc">Get LP tokens when you add liquidity.</div>

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
                <div className="amt">0.000001</div>
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
                <div className="amt">0.000001</div>
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
                <div className="amt">0.000001</div>
              </div>
            </div>
          </div>
          <Button
            background="#4500a0"
            marginTop="40px"
            marginBottom="20px"
            width="460px"
            height="62px"
            title="Add Liquidity"
            fontSize="20px"
          />
        </div>
      </LiquidityCard>
    </>
  );
}
