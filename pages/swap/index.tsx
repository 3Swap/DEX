import React from 'react'
import Swap from "../../routes/app/swap";
import styled from 'styled-components'


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


export default function index() {
  return (
    <MainContainer>


    <MainPage>
            <Swap></Swap>
    </MainPage>
           
    </MainContainer>
  )
}
