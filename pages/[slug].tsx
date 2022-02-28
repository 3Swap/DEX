import React from 'react'
import styled from 'styled-components'


const HeaderContainer = styled('div')`
    width: 100vw;
    padding-right: 100px;
    padding-left: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content : space-between;
    height: 65px;
    border: 1px solid red;

`;

const SwapLogo = styled('img')`
    width: 125.19px;
    height: 42px;
    border: 1px solid red;
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
    position: absolute;
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
        <img src='./3swap.png' />
        <ConnectWalletBtn>Connect Wallet</ConnectWalletBtn>
    </HeaderContainer>
  )
}