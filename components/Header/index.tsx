import React from 'react'
import styled from 'styled-components'


const HeaderContainer = styled('div')`
    width: 100vw;
    padding-right: 100px;
    padding-left: 100px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content : space-between;
    height: 100px;
    padding-bottom: 20px;


`;

const SwapLogo = styled('img')`
    width: 125.19px;
    height: 42px;
`;

const ConnectWalletBtn = styled('div')`
    display: flex;
    justify-content : center;
    align-items: center;
    width: 145px;
    height: 45px;
    background: #4500A0;
    border-radius: 8px;
    color: white;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
`;

type Props = {}

export default function Header({}: Props) {
  return (
    <HeaderContainer>
        <SwapLogo src='./3swap.svg'  />
        <ConnectWalletBtn>Connect Wallet</ConnectWalletBtn>
    </HeaderContainer>
  )
}