/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import IconButton from '../../components/IconButton';
import TokenList from '../../components/TokenList';

type Props = {
  transactionModal: boolean;
  setTransactionModal: any;
};

const SwapCard = styled('div')`
  margin: 2em auto;
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
  position: relative;

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

  .details {
    width: 80%;
    color: #322e37;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;

    height: 25px;

    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;

    .detailtext {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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
            width: 100px;
            height: 66px;
            margin-left: -15px;
            top: 140%;
            background: #fcfcfc;
            border-radius: 4px;
            font-size: 12px;
            z-index: 2;
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

      color: #4500a0;
    }

    .num-green {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
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
  background: linear-gradient(
    190.57deg,
    rgba(255, 255, 255, 0.56) 19.25%,
    rgba(255, 255, 255, 0.56) 19.26%,
    rgba(248, 248, 255, 0.71) 54.39%,
    rgba(255, 255, 255, 0.59) 90.02%
  );
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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;

    margin-top: 50px;
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
    margin-top: 8px;
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
          display: block;
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
    width: 70%;
    margin-top: 10px;
    height: 45px;
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
      width: 45px;
      height: 24px;
      padding: 0px 10px;
      background: #fcfcfc;
      border-radius: 28px;
      background: white;
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
    }
  }
`;

export default function Swap({ transactionModal, setTransactionModal }: Props) {
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
      <TokenList />
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
            <div className="hover">
              Percentage change you&apos;re willing to allow between transaction execution time and block inclusion
              time.
            </div>
          </div>
        </div>
        <div className="box">
          <div className="round">0.1%</div>
          <div className="round">0.5%</div>
          <div className="round">1.0%</div>
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
            <div className="hover">
              How long from execution time before this transaction will be considered a failed one.
            </div>
          </div>
        </div>

        <div className="box">
          <div className="round">20</div>
          <div>minutes</div>
        </div>
      </TransactionSettings>

      <div className="text">From</div>

      <div className="from">
        <div className="coin-container">
          <div className="left">
            <img src="./usdt.svg" alt="usdt" style={{ cursor: 'pointer' }} width={28} height={28} />
            <div>USDT</div>
            <Icon iconType="solid" name="chevron-down" width="12px" height="6px" fontSize="12px" />
          </div>

          <div className="right">
            <div className="amt">Enter Amount</div>
            <Button border="1px solid #4500a0" title="MAX" height="14.74px" width="28px" color="#4500a0" />
          </div>
        </div>

        <div className="bal">Balance: 0 USDT</div>

        <div className="coin-container">
          <div className="left">
            <img src="./eth.svg" style={{ cursor: 'pointer' }} alt="eth" width={28} height={28} />
            <div>ETH</div>
            <Icon iconType="solid" name="chevron-down" width="12px" height="6px" fontSize="12px" />
          </div>

          <div className="right">
            <div className="amt">Enter Amount</div>
            <Button border="1px solid #4500a0" title="MAX" height="14.74px" width="28px" color="#4500a0" />
          </div>
        </div>

        <div className="bal">Balance: 0 ETH</div>
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
      />

      <div className="text-second">To</div>

      <div className="to">
        <div className="coin-container">
          <div className="left">
            <img src="./btc.svg" style={{ cursor: 'pointer' }} alt="btc" width={28} height={28} />
            <div>BTC</div>
            <Icon iconType="solid" name="chevron-down" width="12px" height="6px" fontSize="12px" />
          </div>

          <div className="right">
            <div className="amt">Enter Amount</div>
            <Button border="1px solid #4500a0" title="MAX" height="14.74px" width="28px" color="#4500a0" />
          </div>
        </div>
      </div>

      <div className="details">
        <div className="detailtext">
          <div>Minimum recieved</div>
          <div className="info">
            <img src="./info-black.svg" alt="image" className="info-icon"></img>
            <img src="./triangle.svg" alt="image" className="triangle"></img>
            <div className="hover">This will have info of question mark....</div>
          </div>
        </div>
        <div className="num">0.00</div>
      </div>

      <div className="details">
        <div className="detailtext">
          <div>Price impact</div>
          <div className="info">
            <img src="./info-black.svg" alt="image" className="info-icon"></img>
            <img src="./triangle.svg" alt="image" className="triangle"></img>
            <div className="hover">This will have info of question mark....</div>
          </div>
        </div>
        <div className="num-green">0.05%</div>
      </div>

      <div className="details">
        <div className="detailtext">
          <div>Liquidity provider</div>
          <div className="info">
            <img src="./info-black.svg" alt="image" className="info-icon"></img>
            <img src="./triangle.svg" alt="image" className="triangle"></img>
            <div className="hover">This will have info of question mark....</div>
          </div>
        </div>
        <div className="num">0.000000001 BTC</div>
      </div>
      <Button
        background="#4500a0"
        marginTop="20px"
        marginBottom="20px"
        width="460px"
        height="62px"
        title="Swap"
        fontSize="20px"
      />
    </SwapCard>
  );
}
