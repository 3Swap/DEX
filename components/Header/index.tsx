import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled('div')`
  width: 100vw;
  padding-right: 40px;
  padding-left: 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: 100px;
  backdrop-filter: blur(1px);
  padding-bottom: 20px;
  .nav_right {
    display: flex;
    flex-direction: row;
    justify-content: baseline;
    column-gap: 10px;
  }
  /* display: none; */
  @media screen and (min-width: 320px) and (max-width: 375px) {
    flex-direction: column;
    padding-top: 20px;
    height: auto;
    width: 95%;

    padding-left: 0;
    padding-right: 0;

    .nav_right {
      padding-right: 10px;
    }
    .logo {
      object-fit: contain;
      /* margin-left: 200px !important; */
      width: 100%;
      margin-bottom: 20px;
    }
  }
  @media screen and (min-width: 361px) and (max-width: 375px) {
    width: 94%;
  }
  @media screen and (min-width: 376px) and (max-width: 480px) {
    flex-direction: column;
    padding-top: 20px;
    height: auto;
    width: 90%;

    padding-left: 0;
    padding-right: 0;

    .nav_right {
      padding-right: 10px;
    }
    .logo {
      object-fit: contain;
      /* margin-left: 200px !important; */
      width: 96%;
      margin-bottom: 20px;
    }
  }
`;

type Props = { children: any };

export default function Header({ children }: Props) {
  return <HeaderContainer>{children}</HeaderContainer>;
}
